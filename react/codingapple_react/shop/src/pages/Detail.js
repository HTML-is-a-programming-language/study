import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


// class Detail2 extends React.Component {
//   componentDidMount(){

//   }
//   componentDidUpdate(){

//   }
//   componentWillUnmount(){

//   }
// }

function Detail(props){

  let {id} = useParams();
  let 찾은상품 = props.shoes.find(function(x){
    return x.id == id;
  });
  let [count, setCount] = useState(0);
  //let [alert, setAlert] = useState(true);
  let [num, setNum] = useState('');

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

  // useEffect(()=>{}) 1. 재렌더링마다 코드실행하고 싶으면
  // useEffect(()=>{},[]) 2. mount시 1회 코드실행하고 싶으면
  // useEffect(()=>{
  //   return ()=>{

  //   }
  // },[]) 3. unmount 1회 코드실행하고 싶으면, 4. useEffect 실행 전에 뭔가 실행하려면
  // useEffect(()=>{},[count]) 5. 특정 state 변경시에만 실행하려면 [state명]


  return (
    <div className="container">
      {/* {
        alert == true
        ? <div className="alert alert-warning">
            2초이내 구매시 할인
          </div>
        : null
      } */}

      {count}
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
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  )
}

export default Detail;