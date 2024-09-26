import {Table} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
// 3. 만든 함수 import해서 사용
import { changeName, increase } from './../store/userSlice.js'
import { addCount, deleteItem } from './../store.js'

function Cart(){
    let state = useSelector((state)=>state)
    let dispatch = useDispatch()

    return (
        <div>

            {state.user.name} {state.user.age}의 장바구니
            <button onClick={()=>{
                dispatch(increase(100))
            }}>버튼</button>

            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                        <th>삭제하기</th>
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
                                        dispatch(addCount(state.cart[i].id))
                                    }}>+</button>
                                </td>
                                <td>
                                    <button onClick={()=>{
                                        dispatch(deleteItem(i))
                                    }}>삭제</button>
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