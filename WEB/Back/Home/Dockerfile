FROM openjdk:11
ARG JAR_FILE=./Home/target/*.jar
COPY ${JAR_FILE} app.jar
EXPOSE 8085
ENTRYPOINT ["java","-jar","/app.jar"]
#CMD [ "app.jar" ]