package DailyFootball.demo.domain.user.repository;

import DailyFootball.demo.domain.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByNickname(String nickname);

    boolean existsByEmail(String email);

    List<User> findByEmail(String email);
}
