FROM azul/zulu-openjdk-alpine:11.0.17 AS builder
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .
COPY src src
COPY build/libs/TransferServer-1.0-SNAPSHOT.jar app.jar
RUN chmod +x ./gradlew
RUN ./gradlew bootJAR

FROM azul/zulu-openjdk-alpine:11.0.17
COPY --from=builder build/libs/TransferServer-1.0-SNAPSHOT.jar app.jar
EXPOSE 8081
EXPOSE 8581
CMD ["java", "-jar", "app.jar"]