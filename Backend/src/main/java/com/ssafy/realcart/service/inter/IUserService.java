package com.ssafy.realcart.service.inter;

import com.ssafy.realcart.data.dto.UserDto;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;
import java.util.List;

@Service
public interface IUserService {

    boolean createUser(UserDto userDto) throws NoSuchAlgorithmException;
    UserDto getUser(String email);
    List<UserDto> getAllUsers();
    boolean updateUser(String email);
    boolean deleteUser(String email);
    boolean banUser(String email);
    UserDto login(UserDto userDto) throws NoSuchAlgorithmException;
    boolean checkEmail(String email);
    boolean checkNickname(String nickname);
    boolean verifyEmail(String email, String salt);
}
