package DailyFootball.demo.domain.user.service;

import DailyFootball.demo.domain.user.repository.FollowRepository;
import DailyFootball.demo.global.jwt.DTO.TokenDto;
import DailyFootball.demo.global.jwt.DTO.TokenRequestDto;
import DailyFootball.demo.global.jwt.TokenProvider;
import DailyFootball.demo.global.jwt.domain.RefreshToken;
import DailyFootball.demo.global.jwt.repository.RefreshTokenRepository;
import DailyFootball.demo.global.jwt.util.SecurityUtil;
import DailyFootball.demo.domain.user.DTO.*;
import DailyFootball.demo.domain.user.domain.User;
import DailyFootball.demo.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.ValidationException;
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;
    private final FollowRepository followRepository;

    /**
     *  회원 가입
     */
    @Transactional
    public Long signup(UserSignupRequestDto userSignupRequestDto){
        User user = userSignupRequestDto.toUser(passwordEncoder);
        return userRepository.save(user).getId();
    }


    // 이메일 중복검사
    @Transactional
    public boolean findExistEmail(String email){
        return userRepository.existsByEmail(email);
    }

    // 닉네임 중복검사
    @Transactional
    public boolean findExistNickname(String nickname){
        return userRepository.existsByNickname(nickname);
    }

    // 회원 탈퇴
    @Transactional
    public void deleteById(Long userId){
        userRepository.deleteById(userId);
    }

    /**
     * 회원 정보 조회
     */
    @Transactional
    public UserInfoDto findUserInfo(Long userId, Long sessionId){
        UserInfoDto userInfoDto = new UserInfoDto();
        User user = userRepository.findById(userId).orElseThrow(() -> {return new ValidationException("찾을 수 없는 user 입니다.");});
        // 기본 정보 저장
        userInfoDto.toUserInfo(user.getEmail(), user.getNickname(), user.getProfileImg());

        // userId를 가진 user가 현재 사용자를 follow 했는지 확인
        userInfoDto.isFollow(followRepository.findFollowByFromUserIdAndToUserId(sessionId,userId) != null);

        // userId의 팔로워, 팔로잉 수를 확인
        userInfoDto.toFollowCount(followRepository.findFollowerCountById(userId), followRepository.findFollowingCountById(userId));

        return userInfoDto;
    }

    // 현재 SecurityContext 에 있는 유저 정보 가져오기
    @Transactional
    public UserResponseDto getMyInfo(){
        return userRepository.findById(SecurityUtil.getCurrentUserId())
                .map(UserResponseDto::of)
                .orElseThrow(() ->new RuntimeException("로그인 유저 정보가 없습니다."));
    }

    /**
     * 로그인
     */
    @Transactional
    public TokenDto login(UserRequestDto userRequestDto){

        // 1. Login ID/PW 를 기반으로 AuthenticationToken 생성
        UsernamePasswordAuthenticationToken authenticationToken = userRequestDto.toAuthentication();

        // 2. 실제로 검증(사용자 비밀번호 체크) 가 이루어짐
        // authenticate 메서드가 실행이 될 때 CustomUserDetailsService 에서 만들었던 loadUserByUsername 메서드가 실행됨
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // 3. 인증 정보를 기반으로 JMT 토큰 생성
        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);

        // 4. RefreshToken 저장
        RefreshToken refreshToken = RefreshToken.builder()
                .tokenKey(authentication.getName())
                .tokenValue(tokenDto.getRefreshToken())
                .build();

        refreshTokenRepository.save(refreshToken);

        // 4.5 (임시) 넘겨줄때 회원 아이디랑 닉네임 추가!
        Optional<User> findUser = userRepository.findByEmail(userRequestDto.getEmail());
        Long userId = findUser.get().getId();
        String nickname = findUser.get().getNickname();

        tokenDto.setId(userId);
        tokenDto.setNickname(nickname);
        // 5. 토큰 발급
        return tokenDto;
    }

    /**
     * 토큰 재발급
     */
    @Transactional
    public TokenDto reissue(TokenRequestDto tokenRequestDto){

        // 1. Refresh Token 검증
        if(! tokenProvider.validateToken(tokenRequestDto.getRefreshToken())){
            throw new RuntimeException("Refresh Token 이 유효하지 않습니다.");
        }

        // 2. Access Token 에서 User ID 가져오기
        Authentication authentication = tokenProvider.getAuthentication(tokenRequestDto.getAccessToken());

        // 3. 저장소에서 User ID를 기반으로 Refresh Token 값 가져오기
        RefreshToken refreshToken = refreshTokenRepository.findByTokenKey(authentication.getName())
                .orElseThrow(() -> new RuntimeException("로그아웃 된 사용자입니다."));

        // 4. Refresh Token 일치하는지 검사
        if (! refreshToken.getTokenValue().equals(tokenRequestDto.getRefreshToken())){
            throw new RuntimeException("토큰의 유저 정보가 일치하지 않습니다.");
        }

        // 5. 새로운 토큰 생성
        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);

        // 6. 저장소 정보 업데이트
        RefreshToken newRefreshToken = refreshToken.updateValue(tokenDto.getRefreshToken());
        refreshTokenRepository.save(newRefreshToken);

        // 토큰 발급
        return tokenDto;
    }

    /**
     * 회원 정보 수정
     */
    @Transactional
    public Long updateProfile(Long userId, MultipartFile multipartFile, UserUpdateDto userUpdateDto, UserUpdateResponseDto userUpdateResponseDto){
        try{
            String sep = File.separator;
            String today = new SimpleDateFormat("yyMMdd").format(new Date());

            File file = new File("");
            String rootPath = file.getAbsolutePath().split("src")[0];

            String savePath = rootPath + sep + "profileImg" + sep + today;
            if(!new File(savePath).exists()){
                try{
                    new File(savePath).mkdirs();
                }catch (Exception e){
                    e.printStackTrace();
                }
            }

            // 파일 이름 정하기
            String originFileName = multipartFile.getOriginalFilename();
            String saveFileName = UUID.randomUUID().toString() + originFileName.substring(originFileName.lastIndexOf("."));

            String filePath = savePath + sep + saveFileName;
            multipartFile.transferTo(new File(filePath));
            // 닉네임 저장
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. userId = " + userId));
            user.update(userUpdateDto.getNickname());
            user.profileUrl(userUpdateResponseDto.toUpdateProfile(filePath).getProfileImg());

            return userId;

        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 비밀번호 변경
     */
    @Transactional
    public void updatePassword(Long userId, UserPasswordUpdateDto userPasswordUpdateDto){
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. userId= " + userId));

        user.passwordUpdate(userPasswordUpdateDto.toUser(userPasswordUpdateDto, passwordEncoder).getPassword());
    }

}
