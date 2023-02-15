package com.ssafy.realcart.service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.List;

import javax.mail.internet.MimeMessage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSender;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.realcart.data.dao.inter.IUserDAO;
import com.ssafy.realcart.data.dto.UserDto;
import com.ssafy.realcart.data.entity.User;
import com.ssafy.realcart.data.entity.auth.ProviderType;
import com.ssafy.realcart.exception.NickNameShortException;
import com.ssafy.realcart.service.inter.IUserService;

@Service
public class UserService implements IUserService {

    private IUserDAO userDAO;
    private final Logger LOGGER = LoggerFactory.getLogger(UserService.class);
    private final String CHANGEPWD = "비밀번호 변경";
    private JavaMailSender mailSender;



    @Value("${spring.mail.username}")
    String sendFrom;

    @Autowired
    public UserService(IUserDAO userDAO, JavaMailSender mailSender){
        this.userDAO = userDAO;
        this.mailSender = mailSender;
    }

    @Override
    @Transactional
    public boolean createUser(UserDto userDto) throws NoSuchAlgorithmException {
        LOGGER.info("createUser 메서드가 userService에서 호출되었습니다.");
        User user = new User();
        try {
            user.setNickname(validateNickName(userDto.getNickname()));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        byte[] salt = getSalt();
        user.setSalt(bytesToHex(salt));
        user.setIntro(userDto.getIntro());
        user.setEmail(userDto.getEmail());
        user.setUsername(userDto.getUsername());
        user.setPassword(sha256(userDto.getPassword(), bytesToHex(salt).getBytes()));
        user.setProviderType(userDto.getProviderType() == null ? ProviderType.LOCAL : userDto.getProviderType());
        byte[] emailSalt = getSalt();
        user.setEmailSalt(bytesToHex(emailSalt));
        return userDAO.createUser(user);
        
    }

    private void sendMail(String email, String title, String content) {


        String sendTo = email;
        String mailTitle = title;
        String mailContent = content;

        MimeMessagePreparator preparator = new MimeMessagePreparator() {
            @Override
            public void prepare(MimeMessage mimeMessage) throws Exception {
                final MimeMessageHelper message = new MimeMessageHelper(mimeMessage,true,"UTF-8");
                message.setTo(sendTo);
                message.setFrom(sendFrom);
                message.setSubject(mailTitle);
                message.setText(mailContent, true);

            }
        };
        try{
            mailSender.send(preparator);
        }
        catch(MailException e){
            e.printStackTrace();
        }
    }

    private byte[] getSalt() {
        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[16];
        random.nextBytes(salt);
        return salt;
    }

    private String validateNickName(String nickname) throws Exception {
        if(nickname.length() < 3){
            throw new NickNameShortException("닉네임 길이가 짧습니다.");
        }
        else{
            return nickname;
        }
    }

    private String sha256(String password, byte[] salt) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        md.update(salt);
        return bytesToHex(md.digest(password.getBytes()));
    }

