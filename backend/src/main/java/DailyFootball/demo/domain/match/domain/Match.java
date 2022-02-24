package DailyFootball.demo.domain.match.domain;

import DailyFootball.demo.domain.team.domain.Team;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "MATCH")
public class Match {

    @Id @GeneratedValue
    private int id;

    @Size(max = 40)
    private String name;

    private LocalDateTime date;

    private int localTeamScore;

    @OneToMany(mappedBy = "id")
    private List<Team> visitorTeamScore = new ArrayList<>();

    private int winTeamId;

    private int loseTeamId;

    private boolean draw;
}
