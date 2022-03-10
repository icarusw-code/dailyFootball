package DailyFootball.demo.domain.likes.service;

import DailyFootball.demo.domain.likes.repository.LikesRepository;
import DailyFootball.demo.global.util.CustomApiException;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class LikesService {

    private final LikesRepository likesRepository;

    /**
     * 좋아요 클릭
     */
    @Transactional
    public void likes(Long articleId, Long loginId) {
        try {
            likesRepository.likes(articleId, loginId);
            likesRepository.updateLikesCount(articleId);
        } catch (Exception e) {
            throw new CustomApiException("이미 좋아요 한 게시글 입니다.");
        }
    }
}
