package DailyFootball.demo.domain.article.DTO;

import DailyFootball.demo.domain.article.domain.Article;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

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

    @Builder
    public ArticleFindDto(String title, String content, int readCount, int likesCount, Long userId, LocalDateTime modifiedDateTime) {

        this.title = title;
        this.content = content;
        this.readCount = readCount;
        this.likesCount = likesCount;
        this.userId = userId;
        this.modifiedDateTime = modifiedDateTime;
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
