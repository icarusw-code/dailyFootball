package DailyFootball.demo.domain.player.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPlayer is a Querydsl query type for Player
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPlayer extends EntityPathBase<Player> {

    private static final long serialVersionUID = -2099412763L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPlayer player = new QPlayer("player");

    public final NumberPath<Integer> backNumber = createNumber("backNumber", Integer.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath name = createString("name");

    public final ListPath<DailyFootball.demo.domain.playercCommunity.domain.PlayerCommunity, DailyFootball.demo.domain.playercCommunity.domain.QPlayerCommunity> playerCommunities = this.<DailyFootball.demo.domain.playercCommunity.domain.PlayerCommunity, DailyFootball.demo.domain.playercCommunity.domain.QPlayerCommunity>createList("playerCommunities", DailyFootball.demo.domain.playercCommunity.domain.PlayerCommunity.class, DailyFootball.demo.domain.playercCommunity.domain.QPlayerCommunity.class, PathInits.DIRECT2);

    public final NumberPath<Integer> position = createNumber("position", Integer.class);

    public final ListPath<DailyFootball.demo.domain.score.domain.Score, DailyFootball.demo.domain.score.domain.QScore> scores = this.<DailyFootball.demo.domain.score.domain.Score, DailyFootball.demo.domain.score.domain.QScore>createList("scores", DailyFootball.demo.domain.score.domain.Score.class, DailyFootball.demo.domain.score.domain.QScore.class, PathInits.DIRECT2);

    public final DailyFootball.demo.domain.team.domain.QTeam team;

    public QPlayer(String variable) {
        this(Player.class, forVariable(variable), INITS);
    }

    public QPlayer(Path<? extends Player> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPlayer(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPlayer(PathMetadata metadata, PathInits inits) {
        this(Player.class, metadata, inits);
    }

    public QPlayer(Class<? extends Player> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.team = inits.isInitialized("team") ? new DailyFootball.demo.domain.team.domain.QTeam(forProperty("team"), inits.get("team")) : null;
    }

}

