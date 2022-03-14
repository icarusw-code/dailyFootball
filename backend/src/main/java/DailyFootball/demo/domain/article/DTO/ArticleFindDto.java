package DailyFootball.demo.domain.article.DTO;

import DailyFootball.demo.domain.article.domain.Article;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
public class ArticleFindDto {

    private Long id;
    private String title;
    private String content;
    private int readCount;
    private int likesCount;
    private Long userId;
    private LocalDateTime modifiedDateTime;

    private List<Long> articleImgId; // 첨부 파일 id 목록

    @Builder
    public ArticleFindDto(Article article, List<Long> articleImgId) {

        this.title = article.getTitle();
        this.content = article.getContent();
        this.readCount = article.getReadCount();
        this.likesCount = article.getLikesCount();
        this.userId = article.getUser().getId();
        this.modifiedDateTime = article.getModifiedDate();
        this.articleImgId = articleImgId;

    }

    public void convertEntityToDto(Article article) {
        this.id = article.getId();
        this.title = article.getTitle();
        this.content = article.getContent();
        this.readCount = article.getReadCount();
        this.likesCount = article.getLikesCount();
        this.userId = article.getUser().getId();
        this.modifiedDateTime = article.getModifiedDate();
    }

}