    private String bytesToHex(byte[] digest) {
        StringBuilder builder = new StringBuilder();
        for (byte b : digest) {
            builder.append(String.format("%02x", b));
        }
        return builder.toString();
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserDto> getAllUsers() {
        LOGGER.info("getAllUsers 메서드가 userService에서 호출되었습니다.");
        List<UserDto> userDtoList = new ArrayList<UserDto>();
        List<User> userList = userDAO.getAllUsers();
        for (User user:
             userList) {
            UserDto userDto = new UserDto();
            userDto.setIntro(user.getIntro());
            userDto.setEmail(user.getEmail());
            userDto.setNickname(user.getNickname());
            userDto.setUsername(user.getUsername());
            userDtoList.add(userDto);
        }

        return userDtoList;
    }


    @Override
    public boolean deleteUser(String email) {
        return false;
    }

    @Override
    public boolean banUser(String nickname, int days) {
    	User user = userDAO.checkNickname(nickname);
    	if(user != null) {
    		user.setIsBan((byte)1);
    		userDAO.updateUser(user);
    		return true;
    	}
    	return false;
    }

    @Override
    @Transactional(readOnly = true)
    public UserDto login(UserDto userDto) throws NoSuchAlgorithmException {
        LOGGER.info("로그인 메서드가 userService에서 호출되었습니다.");
        LOGGER.info(userDto.toString());
        User user = userDAO.getUser(userDto.getEmail());
        if(user == null){
            LOGGER.info("email 주소가 존재하지 않습니다.");
            throw new RuntimeException();
        }
        if(user.getIsBan() == 1) return null;
        // TO-DO: User가 isBan인 경우 BanList에 접근하여 Ban 지속 기간에 오늘이 포함되는지 확인할 것
        String tempPassword = sha256(userDto.getPassword(), user.getSalt().getBytes());
        if(user.getPassword().equals(tempPassword)){
            UserDto loginUser = new UserDto();
            loginUser.setIntro(user.getIntro());
            loginUser.setNickname(user.getNickname());
            loginUser.setUsername(user.getUsername());
            return loginUser;
        }
        else{
            LOGGER.info("비밀번호가 틀렸습니다.");
            return null;
        }
    }

    @Override
    @Transactional(readOnly = true)
    public boolean checkEmail(String email) {
        LOGGER.info("checkEmail 메서드가 userService에서 호출되었습니다.");
        if(userDAO.getUser(email) != null){
            LOGGER.info("중복 이메일 있음");
            return false;
        }
        else{
            return true;
        }
    }

    @Override
    @Transactional(readOnly = true)
    public boolean checkNickname(String nickname) {
        LOGGER.info("checkNickname 메서드가 userService에서 호출되었습니다.");
        if(userDAO.checkNickname(nickname) != null){
            LOGGER.info("중복 닉네임 있음");
            return false;
        }
        else{
            return true;
        }
    }

    @Override
    @Transactional(readOnly = true)
    public boolean verifyEmail(String email, String salt) {
        return userDAO.verifyEmail(email, salt);

    }

	@Override
	public void preprocessMail(UserDto userDto) {
		User user = userDAO.getUser(userDto.getEmail());
		StringBuilder sb = new StringBuilder();

        sb.append("Hello ").append(userDto.getUsername()).append("\n").append("Please click this link to finalize your signup.")
                        .append("\n").append("https://i8a403.p.ssafy.io/user/verifyemail/").append(userDto.getEmail()).append("/").append(user.getEmailSalt());
        sendMail(userDto.getEmail(), "RealCart Email Verification", sb.toString());
		
	}

	@Override
	public boolean clearUserBan(String nickname) {
		User user = userDAO.checkNickname(nickname);
    	if(user != null) {
    		user.setIsBan((byte)0);
    		userDAO.updateUser(user);
    		return true;
    	}
    	return false;
	}

    @Override
    public boolean findPwd(String email) {
        User user = userDAO.getUser(email);
        if(user == null){
            return false;
        }
        else{
            byte[] salt = getSalt();
            StringBuilder sb = new StringBuilder();
            sb.append("https://i8a403.p.ssafy.io/api/user/changepwd/").append(user.getEmail()).append("/").append(user.getSalt()).append("\n");
            sb.append("위 주소로 접속해주십시오.").append("\n").append("새로운 비밀번호는 ").append(user.getPassword()).append("입니다");
            Thread thread = new Thread(new Email(user.getEmail(), sendFrom, CHANGEPWD, sb.toString(), mailSender));
            thread.start();
            return true;
        }
    }

    @Override
    public boolean changePwd(String email, String salt) throws NoSuchAlgorithmException {
        User user = userDAO.getUser(email);
        if(user != null && user.getSalt().equals(salt)){
            byte[] newSalt = getSalt();
            user.setSalt(bytesToHex(newSalt));
            user.setPassword(sha256(user.getPassword(), bytesToHex(newSalt).getBytes()));
            userDAO.updateUser(user);
            return true;
        }
        return false;
    }
	@Override
	public UserDto updateUser(String email, UserDto userDto) throws NoSuchAlgorithmException {
		User user = userDAO.getUser(email);
		if(user == null) return null;
		if(userDto.getNickname().length() < 3) return null;
		User checkUser = userDAO.checkNickname(userDto.getNickname());
		if(checkUser == null || user.equals(checkUser)) {
			user.setNickname(userDto.getNickname());
		}
		if(userDto.getPassword() != null && userDto.getPassword().length() >= 8) {
			byte[] salt = getSalt();
			user.setSalt(bytesToHex(salt));
			user.setPassword(sha256(userDto.getPassword(), bytesToHex(salt).getBytes()));
		}
		userDAO.updateUser(user);
		UserDto newUserDto = new UserDto().builder()
				.email(user.getEmail())
				.intro(user.getIntro())
				.nickname(user.getNickname())
				.username(user.getUsername())
				.build();
		return newUserDto;
	}
}

class Email implements Runnable{

    private String sendTo;
    private String sendFrom;
    private String mailTitle;
    private String mailContent;
    private JavaMailSender mailSender;

    public Email(String sendTo, String sendFrom, String mailTitle, String mailContent, JavaMailSender mailSender) {
        this.sendTo = sendTo;
        this.sendFrom = sendFrom;
        this.mailTitle = mailTitle;
        this.mailContent = mailContent;
        this.mailSender = mailSender;
    }

    @Override
    public void run() {
        MimeMessagePreparator preparator = new MimeMessagePreparator() {
            @Override
            public void prepare(MimeMessage mimeMessage) throws Exception {
                final MimeMessageHelper message = new MimeMessageHelper(mimeMessage,true,"UTF-8");
                message.setTo(sendTo);
                message.setFrom(sendFrom);
                message.setSubject(mailTitle);
                message.setText(mailContent, true);

            }
        };
        try{
            mailSender.send(preparator);
        }
        catch(MailException e){
            e.printStackTrace();
        }
    }
}