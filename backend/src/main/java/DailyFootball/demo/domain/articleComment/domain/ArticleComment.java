package DailyFootball.demo.domain.articleComment.domain;

import DailyFootball.demo.domain.article.domain.Article;
import DailyFootball.demo.domain.base.doamin.BaseTimeEntity;
import DailyFootball.demo.domain.user.domain.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "ARTICLE_COMMENT")
public class ArticleComment extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(length = 500)
    private String content;

    private boolean deleted;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Article article;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private ArticleComment parent;

    @OneToMany(mappedBy = "parent")
    private List<ArticleComment> children = new ArrayList<>();

    public ArticleComment(String content, User user, Article article,  ArticleComment parent) {
        this.content = content;
        this.article = article;
        this.user = user;
        this.parent = parent;
        this.deleted = false;
    }


    // 현재 댓글을 기준으로, 실제로 삭제할 수 있는 댓글 찾기
    // 찾아낸 댓글이 없으면 -> 하위 댓글이 아직 존재
    public Optional<ArticleComment> findDeletableComment(){
        return hasChildren() ? Optional.empty() : Optional.of(findDeletableCommentByParent());
    }

    // 하위 댓글이 남아 실제로 제거할 수 없는 경우
    // 삭제 표시로 남겨줌
    public void delete(){
        this.deleted = true;
    }

    // 상위 댓글로 거슬러 올라가며, 제거해도 되는 댓글 찾기
    // 삭제 가능한 지점을 찾아냄
    private ArticleComment findDeletableCommentByParent() {
        if(isDeletedParent()){
            ArticleComment deletableParent = getParent().findDeletableCommentByParent();
            if(getParent().getChildren().size() == 1) return deletableParent;
        }
        return this;
    }

    // 하위 댓글이 있는지 확인
    private boolean hasChildren(){
        return getChildren().size() != 0;
    }

    // 현재 댓글의 상위 댓글이 제거해도 되는 것인지 확인
    private boolean isDeletedParent(){
        return getParent() != null && getParent().isDeleted();
    }

}
