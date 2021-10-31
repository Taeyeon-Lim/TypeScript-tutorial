// 시작
// 1. packgage.json 초기화
// yarn init -y
// 2. 타입스크립트 설치
// yarn add typescript ts-node
// 3. 실행
// yarn run tsc
// 4. tsconfig에서 dir 옵션(./dist) 설정 후 실행(src 폴더 생성)
// node ./dist/practice.js
// 5. js파일 생성 없이, ts컴파일하기
// yarn run ts-node ./src/practics.ts

// 시작: 사용해보기 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
// 타입 생략 가능
let count = 0;

// 지정된 타입은 수정이 안됨
// count = '122'

const done: boolean = false;

const number: number[] = [1, 2, 3];
const msg: string[] = ['hello', 'world'];

// 문자열 배열에 숫자 역시 불가
// msg.push(1);
msg.push('문자열만');
// console.log(msg);

// 두 가지 타입을 허용함
let mightBeUndefined: string | undefined = 'abcdefg';
let nullableNumber: number | null = null;

// 커스텀한 타입 적용 가능
let color: 'red' | 'orange' = 'red';

// console.log(mightBeUndefined, nullableNumber, color);

// 함수의 파라미터에 타입을 선언
function sum1(x: string, y: number) {
  return x + y;
}
console.log(sum1('123', 123));

// 함수의 반환값의 타입 지정: 숫자가 아닌 문자열
// function sum2(x: number, y: number): number {
//     const string = ''+ x + y
//     return string
// }

// 파라미터가 배열이고 반환값이 숫자인 함수
function sumArr(numbers: number[]): number {
  return numbers.reduce((acc, cur) => acc + cur, 0);
}
console.log(sumArr([1, 2, 3, 4]));

// 아무것도 반환하지 않는 경우
function returnNo(): void {
  console.log('아무것도 반환하지 않음');
}
console.log('=> ', returnNo());

// 반환 값 타입이 여러가지인 경우
function returnStrOrNum(): string | number {
  // 문자열, 숫자 모두 가능
  // return 1;
  return '1';
}

// 클래스 타입 지정할 수 있는 interface ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
interface Shape {
  getArea(): number;
}
// Shape 내부를 구현하지 않으면 Circle에 에러표시
// class Circle implements Shape {}

// Circle 클래스 생성 (Shape 요건 충족)
class Circle implements Shape {
  // radius는 이니셜라이저가 없고, 생성자에 할당되어 있지 않음 => constructor 구현
  radius: number;

  constructor(radius: number) {
    this.radius = radius;
  }

  getArea() {
    return this.radius * this.radius * Math.PI;
  }
}

// Rectangle 클래스 생성 (Shape 요건 충족)
class Rectangle implements Shape {
  width: number;
  height: number;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
  getArea() {
    return this.width * this.height;
  }
}

// 타입 지정해도 되고, 생략해도 됨: Circle
const circle: Circle = new Circle(5);
const rectangle = new Rectangle(2, 5);

// 함수로 구현해서 사용
// function getCircleArea(circle: Circle) {
//   return circle.getArea(); // 5*5*3.14
// }
// console.log(getCircleArea(circle));
// function getRectangle(rectangle: Rectangle) {
//   return rectangle.getArea(); // 2*5
// }
// console.log(getRectangle(rectangle));

// 한번에 "getCircleArea" + "getRectangle" 하기
const shapes: Shape[] = [circle, rectangle];
shapes.forEach(shape => {
  console.log(shape.getArea());
});

// Rectangle 클래스 수정하기
class Rectangle2 implements Shape {
  // width: number;
  // height: number;

  // public 또는 private 사용하면 생략 가능 (타입스크립트에서만 구분됨 => js로 컴파일된 파일은 public이나 private나 동일)
  constructor(public width: number, private height: number) {
    // this.width = width;
    // this.height = height;
  }
  getArea() {
    return this.width * this.height;
  }
}
const privateOrPublic = new Rectangle2(3, 4);
// privateOrPublic.width   검색O
// privateOrPublic.height  검색X

// interface를 사용해서 객체의 타입을 지정하기 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
interface Person {
  name: string;
  // ? = 있을 수도 있고 없을 수도 있다.
  age?: number;
}
const person: Person = {
  name: 'abcdef',
  // person 객체는 age가 "없어"도 문제가 없음
};

// 새 interface로 모두 지정해준 경우
interface Developer {
  name: string;
  age?: number;
  skills: string[];
}
const expert: Developer = {
  name: '타입스크립터',
  // expert 객체는 age가 "있어"도 문제가 없음
  age: 15,
  skills: ['javaScript', 'typeScript'],
};

// Developer가 Person을 상속받는 경우
interface Developer2 extends Person {
  // name: string;
  // age?: number;
  skills: string[];
}
const expert2: Developer2 = {
  // name, age가 있어야 문제가 없음
  name: '리액터',
  age: 15,
  skills: ['react', 'typeScript'],
};

// interface 대신 type 사용 (= 타입 앨리어스[별칭])
// 이전 Person과 동일
type Person2 = {
  name: string;
  age?: number;
};
// 이전 Developer2처럼 상속받는 경우와 동일
type Developer3 = Person & {
  skills: string[];
};

// interface로 안되는 것들
type People = Person[];
const people: People = [person, expert];
// console.log(people);

type Color = 'red' | 'orange' | 'yellow';
const oneColor: Color = 'orange';
// console.log(oneColor);

// interface vs type ?
// 대부분의 경우는 아무거나 사용해도 상관없음
// 라이브러리 타입 = interface 권장하지만, 둘 중 하나만 사용해서 일관성있게 작성할 것
