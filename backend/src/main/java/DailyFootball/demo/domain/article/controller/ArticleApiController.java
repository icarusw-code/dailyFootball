package DailyFootball.demo.domain.article.controller;

import DailyFootball.demo.domain.article.DTO.ArticleWriteRequestDto;
import DailyFootball.demo.domain.article.DTO.ArticleWriteResponseDto;
import DailyFootball.demo.domain.article.service.ArticleService;
import DailyFootball.demo.domain.user.service.UserService;
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
    private final UserService userService;

    // 글 생성
    @PostMapping("/article/{userId}/write")
    public ResponseEntity write(@PathVariable("userId") Long userId,
                                @RequestBody ArticleWriteRequestDto articleWriteRequestDto,
                                ArticleWriteResponseDto articleWriteResponseDto){
        Map<String, Object> responseMap = new HashMap<>();
        Long articleId = articleService.write(articleWriteResponseDto, userId);
        responseMap.put("articleId", articleId);
        return ResponseEntity.status(HttpStatus.OK).body(responseMap);
//        Long articleId = articleService.write(articleWriteDto, userId);
//        responseMap.put("articleId", articleId);
//        return ResponseEntity.status(HttpStatus.OK).body(responseMap);
    }
}
