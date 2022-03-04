package DailyFootball.demo.domain.article.controller;

import DailyFootball.demo.domain.article.DTO.ArticleFindDto;
import DailyFootball.demo.domain.article.DTO.ArticleWriteResponseDto;
import DailyFootball.demo.domain.article.domain.Article;
import DailyFootball.demo.domain.article.repository.ArticleRepository;
import DailyFootball.demo.domain.article.service.ArticleService;
import DailyFootball.demo.global.util.PageUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
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

    /**
     * 글 전체 조회(목록)
     */
    @GetMapping("/article")
    public ResponseEntity getArticle(@RequestParam("page") int page, ModelMap model){
        Page<ArticleFindDto> articles = articleService.findAllArticle(page);
        Pageable pageable = articles.getPageable();
        model.addAttribute("page", PageUtils.getPages(pageable, articles.getTotalPages()));
        model.addAttribute("articles", articles);
        return ResponseEntity.status(HttpStatus.OK).body(model);
    }
}
