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

    private String originFileName;



    @Builder
    public ArticleImgDto(String articleImg, String originFileName){
        this.originFileName = originFileName;
        this.articleImg = articleImg;
    }


}
