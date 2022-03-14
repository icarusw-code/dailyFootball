package DailyFootball.demo.domain.articleComment.repository;

import DailyFootball.demo.domain.articleComment.domain.ArticleComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ArticleCommentRepository extends JpaRepository<ArticleComment, Long> {

    // 댓글의 id로 조회하면서 자신의 부모와 fetch join 결과를 반환
    @Modifying
    @Query("select c from ArticleComment c left join fetch c.parent where c.id =:id")
    Optional<ArticleComment> findWithParentById(@Param("id") Long id);

    // 모든 댓글 목록 조회
    // 부모의 아이디로 오름차순 정렬, NULL 이 우선, 그 다음으로 자신의 아이디로 오름차순 정렬 조회
    @Modifying
    @Query("select c from ArticleComment c join fetch c.user left join fetch c.parent where c.article.id =:articleId order by c.parent.id asc nulls first, c.id asc")
    List<ArticleComment> findAllWithUserAndParentByArticleIdOrderByParentIdAscNullsFirstArticleCommentIdAsc(@Param("articleId") Long articleId);

}
