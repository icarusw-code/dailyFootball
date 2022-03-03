package DailyFootball.demo.domain.article.domain;

import DailyFootball.demo.domain.base.doamin.BaseTimeEntity;
import DailyFootball.demo.domain.user.domain.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
@Getter
@NoArgsConstructor
@Table(name = "ARTICLE")
public class Article extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column(name = "read_count")
    private Long readCount;

    @Column(name = "likes_count")
    private Long likesCount;

    @PrePersist
    public void initializer() {
        readCount = 0L;
        likesCount = 0L;
    }


    @OneToMany(mappedBy = "article", cascade = CascadeType.PERSIST, orphanRemoval = true)
    private List<ArticleImg> articleImgs = new ArrayList<>();

    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    User user;

    public void mapUser(User user) {
        this.user = user;
    }

    @Builder
    public Article(User user, String title, String content, Long readCount, Long likesCount) {
        this.user = user;
        this.title = title;
        this.content = content;
        this.readCount = readCount;
        this.likesCount = likesCount;
    }

    public void userSave(Long userId){


    }

}
