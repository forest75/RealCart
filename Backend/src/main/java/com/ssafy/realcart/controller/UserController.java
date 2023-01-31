package com.ssafy.realcart.controller;

import com.ssafy.realcart.dto.User;
import com.ssafy.realcart.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    private IUserRepository userRepository;

    @Autowired
    UserController(IUserRepository userRepository){
        this.userRepository = userRepository;
    }

    @GetMapping()
    public ResponseEntity<List<User>> getAllUsers() {
        return new ResponseEntity<List<User>>((List<User>) userRepository.findAll(), HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<User> signIn(User user){
        userRepository.save(user);
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

}
