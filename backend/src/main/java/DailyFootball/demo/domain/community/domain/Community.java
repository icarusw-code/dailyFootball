package DailyFootball.demo.domain.community.domain;

import DailyFootball.demo.domain.match.domain.Match;
import DailyFootball.demo.domain.playercCommunity.domain.PlayerCommunity;
import DailyFootball.demo.domain.user.domain.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "COMMUNITY")
public class Community {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(targetEntity = User.class,fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false, length = 20)
    private String title;

    private String content;

    @Column(name = "like_count" )
    private int likeCount;

    @Column(name = "register_date")
    private LocalDateTime registerDate;

    @ManyToOne(targetEntity = Match.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "match_id")
    private Match match;

    @OneToMany(mappedBy = "community", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    List<PlayerCommunity> playerCommunities = new ArrayList<>();
}
