import logo from './logo.svg';
import './App.css';

function App() {

  let post = '강남 우동 맛집';

  return (
    <div className="App">
      <div className="black-nav"> {/* JSX 문법 1 : className */}
        <h4 style={{color:'red', fontSize:'16px'}}>블로그임</h4>
      </div>
      <h4>{ post }</h4> {/* JSX 문법 2 : 데이터바인딩은(변수넣을 땐) 중괄호 */}
    </div>
  );
}

export default App;
