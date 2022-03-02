package DailyFootball.demo.domain.column.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "COLUMNS_IMG")
public class ColumnsImg {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ColumImg;

    @ManyToOne(targetEntity = Columns.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "columns_id")
    Columns columns;

}
