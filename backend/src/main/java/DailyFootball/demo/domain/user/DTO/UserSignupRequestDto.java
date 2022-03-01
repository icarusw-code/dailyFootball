package DailyFootball.demo.domain.user.DTO;

import DailyFootball.demo.domain.user.domain.Authority;
import DailyFootball.demo.domain.user.domain.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

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

    public User toUser(PasswordEncoder passwordEncoder){
        return User.builder()
                .email(email)
                .nickname(nickname)
                .password(passwordEncoder.encode(password))
                .authority(Authority.ROLE_USER)
                .build();
    }


}
