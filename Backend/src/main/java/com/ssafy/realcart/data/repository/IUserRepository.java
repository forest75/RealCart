package com.ssafy.realcart.data.repository;

import com.ssafy.realcart.data.entity.User;
import org.springframework.data.repository.CrudRepository;

public interface IUserRepository extends CrudRepository<User, Integer> {
    User findByNickname(String nickname);
    User findByEmail(String email);
    User saveAndFlush(User user);
}
