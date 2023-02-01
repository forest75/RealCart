package com.ssafy.realcart.controller;

import com.ssafy.realcart.common.ApiResponse;
import com.ssafy.realcart.config.auth.AppProperties;
import com.ssafy.realcart.data.entity.User;
import com.ssafy.realcart.data.entity.auth.Auth;
import com.ssafy.realcart.data.entity.auth.UserPrincipal;
import com.ssafy.realcart.data.repository.IUserRepository;
import com.ssafy.realcart.service.auth.AuthToken;
import com.ssafy.realcart.service.auth.AuthTokenProvider;
import com.ssafy.realcart.util.CookieUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AppProperties appProperties;
    private final AuthTokenProvider tokenProvider;
    private final AuthenticationManager authenticationManager;
    private final IUserRepository userRepository;
    private final static long THREE_DAYS_MSEC = 259200000;
    private final static String REFRESH_TOKEN = "refresh_token";
    @GetMapping(value="/login")
    public ApiResponse login(
            HttpServletRequest request,
            HttpServletResponse response,
            @RequestBody Auth authReqModel
    ) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authReqModel.getId(),
                        authReqModel.getPassword()
                )
        );
        System.out.println(authReqModel.getId());
        System.out.println(authReqModel.getPassword());

        String userId = authReqModel.getId();
        SecurityContextHolder.getContext().setAuthentication(authentication);

        Date now = new Date();
        AuthToken accessToken = tokenProvider.createAuthToken(
                userId,
                ((UserPrincipal) authentication.getPrincipal()).getRoleType().getCode(),
                new Date(now.getTime() + appProperties.getAuth().getTokenExpiry())    // 만료 시점
        );

        // New refresh token
        long refreshTokenExpiry = appProperties.getAuth().getRefreshTokenExpiry();
        AuthToken refreshToken = tokenProvider.createAuthToken(
                appProperties.getAuth().getTokenSecret(),
                new Date(now.getTime() + refreshTokenExpiry)
        );

        // userId refresh token 으로 DB 확인
        String userRefreshToken = userRepository.findByEmail(userId).getRefreshToken();
        System.out.println(userRefreshToken);
        if (userRefreshToken == null) {
            // 없는 경우 새로 등록
            userRefreshToken = refreshToken.getToken();
            User user = userRepository.findByEmail(userId);
            user.setRefreshToken(userRefreshToken);
            userRepository.saveAndFlush(user);
        } else {
            // DB에 refresh 토큰 업데이트
            userRefreshToken = refreshToken.getToken();
        }

        int cookieMaxAge = (int) refreshTokenExpiry / 60;
        CookieUtil.deleteCookie(request, response, REFRESH_TOKEN);
        CookieUtil.addCookie(response, REFRESH_TOKEN, refreshToken.getToken(), cookieMaxAge);

        return ApiResponse.success("token", accessToken.getToken());
    }
}
