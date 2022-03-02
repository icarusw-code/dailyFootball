package DailyFootball.demo.domain.column.domain;

import DailyFootball.demo.domain.base.doamin.BaseTimeEntity;
import DailyFootball.demo.domain.user.domain.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
@Getter
@NoArgsConstructor
@Table(name = "COLUMN")
public class Columns extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column(name = "read_count")
    private int readCount;

    @Column(name = "likes_count")
    private int likesCount;

    @OneToMany(mappedBy = "columns", cascade = CascadeType.PERSIST, orphanRemoval = true)
    private List<ColumnsImg> columnsImgs = new ArrayList<>();

    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    User user;



}
