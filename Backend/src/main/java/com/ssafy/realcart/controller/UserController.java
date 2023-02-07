package com.ssafy.realcart.controller;

import java.security.NoSuchAlgorithmException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ssafy.realcart.data.dto.UserDto;
import com.ssafy.realcart.service.inter.IUserService;

@RestController
@RequestMapping("/user")
public class UserController {

    private IUserService userService = null;

    private final Logger LOGGER = LoggerFactory.getLogger(UserController.class);


    @Autowired
    public UserController(IUserService userService){
        this.userService = userService;
    }
    @GetMapping()
    public ResponseEntity<List<UserDto>> getAllUsers() {
        LOGGER.info("getAllUsers 메서드가 userController에서 호출되었습니다.");
        List<UserDto> userList = userService.getAllUsers();
        return new ResponseEntity<List<UserDto>>(userList, HttpStatus.OK);
    }

    @GetMapping(value="/checkemail")
    public ResponseEntity<String> checkEmail(@RequestParam String email) {
        LOGGER.info("checkEmail 메서드가 userController에서 호출되었습니다.");
        if(userService.checkEmail(email)){
            String msg = "Unique";
            return new ResponseEntity<>(msg, HttpStatus.OK);
        }
        else{
            String msg = "Duplicate";
            return new ResponseEntity<>(msg, HttpStatus.OK);
        }
    }


    @GetMapping(value="/checknickname")
    public ResponseEntity<String> checkNickname(@RequestParam String nickname) {
        LOGGER.info("checkNickname 메서드가 userController에서 호출되었습니다.");
        if(userService.checkNickname(nickname)){
            String msg = "Unique";
            return new ResponseEntity<>(msg, HttpStatus.OK);
        }
        else{
            String msg = "Duplicate";
            return new ResponseEntity<>(msg, HttpStatus.OK);
        }
    }

    @GetMapping(value="/verifyemail/{email}/{salt}")
    public ResponseEntity<String> verifyEmail(@PathVariable("email") String email, @PathVariable("salt") String salt) {
        LOGGER.info("verifyemail 메서드가 userController에서 호출되었습니다.");
        if(userService.verifyEmail(email, salt)){
            String msg = "회원가입 성공!";
            return new ResponseEntity<>(msg, HttpStatus.OK);
        }
        else{
            String msg = "유효한 코드가 아닙니다.";
            return new ResponseEntity<>(msg, HttpStatus.OK);
        }
    }

    @PostMapping(value="/register")
    public ResponseEntity<String> createUser(@RequestBody UserDto userDto){
        LOGGER.info("createUser 메서드가 userController에서 호출되었습니다.");
        
        try {
            if(userService.createUser(userDto)){
            	userService.preprocessMail(userDto);
            	
            	String msg = "회원가입 성공";
                return new ResponseEntity<String>(msg, HttpStatus.OK);
            }
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
        String msg = "회원가입 실패";
        return new ResponseEntity<String>(msg, HttpStatus.BAD_REQUEST);
    }

    @PostMapping()
    public ResponseEntity<UserDto> login(@RequestBody UserDto userDto){
        LOGGER.info("Login 메서드가 userController에서 호출되었습니다.");
        try {
            UserDto loginUser = userService.login(userDto);
            if(loginUser != null){
                return new ResponseEntity<UserDto>(loginUser, HttpStatus.OK);
            }
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

}
