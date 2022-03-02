package DailyFootball.demo.domain.user.domain;


import DailyFootball.demo.domain.base.doamin.BaseTimeEntity;
import DailyFootball.demo.domain.community.domain.Community;
import DailyFootball.demo.domain.score.domain.Score;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.TimeZone;

@Entity
@Getter @Setter
@NoArgsConstructor
@Table(name = "USER")
public class User extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 40)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, length = 20)
    private String nickname;

    @Enumerated(EnumType.STRING)
    private Authority authority;

    private String profileImg;

    @Builder
    public User(String email, String password, String nickname, Authority authority, String profileImg) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.authority = authority;
        this.profileImg = profileImg;
    }

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    List<Score> scores = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    List<Community> communities = new ArrayList<>();


    // 회원 정보 업데이트
    // !!이미지 필요
    public void update(String nickname){
        this.nickname = nickname;
//        this.profileImg = profileImg;
    }

    public String passwordUpdate(String password){
        this.password = password;
        return password;
    }

    public void profileUrl(String profileImg){
        this.profileImg = profileImg;
    }



}
