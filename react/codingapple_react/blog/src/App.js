/* eslint-disable */ /* warning 메세지 다 없에줌. */

// (참고) 에러메세지는 터미널/브라우저에서 확인 또는 개발자도구
import logo from './logo.svg';
import './App.css'; // (참고) css파일 쓰려면 상단에서 import 'css파일 경로'
import { useState } from 'react'; // state 만드는 법 1. import { useState }

function App() {

  let post = '강남 우동 맛집'; // 대충 서버에서 가져온 실제 데이터임, 자료 잠깐 저장할 땐 변수, Q. 왜 state 써야함? 일반 변수는 갑자기 변경되면 html에 자동으로 반영안됨
  // document.querySelector('h4').innerHTML = 'post'; 변수에 있던 자료를 html에 넣고 싶으면
  // Q. state 언제 써야함? 변동시 자동으로 html에 반영되게 만들고 싶으면 state 쓰셈
  // 빡대가리식 정리 : 자주변경될거같은 html 부분은 state로 만들어놓기 / 변경할 일이 없는 데이터들, 굳이 html에 표기가 피룡없는 데이터들은 그냥 변수에 저장
  let [글제목, 글제목변경] = useState(['남자코트 추천', '강남 우동맛집', '파이썬독학']); // 자료 잠깐 저장할 땐 state 써도 됩니다, state 만드는 법 2. useState(보관할 자료), state 만드는 법 3. let[a, b] 작명은 직관적으로 (a에는 state에 보관했던 자료 나옴, b는 state 변경도와주는 함수), useState('남자 코트 추천') ['남자 코트 추천', 함수] 남음, 새로운 문법 배웠으면 언제 쓸지도 생각해봐야함, Q. 왜 state 써야함? state는 갑자기 변경되면 state 쓰던 html은 자동 재렌더링됨, 장점 : UI 기능 개발도 매우 편리해지고 OT강의에서 설명드렸던 사이트들처럼 스무스하게 동작
  // 빡대가리식 정리 : state가 array/object면 독립적 카피본(shallow copy)을 만들어서 수정해야 함
  // let [logo, setLogo] = useState('ReactBlog') // 로고글자는 state로 넣으면 쓸데없어보임

  // let num = [1, 2]; // (참고) Destructuring 문법: array 안에 있는 내용을 변수로 빼서 사용하는 방법
  // let [a, c] = [1, 2];
  // let a = num[0];
  // let c = num[1];

  let [따봉, 따봉변경] = useState([0,0,0]);

  /*function 함수(){ // 긴 코드를 한 단어로 묶어주는 문법
    console.log(1);
  }*/

  // 2. UI의 현재 상태를 state로 저장
  let [modal, setModal] = useState(false);

  // map() 사용법, ()안에 들어가는 function(){} 을 콜백함수라고 함, 1. array 자료 갯수만큼 함수안의 코드 실행해줌, 2. 함수의 파라미터는 array안에 있던 자료임, 3. return에 뭐 적으면 array로 담아줌(array 자료 갯수만큼 담아줌)
  /*[1,2,3].map(function(a){
    return '1233211'
  })*/

  return (
    // return () 안에는 병렬로 태그 2개 이상 기입금지
    <div className="App"> {/* html은 당연히 .html 파일에 적어야 .js 파일인데도 적히는 이유는 실은 html이 아니라 JSX임 */}
      {/* 리액트에서 <div>만드는 법 React.createElement('div'), null, 'Hello World' (JSX 사용하면) <div></div> */}
      {/* 상단메뉴 만들어보기 */}
      <div className="black-nav"> {/* JSX 문법1. class 넣을 땐 className */}
        <h4>ReactBlog</h4> {/* JSX 문법3. style 넣을 땐 style={{스타일명 : '값'}} (style={{color : 'red', fontSize : '16px'}}) 스타일명은 카멜케이스로 작성 */}
      </div>

      {/* (숙제) 버튼누르면 글제목 가나다순 정렬 기능 만들기 */}
      <button onClick={()=>{
        let copy = [...글제목];
        copy.sort();
        글제목변경(copy)
      }}>가나다순정렬</button>

      {/* (숙제) 버튼누르면 첫 글이 '여자코트 추천'으로 바뀌는 기능만들기 */}
      <button onClick={()=>{
        //글제목[0] = '여자코트 추천'; array를 수정했지 변수에 있는 화살표는 수정안됨
        // let copy = 글제목; 이 변수에 저장되어있던건 화살표밖에 없음, let 글제목에 있던 화살표가 복사됨, 변수1 & 변수2 화살표가 같으면 변수1 == 변수2 비교해도 true 나옴
        // console.log(copy == 글제목); copy는 기존state와 달라지지 않았다고 생각, reference data type 이라서 그럼
        let copy = [...글제목]; // [state변경함수 특징] 기존 state와 신규 state를 비교해서 기존 state == 신규 state 의 경우 변경안해줌 / [array/object 특징] / [...] 괄호 벗겨주세요 이러면 화살표도 달라짐
        //let arr = [1,2,3]; // array/object 담은 변수엔 화살표만 저장됨 / RAM이라는 공간에 저장되고 [1,2,3]이 어딨는지 알려주는 화살표만 들어있음
        copy[0] = '여자코트 추천';
        //글제목변경(['여자코트 추천','강남 우동맛집','파이썬 독학']);
        //글제목변경(글제목); 기존 state도 글제목, 신규 state도 글제목 변동된 적 없음 글 제목에 저장되어있던 화살표 바뀐 적 없음
        글제목변경(copy);
      }}>{/* Q. 버튼누르면 첫 글 '여자코트 추천'으로 수정 */}글수정</button>

      {/* 글목록 UI 만들기 */}
      {/* (숙제) 제목들을 state로 만들어보기 */}
      {/* 반복문으로 같은 html 반복생성하는 법 */}
      {/* <div className="list">
        <h4>{ 글제목[0] } <span onClick={() => { 따봉변경(따봉+1) }}> onClick={} 안에는 함수이름을 넣어야함 / 함수만드는 문법 바로 넣어도 상관없음 function(){console.log(1)} 또는 () => {console.log(1)} state 변경하는 법 등호로 변경금지 state변경함수(새로운state) 👍 구글크롬 주소창에서 오른쪽 버튼 → 그림 이모티콘 </span> {따봉} 페이지안에서 자주 바뀌는 것들은 state로 만들면 좋다고 했음</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{ 글제목[1] }</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        Q. 제목 클릭시 모달창 띄우기? => 클릭시 state만 조절하면 됩니다
        숙제 : Q. 제목 또 누르면 모달창 사라지게?
        <h4 onClick={()=>{ setModal(!modal) }}>{ 글제목[2] }</h4>
        <p>2월 17일 발행</p>
      </div> */}
      {/* <h4>{ post }</h4> */} {/* 실제서비스면 서버 이런데서 블로그 글 가져와서 보여줄듯 */} {/* JSX 문법2. 데이터바인딩은 (변수넣을 땐) {중괄호} */}

      {/* 같은 html 반복생성하는 법 보통은 for 문법쓰면 되는데.. 중괄호 안에서는 for 반복문 사용불가 */}
      {/* map()으로 같은 html 반복생성하는 법, map을 쓰고나면 그 자리에 [] 남음, 결론 : 비슷한 html 반복생성하려면 map() 쓰면 됩니다 */}
      {
        // [<div>안녕</div>,<div>안녕</div>,<div>안녕</div>] 리액트는 array 안에 html 담아놔도 잘 보여줌
        // map() 함수 1. 왼쪽 array 자료만큼 내부코드 실행해줌 2. return 오른쪽에 있는걸 array로 담아줌 3. 유용한 파라미터 2개 사용가능
        글제목.map(function(a, i){ // 실제 블로그 글 개수만큼 생성, i는 반복문 돌 때 마다 0부터 1씩 증가하는 정수
          return (
            // (참고2) 반복문으로 html 생성하면 key={html마다 다른숫자} 추가해야함
            <div className="list" key={i}>
              {/* 오늘의 숙제 : 따봉갯수 개별로 기록하기 */}
              <h4>{ 글제목[i] }
                <span onClick={() => {
                  let copy = [...따봉];
                  copy[i] = copy[i] + 1;
                  따봉변경(copy);
                }}>👍</span> {따봉[i]}
              </h4>
              <p>2월 17일 발행</p>
            </div>
          )
        })
      }

      {/* (참고1) 일반 for 반복문 써서 html 생성하려면 1. html들을 담아둘 array 자료를 하나 만들어줍니다. 2. 일반 for 반복문을 이용해서 반복문을 돌림 3. 반복될 때 마다 array 자료에 <div> 하나씩 추가해줍니다. 4. 원하는 곳에서 {array자료} 사용하면 됩니다. */}
      {/*
        function App (){
          var 어레이 = [];
          for (var i = 0; i < 3; i++) {
            어레이.push(<div>안녕</div>)
          }
          return (
            <div>
              { 어레이 }
            </div>
          )
        }
      */}


      {/* <Modal></Modal> <함수명></함수명>, <함수명/> 둘 다 가능 / 어떤걸 컴포넌트로 만들면 좋은가 1. 반복적인 html 축양할 때 2. 큰 페이지들 3. 자주변경되는 것들 */}
      {/* 컴포넌트 아무거나 만들기 */}
      {/* 동적인 UI 만드는 step 1. html css로 미리 디자인완성 2. UI의 현재 상태를 state로 저장 3. state에 따라 UI가 어떻게 보일지 작성 */}
      {/* 3. state에 따라 UI가 어떻게 보일지 작성 / 삼항연산자 (ternary operator) 조건식 ? 참일때 실행할 코드 : 거짓일 때 실행할 코드 */}
      {/* 리액트에서는 버튼누르면 모달창 스위치(state)만 건드림 / 그냥 자바스크립트였으면 버튼누르면 모달창 html을 직접 건드림 */}
      {
        modal == true ? <Modal/> : null
      }
    </div>
  );
}

// const Modal = () => {
//   return (
//     <div></div>
//   );
// }; // (참고) 컴포넌트 만드는 문법2 / const로 만들면 중복됐을 때 콘솔창에서 알려줌

// 컴포넌트 만드는 법 1. function 만들고 2. return() 안에 html 담기 3. <함수명></함수명> 쓰기 / 다른 function 바깥에 만들어야함 / 작명시 영어대문자로 시작 / return 안에는 두개 이상의 div를 병렬식으로 작성 X / (참고1) return () 안에 html 병렬기입하려면 <div></div> 하나로 감싸기, 의미없는 <div> 대신 <></> 사용가능 (fragment 문법) / 컴포넌트의 단점 : state 가져다쓸 때 문제생김 (A 함수에 있던 변수는 B 함수에서 맘대로 가져다 쓸 수 없음)
function Modal(){
  return (
    // 1. html css로 미리 디자인완성
    <div className="modal-window">
      <h4>제목</h4>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  )
}

export default App;