package DailyFootball.demo.domain.player.domain;

import DailyFootball.demo.domain.playercCommunity.domain.PlayerCommunity;
import DailyFootball.demo.domain.score.domain.Score;
import DailyFootball.demo.domain.team.domain.Team;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
@Getter
@NoArgsConstructor
@Table(name = "PLAYER")
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 40)
    private String name;

    @Column
    private Integer position;

    @Column
    private Integer backNumber;

    @ManyToOne(targetEntity = Team.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id", nullable = false)
    Team team;

    @OneToMany(mappedBy = "player", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    List<Score> scores = new ArrayList<>();

    @OneToMany(mappedBy = "player", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    List<PlayerCommunity> playerCommunities = new ArrayList<>();




}
