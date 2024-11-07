// (참고) 에러메세지는 터미널/브라우저에서 확인 또는 개발자도구
import logo from './logo.svg';
import './App.css'; // (참고) css파일 쓰려면 상단에서 import 'css파일 경로'

function App() {

  let post = '강남 우동 맛집'; // 대충 서버에서 가져온 실제 데이터임
  // document.querySelector('h4').innerHTML = 'post'; 변수에 있던 자료를 html에 넣고 싶으면

  return (
    <div className="App"> {/* html은 당연히 .html 파일에 적어야 .js 파일인데도 적히는 이유는 실은 html이 아니라 JSX임 */}
      {/* 리액트에서 <div>만드는 법 React.createElement('div'), null, 'Hello World' (JSX 사용하면) <div></div> */}
      {/* 상단메뉴 만들어보기 */}
      <div className="black-nav"> {/* JSX 문법1. class 넣을 땐 className */}
        <h4>블로그임</h4> {/* JSX 문법3. style 넣을 땐 style={{스타일명 : '값'}} (style={{color : 'red', fontSize : '16px'}}) 스타일명은 카멜케이스로 작성 */}
      </div>
      <h4>{ post }</h4> {/* 실제서비스면 서버 이런데서 블로그 글 가져와서 보여줄듯 */} {/* JSX 문법2. 데이터바인딩은 (변수넣을 땐) {중괄호} */}
    </div>
  );
}

export default App;