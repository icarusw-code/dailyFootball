package DailyFootball.demo.domain.articleComment.service;

import DailyFootball.demo.domain.article.domain.Article;
import DailyFootball.demo.domain.article.repository.ArticleRepository;
import DailyFootball.demo.domain.articleComment.DTO.ArticleCommentDto;
import DailyFootball.demo.domain.articleComment.DTO.ArticleCommentRequestDto;
import DailyFootball.demo.domain.articleComment.domain.ArticleComment;
import DailyFootball.demo.domain.articleComment.repository.ArticleCommentRepository;
import DailyFootball.demo.domain.user.domain.User;
import DailyFootball.demo.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ArticleCommentService {

    private final ArticleCommentRepository articleCommentRepository;
    private final UserRepository userRepository;
    private final ArticleRepository articleRepository;

    public List<ArticleCommentDto> readAll(Long articleId){
        return ArticleCommentDto.toDtoList(
                articleCommentRepository.findAllWithUserAndParentByArticleIdOrderByParentIdAscNullsFirstArticleCommentIdAsc(articleId)
        );
    }

    // comment 엔티티로 변환하여 저장해줌
    @Transactional
    public void create(ArticleCommentRequestDto req){
        User user = userRepository.findById(req.getUserId()).orElseThrow(RuntimeException::new);
        Article article = articleRepository.findById(req.getArticleId()).orElseThrow(RuntimeException::new);
        ArticleComment parent = Optional.ofNullable(req.getParentId())
                .map(id -> articleCommentRepository.findById(id).orElseThrow(RuntimeException::new))
                .orElse(null);

        articleCommentRepository.save(new ArticleComment(req.getContent(), user, article, parent));
    }

    @Transactional
    public void delete(Long id){
        ArticleComment articleComment = articleCommentRepository.findById(id).orElseThrow(RuntimeException::new);
        articleComment.findDeletableComment().ifPresentOrElse(articleCommentRepository::delete, articleComment::delete);
    }
}
