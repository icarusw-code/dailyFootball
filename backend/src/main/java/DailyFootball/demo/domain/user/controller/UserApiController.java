package DailyFootball.demo.domain.user.controller;

import DailyFootball.demo.domain.user.DTO.*;
import DailyFootball.demo.domain.user.service.UserService;
import DailyFootball.demo.global.jwt.DTO.TokenDto;
import DailyFootball.demo.global.jwt.DTO.TokenRequestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
public class UserApiController {

    private final UserService userService;


    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity signup(@RequestBody UserSignupRequestDto userSignupRequestDto){
        Map<String, Object> responseMap = new HashMap<>();
        Long userId = userService.signup(userSignupRequestDto);
        userService.setBasicImg(userSignupRequestDto);
        responseMap.put("userId", userId);
        return ResponseEntity.status(HttpStatus.OK).body(responseMap);
    }


    // 이메일 중복검사
    @GetMapping("/account/email/duplicate")
    public ResponseEntity<Map<String, Object>> isExistEmail(@RequestParam String email){
        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("isExist", userService.findExistEmail(email));
        return ResponseEntity.status(HttpStatus.OK).body(responseMap);
    }

    // 닉네임 중복검사
    @GetMapping("/account/nickname/duplicate")
    public ResponseEntity<Map<String, Object>> isExistNickname(@RequestParam String nickname){
        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("isExist", userService.findExistNickname(nickname));
        return ResponseEntity.status(HttpStatus.OK).body(responseMap);
    }

    // 회원탈퇴
    @DeleteMapping("/account/delete/{userId}")
    public ResponseEntity deleteUser(@PathVariable("userId") Long userId){
        Map<String, Object> responseMap = new HashMap<>();
        try {
            userService.deleteById(userId);
        }catch(EmptyResultDataAccessException e){
            responseMap.put("ErrorMsg", "해당하는 아이디가 존재하지 않습니다 : " + userId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseMap);
        }
        responseMap.put("userId", userId);
        return ResponseEntity.status(HttpStatus.OK).body(responseMap);
    }

    // 회원 정보 조회
    @GetMapping("/account/{userId}")
    public ResponseEntity userInfo(Model model,
                                   @PathVariable("userId") Long userId,
                                   @RequestParam Long sessionId){
        UserInfoDto userInfoDto = userService.findUserInfo(userId, sessionId);
        model.addAttribute("userInfo", userInfoDto);
        return ResponseEntity.status(HttpStatus.OK).body(model);
    }

    // 회원 정보 조회 -> 이미지
    @CrossOrigin
    @GetMapping(
            value = "/image/{userId}",
            produces =  {MediaType.IMAGE_PNG_VALUE, MediaType.IMAGE_JPEG_VALUE}
    )
    public ResponseEntity<byte[]> getImage(@PathVariable Long userId) throws IOException{
        UserImgDto userImgDto = userService.findProfileImgById(userId);

        InputStream imageStream = new FileInputStream(userImgDto.getProfileImg());
        byte[] imageByteArray = IOUtils.toByteArray(imageStream);
        imageStream.close();

        return new ResponseEntity<>(imageByteArray, HttpStatus.OK);
    }


    //로그인
    @PostMapping("/login")
    public ResponseEntity<TokenDto> login(@RequestBody UserRequestDto userRequestDto){
        return ResponseEntity.ok(userService.login(userRequestDto));
    }

    //재발급
    @PostMapping("/reissue")
    public ResponseEntity<TokenDto> reissue(@RequestBody TokenRequestDto tokenRequestDto){
        return ResponseEntity.ok(userService.reissue(tokenRequestDto));
    }

    /**
     * 회원 정보 수정
     */
    @PutMapping("/account/{userId}")
    public ResponseEntity updateProfile(@PathVariable Long userId,
                                        @RequestPart(value = "file") MultipartFile multipartFile,
                                        @RequestPart(value = "userUpdateDto") UserUpdateDto userUpdateDto
){
        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("userId", userService.updateProfile(userId, multipartFile, userUpdateDto, new UserUpdateResponseDto()));
        return ResponseEntity.status(HttpStatus.OK).body(responseMap);
    }


    /**
     * 비밀 번호 변경
     */
    @PutMapping("/account/change/password/{userId}")
    public ResponseEntity updatePassword(@PathVariable Long userId, @RequestBody UserPasswordUpdateDto userPasswordUpdateDto){
        Map<String, Object> responseMap = new HashMap<>();
        userService.updatePassword(userId, userPasswordUpdateDto);
        responseMap.put("비밀번호 변경 성공", true);
        return ResponseEntity.status(HttpStatus.OK).body(responseMap);
    }

}

