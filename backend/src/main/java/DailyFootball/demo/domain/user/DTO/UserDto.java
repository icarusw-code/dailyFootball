package DailyFootball.demo.domain.user.DTO;

import DailyFootball.demo.domain.user.domain.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    private Long id;
    private String email;
    private String nickname;

    public static UserDto toDto(User user) {
        return new UserDto(user.getId(), user.getEmail(), user.getNickname());
    }

    public static UserDto empty(){
        return new UserDto(null, "", "");
    }
}
