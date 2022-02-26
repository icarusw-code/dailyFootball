package DailyFootball.demo.domain.team.repository;

import DailyFootball.demo.domain.team.domain.Team;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepository extends JpaRepository<Team, Long> {

}
