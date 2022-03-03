package DailyFootball.demo.domain.article.DTO;

import DailyFootball.demo.domain.article.domain.Article;
import DailyFootball.demo.domain.user.domain.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ArticleWriteRequestDto {

    private String title;
    private String content;
    // 이미지는 추후에

}
