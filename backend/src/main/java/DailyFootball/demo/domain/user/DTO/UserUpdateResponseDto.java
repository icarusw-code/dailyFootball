package DailyFootball.demo.domain.user.DTO;

import DailyFootball.demo.domain.user.domain.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserUpdateResponseDto {

    private String profileImg;

    @Builder
    public UserUpdateResponseDto(String nickname, String profileImg) {
        this.profileImg = profileImg;
    }

    public User toUpdateProfile(String profileImg){
        return User.builder()
                .profileImg(profileImg)
                .build();
    }
}
