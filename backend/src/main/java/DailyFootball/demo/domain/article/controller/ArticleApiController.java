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
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class ArticleApiController {

    private final ArticleService articleService;

    /**
     * 글 생성
     */
    @PostMapping("/article/write")
    public ResponseEntity createArticle(@RequestPart ArticleWriteResponseDto articleWriteResponseDto,
                                        @RequestPart(value = "file") List<MultipartFile> files
                                        ) throws Exception {
        Map<String, Object> responseMap = new HashMap<>();
        Long articleId = articleService.createArticle(articleWriteResponseDto, files);
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

    /**
     * 글 상세보기
     * articleFindDto를 재활용 했는데, id값이 같이 넘어오는거 따로 Dto를 만들어서 해결할지, 그대로 둘지 결정 필요
     */
    @GetMapping("article/{articleId}")
    public ResponseEntity<Map<String, Object>> viewArticle(@PathVariable("articleId") Long articleId){
        Map<String, Object> responseMap = new HashMap<>();
        articleService.updateReadCount(articleId);
        Optional<Article> articleInfos = articleService.findArticleInfo(articleId);
        List<ArticleFindDto> articleFindDtoList = articleInfos.stream()
                .map(m -> new ArticleFindDto(m.getTitle(), m.getContent(), m.getReadCount(), m.getLikesCount(), m.getUser().getId(), m.getModifiedDate()))
                .collect(Collectors.toList());

        responseMap.put("articleInfo", articleFindDtoList);
        return ResponseEntity.status(HttpStatus.OK).body(responseMap);
    }


}
