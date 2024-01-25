import logo from './logo.svg';
import './App.css';
import { useState } from 'react'; // state 사용 시 작성

function App() {

  let post = '강남 우동 맛집';
  let [글제목1, b1] = useState('남자코트 추천'); // state 사용 시 작성 (a는 보관했던 자료, b는 state 변경을 도와주는 함수)
  let [글제목2, b2] = useState('강남 우동맛집');
  let [글제목3, b3] = useState('파이썬독학');
  //let [글제목, b] = useState('남자코트 추천', '강남 우동맛집', '파이썬독학');
  //let [logo, setLogo] = useState('ReactBlog'); 자주 변경 안돼서 의미 없음

  // 왜 state 써야함?
  // state가 변경되면 html이 재렌더링됨
  // 변동시 자동으로 html에 반영되게 만들고 싶으면 state 사용
  // 자주변경될거같은 html 부분은 state로 만들어놓기

  // Destructuring 문법
  let num = [1, 2]; // array

  let [a, c] = [1, 2];

  //let a = num[0];
  //let c = num[1];

  return (
    <div className="App">
      <div className="black-nav">
        <h4>ReactBlog</h4>
      </div>
      <div className="list">
        <h4>{ 글제목1 }</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{ 글제목2 }</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{ 글제목3 }</h4>
        <p>2월 17일 발행</p>
      </div>
    </div>
    // <div></div> return() 안에는 병렬로 태그 2개 이상 기입금지
  );
}

export default App;
