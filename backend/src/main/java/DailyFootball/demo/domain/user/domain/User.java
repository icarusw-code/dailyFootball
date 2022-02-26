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

    @Column(nullable = false, length = 20)
    private String password;

    @Column(nullable = false, length = 20)
    private String nickname;

    @Builder
    public User(String email, String password, String nickname, String role) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
    }

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    List<Score> scores = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    List<Community> communities = new ArrayList<>();

}
