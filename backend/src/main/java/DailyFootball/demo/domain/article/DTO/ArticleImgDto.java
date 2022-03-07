package DailyFootball.demo.domain.article.DTO;

import DailyFootball.demo.domain.article.domain.Article;
import DailyFootball.demo.domain.article.domain.ArticleImg;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class ArticleImgDto {

    private String articleImg;



    @Builder
    public ArticleImgDto(String articleImg){
        this.articleImg = articleImg;
    }

    public ArticleImg toUploadImg(String articleImg){
        return ArticleImg.builder()
                .articleImg(articleImg)
                .build();
    }

}
