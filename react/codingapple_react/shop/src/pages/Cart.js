import {Table} from 'react-bootstrap'
import { useSelector } from 'react-redux'

function Cart(){

    let state = useSelector((state)=>state)
    console.log(state.data)

    return (
        <div>
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
                    <tr>
                        <td>{state.data[0].id}</td>
                        <td>{state.data[0].name}</td>
                        <td>{state.data[0].count}</td>
                        <td>변경</td>
                    </tr>
                    <tr>
                        <td>{state.data[1].id}</td>
                        <td>{state.data[1].name}</td>
                        <td>{state.data[1].count}</td>
                        <td>변경</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default Cart