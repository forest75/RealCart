package com.ssafy.realcart.data.repository;

import com.ssafy.realcart.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.Repository;

public interface IUserRepository extends JpaRepository<User, Integer> {
    User findByNickname(String nickname);
    User findByEmail(String email);
    User saveAndFlush(User user);
}
