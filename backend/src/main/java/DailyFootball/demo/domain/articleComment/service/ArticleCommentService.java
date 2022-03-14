package DailyFootball.demo.domain.articleComment.service;

import DailyFootball.demo.domain.article.repository.ArticleRepository;
import DailyFootball.demo.domain.articleComment.DTO.ArticleCommentDto;
import DailyFootball.demo.domain.articleComment.DTO.ArticleCommentReadConditionDto;
import DailyFootball.demo.domain.articleComment.DTO.ArticleCommentRequestDto;
import DailyFootball.demo.domain.articleComment.domain.ArticleComment;
import DailyFootball.demo.domain.articleComment.repository.ArticleCommentRepository;
import DailyFootball.demo.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ArticleCommentService {

    private final ArticleCommentRepository articleCommentRepository;
    private final UserRepository userRepository;
    private final ArticleRepository articleRepository;

    public List<ArticleCommentDto> readAll(ArticleCommentReadConditionDto cond){
        return ArticleCommentDto.toDtoList(
                articleCommentRepository.findAllWithUserAndParentByArticleIdOrderByParentIdAscNullsFirstArticleCommentIdAsc(cond.getArticleId())
        );
    }

    // comment 엔티티로 변환하여 저장해줌
    @Transactional
    public void create(ArticleCommentRequestDto req){
        articleCommentRepository.save(ArticleCommentRequestDto.toEntity(req, userRepository, articleRepository, articleCommentRepository));
    }

    @Transactional
    public void delete(Long id){
        ArticleComment articleComment = articleCommentRepository.findById(id).orElseThrow(RuntimeException::new);
        articleComment.findDeletableComment().ifPresentOrElse(articleCommentRepository::delete, articleComment::delete);
    }
}
