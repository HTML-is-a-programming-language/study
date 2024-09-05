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

  useEffect(() =>{
    // 렌더링 후에 동작
    // 오래걸리는 반복연산, 서버에서 데이터가져오는 작업, 타이머
    // for (var i = 0; i < 10000; i++){
    //   console.log(1);
    // }
    setTimeout(()=>{
      document.querySelector('.alert').style.display = 'none';
    }, 2000)
  })

  let [count, setCount] = useState(0)

    let {id} = useParams();
    let 찾은상품 = props.shoes.find(function(x){
      return x.id == id;
    });

    return (
      <div className="container">
        <div className="alert alert-warning">
          2초이내 구매시 할인
        </div>
        {count}
        <button onClick={()=>{ setCount(count+1)}}>버튼</button>
        <div className="row">
          <div className="col-md-6">
            <img src={'https://codingapple1.github.io/shop/shoes'+(찾은상품.id + 1)+'.jpg'} width="100%" />
          </div>
          <div className="col-md-6">
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