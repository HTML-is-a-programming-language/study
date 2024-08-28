/* eslint-disable */

import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  let post = '강남 우동 맛집';
  let [글제목, 글제목변경] = useState(['남자코트 추천', '강남 우동맛집', '파이썬독학']);
  let [따봉, 따봉변경] = useState([0,1,2]);
  let [modal, setModal] = useState(false);
  let [title, setTitle] = useState(0);
  let [입력값, 입력값변경] = useState('');

  return (
    <div className="App">
      <div className="black-nav">
        <h4>ReactBlog</h4>
      </div>

      <button onClick={()=>{
        let copy = [...글제목];
        copy.sort();
        글제목변경(copy);
      }}>가나다순정렬</button>

      <button onClick={()=>{
        let arr = [1,2,3]; // array, object는 데이터를 저장하는게 아니라 데이터의 위치를 저장함 reference data type

        let copy = [...글제목]; // ...은 괄호를 벗기는 문법
        copy[0] = '여자코트 추천'
        글제목변경(copy);
      }}>글수정</button>

      {/* <div className="list">
        <h4>{ 글제목[0] } <span onClick={()=>{ 따봉변경(따봉+1) }}>👍</span> {따봉} </h4>
        <p>2월 17일 발행</p>
      </div>

      <div className="list">
        <h4 onClick={()=>{ setModal(!modal) }}>{ 글제목[2] }</h4>
        <p>2월 17일 발행</p>
      </div> */}

      {
        글제목.map(function(a, i){
          return (
            <div className="list" key={i}>
              <h4 onClick={()=>{setModal(true); setTitle(i); }}>{ 글제목[i] }
                <span onClick={(e)=>{
                  e.stopPropagation();
                  let copy = [...따봉];
                  copy[i] = copy[i] + 1;
                  따봉변경(copy);
                }}>👍</span> {따봉[i]}
                <button onClick={(e)=>{
                  e.stopPropagation();
                  let 현재글제목 = [...글제목];
                  현재글제목 = 현재글제목.filter((_, index) => index !== i);
                  글제목변경(현재글제목);
                  console.log(현재글제목);
                }}>삭제</button>
              </h4>
              <p>2월 17일 발행</p>
            </div>
          )
        })
      }

      <input onChange={(e)=>{
        입력값변경(e.target.value);
        console.log(입력값);
      }} />
      <button onClick={()=>{
        const 글제목추가 = 입력값;
        글제목변경([...글제목, 글제목추가]);
      }}>글발행</button>

      {
        modal == true ? <Modal 글제목변경={글제목변경} 글제목={글제목} title={title}/> : null
      }

      {/* <Array></Array> */}
    </div>
  );
}

function Modal(props){
  return (
    <div className='modal'>
      <h4>{ props.글제목[props.title]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={()=>{
        let copy = [...props.글제목];
        copy[0] = '여자코트 추천';
        props.글제목변경(copy);
      }}>글수정</button>
    </div>
  )
}

function Array(){
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


export default App;
