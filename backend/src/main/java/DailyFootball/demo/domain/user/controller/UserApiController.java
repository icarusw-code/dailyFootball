package DailyFootball.demo.domain.user.controller;

import DailyFootball.demo.domain.error.ErrorResponse;
import DailyFootball.demo.domain.user.dto.UserSignupRequestDto;
import DailyFootball.demo.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequiredArgsConstructor
public class UserApiController {

    private final UserService userService;
    private final MessageSource messageSource;

    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity signup(@RequestBody UserSignupRequestDto userSignupRequestDto){
        Map<String, Object> responseMap = new HashMap<>();
        Long userId = userService.saveUserInfo(userSignupRequestDto);
        responseMap.put("userId", userId);
        return ResponseEntity.status(HttpStatus.OK).body(responseMap);
    }

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


}
