package DailyFootball.demo.domain.article.repository;


import DailyFootball.demo.domain.article.domain.Article;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, Long> {
}
