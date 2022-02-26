package DailyFootball.demo.domain.user.controller;

import DailyFootball.demo.domain.error.ErrorResponse;
import DailyFootball.demo.domain.user.DTO.UserDto;
import DailyFootball.demo.domain.user.domain.User;
import DailyFootball.demo.domain.user.service.UserService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.Column;
import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
public class UserApiController {

    private final UserService userService;
    private final MessageSource messageSource;

    @PostMapping("/signup")
    public ResponseEntity signup(@RequestBody @Valid CreateUserRequest request){

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setNickname(request.getNickname());
        user.setRegisterDate(request.getRegisterDate());

        try{
            Long id = userService.join(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(new CreateMemberResponse(id));
        }
        catch(IllegalStateException e){
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse(messageSource.getMessage("error.same.id", null, LocaleContextHolder.getLocale())));
        }

    }

    @Data
    static class CreateUserRequest {
        @NotEmpty
        private String email;
        @NotEmpty
        private String password;
        @NotEmpty
        private String nickname;
        @Column(columnDefinition = "TIMESTAMP WITH TIME ZONE")
        private LocalDateTime registerDate;
    }

    @Data
    static class CreateMemberResponse {
       private Long id;

       public CreateMemberResponse(Long id){
           this.id = id;
       }
    }
}
