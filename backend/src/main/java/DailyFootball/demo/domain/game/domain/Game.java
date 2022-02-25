package DailyFootball.demo.domain.game.domain;

import DailyFootball.demo.domain.community.domain.Community;
import DailyFootball.demo.domain.team.domain.Team;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "GAME")
public class Game {

    @Id @GeneratedValue
    private Long id;

    @Column(nullable = false, length = 40)
    private String name;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime date;

    @Column(name = "local_team_score")
    private Integer localTeamScore;

    @Column(name = "visitor_team_score")
    private Integer visitorTeamScore;

    @Column(name = "win_team_id")
    private Integer winTeamId;


    @Column(name = "lose_team_id")
    private Integer loseTeamId;

    @Column
    private boolean draw;

    @OneToMany(mappedBy = "game", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    List<Team> visitorTeamScores = new ArrayList<>();

    @OneToMany(mappedBy = "game", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    List<Community> communities = new ArrayList<>();
}
