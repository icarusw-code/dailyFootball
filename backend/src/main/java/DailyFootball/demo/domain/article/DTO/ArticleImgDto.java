package DailyFootball.demo.domain.article.DTO;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
