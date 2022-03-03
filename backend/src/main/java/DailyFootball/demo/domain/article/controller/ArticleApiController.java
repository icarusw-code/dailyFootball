package DailyFootball.demo.domain.article.controller;

import DailyFootball.demo.domain.article.DTO.ArticleWriteResponseDto;
import DailyFootball.demo.domain.article.service.ArticleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class ArticleApiController {

    private final ArticleService articleService;

    /**
     * 글 생성
     */
    @PostMapping("/article/write")
    public ResponseEntity createArticle(@RequestBody ArticleWriteResponseDto articleWriteResponseDto){
        Map<String, Object> responseMap = new HashMap<>();
        Long articleId = articleService.createArticle(articleWriteResponseDto);
        responseMap.put("articleId", articleId);
        return ResponseEntity.status(HttpStatus.OK).body(responseMap);
    }
}
