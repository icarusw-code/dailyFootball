package DailyFootball.demo.domain.playercCommunity.domain;

import DailyFootball.demo.domain.community.domain.Community;
import DailyFootball.demo.domain.player.domain.Player;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Table(name = "PLAYER_COMMUNITY")
public class PlayerCommunity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(targetEntity = Community.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "community_id", nullable = false)
    Community community;

    @ManyToOne(targetEntity = Player.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "player_id", nullable = false)
    Player player;
}
