# RealCart Porting Manual
- [Web FrontEnd](#web-frontend)
- [Web BackEnd](#web-backend)
- [Signaling Server](#signal-server)
- [Game Server](#game-server)
- [IOT](#iot)
## Web BackEnd
---
### What you need
- STS or Intellij (I am using both STS Version 3 and Intellij IDEA 2021.2)
- Java 11
- Springboot Version 2.7.7
- Gradle 7.6

### Dependencies
	implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
	implementation 'org.springframework.boot:spring-boot-starter-data-redis'
	implementation 'org.springframework.boot:spring-boot-starter-mail'
	implementation 'org.springframework.boot:spring-boot-starter-security'
	implementation 'org.springframework.boot:spring-boot-starter-oauth2-client'
	implementation 'org.springframework.boot:spring-boot-starter-validation'
	implementation 'org.springframework.boot:spring-boot-starter-web'
	implementation 'org.springframework.boot:spring-boot-starter-websocket'
	implementation 'org.springframework.boot:spring-boot-starter-test'
	implementation 'org.springframework.boot:spring-boot-starter-actuator'
	implementation 'org.springdoc:springdoc-openapi-ui:1.6.14'
	implementation 'io.jsonwebtoken:jjwt-api:0.11.2'
	implementation 'com.google.code.gson:gson:2.10.1'
	implementation 'io.micrometer:micrometer-registry-prometheus:1.10.3'
	compileOnly 'org.projectlombok:lombok'
	runtimeOnly 'com.mysql:mysql-connector-j'
	runtimeOnly 'io.jsonwebtoken:jjwt-impl:0.11.2'
	runtimeOnly 'io.jsonwebtoken:jjwt-jackson:0.11.2'
	annotationProcessor 'org.projectlombok:lombok'
	testImplementation 'org.springframework.boot:spring-boot-starter-test'
	testImplementation 'org.springframework.security:spring-security-test'

### Application.yml
---
#### JPA (Case Sensitivity)
- jpa.hibernate.namig.physical-strategy: org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl 
#### Mail (Sending Email via GMail)
- mail.host: smtp.gmail.com
- mail.username: {YOUR_EMAIL}
- mail.port: 587
- mail.properties.mail.smtp.starttls.enable: true
- mail.properties.mail.smtp.timeout: 5000
- mail.properties.mail.smtp.auth: true
- mail.properties.mail.smtp.password: {YOUR_PASSWORD}
#### Spring Security (OAUTH2)
- security.oauth2.client.registration.google.clientId: {YOUR_ID}
- security.oauth2.client.registration.google.clientSecret: {YOUR_PASSWORD}
- security.oauth2.client.registration.google.scope: email, profile
- security.oauth2.client.registration.google.redirect-uri: {YOUR_REDIRECT_ADDRESS}
#### JWT
- app.auth.tokenSecret: {YOUR_TOKEN_SECRET}
- app.auth.tokenExpiry: {ACCESS_TOKEN_EXPIRY}
- app.auth.tokenSecret: {REFRESH_TOKEN_EXPIRY}
- app.oauth2.authorizedRedirectUris: {YOUR_AUTHORIZED_URIS}
- jwt.secret: {YOUR_JWT_SECRET}
#### MatterMost Notification
- notification.mattermost.webhook-url: {YOUR_WEBHOOK_URL}
- notification.mattermost.enabled: true
#### CORS
- cors.allowed-origins: {YOUR_ALLOWED_ORIGINS}
- cors.allowed-methods: {YOUR_ALLOWED_METHODS}
- cors.allowed-headers: {Your_ALLOWED_HEADERS}
- cors.max-age {MAX_AGE}

### Third Party Apps
| App | Reference |
|-----|----|
|Gmail|https://support.google.com/a/answer/176600?hl=en|
|Google OAUTH2|https://developers.google.com/identity/openid-connect/openid-connect|
|MatterMost|https://developers.mattermost.com/integrate/webhooks/incoming|


### DB
We use MySql version 8.0.31
[Dump Files](https://lab.ssafy.com/s08-webmobile3-sub2/S08P12A403/-/tree/master/exec/Dump)

## Signal Server
---
### What you need
- STS or Intellij (I am using both STS Version 3 and Intellij IDEA 2021.2)
- Java 11
- Springboot Version 2.7.8
- Gradle 7.6

### Dependencies
	implementation 'org.springframework.boot:spring-boot-starter-aop'
	implementation 'org.springframework.boot:spring-boot-starter-web'
	implementation 'org.springframework.boot:spring-boot-starter-websocket'
	implementation 'org.springframework.boot:spring-boot-starter-validation'
	implementation 'org.kurento:kurento-client:6.18.0'
	testImplementation 'org.springframework.boot:spring-boot-starter-test'
	compileOnly 'org.projectlombok:lombok'
	annotationProcessor 'org.projectlombok:lombok'

### Application.yml
#### MatterMost
Same as MatterMost Setting in Web BackEnd

### [Media Server Install Guide](#https://doc-kurento.readthedocs.io/en/latest/user/installation.html)

### Notice
Signal Server must be with Media Server

