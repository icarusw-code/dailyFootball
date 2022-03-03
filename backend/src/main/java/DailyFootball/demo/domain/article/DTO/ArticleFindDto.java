package DailyFootball.demo.domain.article.DTO;

import DailyFootball.demo.domain.article.domain.Article;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ArticleFindDto {

    private Long id;
    private String title;
    private String content;
    private Long readCount;
    private Long likesCount;
    private Long userId;

    @Builder
    public ArticleFindDto(String title, String content, Long readCount, Long likesCount, Long userId) {

        this.title = title;
        this.content = content;
        this.readCount = readCount;
        this.likesCount = likesCount;
        this.userId = userId;
    }

    public void convertEntityToDto(Article article) {
        Article.builder()
                .title(title)
                .content(content)
                .readCount(readCount)
                .likesCount(likesCount)
                .build();

    }
}
