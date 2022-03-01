package DailyFootball.demo.domain.user.DTO;

import DailyFootball.demo.domain.user.domain.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

@Getter
@NoArgsConstructor
public class UserPasswordUpdateDto {
    private String password;

    @Builder
    public UserPasswordUpdateDto(String password){
        this.password = password;
    }

    public User toUser(UserPasswordUpdateDto userPasswordUpdateDto, PasswordEncoder passwordEncoder){
        return User.builder()
                .password(passwordEncoder.encode(password))
                .build();
    }
}
