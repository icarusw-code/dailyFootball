package DailyFootball.demo.global.jwt.domain;

/**
 * RDB 방식으로 구현 -> 배치 작업을 통해 만료된 토큰 삭제 필요
 * 자동으로 삭제 하려면 Redis 를 사용해서 나중에 업데이트 필요
 */

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@NoArgsConstructor
@Table(name = "refresh_token")
@Entity
public class RefreshToken {

    @Id
    private String tokenKey;
    private String tokenValue;

    public RefreshToken updateValue(String tokenKey) {
        this.tokenValue = tokenKey;
        return this;
    }

    @Builder
    public RefreshToken(String tokenKey, String tokenValue) {
        this.tokenKey = tokenKey;
        this.tokenValue = tokenValue;
    }
}
