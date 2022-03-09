package DailyFootball.demo.domain.follow.service;

import DailyFootball.demo.domain.follow.DTO.FollowDto;
import DailyFootball.demo.domain.follow.repository.FollowJpaRepository;
import DailyFootball.demo.domain.follow.repository.FollowRepository;
import DailyFootball.demo.domain.user.repository.UserRepository;
import DailyFootball.demo.global.util.CustomApiException;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static DailyFootball.demo.domain.follow.domain.QFollow.*;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class FollowService {

    private final UserRepository userRepository;
    private final FollowRepository followRepository;
    private final FollowJpaRepository followJpaRepository;

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
    public List<FollowDto> getFollower(Long userId, Long loginId){

        ArrayList<FollowDto> list = new ArrayList<>();
        List<Long> followerList = followJpaRepository.followerList(userId);

        // id: 팔로우한 user들 아이디(from_user_id)
        for (Long fromId : followerList) {
            // Dto 초기화 꼭 시키기, 안그러면 마지막값으로 다 바뀜
            FollowDto followDto = new FollowDto();
            followDto.setUserInfo(userRepository.findUserById(fromId).getNickname(), userRepository.findUserById(fromId).getProfileImg());
            // 로그인한 유저가 팔로우 했는지 여부 확인
            followDto.isFollow(followRepository.findFollowByFromUserIdAndToUserId(loginId ,fromId) != null);
            list.add(followDto);
        }
        return list;

    }

    /**
     * 팔로잉 정보 가져오기
     * userId가 fromUser 인 팔로잉 정보
     */
    @Transactional
    public List<FollowDto> getFollowing(Long userId, Long loginId) {

        ArrayList<FollowDto> list = new ArrayList<>();
        List<Long> followingList = followJpaRepository.followingList(userId);

        // id: 팔로잉 한 user 아이디(to_user_id)
        for (Long toId : followingList) {
            FollowDto followDto = new FollowDto();
            followDto.setUserInfo(userRepository.findUserById(toId).getNickname(), userRepository.findUserById(toId).getProfileImg());
            followDto.isFollow(followRepository.findFollowByFromUserIdAndToUserId(loginId, toId) != null);
            list.add(followDto);
        }
        return list;
    }
}
