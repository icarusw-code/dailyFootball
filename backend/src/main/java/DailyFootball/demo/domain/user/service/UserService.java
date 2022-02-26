package DailyFootball.demo.domain.user.service;

import DailyFootball.demo.domain.user.domain.User;
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
    public Long join(User user){

        validateDuplicateMember(user); // 중복 검증
        userRepository.save(user);
        return user.getId();
    }

    private void validateDuplicateMember(User user) {
        List<User> findUsers = userRepository.findByEmail(user.getEmail());
        if(!findUsers.isEmpty()){
            throw new IllegalStateException("동일한 아이디가 존재합니다.");
        }
    }

}
