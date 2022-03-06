package DailyFootball.demo.domain.article.repository;


import DailyFootball.demo.domain.article.domain.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


public interface ArticleRepository extends JpaRepository<Article, Long> {
    Page<Article> findAll(Pageable pageable);

    @Modifying
    @Query("update Article a set a.readCount = a.readCount + 1 where a.id = :id")
    int updateReadCount(@Param("id") Long id);
}
