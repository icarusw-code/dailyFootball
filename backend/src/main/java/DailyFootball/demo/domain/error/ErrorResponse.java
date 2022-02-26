package DailyFootball.demo.domain.error;

import lombok.Data;

@Data
public class ErrorResponse {

    private String error;

    public ErrorResponse(String errorMessage) {
        this.error = errorMessage;
    }
}
