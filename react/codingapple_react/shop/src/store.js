// Redux는 props 없이 state를 공유할 수 있게 도와주는 라이브러리입니다.
// 이거 설치하면 js 파일 하나에 state들을 보관할 수 있는데
// 그걸 모든 컴포넌트가 직접 꺼내쓸 수 있습니다.
// 그래서 귀찮은 props 전송이 필요없어집니다.
// 컴포넌트가 많아질 수록 좋겠군요.
// 개발자 구인시에도 redux같은 라이브러리 숙련도를 대부분 요구합니다.
// 셋팅1. store.js 파일생성, 코드 복붙
// Redux 왜 씀?
// 컴포넌트간 state 공유 편해짐
import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice.js'

// let stock = createSlice({
//     name: 'stock',
//     initialState : [10, 11, 12]
// })

let cart = createSlice({
    name: 'cart',
    initialState :[
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
    ],
    reducers : {
        addCount(state, action){
            let 번호 = state.findIndex((a)=>{ return a.id === action.payload })
            state[번호].count++
        },
        addItem(state, action){
            let index = state.findIndex((a)=>{ return a.id === action.payload.id })
            if(index === -1){
                state.push(action.payload)
            } else {
                state[index].count += 1
            }
        },
        deleteItem(state, action){
            state.splice(action.payload, 1)
        }
    }
})

export let { addCount, addItem, deleteItem } = cart.actions

export default configureStore({
    reducer: {
        user : user.reducer,
        // stock : stock.reducer
        cart : cart.reducer
    }
})