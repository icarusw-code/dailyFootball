package DailyFootball.demo.domain.article.DTO;

import DailyFootball.demo.domain.article.domain.ArticleImg;
import lombok.Getter;

@Getter
public class ArticleImgResponseDto {
    private Long fileId;

    public ArticleImgResponseDto(ArticleImg articleImg){
        this.fileId = articleImg.getId();
    }
}
