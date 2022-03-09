package DailyFootball.demo.domain.follow.DTO;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class FollowDto {

    private String nickname;
    private String profileImg;
    private boolean follow;


    public void setUserInfo(String nickname, String profileImg) {
        this.nickname = nickname;
        this.profileImg = profileImg;
    }

    public void isFollow(boolean follow){
        this.follow = follow;
    }
}
