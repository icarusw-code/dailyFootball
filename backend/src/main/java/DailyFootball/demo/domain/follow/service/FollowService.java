package DailyFootball.demo.domain.follow.service;

import DailyFootball.demo.domain.follow.DTO.FollowDto;
import DailyFootball.demo.domain.follow.domain.QFollow;
import DailyFootball.demo.domain.follow.repository.FollowRepository;
import DailyFootball.demo.domain.user.DTO.UserInfoDto;
import DailyFootball.demo.domain.user.domain.User;
import DailyFootball.demo.domain.user.repository.UserRepository;
import DailyFootball.demo.global.util.CustomApiException;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static DailyFootball.demo.domain.follow.domain.QFollow.*;
import static DailyFootball.demo.domain.user.domain.QUser.*;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class FollowService {

    private final UserRepository userRepository;
    private final FollowRepository followRepository;
    private final EntityManager em;
    JPAQueryFactory queryFactory;


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

    /**
     * 팔로워 정보 가져오기
     * userId를 toUser로 가지는 팔로워의 정보
     */
    @Transactional
    public List<FollowDto> getFollower(Long userId, Long loginId) {
        FollowDto followDto = new FollowDto();
        ArrayList<FollowDto> list = new ArrayList<>();
        List<Long> followerList = queryFactory
                .select(follow.fromUser.id)
                .from(follow)
                .where(follow.toUser.id.eq(userId))
                .fetch();
        // id: 팔로우한 user들 아이디(from_user_id)
        for (Long id : followerList) {
            log.info(String.valueOf(id));
            followDto.setUserInfo(userRepository.findUserById(id).getNickname(), userRepository.findUserById(id).getProfileImg());
            // 로그인한 유저가 팔로우 했는지 여부 확인
            followDto.isFollow(followRepository.findFollowByFromUserIdAndToUserId(loginId ,id) != null);
            list.add(followDto);
            if(list.isEmpty()) throw new RuntimeException("아무도 " + userId +" 를 팔로워 하지 않았습니다.");
        }
        return list;

    }

}
