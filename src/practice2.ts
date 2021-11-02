// Generics : 여러 종류에 대한 호환을 위해 사용 (= 타입 유추)

// any로 설정할 경우, 어떤 값이 들어올 지 모름 => 자동완성X
// object로 해도, merged에 커서를 올려도 { 빈 객체 }만 보임
// 아무 타입을 지정하지 않아도, 암시적으로 any가 설정되므로 동일

// function merge(a: object, b: object) {
function merge(a: any, b: any) {
  return {
    ...a,
    ...b,
  };
}
const merged = merge({ foo: 1 }, { bar: 2 });
// merged 내부 foo, bar 자동 완성이 안됨
// merged.foo
// merged.bar

// 위와 같은 경우, Generics를 사용할 수 있음
function merge2<T1, T2>(a: T1, b: T2) {
  return {
    ...a,
    ...b,
  };
}
const merged2 = merge2({ foo: 3 }, { bar: 4, foobar: 'string' });
// merged2 내부 foo, bar 자동 완성됨
// merged.foo
// merged.bar

// Generics 사용2 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
function wrap<T>(param: T) {
  return { param };
}
const wrapped = wrap('10');
// . 타입 유추 가능('10' = string)
// wrapped.

// interface 에서의 Generics 사용 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
interface Items<T> {
  list: T[];
}
const items: Items<string> = { list: ['a', 'b', 'c'] };
const items2: Items<number> = { list: [1, 2, 3] };

// type 앨리어스에서의 Generics 사용 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
type Items2<T> = {
  list: T[];
};
const items3: Items2<number> = { list: [4, 5, 6] };

// interface 와 type 어느 것을 사용해야하나?
// type은 타입 내에 union이 들어가는 순간, 상속과 확장 기능(extends, implements) 사용 불가
// 따라서, union, tuple이 필요한 경우에만 사용하는 것이 좋음.

// 제너릭은 다중으로 사용도 가능
type Items3<T, V> = {
  list: T[];
  value: V;
};
const items4: Items3<number, string> = {
  list: [7, 8, 9],
  value: '문자열',
};

// 클래스에서의 Generics ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
class Queue<T> {
  list: T[] = [];

  get length() {
    return this.list.length;
  }

  enqueue(item: T) {
    // list의 타입 = T이고, item도 T이므로 문제 없음
    this.list.push(item);
  }

  dequeue() {
    return this.list.shift();
  }
}
// 큐 생성, T = string 타입
const queue = new Queue<string>();
queue.enqueue(' 1 > 디큐!');
queue.enqueue(' 2 > 디큐!');
queue.enqueue(' 3 > 디큐!');
queue.enqueue(' 4 > 디큐!');
queue.enqueue(' 5 > 디큐!');
// 큐 내부에 데이터가 없어질 때까지 반복
while (queue.length > 0) {
  console.log(queue.dequeue());
}
