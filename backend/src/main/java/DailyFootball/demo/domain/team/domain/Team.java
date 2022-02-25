package DailyFootball.demo.domain.team.domain;

import DailyFootball.demo.domain.game.domain.Game;
import DailyFootball.demo.domain.player.domain.Player;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "TEAM")
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 40)
    private String name;

    @Column(nullable = false, length = 20)
    private String leagueName;

    @Column(nullable = false, length = 20)
    private String leagueNation;

    @Column(nullable = false, length = 20)
    private String formation;

    @OneToMany(mappedBy = "team", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    List<Player> players = new ArrayList<>();

    @ManyToOne(targetEntity = Game.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id")
    Game game;
}
