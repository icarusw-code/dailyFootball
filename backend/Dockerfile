FROM openjdk:11-jdk
VOLUME /tmp
ARG JAR_FILE=build/libs/dailyFootball.jar
COPY ${JAR_FILE} dailyFootball.jar

ENTRYPOINT ["java", "-jar", "/dailyFootball.jar"]