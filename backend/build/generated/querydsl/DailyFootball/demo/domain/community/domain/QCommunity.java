package DailyFootball.demo.domain.community.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCommunity is a Querydsl query type for Community
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCommunity extends EntityPathBase<Community> {

    private static final long serialVersionUID = -874472693L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCommunity community = new QCommunity("community");

    public final DailyFootball.demo.domain.base.doamin.QBaseTimeEntity _super = new DailyFootball.demo.domain.base.doamin.QBaseTimeEntity(this);

    public final StringPath content = createString("content");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final DailyFootball.demo.domain.game.domain.QGame game;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Integer> likeCount = createNumber("likeCount", Integer.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedDate = _super.modifiedDate;

    public final ListPath<DailyFootball.demo.domain.playercCommunity.domain.PlayerCommunity, DailyFootball.demo.domain.playercCommunity.domain.QPlayerCommunity> playerCommunities = this.<DailyFootball.demo.domain.playercCommunity.domain.PlayerCommunity, DailyFootball.demo.domain.playercCommunity.domain.QPlayerCommunity>createList("playerCommunities", DailyFootball.demo.domain.playercCommunity.domain.PlayerCommunity.class, DailyFootball.demo.domain.playercCommunity.domain.QPlayerCommunity.class, PathInits.DIRECT2);

    public final NumberPath<Integer> playerId = createNumber("playerId", Integer.class);

    public final StringPath title = createString("title");

    public final DailyFootball.demo.domain.user.domain.QUser user;

    public QCommunity(String variable) {
        this(Community.class, forVariable(variable), INITS);
    }

    public QCommunity(Path<? extends Community> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCommunity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCommunity(PathMetadata metadata, PathInits inits) {
        this(Community.class, metadata, inits);
    }

    public QCommunity(Class<? extends Community> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.game = inits.isInitialized("game") ? new DailyFootball.demo.domain.game.domain.QGame(forProperty("game")) : null;
        this.user = inits.isInitialized("user") ? new DailyFootball.demo.domain.user.domain.QUser(forProperty("user")) : null;
    }

}

