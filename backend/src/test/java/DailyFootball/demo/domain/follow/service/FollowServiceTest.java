package DailyFootball.demo.domain.follow.service;

import DailyFootball.demo.domain.user.domain.QUser;
import DailyFootball.demo.domain.user.domain.User;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import java.util.List;

import static DailyFootball.demo.domain.follow.domain.QFollow.follow;
import static DailyFootball.demo.domain.user.domain.QUser.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class FollowServiceTest {

    @PersistenceContext
    EntityManager em;

    JPAQueryFactory queryFactory;

    @BeforeEach
    public void before() {
        queryFactory = new JPAQueryFactory(em);
    }

    @Test
    void getFollower() {
        Long userId = 1L;

        List<Long> followerList = queryFactory
                .select(follow.fromUser.id)
                .from(follow)
                .where(follow.toUser.id.eq(userId))
                .fetch();

        System.out.println("followerList = " + followerList);
    }


}







