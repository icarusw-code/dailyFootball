package DailyFootball.demo.domain.community.domain;

import DailyFootball.demo.domain.base.doamin.BaseTimeEntity;
import DailyFootball.demo.domain.game.domain.Game;
import DailyFootball.demo.domain.playercCommunity.domain.PlayerCommunity;
import DailyFootball.demo.domain.user.domain.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "COMMUNITY")
public class Community extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 20)
    private String title;

    private String content;

    @Column(name = "like_count" )
    private Integer likeCount;

    @Column(name = "player_id")
    private Integer playerId;

    @ManyToOne(targetEntity = User.class,fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    User user;

    @ManyToOne(targetEntity = Game.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id")
    Game game;

    @OneToMany(mappedBy = "community", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    List<PlayerCommunity> playerCommunities = new ArrayList<>();
}
