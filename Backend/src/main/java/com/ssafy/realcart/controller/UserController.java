package com.ssafy.realcart.controller;

import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Map;

import com.ssafy.realcart.common.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
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
    @GetMapping(value="/all")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        LOGGER.info("getAllUsers 메서드가 userController에서 호출되었습니다.");
        List<UserDto> userList = userService.getAllUsers();
        return new ResponseEntity<List<UserDto>>(userList, HttpStatus.OK);
    }

    @GetMapping()
    public ApiResponse getUser() {
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        UserDto user = userService.getUser(principal.getUsername());
        
        return ApiResponse.success("user", user);
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
//            	userService.preprocessMail(userDto);
            	
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
    
    @PutMapping()
    public ResponseEntity<UserDto> updateUser(@RequestBody UserDto userDto){
        LOGGER.info("updateUser 메서드가 userController에서 호출되었습니다.");
        try {
            UserDto loginUser = userService.updateUser(userDto);
            if(loginUser != null){
                return new ResponseEntity<UserDto>(loginUser, HttpStatus.OK);
            }
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/ban/{nickname}")
    public ResponseEntity<String> banUser(@PathVariable String nickname){
        LOGGER.info("banUser 메서드가 userController에서 호출되었습니다.");
        if(userService.banUser(nickname)) {
        	return new ResponseEntity<String>("유저 밴 성공", HttpStatus.OK);
        }
        return new ResponseEntity<String>("유저 밴 실패", HttpStatus.BAD_REQUEST);
    }
    
    @DeleteMapping("/ban/{nickname}")
    public ResponseEntity<String> clearUserBan(@PathVariable String nickname){
        LOGGER.info("clearUserBan 메서드가 userController에서 호출되었습니다.");
        if(userService.clearUserBan(nickname)) {
        	return new ResponseEntity<String>("유저 밴 해제 성공", HttpStatus.OK);
        }
        return new ResponseEntity<String>("유저 밴 해제 실패", HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/findpwd")
    public ResponseEntity<String> findPwd(@RequestBody Map<String, String> emailMap){
        LOGGER.info("findPwd 메서드가 userController에서 호출되었습니다.");
        if(userService.findPwd(emailMap.get("email"))) {
            return new ResponseEntity<String>("이메일 확인하세요.", HttpStatus.OK);
        }
        return new ResponseEntity<String>("가입하지 않은 유저입니다.", HttpStatus.BAD_REQUEST);
    }

    @GetMapping(value="/changepwd/{email}/{salt}")
    public ResponseEntity<String> changePwd(@PathVariable("email") String email, @PathVariable("salt") String salt) throws NoSuchAlgorithmException {
        LOGGER.info("changePwd 메서드가 userController에서 호출되었습니다.");
        if(userService.changePwd(email, salt)){
            String msg = "비밀번호 변경 성공";
            return new ResponseEntity<>(msg, HttpStatus.OK);
        }
        else{
            String msg = "유효한 코드가 아닙니다.";
            return new ResponseEntity<>(msg, HttpStatus.OK);
        }
    }
    
    @GetMapping(value="/bcrypt/{email}")
    public ResponseEntity<String> changePwd(@PathVariable("email") String email) throws NoSuchAlgorithmException {
        LOGGER.info("changePwd 메서드가 userController에서 호출되었습니다.");
        if(userService.changePwd(email)){
            String msg = "비밀번호 변경 성공";
            return new ResponseEntity<>(msg, HttpStatus.OK);
        }
        else{
            String msg = "유효한 코드가 아닙니다.";
            return new ResponseEntity<>(msg, HttpStatus.OK);
        }
    }
}
