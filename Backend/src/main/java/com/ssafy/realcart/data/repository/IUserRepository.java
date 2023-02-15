package com.ssafy.realcart.data.repository;

import com.ssafy.realcart.data.entity.User;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface IUserRepository extends CrudRepository<User, Integer> {
    User findByNickname(String nickname);
    User findByEmail(String email);
    User saveAndFlush(User user);

    @Query(value="select * from USER_TB where email = :useremail and refresh_token = :refreshtoken",nativeQuery=true)
	User findByEmailAndRefreshToken(@Param("useremail")String userEmail, @Param("refreshtoken")String refreshToken);
}
