FROM azul/zulu-openjdk-alpine:11
COPY build/libs/app.jar app.jar
EXPOSE 8081
EXPOSE 8581
CMD ["java", "-jar", "app.jar"]