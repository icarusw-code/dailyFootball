package DailyFootball.demo.domain.article.service;

import DailyFootball.demo.domain.article.DTO.ArticleFindDto;
import DailyFootball.demo.domain.article.DTO.ArticleWriteResponseDto;
import DailyFootball.demo.domain.article.domain.Article;
import DailyFootball.demo.domain.article.repository.ArticleRepository;
import DailyFootball.demo.domain.user.domain.User;
import DailyFootball.demo.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.function.Function;

@Service
@Transactional
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;

    /**
     * 글 생성
     */
    @Transactional
    public Long createArticle(ArticleWriteResponseDto articleWriteResponseDto){
        User user = userRepository.findById(articleWriteResponseDto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("해당하는 유저가 존재하지 않습니다. UserId = " + articleWriteResponseDto.getUserId()));
        // title, content 저장
        Article article = articleWriteResponseDto.toEntity();
        // user 저장
        article.mapUser(user);
        return articleRepository.save(article).getId();

    }

    /**
     * 전체 글 목록 조회
     */
    @Transactional
    public Page<ArticleFindDto> findAllArticle(int page) {
        // Pageable의 page는 0부터 시작하기 때문에 화면에서 올라온 값에서 1을 뺀다.
        // 화면의 Pagenation은 1부터 시작
        int pageNumber = page - 1;
        Pageable pageable = PageRequest.of(pageNumber, 10);
        Page<Article> article = articleRepository.findAll(pageable);

        Page<ArticleFindDto> articleFindDto = article.map(new Function<Article, ArticleFindDto>() {
            @Override
            public ArticleFindDto apply(Article article) {
                ArticleFindDto dto = new ArticleFindDto();
                dto.convertEntityToDto(article);
                return dto;
            }
        });
        return articleFindDto;
    }
}
