package DailyFootball.demo.domain.likes.repository;

import DailyFootball.demo.domain.likes.domain.Likes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface LikesRepository extends JpaRepository<Likes, Long> {

    /**
     * 좋아요 추가
     */
    @Modifying
    @Query(value = "INSERT INTO likes(article_id, user_id) VALUES(:articleId, :userId)", nativeQuery = true)
    void likes(@Param("articleId") Long articleId, @Param("userId") Long userId);

    /**
     * 좋아요 카운트 추가
     */
    @Modifying
    @Query("update Article a set a.likesCount = a.likesCount + 1 where a.id = :id")
    int updateLikesCount(@Param("id") Long id);

    /**
     * 좋아요 취소
     */
    @Modifying
    @Query(value = "DELETE FROM likes WHERE article_id = :articleId AND user_id = :userId", nativeQuery = true)
    void unLikes(@Param("articleId") Long articleId, @Param("userId") Long userId);

    /**
     * 좋아요 카운트 제거
     */
    @Modifying
    @Query("update Article a set a.likesCount = a.likesCount - 1 where a.id = :id")
    int updateUnLikesCount(@Param("id") Long id);
}
