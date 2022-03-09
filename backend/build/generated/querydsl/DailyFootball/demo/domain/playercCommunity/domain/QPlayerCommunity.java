package DailyFootball.demo.domain.playercCommunity.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPlayerCommunity is a Querydsl query type for PlayerCommunity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPlayerCommunity extends EntityPathBase<PlayerCommunity> {

    private static final long serialVersionUID = -497224450L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPlayerCommunity playerCommunity = new QPlayerCommunity("playerCommunity");

    public final DailyFootball.demo.domain.community.domain.QCommunity community;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final DailyFootball.demo.domain.player.domain.QPlayer player;

    public QPlayerCommunity(String variable) {
        this(PlayerCommunity.class, forVariable(variable), INITS);
    }

    public QPlayerCommunity(Path<? extends PlayerCommunity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPlayerCommunity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPlayerCommunity(PathMetadata metadata, PathInits inits) {
        this(PlayerCommunity.class, metadata, inits);
    }

    public QPlayerCommunity(Class<? extends PlayerCommunity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.community = inits.isInitialized("community") ? new DailyFootball.demo.domain.community.domain.QCommunity(forProperty("community"), inits.get("community")) : null;
        this.player = inits.isInitialized("player") ? new DailyFootball.demo.domain.player.domain.QPlayer(forProperty("player"), inits.get("player")) : null;
    }

}

