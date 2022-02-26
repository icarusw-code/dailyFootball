package DailyFootball.demo.domain.user.DTO;

import DailyFootball.demo.domain.user.domain.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserInfoDto {

    // 추후 내용 추가 예정
    private String email;
    private String nickname;

    @Builder
    public UserInfoDto(String email, String nickname){
        this.email = email;
        this.nickname = nickname;
    }

    public User toEntity(){
        return User.builder()
                .email(email)
                .nickname(nickname)
                .build();
    }
}
