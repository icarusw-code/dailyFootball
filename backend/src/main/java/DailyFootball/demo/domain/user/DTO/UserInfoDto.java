package DailyFootball.demo.domain.user.DTO;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserInfoDto {

    private String email;
    private String nickname;
    private String profileImg;
    // 팔로우 부분 추가
    private boolean follow; // 현재 로그인한 사용자가 팔로우 한 상태인지 확인
    private int userFollowerCount;
    private int userFollowingCount;


    @Builder
    public UserInfoDto(String email, String nickname, String profileImg, boolean follow, int userFollowerCount, int userFollowingCount){
        this.email = email;
        this.nickname = nickname;
        this.profileImg = profileImg;
        this.follow = follow;
        this.userFollowerCount = userFollowerCount;
        this.userFollowingCount = userFollowingCount;
    }

    public void toUserInfo(String email, String nickname, String profileImg){
        this.email = email;
        this.nickname = nickname;
        this.profileImg = profileImg;
    }

    public void isFollow(boolean follow){
        this.follow = follow;
    }

    public void toFollowCount(int userFollowerCount, int userFollowingCount) {
        this.userFollowerCount = userFollowerCount;
        this.userFollowingCount = userFollowingCount;

    }
}
