package DailyFootball.demo.domain.user.dto;

import DailyFootball.demo.domain.user.domain.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserSignupRequestDto {

    private String email;
    private String nickname;
    private String password;

    @Builder
    public UserSignupRequestDto(String email, String nickname, String password){
        this.email = email;
        this.nickname = nickname;
        this.password = password;
    }

    public User toEntity(){
        return User.builder()
                .email(email)
                .nickname(nickname)
                .password(password)
                .build();
    }
}
