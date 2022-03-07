package DailyFootball.demo.domain.user.repository;

import DailyFootball.demo.domain.user.domain.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FollowRepository extends JpaRepository<Follow, Long> {

    Follow findFollowByFromUserIdAndToUserId(@Param("from_user_id") Long from_user_id, @Param("to_user_id") Long to_user_id);

    /**
     * 팔로우 추가
     */
    @Modifying
    @Query(value = "INSERT INTO FOLLOW(from_user_id, to_user_id) VALUES(:fromId, :toId)", nativeQuery = true)
    void follow(@Param("fromId") Long fromId, @Param("toId")Long toId);

    /**
     * 팔로우 삭제
     */
    @Modifying
    @Query(value = "DELETE from follow where from_user_id =:fromId and to_user_id =:toId", nativeQuery = true)
    void unFollow(@Param("fromId") Long fromId, @Param("toId") Long toId);

    /**
     * 팔로워 수 확인
     */
    @Query(value = "SELECT count(*) from follow where to_user_id =:userId", nativeQuery = true)
    int findFollowerCountById(@Param("userId") Long userId);

    /**
     * 팔로잉 확인
     */
    @Query(value = "SELECT count(*) from follow where from_user_id =:userId", nativeQuery = true)
    int findFollowingCountById(@Param("userId") Long userId);
}
