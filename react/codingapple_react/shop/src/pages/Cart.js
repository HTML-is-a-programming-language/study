import {Table} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
// 3. 만든 함수 import해서 사용
import { changeName, changeCounter } from './../store.js'

function Cart(){
    let state = useSelector((state)=>state)
    let dispatch = useDispatch()

    return (
        <div>

            {state.user}의 장바구니

           <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.cart.map((a, i)=>
                            <tr key={i}>
                                <td>{state.cart[i].id}</td>
                                <td>{state.cart[i].name}</td>
                                <td>{state.cart[i].count}</td>
                                <td>
                                    <button onClick={()=>{
                                        dispatch(changeCounter())
                                    }}>+</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Cart;