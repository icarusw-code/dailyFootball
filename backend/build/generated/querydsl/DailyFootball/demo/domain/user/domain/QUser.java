package DailyFootball.demo.domain.user.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = 654506617L;

    public static final QUser user = new QUser("user");

    public final DailyFootball.demo.domain.base.doamin.QBaseTimeEntity _super = new DailyFootball.demo.domain.base.doamin.QBaseTimeEntity(this);

    public final ListPath<DailyFootball.demo.domain.article.domain.Article, DailyFootball.demo.domain.article.domain.QArticle> articles = this.<DailyFootball.demo.domain.article.domain.Article, DailyFootball.demo.domain.article.domain.QArticle>createList("articles", DailyFootball.demo.domain.article.domain.Article.class, DailyFootball.demo.domain.article.domain.QArticle.class, PathInits.DIRECT2);

    public final EnumPath<Authority> authority = createEnum("authority", Authority.class);

    public final ListPath<DailyFootball.demo.domain.community.domain.Community, DailyFootball.demo.domain.community.domain.QCommunity> communities = this.<DailyFootball.demo.domain.community.domain.Community, DailyFootball.demo.domain.community.domain.QCommunity>createList("communities", DailyFootball.demo.domain.community.domain.Community.class, DailyFootball.demo.domain.community.domain.QCommunity.class, PathInits.DIRECT2);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final StringPath email = createString("email");

    public final ListPath<DailyFootball.demo.domain.follow.domain.Follow, DailyFootball.demo.domain.follow.domain.QFollow> fromFollows = this.<DailyFootball.demo.domain.follow.domain.Follow, DailyFootball.demo.domain.follow.domain.QFollow>createList("fromFollows", DailyFootball.demo.domain.follow.domain.Follow.class, DailyFootball.demo.domain.follow.domain.QFollow.class, PathInits.DIRECT2);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedDate = _super.modifiedDate;

    public final StringPath nickname = createString("nickname");

    public final StringPath password = createString("password");

    public final StringPath profileImg = createString("profileImg");

    public final ListPath<DailyFootball.demo.domain.score.domain.Score, DailyFootball.demo.domain.score.domain.QScore> scores = this.<DailyFootball.demo.domain.score.domain.Score, DailyFootball.demo.domain.score.domain.QScore>createList("scores", DailyFootball.demo.domain.score.domain.Score.class, DailyFootball.demo.domain.score.domain.QScore.class, PathInits.DIRECT2);

    public final ListPath<DailyFootball.demo.domain.follow.domain.Follow, DailyFootball.demo.domain.follow.domain.QFollow> toFollows = this.<DailyFootball.demo.domain.follow.domain.Follow, DailyFootball.demo.domain.follow.domain.QFollow>createList("toFollows", DailyFootball.demo.domain.follow.domain.Follow.class, DailyFootball.demo.domain.follow.domain.QFollow.class, PathInits.DIRECT2);

    public QUser(String variable) {
        super(User.class, forVariable(variable));
    }

    public QUser(Path<? extends User> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUser(PathMetadata metadata) {
        super(User.class, metadata);
    }

}

