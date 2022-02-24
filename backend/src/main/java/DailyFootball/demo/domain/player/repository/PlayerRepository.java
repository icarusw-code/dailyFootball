package DailyFootball.demo.domain.player.repository;

import DailyFootball.demo.domain.player.domain.Player;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerRepository extends JpaRepository<Player, Long> {
}
