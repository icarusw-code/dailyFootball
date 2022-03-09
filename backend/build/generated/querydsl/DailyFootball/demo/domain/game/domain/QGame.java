package DailyFootball.demo.domain.game.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QGame is a Querydsl query type for Game
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QGame extends EntityPathBase<Game> {

    private static final long serialVersionUID = 1910224967L;

    public static final QGame game = new QGame("game");

    public final ListPath<DailyFootball.demo.domain.community.domain.Community, DailyFootball.demo.domain.community.domain.QCommunity> communities = this.<DailyFootball.demo.domain.community.domain.Community, DailyFootball.demo.domain.community.domain.QCommunity>createList("communities", DailyFootball.demo.domain.community.domain.Community.class, DailyFootball.demo.domain.community.domain.QCommunity.class, PathInits.DIRECT2);

    public final DateTimePath<java.time.LocalDateTime> date = createDateTime("date", java.time.LocalDateTime.class);

    public final BooleanPath draw = createBoolean("draw");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Integer> localTeamScore = createNumber("localTeamScore", Integer.class);

    public final NumberPath<Integer> loseTeamId = createNumber("loseTeamId", Integer.class);

    public final StringPath name = createString("name");

    public final NumberPath<Integer> visitorTeamScore = createNumber("visitorTeamScore", Integer.class);

    public final ListPath<DailyFootball.demo.domain.team.domain.Team, DailyFootball.demo.domain.team.domain.QTeam> visitorTeamScores = this.<DailyFootball.demo.domain.team.domain.Team, DailyFootball.demo.domain.team.domain.QTeam>createList("visitorTeamScores", DailyFootball.demo.domain.team.domain.Team.class, DailyFootball.demo.domain.team.domain.QTeam.class, PathInits.DIRECT2);

    public final NumberPath<Integer> winTeamId = createNumber("winTeamId", Integer.class);

    public QGame(String variable) {
        super(Game.class, forVariable(variable));
    }

    public QGame(Path<? extends Game> path) {
        super(path.getType(), path.getMetadata());
    }

    public QGame(PathMetadata metadata) {
        super(Game.class, metadata);
    }

}

