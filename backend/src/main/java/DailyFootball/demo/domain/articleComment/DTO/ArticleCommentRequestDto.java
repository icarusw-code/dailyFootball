package DailyFootball.demo.domain.articleComment.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ArticleCommentRequestDto {

    private String content;
    private Long articleId;
    private Long userId;
    private Long parentId;


}
