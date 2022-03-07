package DailyFootball.demo.domain.user.repository;

import DailyFootball.demo.domain.user.DTO.UserUpdateDto;
import DailyFootball.demo.domain.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByNickname(String nickname);

    boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);

    User findUserByEmail(String email);

    User findUserById(Long toUserId);
}
