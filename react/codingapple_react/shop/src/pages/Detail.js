import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

// state 사용은 1. Context를 import
import {Context1} from './../App.js'
import { addItem } from '../store.js';
import { useDispatch } from 'react-redux';

// class Detail2 extends React.Component {
//   componentDidMount(){

//   }
//   componentDidUpdate(){

//   }
//   componentWillUnmount(){

//   }
// }

function Detail(props){

  // state 사용은 2. useContext(Context)
  // 보관함 해체해줌
  let {재고} = useContext(Context1)

  let {id} = useParams();
  let 찾은상품 = props.shoes.find(function(x){
    return x.id == id;
  });
  let [count, setCount] = useState(0);
  //let [alert, setAlert] = useState(true);
  let [num, setNum] = useState('');
  let [탭, 탭변경] = useState(0);
  let [show, setShow] = useState('');
  let dispatch = useDispatch()

  useEffect(() =>{
    if (isNaN(num) == true){
      alert('그러지마세요') // alert state가 정의되어 있어서 작동하지 않았음
    }

    // 렌더링 후에 동작
    // 오래걸리는 반복연산, 서버에서 데이터가져오는 작업, 타이머
    // for (var i = 0; i < 10000; i++){
    //   console.log(1);
    // }
    // mount, update시 실행됨
    //let a = setTimeout(()=>{ setAlert(false) }, 2000) // 리액트 방식 : 스위치 조작해주세요
    console.log(2);
    // useEffect 동작 전에 실행됨
    // clean up function
    // 기존코드 치우는거 여기에 많이 작성함
    // mount시 실행안됨, unmount시 실행됨
    return ()=>{
      console.log(1);
      //clearTimeout(a);
    }
    // useEffect 실행조건 넣을 수 있는 곳은 []
    // count라는 state가 변할 때만 실행됨
    // state가 없을 경우에는 mount에만 실행됨
    // 컴포넌트 mount시 1회만 실행하고 싶으면 []

  }, [count, num])

  // 내가 만든 숙제 Detail 컴포넌트 로드시 투명도가 0에서 1로 서서히 증가하는 애니메이션을 주려면?
  useEffect(() =>{
    setShow('end')

    return ()=>{
      setShow('')
    }
  }, [])

  // useEffect(()=>{}) 1. 재렌더링마다 코드실행하고 싶으면
  // useEffect(()=>{},[]) 2. mount시 1회 코드실행하고 싶으면
  // useEffect(()=>{
  //   return ()=>{

  //   }
  // },[]) 3. unmount 1회 코드실행하고 싶으면, 4. useEffect 실행 전에 뭔가 실행하려면
  // useEffect(()=>{},[count]) 5. 특정 state 변경시에만 실행하려면 [state명]


  return (
    <div className={'container start ' + show}>
      {/* 내가 만든 숙제 Detail 컴포넌트 로드시 투명도가 0에서 1로 서서히 증가하는 애니메이션을 주려면? */}
      {/* {
        alert == true
        ? <div className="alert alert-warning">
            2초이내 구매시 할인
          </div>
        : null
      } */}

      {count}
      {재고}
      <button onClick={()=>{ setCount(count+1)}}>버튼</button>
      <div className="row">
        <div className="col-md-6">
          <img src={'https://codingapple1.github.io/shop/shoes'+(찾은상품.id + 1)+'.jpg'} width="100%" />
        </div>
        <div className="col-md-6">
          <input onChange={(e)=>{ setNum(e.target.value) }}></input>
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}원</p>
          <button className="btn btn-danger" onClick={()=>{
            dispatch(addItem({id : 찾은상품.id, name : 찾은상품.title, count : 1}))
          }}>주문하기</button>
        </div>
      </div>

      {/* 탭 UI 만들기
      1. html css로 미리 디자인
      2. 탭 상태 저장해둘 state 필요
      3. state에 따라서 UI가 어떻게 보일지 작성
       */}
      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link eventKey="link0" onClick={()=>{ 탭변경(0) }}>버튼0</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link1" onClick={()=>{ 탭변경(1) }}>버튼1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link2" onClick={()=>{ 탭변경(2) }}>버튼2</Nav.Link>
        </Nav.Item>
      </Nav>
      {/* 삼항연산자를 여러개쓰려면 중괄호를 따로 열어줘야함
      {
        탭 == 0 ? <div>내용0</div> : null
      }
      {
        탭 == 1 ? <div>내용1</div> : null
      }
      {
        탭 == 2 ? <div>내용2</div> : null
      } */}
      <TabContent 탭={탭} shoes={props.shoes}/>
    </div>
  )
}

//Q. 일반 if 조건문 쓰려면?
//(팁1) props.어쩌구가 귀찮으면 props 대신 {탭}
// function TabContent(props){
//   if (props.탭 == 0){
//     return <div>내용0</div>
//   }
//   if(props.탭 == 1){
//     return <div>내용1</div>
//   }
//   if(props.탭 == 2){
//     return <div>내용2</div>
//   }
// }

function TabContent({탭, shoes}){
  // (팁2) 센스좋으면 if 필요없을 수도
  // 4. 원할때 end 부착하면 끝임, 탭 state가 변할 때 end 부착

  let [fade, setFade] = useState('');
  // Detail 뿐만 아니라 그 자식들도 props 없이 사용가능
  // 편한지 모르겠음 => 쓰지마셈
  // Context API 특징
  // 1. state변경시 쓸데없는 것까지 재렌더링
  // 2. 나중에 컴포넌트 재사용이 어려움
  // Context API 보다는 외부 라이브러리 사용합니다
  let {재고} = useContext(Context1)

  useEffect(()=>{
    // 리액트의 automatic batching 기능
    setTimeout(()=>{setFade('end')}, 100)

    return ()=>{
      setFade('')
    }
  }, [탭]) // 탭이라는게 변경될 때마다 안의 코드 실행해줌

  return <div className={'start ' + fade}>
    {[<div>{shoes[0].title}</div>, <div>내용1</div>, <div>내용2</div>][탭]}
  </div>
}

// 전환애니메이션은
// 부착하면 애니메이션이 나오는 className 하나 만들고
// 원할 때 부착하면 됩니다
// 1. 애니메이션 동작 전 className 만들기
// 2. 애니메이션 동작 후 className 만들기
// 3. className에 transition 속성 추가
// 4. 원할 때 2번 className 부착

// Single Page Application 단점 : 컴포넌트간 state 공유 어려움
// 부모컴포넌트 => 자식컴포넌트 props 전송은 가능
// props 싫으면
// 1. Context API (리액트 기본문법)
// 2. Redux 등 외부라이브러리
// Context API 쓰면 props 전송없이 state 공유가능 (실제로는 잘 안씀)
export default Detail;