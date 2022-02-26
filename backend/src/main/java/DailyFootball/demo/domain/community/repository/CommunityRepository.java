package DailyFootball.demo.domain.community.repository;

import DailyFootball.demo.domain.community.domain.Community;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunityRepository extends JpaRepository<Community, Long> {
}
