package DailyFootball.demo.domain.team.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTeam is a Querydsl query type for Team
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTeam extends EntityPathBase<Team> {

    private static final long serialVersionUID = 728390813L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTeam team = new QTeam("team");

    public final StringPath formation = createString("formation");

    public final DailyFootball.demo.domain.game.domain.QGame game;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath leagueName = createString("leagueName");

    public final StringPath leagueNation = createString("leagueNation");

    public final StringPath name = createString("name");

    public final ListPath<DailyFootball.demo.domain.player.domain.Player, DailyFootball.demo.domain.player.domain.QPlayer> players = this.<DailyFootball.demo.domain.player.domain.Player, DailyFootball.demo.domain.player.domain.QPlayer>createList("players", DailyFootball.demo.domain.player.domain.Player.class, DailyFootball.demo.domain.player.domain.QPlayer.class, PathInits.DIRECT2);

    public QTeam(String variable) {
        this(Team.class, forVariable(variable), INITS);
    }

    public QTeam(Path<? extends Team> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTeam(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTeam(PathMetadata metadata, PathInits inits) {
        this(Team.class, metadata, inits);
    }

    public QTeam(Class<? extends Team> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.game = inits.isInitialized("game") ? new DailyFootball.demo.domain.game.domain.QGame(forProperty("game")) : null;
    }

}

