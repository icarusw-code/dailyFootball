package DailyFootball.demo.domain.user.service;

import DailyFootball.demo.domain.user.repository.FollowRepository;
import DailyFootball.demo.domain.user.repository.UserRepository;
import DailyFootball.demo.global.util.CustomApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class FollowService {

    private final FollowRepository followRepository;

    /**
     * 팔로우 정보를 저장
     */
    @Transactional
    public void follow(Long fromUserId, Long toUserId) {
        if(followRepository.findFollowByFromUserIdAndToUserId(fromUserId, toUserId) != null) throw new CustomApiException("이미 팔로우 하셨습니다.");
        followRepository.follow(fromUserId, toUserId);
    }

    /**
     * 팔로우 정보 삭제
     */
    @Transactional
    public void unFollow(Long fromUserId, Long toUserId) {
        followRepository.unFollow(fromUserId, toUserId);
    }
}
