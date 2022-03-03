package DailyFootball.demo.domain.article.DTO;

import DailyFootball.demo.domain.article.domain.Article;
import DailyFootball.demo.domain.user.domain.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@NoArgsConstructor
public class ArticleWriteResponseDto {

    private Long userId;
    private String title;
    private String content;
    // 이미지는 추후에


    @Builder
    public ArticleWriteResponseDto(Long userId, String title, String content) {
        this.userId = userId;
        this.title = title;
        this.content = content;
    }
    public Article toEntity(){
        return Article.builder()
                .title(title)
                .content(content)
                .build();
    }

}
