package DailyFootball.demo.domain.article.DTO;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class ArticleFileDto {
    private String title;
    private String content;
    private List<MultipartFile> files;
}
