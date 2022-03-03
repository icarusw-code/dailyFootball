package DailyFootball.demo.domain.article.DTO;

import DailyFootball.demo.domain.article.domain.Article;
import DailyFootball.demo.domain.user.domain.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ArticleWriteResponseDto {

    private String title;
    private String content;
    // 이미지는 추후에
    private Long userId;

    public Article toWrite(Long userId){
        return Article.builder()
                .title(title)
                .content(content)
                .userId(userId)
                .build();
    }

}
