import { useState } from 'react';
import './App.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
// import bg from './img/bg.png';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Detail from './pages/Detail.js';
import axios from 'axios';

function App() {

  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();

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
              <button onClick={()=>{
                axios.get('https://codingapple1.github.io/shop/data2.json')
                .then((결과)=>{
                  console.log(결과.data);
                  setShoes(prevList => [...prevList, ...결과.data]);
                })
                .catch(()=>{
                  console.log('실패함')
                })

              }}>버튼</button>
            </div>
          </>
        }>
        </Route>
        <Route path="/detail/:id" element={<Detail shoes={shoes} />} />
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
