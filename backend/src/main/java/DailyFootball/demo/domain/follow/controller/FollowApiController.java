package DailyFootball.demo.domain.follow.controller;


import DailyFootball.demo.domain.follow.DTO.FollowDto;
import DailyFootball.demo.domain.follow.repository.FollowRepository;
import DailyFootball.demo.domain.follow.service.FollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


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

    /**
     * 팔로워 정보
     * userId를 toUser 로 가지는 팔로워의 정보
     */
    @GetMapping("/account/{userId}/follower")
    public ResponseEntity getFollower(Model model, @PathVariable("userId") Long userId, @RequestParam Long loginId) {
        model.addAttribute(followService.getFollower(userId, loginId));
        return ResponseEntity.status(HttpStatus.OK).body(model);
    }

    /**
     * 팔로잉 정보
     * userId가 fromUser 인 팔로잉 정보
     */
    @GetMapping("account/{userId}/following")
    public ResponseEntity getFolloing(Model model, @PathVariable("userId") Long userId, @RequestParam Long loginId){
        model.addAttribute(followService.getFollowing(userId, loginId));
        return ResponseEntity.status(HttpStatus.OK).body(model);
    }


}
