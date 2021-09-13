# vue.js 프론트 빌드만을 위해 node 이미지를 사용하여 작업하는 과정 
### vue.js 빌드만을 위한 node 이미지를 사용 
### 작업 디렉토리를 /hompage로 설정한 후, 
### 패키지 설치를 위해 package.json을 작업 디렉토리로 옮긴 후 설치 
### 나머지 프론트 소스코드와 리소스를 복사하여 빌드 진행  
FROM node:12.2.0-alpine as build-stage 
WORKDIR /app
COPY ./package*.json ./ 

RUN npm install 
COPY . . 
RUN npm run build 

# 빌드한 프론트 결과물을 nginx 이미지에 옮겨서 실행하는 과정 
### 필요없는 기존 conf 문서를 삭제하고, nginx에 설정하기 위한 conf를 복사 
### build-stage(=상위 node 이미지)에서 빌드한 결과물을 nginx로 옮긴 후, 
### 80번 포트 개방과 "nginx -g daemon off;" 명령을 실행 
FROM nginx:latest as production-stage 

COPY ./app.conf /etc/nginx/conf.d/app.conf
COPY --from=build-stage ./app/build /usr/share/nginx/html/app
EXPOSE 80 
CMD ["nginx", "-g", "daemon off;"]