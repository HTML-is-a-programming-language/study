import { useState } from 'react';
import './App.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
// import bg from './img/bg.png';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Detail from './pages/Detail.js';

function App() {

  let [shoes] = useState(data);
  console.log(shoes[0].price);

  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Shopping mall</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#search">검색</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Link to="/">홈</Link>
      <Link to="/detail">상세페이지</Link>

      <Routes>
        <Route path="/" element={
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
            </div>
          </>
        } />
        <Route path="/detail" element={<Detail />} />
      </Routes>
    </div>
  );
}

function Card(props){
  return (
    <div className="col-md-4">
      <img src={'https://codingapple1.github.io/shop/shoes'+props.i+'.jpg'} width="80%" />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </div>
  )
}

export default App;
