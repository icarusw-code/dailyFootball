package DailyFootball.demo.domain.articleComment.DTO;

import DailyFootball.demo.domain.articleComment.domain.ArticleComment;
import DailyFootball.demo.domain.user.DTO.UserDto;
import DailyFootball.demo.global.util.NestConvertUtils;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ArticleCommentDto {

    private Long id;
    private String content;
    private UserDto user;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime createdAt;
    private List<ArticleCommentDto> children;

    /**
     * 계층형 구조로 변환 작업
     */
    public static List<ArticleCommentDto> toDtoList(List<ArticleComment> comments){
        NestConvertUtils utils = NestConvertUtils.newInstance(
                comments,
                c-> new ArticleCommentDto(c.getId(), c.isDeleted() ?null: c.getContent(), c.isDeleted() ?null: UserDto.toDto(c.getUser()), c.getCreatedDate(), new ArrayList<>()),
                c-> c.getParent(),
                c-> c.getId(),
                d-> d.getChildren());

        return utils.convert();
    }

}
