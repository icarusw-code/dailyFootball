package DailyFootball.demo.domain.article.service;

import DailyFootball.demo.domain.article.DTO.ArticleWriteResponseDto;
import DailyFootball.demo.domain.article.repository.ArticleRepository;
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
    public Long write(ArticleWriteResponseDto articleWriteDto, Long userId){
        // title, content 저장
        return articleRepository.save(articleWriteDto.toWrite(userId)).getId();


//        User user = userRepository.findById(userId).get();
//        return articleRepository.save(articleWriteDto.toWrite(user)).getId();
    }
}
