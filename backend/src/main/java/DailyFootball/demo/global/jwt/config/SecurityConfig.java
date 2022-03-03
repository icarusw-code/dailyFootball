package DailyFootball.demo.global.jwt.config;

import DailyFootball.demo.global.jwt.JwtAccessDeniedHandler;
import DailyFootball.demo.global.jwt.JwtAuthenticationEntryPoint;
import DailyFootball.demo.global.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final TokenProvider tokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

//    @Override
//    public void configure(WebSecurity web) {
//        web.ignoring()
//                .antMatchers("/127.0.0.1/**", "/favicon.ico");
//    }

    @Override
    protected void configure(HttpSecurity http) throws Exception{
        // 세션이 아니므로 csrf 설정 disable
        http
                .csrf().disable()
                // 만든 에러 추가
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)
//
                // 세션 사용하지 않게 설정
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                // 우선 다 허용
                .and()
                .authorizeRequests()
                .antMatchers("/**").permitAll()
//                 JwtFilter 를 addFilterBefore 로 등록했던 JwtSecurityConfig 클래스를 적용
                .and()
                .apply(new JwtSecurityConfig(tokenProvider));
    }


}
