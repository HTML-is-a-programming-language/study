/* eslint-disable */ /* warning 메세지 다 없에줌. */

// (참고) 에러메세지는 터미널/브라우저에서 확인 또는 개발자도구
import logo from './logo.svg';
import './reset.css';
import './App.css'; // (참고) css파일 쓰려면 상단에서 import 'css파일 경로'
import { useState, useEffect } from 'react'; // state 만드는 법 1. import { useState }
import * as React from 'react'
import { db } from './firebaseConfig';
import { collection, addDoc, query, getDocs, orderBy, deleteDoc, doc, increment, updateDoc } from "firebase/firestore";


function App() {
  let post = '강남 우동 맛집'; // 대충 서버에서 가져온 실제 데이터임, 자료 잠깐 저장할 땐 변수, Q. 왜 state 써야함? 일반 변수는 갑자기 변경되면 html에 자동으로 반영안됨
  // document.querySelector('h4').innerHTML = 'post'; 변수에 있던 자료를 html에 넣고 싶으면
  // Q. state 언제 써야함? 변동시 자동으로 html에 반영되게 만들고 싶으면 state 쓰셈
  // 빡대가리식 정리 : 자주변경될거같은 html 부분은 state로 만들어놓기 / 변경할 일이 없는 데이터들, 굳이 html에 표기가 필요없는 데이터들은 그냥 변수에 저장
  //let [글제목, 글제목변경] = useState(['남자코트 추천', '강남 우동맛집', '파이썬독학']); // 자료 잠깐 저장할 땐 state 써도 됩니다, state 만드는 법 2. useState(보관할 자료), state 만드는 법 3. let[a, b] 작명은 직관적으로 (a에는 state에 보관했던 자료 나옴, b는 state 변경도와주는 함수), useState('남자 코트 추천') ['남자 코트 추천', 함수] 남음, 새로운 문법 배웠으면 언제 쓸지도 생각해봐야함, Q. 왜 state 써야함? state는 갑자기 변경되면 state 쓰던 html은 자동 재렌더링됨, 장점 : UI 기능 개발도 매우 편리해지고 OT강의에서 설명드렸던 사이트들처럼 스무스하게 동작
  let [글제목, 글제목변경] = useState([]);
  // 빡대가리식 정리 : state가 array/object면 독립적 카피본(shallow copy)을 만들어서 수정해야 함
  // let [logo, setLogo] = useState('ReactBlog') // 로고글자는 state로 넣으면 쓸데없어보임

  // let num = [1, 2]; // (참고) Destructuring 문법: array 안에 있는 내용을 변수로 빼서 사용하는 방법
  // let [a, c] = [1, 2];
  // let a = num[0];
  // let c = num[1];

  let [따봉, 따봉변경] = useState([]);

  /*function 함수(){ // 긴 코드를 한 단어로 묶어주는 문법
    console.log(1);
  }*/

  // 2. UI의 현재 상태를 state로 저장
  let [modal, setModal] = useState(false);

  // map() 사용법, ()안에 들어가는 function(){} 을 콜백함수라고 함, 1. array 자료 갯수만큼 함수안의 코드 실행해줌, 2. 함수의 파라미터는 array안에 있던 자료임, 3. return에 뭐 적으면 array로 담아줌(array 자료 갯수만큼 담아줌)
  /*[1,2,3].map(function(a){
    return '1233211'
  })*/

  // (중요) state 만드는 곳은 state 사용하는 컴포넌트들 중 최상위 컴포넌트 (생각 귀찮으면 그냥 App에 만들기)
  let [title, setTitle] = useState(0); // UI 조작하고 싶으면 title이라는 스위치만 조작하면 됩니다

  let [입력값, 입력값변경] = useState('');

  // 응용3. 날짜데이터는?
  let [date, setDate] = useState([]);

  const [postIds, setPostIds] = useState([]);

  const fetchData = async () => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    const titles = [];
    const dates = [];
    const ids = [];
    const likes = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      titles.push(data.title);
      dates.push(data.date);
      ids.push(doc.id);
      likes.push(data.likes || 0);
    });

    글제목변경(titles);
    setDate(dates);
    setPostIds(ids);
    따봉변경(likes);
  };

  useEffect(() => {
    fetchData();
  }, []);

  let [searchModalWindow, setSearchModalWindow] = useState(false);
  let [menuModalWindow, setMenuModalWindow] = useState(false);

  return (
    // return () 안에는 병렬로 태그 2개 이상 기입금지
    <div className="App"> {/* html은 당연히 .html 파일에 적어야 .js 파일인데도 적히는 이유는 실은 html이 아니라 JSX임 */}
      {/* 리액트에서 <div>만드는 법 React.createElement('div'), null, 'Hello World' (JSX 사용하면) <div></div> */}
      {/* 상단메뉴 만들어보기 */}
      {/*<div className="black-nav"> JSX 문법1. class 넣을 땐 className
        <h4>ReactBlog</h4> JSX 문법3. style 넣을 땐 style={{스타일명 : '값'}} (style={{color : 'red', fontSize : '16px'}}) 스타일명은 카멜케이스로 작성
      </div> */}
      <div className="header-wrap">
        <div className="header-container">
          <a href="/" className="home-link">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000">
              <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/>
            </svg>
            <span className="link-text">ReactBlog</span>
          </a>
          <button type="button" className="search-button" onClick={()=>{
            setSearchModalWindow(true);
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000">
              <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
            </svg>
          </button>
        </div>
      </div>
      <div className="header-height"></div>

      <div className="nav-wrap">
          <button className="menu-button" onClick={()=>{
            setMenuModalWindow(true);
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000">
              <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
            </svg>
          </button>
          <div className="nav-container">
            <ul className="nav-list">
              <li className="nav-item">
                <button type="button" className="nav-button active">전체</button>
              </li>
              <li className="nav-item">
                <button type="button" className="nav-button">React</button>
              </li>
              <li className="nav-item">
                <button type="button" className="nav-button">JavaScript</button>
              </li>
              <li className="nav-item">
                <button type="button" className="nav-button">JQuery</button>
              </li>
              <li className="nav-item">
                <button type="button" className="nav-button">CSS</button>
              </li>
              <li className="nav-item">
                <button type="button" className="nav-button">HTML</button>
              </li>
            </ul>
          </div>
      </div>
      <div className="nav-height"></div>

      {/* (숙제) 버튼누르면 글제목 가나다순 정렬 기능 만들기 */}
      <select onChange={()=>{
        let copy = [...글제목];
        copy.sort();
        글제목변경(copy)
      }}>
        <option value="0">업로드 날짜 기준 정렬</option>
        <option value="1">좋아요 수 순 정렬</option>
      </select>

      {/* (숙제) 버튼누르면 첫 글이 '여자코트 추천'으로 바뀌는 기능만들기 */}
      {/*<button onClick={()=>{
        //글제목[0] = '여자코트 추천'; array를 수정했지 변수에 있는 화살표는 수정안됨
        // let copy = 글제목; 이 변수에 저장되어있던건 화살표밖에 없음, let 글제목에 있던 화살표가 복사됨, 변수1 & 변수2 화살표가 같으면 변수1 == 변수2 비교해도 true 나옴
        // console.log(copy == 글제목); copy는 기존state와 달라지지 않았다고 생각, reference data type 이라서 그럼
        let copy = [...글제목]; // [state변경함수 특징] 기존 state와 신규 state를 비교해서 기존 state == 신규 state 의 경우 변경안해줌 / [array/object 특징] / [...] 괄호 벗겨주세요 이러면 화살표도 달라짐
        //let arr = [1,2,3]; // array/object 담은 변수엔 화살표만 저장됨 / RAM이라는 공간에 저장되고 [1,2,3]이 어딨는지 알려주는 화살표만 들어있음
        copy[0] = '여자코트 추천';
        //글제목변경(['여자코트 추천','강남 우동맛집','파이썬 독학']);
        //글제목변경(글제목); 기존 state도 글제목, 신규 state도 글제목 변동된 적 없음 글 제목에 저장되어있던 화살표 바뀐 적 없음
        글제목변경(copy);
      }}>Q. 버튼누르면 첫 글 '여자코트 추천'으로 수정글수정</button>*/}

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
      {/*
        // [<div>안녕</div>,<div>안녕</div>,<div>안녕</div>] 리액트는 array 안에 html 담아놔도 잘 보여줌
        // map() 함수 1. 왼쪽 array 자료만큼 내부코드 실행해줌 2. return 오른쪽에 있는걸 array로 담아줌 3. 유용한 파라미터 2개 사용가능
        글제목.map(function(a, i){ // 실제 블로그 글 개수만큼 생성, i는 반복문 돌 때 마다 0부터 1씩 증가하는 정수
          return (
            // (참고2) 반복문으로 html 생성하면 key={html마다 다른숫자} 추가해야함
            <div className="list" key={i}>
              오늘의 숙제 : 따봉갯수 개별로 기록하기
              Q. 왜 <span> 눌러도 모달창 뜸? 클릭이벤트는 상위html로 퍼짐(이벤트버블링), 상위html로 퍼지는 이벤트버블링을 막고싶으면 e.stopPropagation();
              <h4 onClick={()=>{
                setModal(true);
                setTitle(i);
              }}>{ 글제목[i] }
                <span onClick={(e) => {
                  e.stopPropagation();
                  let copy = [...따봉];
                  copy[i] = copy[i] + 1;
                  따봉변경(copy);
                }}>👍</span> {따봉[i]}
                <span onClick={async (e) => {
                    e.stopPropagation();

                    try {
                      // Firestore 문서 참조
                      const postRef = doc(db, 'posts', postIds[i]);

                      // Firestore의 likes 필드 증가
                      await updateDoc(postRef, { likes: increment(1) });

                      // 로컬 상태 업데이트 (UI에 즉시 반영)
                      let copy = [...따봉];
                      copy[i] = copy[i] + 1;
                      따봉변경(copy);
                    } catch (error) {
                      console.error('Error updating likes: ', error);
                    }
                  }}>👍</span> {따봉[i]}
              </h4>
              <p>{ date[i] }</p>
              오늘의 숙제2 : 글마다 삭제버튼 & 기능 만들기
              <button onClick={()=>{
                let copy = [...글제목];
                copy.splice(i, 1);
                글제목변경(copy);
              }}>삭제</button>
              <button onClick={async ()=>{
                const idToDelete = postIds[i];
                try {
                  await deleteDoc(doc(db, 'posts', idToDelete));

                  글제목변경((prev) => prev.filter((_, idx) => idx !== i));
                  setPostIds((prev) => prev.filter((_, idx) => idx !== i));
                } catch (e) {
                  console.error('Error deleting document: ', e);
                }
              }}>삭제</button>
            </div>
          )
        })
      */}
      <ul className="post-list">
      {
        글제목.map(function(a, i){
          return (
            <li className="post-item" key={i}>
              <button type="button" className="icon-button">
                <svg width="100%" height="100%" viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-sm me-0 w-10 h-10 text-brand dark:text-brand-dark flex origin-center transition-all ease-in-out">
                  <circle cx="0" cy="0" r="2" fill="#087ea4"></circle>
                    <g stroke="#087ea4" stroke-width="1" fill="none">
                      <ellipse rx="10" ry="4.5"></ellipse>
                      <ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse>
                      <ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse>
                    </g>
                  </svg>
              </button>
              <button type="button" className="post-button" onClick={()=>{
                setModal(true);
              }}>
                <h2 className="post-title">{ 글제목[i] }</h2>
                <p className="post-text">{ date[i] }</p>
              </button>

                <span onClick={async (e) => {
                    e.stopPropagation();

                    try {
                      const postRef = doc(db, 'posts', postIds[i]);

                      await updateDoc(postRef, { likes: increment(1) });

                      let copy = [...따봉];
                      copy[i] = copy[i] + 1;
                      따봉변경(copy);
                    } catch (error) {
                      console.error('Error updating likes: ', error);
                    }
                  }}>👍</span> {따봉[i]}

              <button onClick={async ()=>{
                const idToDelete = postIds[i];
                try {
                  await deleteDoc(doc(db, 'posts', idToDelete));

                  글제목변경((prev) => prev.filter((_, idx) => idx !== i));
                  setPostIds((prev) => prev.filter((_, idx) => idx !== i));
                } catch (e) {
                  console.error('Error deleting document: ', e);
                }
              }}>삭제</button>
            </li>
          )
        })
      }
      </ul>

      {/* <button onClick={()=>{setTitle(0)}}>글제목0</button>
      <button onClick={()=>{setTitle(1)}}>글제목1</button>
      <button onClick={()=>{setTitle(2)}}>글제목2</button> */}

      <input id="title" onChange={(e)=>{
        입력값변경(e.target.value);
        console.log(입력값); // (정보) state변경함수는 늦게처리됨 (전문용어로 비동기처리), 입력값변경(e.target.value); 이 완료되기 전에 console.log(입력값); 실행해줌
      }} /> {/* 리액트에서는 항상 태그를 닫아줘야함, <input>에 뭔가 입력시 코드실행하고 싶으면 onChange / onInput, <input>에 입력한 값 가져오는 법, e는 지금 발생하는 이벤트에 관련한 여러 기능이 담겨있음, <input> 에 입력한 값 저장하려면 */}

      {/* 오늘의 숙제 : 버튼누르면 글 하나 추가되는 기능 만들기, 힌트1. html 직접 하나 만들 필요없음 state 조작하면 됩니다. 힌트2. array에 자료 추가하는 법은.. 당연히 구글 */}
      {/* Q. 왜 새로고침하면 없어짐? 새로고침시 html js 파일 다시 읽어서 그럼 */}
      {/*<button onClick={()=>{
        //let copy = [...글제목];
        // 응용1. 글에 아무것도 입력안하고 발행버튼 누르는거 막으려면?
        //입력값 ? copy.unshift(입력값) : alert('입력해주세요');
        //글제목변경(copy);

        // 응용2. 글을 하나 추가하면 따봉갯수 개별적용하던 것도 이상해질 수 있습니다.
        //let copyCount = [...따봉];
        //입력값 ? copyCount.unshift(0) : alert('입력해주세요');
        //따봉변경(copyCount);

        // 응용3. 날짜데이터는?
        //const currentDate = new Date();
        //const year = currentDate.getFullYear();
        //const month = currentDate.getMonth() + 1;
        //const day = currentDate.getDate();
        //const hours = currentDate.getHours();
        //const minutes = currentDate.getMinutes();
        //const seconds = currentDate.getSeconds();
        //const formattedDate = `${year}년 ${String(month).padStart(2, '0')}월 ${String(day).padStart(2, '0')}일 ${String(hours).padStart(2, '0')}시 ${String(minutes).padStart(2, '0')}분 ${String(seconds).padStart(2, '0')}초 발행`;
        //let copyDate = [...date];
        //입력값 ? copyDate.unshift(formattedDate) : alert('입력해주세요');
        //setDate(copyDate);
      }}>글발행</button>*/}

      <button onClick={async () => {
        if (!입력값) {
          alert('입력해주세요');
          return;
        }

        const newPost = {
          title: 입력값,
          date: new Date().toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
          createdAt: new Date(), // Firestore Timestamp
          likes: 0,
        };

        try {
          // Firestore에 새 글 추가
          const docRef = await addDoc(collection(db, 'posts'), newPost);

          // 글제목 및 date 상태 업데이트
          글제목변경((prev) => [newPost.title, ...prev]);
          setDate((prev) => [newPost.date, ...prev]);
          setPostIds((prev) => [docRef.id, ...prev]);
          따봉변경((prev) => [newPost.likes, ...prev])

          // 입력값 초기화
          입력값변경('');
        } catch (e) {
          console.error('Error adding document: ', e);
        }
        document.getElementById('title').value = '';
      }}>글발행</button>

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
        // (참고) props로 일반 문자도 전송가능
        // modal == true ? <Modal color="skyblue" 글제목={글제목}/> : null
        modal == true ? <Modal 글제목={글제목} 글제목변경={글제목변경} title={title} date={date} setDate={setDate}/> : null
      }
      {/* <Modal2></Modal2> */}
      {
        searchModalWindow == true ? <SearchModalWindow setSearchModalWindow={setSearchModalWindow}></SearchModalWindow> : null
      }
      {
        menuModalWindow == true ? <MenuModalWindow setMenuModalWindow={setMenuModalWindow}></MenuModalWindow> : null
      }


    </div>
  );
}

// const Modal = () => {
//   return (
//     <div></div>
//   );
// }; // (참고) 컴포넌트 만드는 문법2 / const로 만들면 중복됐을 때 콘솔창에서 알려줌

// function 함수(){
//   let a = 10; 모든 변수는 함수탈출불가
// }

// 컴포넌트 만드는 법 1. function 만들고 2. return() 안에 html 담기 3. <함수명></함수명> 쓰기 / 다른 function 바깥에 만들어야함 / 작명시 영어대문자로 시작 / return 안에는 두개 이상의 div를 병렬식으로 작성 X / (참고1) return () 안에 html 병렬기입하려면 <div></div> 하나로 감싸기, 의미없는 <div> 대신 <></> 사용가능 (fragment 문법) / 컴포넌트의 단점 : state 가져다쓸 때 문제생김 (A 함수에 있던 변수는 B 함수에서 맘대로 가져다 쓸 수 없음)
// <App> (부모 컴포넌트) <Modal> (자식 컴포넌트) 자식이 부모가 가지고 있던 state 사용가능 (props 문법 사용)
// 부모 => 자식 state 전송하는 법 props 문법 쓰면 되는데 1. <자식컴포넌트 작명={state이름}> 2. props 파라미터 등록 후 props.작명 사용
// props 전송은 부모 => 자식만 가능, 자식 => 부모 불가능, 자식 => 자식 불가능, 컴포넌트 많아지면 props 쓰는게 귀찮아짐
// (정보) 파라미터문법은 다양한 기능을 하는 함수를 만들 때 사용함 (실은 props도 파라미터 문법일 뿐)
function Modal(props){
  // let [title, setTitle] = useState(0); state를 자식에 만들면 부모 => 자식 전송할 필요없을듯
  return (
    // 1. html css로 미리 디자인완성
    <div className="modal-window" style={{background : props.color}}>
      {/* 모달창안에 첫 째 글제목을 넣어보자 */}
      {/* Q. 지금 누른 글 제목이 모달창안에 뜨게 하려면? */}
      <h4>{props.글제목[props.title]}</h4> {/* title이 0이면 글제목[0] title이 1이면 글제목[1] title이 2이면 글제목[2] */}
      <p>날짜</p>
      <p>상세내용</p>
      <button>글수정</button>
      {/* 오늘의 숙제 : 글수정 버튼누르면 첫 글 제목이 '여자코트 추천'으로 바뀌어야함 */}
      {/* <button onClick={()=>{
        let copy = [...props.글제목];
        copy[0] = '여자코트 추천';
        props.글제목변경(copy);
      }}>글수정</button> */}
    </div>
  )
}

// function 말고 classs 문법으로도 컴포넌트 생성가능 (몰라도 됩니다)
// class는 변수, 함수 보관함임
// constructor, super, render 채워넣어야함
/*class Modal2 extends React.Component {
  // class 컴포넌트에서 props는
  constructor(props){
    super(props);
    // class 컴포넌트에서 state 만들려면
    this.state = {
      name : 'kim',
      age : 20
    }
  }
  render(){
    return (
      <div>안녕 {this.state.age}
        class 컴포넌트에서 state 수정은
        <button onClick={()=>{
          this.setState({age : 21})
        }}>버튼</button>
      </div>
    )
  }
}*/

function SearchModalWindow(props){
  return (
    <div className="search-wrap">
      <div className="search-container">
        <div className="search-input-box">
          <button type="button" className="close-button" onClick={()=>{
            props.setSearchModalWindow(false);
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000">
              <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/>
            </svg>
          </button>
          <div className="input-box">
            <input type="text" placeholder="검색" />
            <div className="search-button-box">
              <button type="button" className="delete-button">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000">
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                </svg>
              </button>
              <button type="button" className="search-button">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000">
                  <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="search-list-box">
          <ul className="search-history-list">
            <li className="search-history-item">
              <button type="button" className="search-history-button">검색 기록</button>
            </li>
            <li className="search-history-item">
              <button type="button" className="search-history-button">검색 기록</button>
            </li>
            <li className="search-history-item">
              <button type="button" className="search-history-button">검색 기록</button>
            </li>
          </ul>
          <ul className="search-suggestion-list">
            <li className="search-suggestion-item">
              <button type="button" className="search-suggestion-button">검색 제안</button>
              <button type="button" className="search-input-button">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000">
                  <path d="M704-240 320-624v344h-80v-480h480v80H376l384 384-56 56Z"/>
                </svg>
              </button>
            </li>
            <li className="search-suggestion-item">
              <button type="button" className="search-suggestion-button">검색 제안</button>
              <button type="button" className="search-input-button">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000">
                  <path d="M704-240 320-624v344h-80v-480h480v80H376l384 384-56 56Z"/>
                </svg>
              </button>
            </li>
            <li className="search-suggestion-item">
              <button type="button" className="search-suggestion-button">검색 제안</button>
              <button type="button" className="search-input-button">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000">
                  <path d="M704-240 320-624v344h-80v-480h480v80H376l384 384-56 56Z"/>
                </svg>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function MenuModalWindow(props){
  return (
    <div className="modal-window-overlay" onClick={()=>{
      props.setMenuModalWindow(false);
    }}>
      <div className="modal-window-wrap active" data-modal="menu" onClick={(e)=>{
        e.stopPropagation();
      }}>
        <div className="modal-window-container">
          <a href="/" className="logo-link">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000">
              <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/>
            </svg>
          </a>
          <div className="menu-wrap">
            <ul className="menu-list">
              <li className="menu-item">
                <a href="javascript:void(0)" className="menu-link">
                  <span className="link-icon">
                    <svg width="24" height="24" viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-sm me-0 w-10 h-10 text-brand dark:text-brand-dark flex origin-center transition-all ease-in-out">
                      <circle cx="0" cy="0" r="2" fill="#087ea4"></circle>
                      <g stroke="#087ea4" stroke-width="1" fill="none">
                        <ellipse rx="10" ry="4.5"></ellipse>
                        <ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse>
                        <ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse>
                      </g>
                    </svg>
                  </span>
                  <span className="link-text">React</span>
                </a>
              </li>
              <li className="menu-item">
                <a href="javascript:void(0)" className="menu-link">
                  <span className="link-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1052 1052">
                      <path fill="#f0db4f" d="M0 0h1052v1052H0z"></path>
                      <path d="M965.9 801.1c-7.7-48-39-88.3-131.7-125.9-32.2-14.8-68.1-25.399-78.8-49.8-3.8-14.2-4.3-22.2-1.9-30.8 6.9-27.9 40.2-36.6 66.6-28.6 17 5.7 33.1 18.801 42.8 39.7 45.4-29.399 45.3-29.2 77-49.399-11.6-18-17.8-26.301-25.4-34-27.3-30.5-64.5-46.2-124-45-10.3 1.3-20.699 2.699-31 4-29.699 7.5-58 23.1-74.6 44-49.8 56.5-35.6 155.399 25 196.1 59.7 44.8 147.4 55 158.6 96.9 10.9 51.3-37.699 67.899-86 62-35.6-7.4-55.399-25.5-76.8-58.4-39.399 22.8-39.399 22.8-79.899 46.1 9.6 21 19.699 30.5 35.8 48.7 76.2 77.3 266.899 73.5 301.1-43.5 1.399-4.001 10.6-30.801 3.199-72.101zm-394-317.6h-98.4c0 85-.399 169.4-.399 254.4 0 54.1 2.8 103.7-6 118.9-14.4 29.899-51.7 26.2-68.7 20.399-17.3-8.5-26.1-20.6-36.3-37.699-2.8-4.9-4.9-8.7-5.601-9-26.699 16.3-53.3 32.699-80 49 13.301 27.3 32.9 51 58 66.399 37.5 22.5 87.9 29.4 140.601 17.3 34.3-10 63.899-30.699 79.399-62.199 22.4-41.3 17.6-91.3 17.4-146.6.5-90.2 0-180.4 0-270.9z" fill="#323330"></path>
                    </svg>
                  </span>
                  <span className="link-text">JavaScript</span>
                </a>
              </li>
              <li className="menu-item">
                <a href="javascript:void(0)" className="menu-link">
                  <span className="link-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 100 100">
                      <g transform="matrix(.945094 0 0 .945094 6.301403 4.347014)">
                        <path d="M20.44 13.78c-5.283 7.733-4.625 17.793-.6 26l.296.585.2.37c.037.072.08.143.118.213.07.13.14.255.2.383l.385.673.22.37.447.712.2.3c.2.32.426.638.648.952.005.008.012.017.018.025.035.05.074.1.1.15.192.27.4.536.6.8l.222.288.545.682.208.254a31.65 31.65 0 0 0 .76.884l.016.016c.01.013.02.02.03.033a23.73 23.73 0 0 0 .772.83l.248.254.617.616.252.244a34.49 34.49 0 0 0 .845.783l.16.14.767.66.318.258.64.5.342.265.978.715c.025.017.047.035.072.052.23.16.463.315.697.47l.302.205 1.092.68.302.173.82.468c.15.082.303.16.453.238l.586.3.135.066.24.118.93.438.197.1a32.93 32.93 0 0 0 1.084.459l.264.106 1.023.386.128.046a34.62 34.62 0 0 0 1.14.38l.275.084c.4.12.775.263 1.177.34C67.457 62.6 74.88 42.218 74.88 42.218c-6.233 8.27-17.296 10.45-27.778 8.023-.397-.1-.782-.217-1.17-.334l-.292-.1c-.378-.118-.754-.243-1.126-.373l-.155-.057a35.02 35.02 0 0 1-.993-.375l-.28-.112a31.57 31.57 0 0 1-1.072-.454l-.214-.096-.904-.43-.26-.128a30.9 30.9 0 0 1-.7-.363l-.467-.25a26.89 26.89 0 0 1-.838-.479l-.283-.16c-.368-.22-.732-.45-1.092-.68-.1-.065-.196-.134-.295-.2l-.777-.526-.25-.18-.735-.54-.326-.25-.663-.528-.296-.24-.825-.7c-.028-.025-.06-.05-.1-.077-.294-.263-.583-.533-.868-.804l-.244-.24-.624-.622-.244-.25a31.33 31.33 0 0 1-.765-.824c-.012-.014-.026-.027-.038-.04a31.49 31.49 0 0 1-.776-.9l-.203-.246-.56-.703-.205-.26-.645-.875c-5.82-8.085-7.9-19.235-3.26-28.393M36.84 7.264c-3.82 5.6-3.613 13.094-.633 19.016a24.87 24.87 0 0 0 1.69 2.873c.572.835 1.207 1.83 1.967 2.5.275.3.563.6.857.906.074.077.15.15.226.227a25.21 25.21 0 0 0 .876.829c.012.01.023.022.036.032a26.31 26.31 0 0 0 1.031.87l.232.184a25.13 25.13 0 0 0 1.07.796.6.6 0 0 0 .03.023c.16.113.325.22.488.328.078.052.152.107.23.156a21.65 21.65 0 0 0 .793.495l.112.066.7.4c.082.047.166.088.25.132l.5.258c.025.013.05.023.074.035.337.17.676.33 1.023.485.074.033.15.063.226.095.277.12.557.236.84.347l.36.134a26.33 26.33 0 0 0 .77.273l.348.113c.367.117.73.263 1.113.328 19.725 3.328 24.28-12.14 24.28-12.14-4.105 6.02-12.054 8.894-20.538 6.652a21.09 21.09 0 0 1-1.117-.33c-.113-.035-.224-.072-.336-.1a22.36 22.36 0 0 1-.781-.274l-.353-.134c-.283-.1-.563-.225-.84-.345-.076-.033-.152-.063-.227-.098a19.53 19.53 0 0 1-1.03-.487c-.174-.087-.345-.178-.516-.268l-.298-.156a20.05 20.05 0 0 1-.653-.375l-.156-.1a25.46 25.46 0 0 1-.79-.492c-.08-.052-.158-.1-.238-.162l-.512-.345a27.46 27.46 0 0 1-1.066-.794l-.24-.192c-3.713-2.986-6.657-7.066-8.056-11.693-1.467-4.8-1.15-10.185 1.4-14.556m10.648-.38c-2.252 3.376-2.473 7.568-.9 11.296 1.648 3.957 5.025 7.062 8.966 8.533.162.062.325.117.5.173l.216.07c.232.074.463.16.702.206 10.892 2.143 13.846-5.692 14.632-6.845-2.588 3.795-6.937 4.706-12.273 3.387-.42-.105-.885-.26-1.3-.406a15.62 15.62 0 0 1-1.533-.649 15.81 15.81 0 0 1-2.688-1.671C52.167 12.8 49.2 5.762 52.316.03" fill="#0868ac"></path>
                        <g fill="#131b28">
                          <path d="M26.576 74.06l-.738 2.616.738-2.615zm3.796 5.678l-.813-.005.813.005zm-.2 3.906l-4.872.018 4.872-.018zm1.02-3.9l-.814-.005.814.005zm-.582 3.568l.85-3.237-.85 3.237zm17.93-14.907l-1.58 7.433 1.58-7.433zm-4.065 0l-1.2 5.553 1.2-5.553z"></path>
                          <path d="M48.26 68.07h-3.38c-.188 0-.374.15-.414.334l-2.4 11.107c-.04.183-.226.333-.413.333H39.26c-2.368 0-2.094-1.637-1.6-3.88l.015-.068.287-1.53.124-.63 1.092-5.332c.038-.184-.085-.335-.273-.335h-3.47a.44.44 0 0 0-.412.334l-1.563 7.414c-.86 3.924-.632 7.666 4.04 7.783l.135.003h7.332c.188 0 .373-.15.413-.334l3.162-14.866c.04-.184-.083-.334-.27-.334zm13.487 11.813c.188 0 .3.15.273.334l-.328 1.605m-.328 1.606l.328-1.606-.328 1.606zm-.412.338l-6.23.03 6.23-.03z"></path>
                          <path d="M52.704 77.817c-.003-.176.197-.478.385-.478l-.422-.007c-.2 1.914.037.485.037.485zm2.326 5.978h-.065.065zm6.717-3.912c.188 0 .3.15.273.334l-.382 1.866M56.63 83.8h-.014.014zm-.83-.006h-.048.048zm-.253.001h-.08.08zm-.247 0h-.07.07zm.462-.001h-.205.205z"></path>
                          <path d="M56.617 83.8l-.816.003.816-.003zm4.337-.025l-4.325.026 4.325-.026zm.4-.347l.275-1.344-.275 1.345zm-5.896.367H55.3h.178zm-.495 0h-.24.24zm.257 0h-.2.2zM5.76 77.857l.525-2.328-.6 2.66-.07.334.146-.668zm6.286-9.825H8.333a.45.45 0 0 0-.417.333l-.704 3.1a.26.26 0 0 0 .266.333h3.742c.188 0 .374-.15.414-.333l.68-3.107c.04-.183-.08-.333-.27-.333zm-.808 5.168l-1.1 5.038 1.1-5.038zM.452 89.895l3.062.024c-.904 0-2.397-.017-3.063-.025z"></path>
                          <path d="M6.8 73.2l-.526 2.328L6.8 73.2zm4.17-.333H7.227a.45.45 0 0 0-.417.333l-1.05 4.656-.146.668-1 4.753a7.16 7.16 0 0 1-.18.657s-.7 2.08-1.874 2.057l-1.165-.022a.45.45 0 0 0-.42.326L.2 89.558a.26.26 0 0 0 .261.336l3.063.025c2.936 0 4.483-1.627 5.476-6.307l2.25-10.4c.04-.183-.082-.333-.27-.333zm53.162 10.738c-.188 0-.3-.15-.27-.334l2.815-13.186m1.367 13.185l1.14-5.628-1.14 5.628z"></path>
                          <path d="M63.903 83.438c-.023-.092-.01-.317.03-.5l1.336-6.26-1.408 6.593c-.04.184.082.334.27.334h.342c-.188 0-.548-.075-.57-.167zm3.92.092c-.102.04-.34.075-.528.075h.342a.44.44 0 0 0 .41-.335l.068-.334c-.037.184-.2.553-.3.594zm.79-3.074l.503-2.484-.503 2.484zm11.108-9.488l.155.64c.043.183-.076.332-.263.333"></path>
                          <path d="M68.112 82.936l.5-2.48-.5 2.48zM79.568 70.3l.153.656-.153-.656zm-10.452 7.672l.138-.664.537-2.515-.608 2.848-.067.33zm-2.393-8.104l-.117.55-1.336 6.26 1.408-6.593.045-.216z"></path>
                          <path d="M79.877 71.608l-.155-.64-.23-1c-.304-1.18-1.196-1.863-3.134-1.863l-8.92-.006a.44.44 0 0 0-.412.334l-.138.653-.2.987-2.744 12.853c-.04.184-.053.4-.03.5s.383.167.57.167h2.82c.188 0 .425-.034.528-.075s.254-.4.3-.594l1.07-5.294 1.145-5.364c.04-.183.225-.332.412-.333l8.873-.004c.187 0 .306-.15.263-.333zM91.3 65.815l-.683.003h-2.84a.73.73 0 0 0-.534.282l-6.28 9.2c-.106.155-.227.132-.27-.05l-.462-2.027a.45.45 0 0 0-.417-.333h-4.037c-.188 0-.3.147-.248.328l1.8 6.338c.052.18.055.477.01.66l-.8 3.067a.25.25 0 0 0 .257.331h4c.188 0 .38-.15.426-.33l.8-3.067a2.04 2.04 0 0 1 .29-.604L92.518 66.08c.113-.15.052-.272-.136-.27l-1.07.007zm-32.076 7.937c-.024.2-.212.35-.4.35h-5.12c-.177 0-.267-.12-.24-.27l.004-.027.023-.087c.5-1.3 1.485-2.153 3.356-2.153 2.107 0 2.518 1.03 2.375 2.187zm-1.502-5.908c-6.57 0-8.127 3.988-9 8.013-.874 4.103-.798 7.94 6 7.94H55.8l.83-.003 4.326-.026a.44.44 0 0 0 .407-.335l.657-3.212c.038-.184-.085-.334-.273-.334h-6.112c-2.43 0-3.153-.646-2.887-2.545h9.77c.16-.003.305-.1.362-.252.01-.027.02-.056.024-.085 1.45-5.47 1.034-9.157-5.18-9.157zM26.668 73.73l-.092.327c0 .001-.738 2.616-.738 2.616l-.738 2.614a.48.48 0 0 1-.434.328H20.76c-2.962 0-3.683-2.317-2.962-5.734.72-3.495 2.135-5.668 5.05-5.888 3.984-.3 4.78 2.502 3.82 5.736zm2.678 5.685s1.84-4.47 2.26-7.053c.57-3.457-1.16-8.47-7.845-8.47-6.647 0-9.533 4.786-10.634 10-1.1 5.24.342 9.836 6.95 9.8l10.086-.037a.47.47 0 0 0 .427-.332l.85-3.238a.25.25 0 0 0-.255-.332l-1.627-.01c-.16-.001-.25-.104-.232-.24.004-.025.01-.05.02-.076z"></path>
                          <path d="M62.25 76.424c0 .124-.1.224-.224.224s-.224-.1-.224-.224.1-.224.224-.224.224.1.224.224z"></path>
                        </g>
                      </g>
                    </svg>
                  </span>
                  <span className="link-text">JQuery</span>
                </a>
              </li>
              <li className="menu-item">
                <a href="javascript:void(0)" className="menu-link">
                  <span className="link-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 362.73401 511.99998">
                      <path d="m437.367 100.62-33.046 370.199L255.778 512l-148.134-41.123L74.633 100.62z" style={{fill:'#264de4'}} transform="translate(-74.633)"></path>
                      <path d="m376.03 447.246 28.24-316.352H256v349.629z" style={{fill:'#2965f1'}} transform="translate(-74.633)"></path>
                      <path d="m150.31 268.217 4.07 45.41H256v-45.41zM256 176.305H142.132l4.128 45.411H256zM256 433.399v-47.246l-.199.053-50.574-13.656-3.233-36.217h-45.585l6.362 71.301 93.02 25.823z" style={{fill:'#ebebeb'}} transform="translate(-74.633)"></path>
                      <path d="M85.367 0h55v23h-32v23h32v23h-55zM151.367 0h55v20h-32v4h32v46h-55V49h32v-4h-32zM217.367 0h55v20h-32v4h32v46h-55V49h32v-4h-32z"></path>
                      <path d="m311.761 313.627-5.271 58.894-50.647 13.67v47.244l93.094-25.801.683-7.672 10.671-119.551 1.108-12.194 8.198-91.912H255.843v45.411h63.988l-4.132 46.501h-59.856v45.41z" style={{fill:'#fff'}} transform="translate(-74.633)"></path>
                    </svg>
                  </span>
                  <span className="link-text">CSS</span>
                </a>
              </li>
              <li className="menu-item">
                <a href="javascript:void(0)" className="menu-link">
                  <span className="link-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path fill="#E44D26" d="M107.644 470.877 74.633 100.62h362.734l-33.046 370.199L255.778 512z"></path>
                      <path fill="#F16529" d="m256 480.523 120.03-33.277 28.24-316.352H256z"></path>
                      <path fill="#EBEBEB" d="M256 268.217h-60.09l-4.15-46.501H256v-45.411H142.132l1.087 12.183 11.161 125.139H256zM256 386.153l-.199.053-50.574-13.656-3.233-36.217h-45.585l6.362 71.301 93.02 25.823.209-.058z"></path>
                      <path d="M108.382 0h23.077v22.8h21.11V0h23.078v69.044H152.57v-23.12h-21.11v23.12h-23.077V0zM205.994 22.896h-20.316V0h63.72v22.896h-20.325v46.148h-23.078V22.896zM259.511 0h24.063l14.802 24.26L313.163 0h24.072v69.044h-22.982V34.822l-15.877 24.549h-.397l-15.888-24.549v34.222h-22.58V0zM348.72 0h23.084v46.222h32.453v22.822H348.72V0z"></path>
                      <path fill="#FFF" d="M255.843 268.217v45.41h55.918l-5.271 58.894-50.647 13.67v47.244l93.094-25.801.683-7.672 10.671-119.551 1.108-12.194h-12.237zM255.843 176.305V221.716h109.688l.911-10.207 2.069-23.021 1.086-12.183z"></path>
                    </svg>
                  </span>
                  <span className="link-text">HTML</span>
                </a>
              </li>
            </ul>
          </div>
          <span className="copyright">© 2024 html-is-a-programming-language</span>
        </div>
      </div>
    </div>
  )
}

export default App;