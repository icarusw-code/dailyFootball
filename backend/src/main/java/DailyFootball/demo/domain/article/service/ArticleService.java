package DailyFootball.demo.domain.article.service;

import DailyFootball.demo.domain.article.DTO.ArticleWriteResponseDto;
import DailyFootball.demo.domain.article.domain.Article;
import DailyFootball.demo.domain.article.repository.ArticleRepository;
import DailyFootball.demo.domain.user.domain.User;
import DailyFootball.demo.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        Article article = articleWriteResponseDto.toEntity();
        article.mapUser(user);
        // title, content 저장
        return articleRepository.save(article).getId();


//        User user = userRepository.findById(userId).get();
//        return articleRepository.save(articleWriteDto.toWrite(user)).getId();
    }
}
