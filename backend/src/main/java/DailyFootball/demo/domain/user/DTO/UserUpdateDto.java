package DailyFootball.demo.domain.user.DTO;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserUpdateDto {

    private String nickname;
//    private String image;

    @Builder
    public UserUpdateDto(String nickname) {
        this.nickname = nickname;
    }

}
