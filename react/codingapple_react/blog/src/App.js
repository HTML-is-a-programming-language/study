// (참고) 에러메세지는 터미널/브라우저에서 확인 또는 개발자도구
import logo from './logo.svg';
import './App.css'; // (참고) css파일 쓰려면 상단에서 import 'css파일 경로'
import { useState } from 'react'; // state 만드는 법 1. import { useState }

function App() {

  let post = '역삼 우동 맛집'; // 대충 서버에서 가져온 실제 데이터임, 자료 잠깐 저장할 땐 변수, Q. 왜 state 써야함? 일반 변수는 갑자기 변경되면 html에 자동으로 반영안됨
  // document.querySelector('h4').innerHTML = 'post'; 변수에 있던 자료를 html에 넣고 싶으면
  // Q. state 언제 써야함? 변동시 자동으로 html에 반영되게 만들고 싶으면 state 쓰셈
  // 빡대가리식 정리 : 자주변경될거같은 html 부분은 state로 만들어놓기 / 변경할 일이 없는 데이터들, 굳이 html에 표기가 피룡없는 데이터들은 그냥 변수에 저장
  let [글제목, b] = useState(['남자코트 추천', '강남 우동맛집', '파이썬독학']); // 자료 잠깐 저장할 땐 state 써도 됩니다, state 만드는 법 2. useState(보관할 자료), state 만드는 법 3. let[a, b] 작명은 직관적으로 (a에는 state에 보관했던 자료 나옴, b는 state 변경도와주는 함수), useState('남자 코트 추천') ['남자 코트 추천', 함수] 남음, 새로운 문법 배웠으면 언제 쓸지도 생각해봐야함, Q. 왜 state 써야함? state는 갑자기 변경되면 state 쓰던 html은 자동 재렌더링됨, 장점 : UI 기능 개발도 매우 편리해지고 OT강의에서 설명드렸던 사이트들처럼 스무스하게 동작
  // let [logo, setLogo] = useState('ReactBlog') // 로고글자는 state로 넣으면 쓸데없어보임

  // let num = [1, 2]; // (참고) Destructuring 문법: array 안에 있는 내용을 변수로 빼서 사용하는 방법
  // let [a, c] = [1, 2];
  // let a = num[0];
  // let c = num[1];

  return (
    // return () 안에는 병렬로 태그 2개 이상 기입금지
    <div className="App"> {/* html은 당연히 .html 파일에 적어야 .js 파일인데도 적히는 이유는 실은 html이 아니라 JSX임 */}
      {/* 리액트에서 <div>만드는 법 React.createElement('div'), null, 'Hello World' (JSX 사용하면) <div></div> */}
      {/* 상단메뉴 만들어보기 */}
      <div className="black-nav"> {/* JSX 문법1. class 넣을 땐 className */}
        <h4>ReactBlog</h4> {/* JSX 문법3. style 넣을 땐 style={{스타일명 : '값'}} (style={{color : 'red', fontSize : '16px'}}) 스타일명은 카멜케이스로 작성 */}
      </div>
      {/* 글목록 UI 만들기 */}
      {/* (숙제) 제목들을 state로 만들어보기 */}
      <div className="list">
        <h4>{ 글제목[0] }</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{ 글제목[1] }</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{ 글제목[2] }</h4>
        <p>2월 17일 발행</p>
      </div>
      {/* <h4>{ post }</h4> */} {/* 실제서비스면 서버 이런데서 블로그 글 가져와서 보여줄듯 */} {/* JSX 문법2. 데이터바인딩은 (변수넣을 땐) {중괄호} */}
    </div>
  );
}

export default App;