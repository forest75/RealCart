package com.ssafy.realcart.service.inter;

import com.ssafy.realcart.data.dto.UserDto;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;
import java.util.List;

@Service
public interface IUserService {

    boolean createUser(UserDto userDto) throws NoSuchAlgorithmException;
    List<UserDto> getAllUsers();
    UserDto updateUser(String email, UserDto userDto) throws NoSuchAlgorithmException;
    boolean deleteUser(String email);
    boolean banUser(String nickname, int days);
    UserDto login(UserDto userDto) throws NoSuchAlgorithmException;
    boolean checkEmail(String email);
    boolean checkNickname(String nickname);
    boolean verifyEmail(String email, String salt);
    void preprocessMail(UserDto userDto);
	boolean clearUserBan(String nickname);
}
