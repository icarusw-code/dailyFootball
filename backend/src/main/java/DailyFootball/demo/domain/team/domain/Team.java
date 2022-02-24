package DailyFootball.demo.domain.team.domain;

import DailyFootball.demo.domain.match.domain.Match;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
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

    @ManyToOne(targetEntity = Match.class, fetch = FetchType.LAZY)
    Match match;
}
