package DailyFootball.demo.domain.articleComment.controller;

import DailyFootball.demo.domain.articleComment.DTO.ArticleCommentRequestDto;
import DailyFootball.demo.domain.articleComment.service.ArticleCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class ArticleCommentController {

    private final ArticleCommentService articleCommentService;

    /**
     * 댓글 조회
     */
    @GetMapping("/articleComments/{articleId}")
    public ResponseEntity readAll(Model model, @PathVariable Long articleId){
        model.addAttribute(articleCommentService.readAll(articleId));
        return ResponseEntity.status(HttpStatus.OK).body(model);
    }

    /**
     * 댓글 생성
     */
    @PostMapping("/articleComments")
    public ResponseEntity create(@RequestBody ArticleCommentRequestDto articleCommentRequestDto) throws Exception {
        articleCommentService.create(articleCommentRequestDto);
        return ResponseEntity.status(HttpStatus.OK).body("댓글 생성 완료");
    }

    /**
     * 댓글 삭제
     */
    @DeleteMapping("articleComments/{id}")
    public ResponseEntity delete(@PathVariable Long id){
        articleCommentService.delete(id);
        return ResponseEntity.status(HttpStatus.OK).body("댓글 삭제 완료");
    }

}
