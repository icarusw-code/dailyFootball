package DailyFootball.demo.domain.article.DTO;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ArticleUpdateRequestDto {

    private String title;
    private String content;

    @Builder
    public ArticleUpdateRequestDto(String title, String content) {
        this.title = title;
        this.content = content;
    }
}
