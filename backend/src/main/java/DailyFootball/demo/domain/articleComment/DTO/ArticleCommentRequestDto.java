package DailyFootball.demo.domain.articleComment.DTO;

import DailyFootball.demo.domain.article.repository.ArticleRepository;
import DailyFootball.demo.domain.articleComment.domain.ArticleComment;
import DailyFootball.demo.domain.articleComment.repository.ArticleCommentRepository;
import DailyFootball.demo.domain.user.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Optional;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ArticleCommentRequestDto {

    private String content;
    private Long articleId;
    private Long userId;
    private Long parentId;

    public static ArticleComment toEntity(ArticleCommentRequestDto req, UserRepository userRepository, ArticleRepository articleRepository, ArticleCommentRepository articleCommentRepository){
        return new ArticleComment(
                req.content,
                userRepository.findById(req.userId).orElseThrow(RuntimeException::new),
                articleRepository.findById(req.articleId).orElseThrow(RuntimeException::new),
                Optional.ofNullable(req.parentId)
                        .map(id -> articleCommentRepository.findById(id).orElseThrow(RuntimeException::new))
                        .orElse(null)
        );
    }
}
