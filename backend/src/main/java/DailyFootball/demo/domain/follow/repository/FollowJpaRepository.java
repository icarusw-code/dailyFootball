package DailyFootball.demo.domain.follow.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

import static DailyFootball.demo.domain.follow.domain.QFollow.follow;

@Repository
public class FollowJpaRepository {

    private final EntityManager em;
    private final JPAQueryFactory queryFactory;

    public FollowJpaRepository(EntityManager em){
        this.em = em;
        this.queryFactory = new JPAQueryFactory(em);
    }

    /**
     * 팔로워 리스트를 가져옴
     */
    public List<Long> followerList(Long userId) {
        return queryFactory
                .select(follow.fromUser.id)
                .from(follow)
                .where(follow.toUser.id.eq(userId))
                .fetch();
    }

    /**
     * 팔로잉 리스트를 가져옴
     */
    public List<Long> followingList(Long userId) {
        return queryFactory
                .select(follow.toUser.id)
                .from(follow)
                .where(follow.fromUser.id.eq(userId))
                .fetch();
    }
}
