package DailyFootball.demo.domain.user.DTO;

import DailyFootball.demo.domain.user.domain.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserUpdateDto {

    private String nickname;
//    private String profileImg;

    @Builder
    public UserUpdateDto(String nickname) {
        this.nickname = nickname;
//        this.profileImg = profileImg;
    }

    public User toUser(){
        return User.builder()
                .nickname(nickname)
//                .profileImg(profileImg)
                .build();
    }

}
