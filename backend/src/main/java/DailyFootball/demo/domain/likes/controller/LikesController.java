package DailyFootball.demo.domain.likes.controller;

import DailyFootball.demo.domain.likes.service.LikesService;
import DailyFootball.demo.domain.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class LikesController {

    private final LikesService likesService;

    /**
     * 좋아요 클릭
     */
    @PostMapping("/article/{articleId}/likes")
    public ResponseEntity likes(Model model, @PathVariable("articleId")Long articleId, @RequestParam Long loginId){
        likesService.likes(articleId, loginId);
        model.addAttribute("articleId", articleId);
        model.addAttribute("userId", loginId);
        return ResponseEntity.status(HttpStatus.OK).body(model);
    }

}
