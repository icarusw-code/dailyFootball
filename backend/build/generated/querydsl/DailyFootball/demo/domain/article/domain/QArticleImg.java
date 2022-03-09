package DailyFootball.demo.domain.article.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QArticleImg is a Querydsl query type for ArticleImg
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QArticleImg extends EntityPathBase<ArticleImg> {

    private static final long serialVersionUID = -1605028328L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QArticleImg articleImg1 = new QArticleImg("articleImg1");

    public final QArticle article;

    public final StringPath articleImg = createString("articleImg");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public QArticleImg(String variable) {
        this(ArticleImg.class, forVariable(variable), INITS);
    }

    public QArticleImg(Path<? extends ArticleImg> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QArticleImg(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QArticleImg(PathMetadata metadata, PathInits inits) {
        this(ArticleImg.class, metadata, inits);
    }

    public QArticleImg(Class<? extends ArticleImg> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.article = inits.isInitialized("article") ? new QArticle(forProperty("article"), inits.get("article")) : null;
    }

}

