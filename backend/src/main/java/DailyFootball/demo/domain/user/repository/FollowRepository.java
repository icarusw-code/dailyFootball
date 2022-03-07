package DailyFootball.demo.domain.user.repository;

import DailyFootball.demo.domain.user.domain.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FollowRepository extends JpaRepository<Follow, Long> {

    Follow findFollowByFromUserIdAndToUserId(@Param("from_user_id") Long from_user_id, @Param("to_user_id") Long to_user_id);

    @Modifying
    @Query(value = "INSERT INTO FOLLOW(from_user_id, to_user_id) VALUES(:fromId, :toId)", nativeQuery = true)
    void follow(@Param("fromId") Long fromId, @Param("toId")Long toId);

}
