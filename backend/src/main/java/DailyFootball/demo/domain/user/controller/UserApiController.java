package DailyFootball.demo.domain.user.controller;

import DailyFootball.demo.domain.jwt.DTO.TokenDto;
import DailyFootball.demo.domain.jwt.DTO.TokenRequestDto;
import DailyFootball.demo.domain.user.DTO.*;
import DailyFootball.demo.domain.user.domain.User;
import DailyFootball.demo.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;


@RestController
@RequiredArgsConstructor
public class UserApiController {

    private final UserService userService;


    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity signup(@RequestBody UserSignupRequestDto userSignupRequestDto){
        Map<String, Object> responseMap = new HashMap<>();
//        UserResponseDto userId = userService.signup(userSignupRequestDto);
        Long userId = userService.signup(userSignupRequestDto);
        responseMap.put("userId", userId);
        return ResponseEntity.status(HttpStatus.OK).body(responseMap);
    }

//    // 회원가입
//    @PostMapping("/signup")
//    public ResponseEntity signup(@RequestBody UserSignupRequestDto userSignupRequestDto){
//        Map<String, Object> responseMap = new HashMap<>();
//        Long userId = userService.saveUserInfo(userSignupRequestDto);
//        responseMap.put("userId", userId);
//        return ResponseEntity.status(HttpStatus.OK).body(responseMap);
//    }

    // 이메일 중복검사
    @GetMapping("/email/duplicate")
    public ResponseEntity<Map<String, Object>> isExistEmail(@RequestParam String email){
        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("isExist", userService.findExistEmail(email));
        return ResponseEntity.status(HttpStatus.OK).body(responseMap);
    }

    // 닉네임 중복검사
    @GetMapping("/nickname/duplicate")
    public ResponseEntity<Map<String, Object>> isExistNickname(@RequestParam String nickname){
        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("isExist", userService.findExistNickname(nickname));
        return ResponseEntity.status(HttpStatus.OK).body(responseMap);
    }

    // 회원탈퇴
    @DeleteMapping("/{userId}")
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
    @GetMapping("/{userId}")
    public ResponseEntity<Map<String, Object>> userInfo(@PathVariable("userId") Long userId){
        Map<String, Object> responseMap = new HashMap<>();
        Optional<User> userInfos = userService.findUserInfo(userId);
        List<UserInfoDto> userInfoDtoList = userInfos.stream()
                .map(m -> new UserInfoDto(m.getEmail(), m.getNickname()))
                .collect(Collectors.toList());
        responseMap.put("userInfo", userInfoDtoList);
        return ResponseEntity.status(HttpStatus.OK).body(responseMap);
    }

    @PostMapping("/login")
    public ResponseEntity<TokenDto> login(@RequestBody UserRequestDto userRequestDto){
        return ResponseEntity.ok(userService.login(userRequestDto));
    }

    @PostMapping("/reissue")
    public ResponseEntity<TokenDto> reissue(@RequestBody TokenRequestDto tokenRequestDto){
        return ResponseEntity.ok(userService.reissue(tokenRequestDto));
    }

    /**
     * 회원 정보 수정
     */
    @PutMapping("/edit/{userId}")
    public ResponseEntity updateProfile(@PathVariable Long userId, @RequestBody UserUpdateDto userUpdateDto){
        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("userId", userService.updateProfile(userId, userUpdateDto));
        return ResponseEntity.status(HttpStatus.OK).body(responseMap);
    }
}
