package DailyFootball.demo.domain.user.service;

import DailyFootball.demo.domain.user.domain.User;
import DailyFootball.demo.domain.user.dto.UserSignupRequestDto;
import DailyFootball.demo.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor

public class UserService {
    private final UserRepository userRepository;

    /**
     *  회원 가입
     */
    @Transactional
    public Long saveUserInfo(UserSignupRequestDto userSignupRequestDto){
        return userRepository.save(userSignupRequestDto.toEntity()).getId();
    }

    // 이메일 중복검사
    @Transactional
    public boolean findExistEmail(String email){
        return userRepository.existsByEmail(email);
    }

    // 닉네임 중복검사
    @Transactional
    public boolean findExistNickname(String nickname){
        return userRepository.existsByNickname(nickname);
    }



}
