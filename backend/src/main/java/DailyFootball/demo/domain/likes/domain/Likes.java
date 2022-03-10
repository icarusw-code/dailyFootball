package DailyFootball.demo.domain.likes.domain;

import DailyFootball.demo.domain.article.domain.Article;
import DailyFootball.demo.domain.user.domain.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "LIKES")
public class Likes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id")
    private Article article;

//    @JsonIgnoreProperties({"articles"})
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Builder
    public Likes(Article article, User user) {
        this.article = article;
        this.user = user;
    }
}
