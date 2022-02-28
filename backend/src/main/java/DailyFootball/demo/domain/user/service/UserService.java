package DailyFootball.demo.domain.user.service;

import DailyFootball.demo.domain.jwt.DTO.TokenDto;
import DailyFootball.demo.domain.jwt.DTO.TokenRequestDto;
import DailyFootball.demo.domain.jwt.TokenProvider;
import DailyFootball.demo.domain.jwt.domain.RefreshToken;
import DailyFootball.demo.domain.jwt.repository.RefreshTokenRepository;
import DailyFootball.demo.domain.jwt.util.SecurityUtil;
import DailyFootball.demo.domain.user.DTO.UserRequestDto;
import DailyFootball.demo.domain.user.DTO.UserResponseDto;
import DailyFootball.demo.domain.user.DTO.UserSignupRequestDto;
import DailyFootball.demo.domain.user.domain.User;
import DailyFootball.demo.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;

    /**
     *  회원 가입
     */
    @Transactional
    public UserResponseDto saveUserInfo(UserSignupRequestDto userSignupRequestDto){
        User user = userSignupRequestDto.toEntity(passwordEncoder);
        return UserResponseDto.of(userRepository.save(user));
//        return userRepository.save(userSignupRequestDto.toEntity()).getId();
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

    // 회원 정보 조회
    @Transactional
    public Optional<User> findUserInfo(Long userId) {
        return userRepository.findById(userId);
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
                .key(authentication.getName())
                .value(tokenDto.getRefreshToken())
                .build();

        refreshTokenRepository.save(refreshToken);

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
        RefreshToken refreshToken = refreshTokenRepository.findByKey(authentication.getName())
                .orElseThrow(() -> new RuntimeException("로그아웃 된 사용자입니다."));

        // 4. Refresh Token 일치하는지 검사
        if (! refreshToken.getValue().equals(tokenRequestDto.getRefreshToken())){
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

}
