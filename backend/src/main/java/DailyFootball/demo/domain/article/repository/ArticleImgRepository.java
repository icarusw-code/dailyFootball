package DailyFootball.demo.domain.article.repository;

import DailyFootball.demo.domain.article.domain.ArticleImg;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArticleImgRepository extends JpaRepository<ArticleImg, Long> {

    List<ArticleImg> findAllByArticleId(Long articleId);
}
