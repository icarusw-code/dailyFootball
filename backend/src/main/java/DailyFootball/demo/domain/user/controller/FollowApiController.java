package DailyFootball.demo.domain.user.controller;


import DailyFootball.demo.domain.user.service.FollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequiredArgsConstructor
public class FollowApiController {

    private final FollowService followService;

    /**
     * 팔로우
     */
    @PostMapping("/follow/{fromUserId}follow{toUserId}")
    public ResponseEntity followUser(@PathVariable("toUserId") Long toUserId, @PathVariable("fromUserId") Long fromUserId){
        followService.follow(fromUserId, toUserId);
        return ResponseEntity.status(HttpStatus.OK).body("팔로우 성공");

    }

}
