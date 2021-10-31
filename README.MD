# 타입스크립트 스터디

### 프로젝트 폴더를 만들고 타입스크립트 설치하기

```javascript
// package.json 초기화
yarn init -y

// 타입스크립트 설치
// ts-node 모듈도 같이 설치( 바로 컴파일되도록 도와주는 모듈 )
yarn add typescript ts-node

// tsc 파일을 하나 만들어서 실행
yarn run tsc

// tsconfig.json 에서 "outDir" 위치 바꿔주기 (./dist)
node ./dist/practics.js

// Js 파일 생성없이, 바로 ts 실행
yarn run ts-node ./src/practice.ts
```
