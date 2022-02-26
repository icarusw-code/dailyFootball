package DailyFootball.demo.domain.game.repository;

import DailyFootball.demo.domain.game.domain.Game;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<Game, Long> {
}
