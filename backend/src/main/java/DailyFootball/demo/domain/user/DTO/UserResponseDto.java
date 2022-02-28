package DailyFootball.demo.domain.user.DTO;

import DailyFootball.demo.domain.user.domain.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
// 바디에 반환할 값을 정해줌
public class UserResponseDto {
//    private String email;
    private Long id;

    public static UserResponseDto of(User user){
        return new UserResponseDto(user.getId());
    }
}
