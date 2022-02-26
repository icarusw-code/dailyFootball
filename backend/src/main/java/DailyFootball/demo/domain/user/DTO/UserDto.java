package DailyFootball.demo.domain.user.DTO;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Data
public class UserDto {

    private Long id;
    private String email;
    private String password;
    private String nickname;


    public UserDto(Long id, String email, String password, String nickname) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.nickname = nickname;

    }
}
