package DailyFootball.demo.domain.user.controller;


import DailyFootball.demo.domain.user.service.FollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
public class FollowApiController {

    private final FollowService followService;

    /**
     * 팔로우
     */
    @PostMapping("/follow/{toUserId}")
    public ResponseEntity followUser(@PathVariable("toUserId") Long toUserId, @RequestParam Long fromUserId){
        followService.follow(fromUserId, toUserId);
        return ResponseEntity.status(HttpStatus.OK).body("팔로우 성공");
    }

    /**
     * 언팔로우
     */
    @DeleteMapping("/follow/{toUserId}")
    public ResponseEntity unFollowUser(@PathVariable("toUserId") Long toUserId, @RequestParam Long fromUserId){
        followService.unFollow(fromUserId, toUserId);
        return ResponseEntity.status(HttpStatus.OK).body("팔로우 취소 성공");
    }

}
