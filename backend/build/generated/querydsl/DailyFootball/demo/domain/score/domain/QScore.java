package DailyFootball.demo.domain.score.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QScore is a Querydsl query type for Score
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QScore extends EntityPathBase<Score> {

    private static final long serialVersionUID = 2037346859L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QScore score1 = new QScore("score1");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final DailyFootball.demo.domain.player.domain.QPlayer player;

    public final NumberPath<Long> score = createNumber("score", Long.class);

    public final DailyFootball.demo.domain.user.domain.QUser user;

    public QScore(String variable) {
        this(Score.class, forVariable(variable), INITS);
    }

    public QScore(Path<? extends Score> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QScore(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QScore(PathMetadata metadata, PathInits inits) {
        this(Score.class, metadata, inits);
    }

    public QScore(Class<? extends Score> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.player = inits.isInitialized("player") ? new DailyFootball.demo.domain.player.domain.QPlayer(forProperty("player"), inits.get("player")) : null;
        this.user = inits.isInitialized("user") ? new DailyFootball.demo.domain.user.domain.QUser(forProperty("user")) : null;
    }

}

