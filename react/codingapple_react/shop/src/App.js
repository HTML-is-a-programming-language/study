import { createContext, useState } from 'react';
import './App.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
// import bg from './img/bg.png';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Detail from './pages/Detail.js';
import axios from 'axios';

// Context API
// 셋팅1. createContext()
// state 보관함임
export let Context1 = createContext()

function App() {

  // 리액트에서 서버와 통신하려면 ajax 1 내가 만든 숙제 / 동일함
  let [shoes, setShoes] = useState(data);
  let [재고] = useState([10, 11, 12]);
  let navigate = useNavigate();
  // 리액트에서 서버와 통신하려면 ajax 2 : post, fetch 내가 만든 숙제
  // 응용1. 버튼 2회 누를 때는 7,8,9번 상품 가져오려면?
  let [count, setCount] = useState(0);
  // 리액트에서 서버와 통신하려면 ajax 2 : post, fetch 내가 만든 숙제
  // 응용2. 버튼 3회 누를 때는 상품 더 없다고 알려주기
  let [hide, setHide] = useState(true);
  // 리액트에서 서버와 통신하려면 ajax 2 : post, fetch 내가 만든 숙제
  // 응용3. 버튼누르면 "로딩중입니다" 글자 띄우기
  let [load, setLoad] = useState(true);

  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand onClick={()=>{ navigate('/shopping_mall') }}>Shopping mall</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{ navigate('/shopping_mall') }}>Home</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/detail') }}>Detail</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* <Link to="/">홈</Link> */}
      {/* <Link to="/detail">상세페이지</Link> */}

      <Routes>
        <Route path="/shopping_mall" element={
          <>
            <div className='main-bg'></div>
            {/* <div className='main-bg' style={{ backgroundImage : 'url('+ bg +')'}}></div> */}

            <div className="container">
              <div className="row">
                {
                  shoes.map((a, i) => {
                    return (
                      <Card shoes={shoes[i]} i={i+1}></Card>
                    )
                  })
                }
                {/* <Card shoes={shoes[0]} i={1}></Card>
                <Card shoes={shoes[1]} i={2}></Card>
                <Card shoes={shoes[2]} i={3}></Card> */}
              </div>

              {/* 서버에 데이터를 요청
              서버 : 부탁하면 진짜로 들어주는 프로그램
              youtube 서버 : 동영상 요청하면 진짜 보내주는 프로그램
              서버개발 시 짜는 코드 : 누가 A요청하면 A 보내주세요~
              누가 comic.naver.com으로 요청하면 웹툰 보내주세요~
              1. 방법(GET/POST)
              GET는 데이터 가져올 때 / POST는 데이터 보낼 때
              2. 어떤자료 (URL) : 서버만든 사람에게 물어보면 됩니다.
              ajax 사용하면 새로고침 없이도 GET/POST요청 가능
              ajax 쓰려면 옵션 3개 중 택1
              1. XMLHttpRequest
              2. fetch()
              3. axios 같은거
              npm install axios
              import axios from 'axios';
              ajax 이용한 GET요청은 axios.get('url')
              요청결과는 axios.get('url').then()
              ajax 요청 실패할 경우
              .catch(()=>{})*/}

              {/* 리액트에서 서버와 통신하려면 ajax 2 : post, fetch 내가 만든 숙제
              응용2. 버튼 3회 누를 때는 상품 더 없다고 알려주기 */}
              {
                hide == true
                ? <button onClick={()=>{
                  // 로딩중UI 띄우기
                  setLoad(false);
                  console.log(count);
                  // 리액트에서 서버와 통신하려면 ajax 2 : post, fetch 내가 만든 숙제
                  // 응용1. 버튼 2회 누를 때는 7,8,9번 상품 가져오려면?
                  if(count == 0){
                    axios.get('https://codingapple1.github.io/shop/data2.json')
                    .then((결과)=>{
                      // 로딩중UI 숨기기
                      setLoad(true);
                      console.log(결과.data);
                      // 리액트에서 서버와 통신하려면 ajax 1 내가 만든 숙제
                      // setShoes(prevList => [...prevList, ...결과.data]);
                      // 리액트에서 서버와 통신하려면 ajax 1 숙제 답안
                      let copy = [...shoes, ...결과.data];
                      setShoes(copy);
                    })
                    .catch(()=>{
                      setLoad(true);
                      console.log('실패함')
                    })
                    setCount(count+1);
                  } else if(count == 1){
                    axios.get('https://codingapple1.github.io/shop/data3.json')
                    .then((결과)=>{
                      setLoad(true);
                      console.log(결과.data);
                      let copy = [...shoes, ...결과.data];
                      setShoes(copy);
                    })
                    .catch(()=>{
                      setLoad(true);
                      console.log('실패함')
                    })
                    setCount(count+1);
                  } else {
                    setLoad(true);
                    // 리액트에서 서버와 통신하려면 ajax 2 : post, fetch 내가 만든 숙제
                    // 응용2. 버튼 3회 누를 때는 상품 더 없다고 알려주기
                    alert('더보기 할 상품이 없습니다.');
                    setHide(true);
                  }

                  // 서버로 데이터전송하는 POST요청
                  // axios.post('/test',{name : 'kim'})

                  // 동시에 ajax 요청 여러개하려면
                  // Promise.all([ axios.get('/test1'), axios.get('/test2')])
                  // .then(()=>{ })
                  // 원래는 서버와 문자만 주고받을 수 있습니다
                  // "{"name" : "kim"}" 따옴표쳐놓으면 array, object도 주고받기 가능, 일명 JSON
                  // axios가 array로 자동으로 바꿔줌
                  // 그냥 JS 기본문법으로도 GET요청 가능
                  // fetch('https://codingapple1.github.io/shop/data2.json')
                  // .then(결과=>결과.json()) JSON => array/object 변환과정 필요
                  // .then(data=>{})
                  // 자주묻는 질문 : ajax로 가져온 데이터를 html에 꽂을 때 왜 에러남?
                  // 1. ajax요청으로 데이터를 가져와서
                  // 2. state에 저장하라고 코드를 짜놨고
                  // 3. state를 html에 넣어서 보여달라고 <div> {state.어쩌구} </div> 이렇게 코드 짰습니다.
                  // 잘 될 것 같은데 이 상황에서 state가 텅 비어있다고 에러가 나는 경우가 많습니다.
                  // 이유는 ajax 요청보다 html 렌더링이 더 빨라서 그럴 수 있습니다.
                  // state안에 뭐가 들어있으면 보여달라고 if문 같은걸 추가하거나 그러면 됩니다.
                }}>더보기</button>
                : null
              }
              {
                load == false
                ? <div>로딩중입니다.</div>
                : null
              }
            </div>
          </>
        }>
        </Route>
        <Route path="/detail/:id" element={
          // 셋팅2. <Context>로 원하는 컴포넌트 감싸기
          // 셋팅3. value={{state1, state2...}}
          <Context1.Provider value={{ 재고 }}>
          <Detail shoes={shoes} />
          </Context1.Provider>
        } />
        <Route path="*" element={<div>없는페이지요</div>} />
        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>멤버임</div>} />
          <Route path="location" element={<div>위치정보임</div>} />
        </Route>
        <Route path="/event" element={<EventPage />}>
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
          <Route path="two" element={<div>생일기념 쿠폰받기</div>} />
        </Route>

      </Routes>
    </div>
  );
}

function About(){
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  )
}

function EventPage(){
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Card(props){
  let navigate = useNavigate();

  return (
    <div className="col-md-4" onClick={()=>{ navigate('/detail/'+props.shoes.id+'') }}>
      <img src={'https://codingapple1.github.io/shop/shoes'+props.i+'.jpg'} width="80%" />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </div>
  )
}

export default App;
