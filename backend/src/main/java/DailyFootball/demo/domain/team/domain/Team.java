package DailyFootball.demo.domain.team.domain;

import DailyFootball.demo.domain.match.domain.Match;

import javax.persistence.*;

@Entity
public class Team {

    @Id @GeneratedValue
    @ManyToOne(fetch = FetchType.LAZY)
    private Match id;
}
