package DailyFootball.demo.domain.user.DTO;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserImgDto {

    private String profileImg;

    @Builder
    public UserImgDto(String profileImg) {
        this.profileImg = profileImg;
    }
}
