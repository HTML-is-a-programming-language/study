import logo from './logo.svg';
import './App.css';

function App() {

  let post = '강남 우동 맛집';

  return (
    <div className="App">
      <div className="black-nav"> {/* JSX 문법 1 : className */}
        <h4 style={{color:'red', fontSize:'16px'}}>블로그임</h4> {/* JSX 문법 3 : style 넣을 땐 style={{스타일명 : '값'}} font-size 같이 하이픈이 포함된건 뒤의 단어에서 대문자 */}
      </div>
      <h4>{ post }</h4> {/* JSX 문법 2 : 데이터바인딩은(변수넣을 땐) 중괄호 */}
    </div>
  );
}

export default App;
