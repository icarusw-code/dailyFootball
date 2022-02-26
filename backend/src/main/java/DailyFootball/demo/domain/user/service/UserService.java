package DailyFootball.demo.domain.user.service;

import DailyFootball.demo.domain.user.domain.User;
import DailyFootball.demo.domain.user.dto.UserSignupRequestDto;
import DailyFootball.demo.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Service
@Transactional
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

    // 회원 탈퇴
    @Transactional
    public void deleteById(Long userId){
        userRepository.deleteById(userId);
    }

    // 회원 정보 조회
    @Transactional
    public Optional<User> findUserInfo(Long userId) {
        return userRepository.findById(userId);
    }


}
