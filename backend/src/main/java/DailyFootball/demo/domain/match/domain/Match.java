package DailyFootball.demo.domain.match.domain;

import DailyFootball.demo.domain.team.domain.Team;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "MATCH")
public class Match {

    @Id @GeneratedValue
    private Long id;

    @Column(nullable = false, length = 40)
    private String name;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime date;

    @Column(name = "local_team_score")
    private int localTeamScore;

    @OneToMany(mappedBy = "match", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    List<Team> visitorTeamScores = new ArrayList<>();

    @Column(name = "win_team_id")
    private int winTeamId;

    @Column(name = "lose_team_id")
    private int loseTeamId;

    private boolean draw;
}
