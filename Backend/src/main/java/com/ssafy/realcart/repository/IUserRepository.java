package com.ssafy.realcart.repository;

import com.ssafy.realcart.dto.User;
import org.springframework.data.repository.CrudRepository;

public interface IUserRepository extends CrudRepository<User, Integer> {
}
