package DailyFootball.demo.global.jwt.repository;

import DailyFootball.demo.global.jwt.domain.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    Optional<RefreshToken> findByTokenKey(String tokenKey);

}
