package DailyFootball.demo.domain.article.domain;

import DailyFootball.demo.domain.user.domain.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "ARTICLE_IMG")
public class ArticleImg {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String articleImg; // 파일 저장 경로

    private String originFileName;

    @ManyToOne(targetEntity = Article.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id")
    Article article;

    @Builder
    public ArticleImg(String articleImg, String originFileName) {
        this.originFileName = originFileName;
        this.articleImg = articleImg;
    }

    public void mapArticle(Article article){this.article = article;}

    @Builder
    public void update(Article article){
        this.article = article;
    }

}
