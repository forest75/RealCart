package com.ssafy.realcart.data.dao;

import com.ssafy.realcart.data.entity.User;

import java.util.List;

public interface IUserDAO {
    boolean createUser(User userDto);
    User getUser(String email);
    List<User> getAllUsers();
    boolean updateUser(String email);
    boolean deleteUser(String email);
    boolean banUser(String email);
}
