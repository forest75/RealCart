package com.ssafy.realcart.data.dao.impl;

import com.ssafy.realcart.data.dao.IUserDAO;
import com.ssafy.realcart.data.entity.User;
import com.ssafy.realcart.data.repository.IUserRepository;
import com.ssafy.realcart.exception.NotUniqueException;
import com.ssafy.realcart.service.impl.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
public class UserDAO implements IUserDAO {

    private IUserRepository userRepository;
    private final Logger LOGGER = LoggerFactory.getLogger(UserDAO.class);


    @Autowired
    public UserDAO(IUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public boolean createUser(User user) {
        LOGGER.info("createUser 메서드가 userDAO에서 호출되었습니다.");
        try {
            if(userRepository.findByNickname(user.getNickname()) != null){
                LOGGER.info("중복된 닉네임이 있습니다.");
                throw new NotUniqueException("중복된 닉네임이 있습니다.");

            };
            if(userRepository.findByEmail(user.getEmail()) != null){
                LOGGER.info("중복된 이메일이 있습니다.");
                throw new NotUniqueException("중복된 이메일이 있습니다.");
            }
            userRepository.save(user);
            LOGGER.info(user.getEmail() + "  회원가입 성공");
            return true;
        }catch (Exception e){
            LOGGER.debug(e.getMessage());
            e.getStackTrace();
            return false;
        }
    }

    @Override
    public User getUser(String email) {
        LOGGER.info("getUser 메서드가 userDAO에서 호출되었습니다.");
        return userRepository.findByEmail(email);
    }

    @Override
    public List<User> getAllUsers() {
        LOGGER.info("getAllUsers 메서드가 userDAO에서 호출되었습니다.");
        return (List<User>) userRepository.findAll();
    }

    @Override
    public boolean updateUser(String email) {
        return false;
    }

    @Override
    public boolean deleteUser(String email) {
        return false;
    }

    @Override
    public boolean banUser(String email) {
        return false;
    }

}
