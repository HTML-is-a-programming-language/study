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

let user = createSlice({
    name: 'user',
    initialState : 'kim'
})

// let stock = createSlice({
//     name: 'stock',
//     initialState : [10, 11, 12]
// })

let data = createSlice({
    name: 'data',
    initialState :[
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
    ]
})


export default configureStore({
    reducer: {
        user : user.reducer,
        // stock : stock.reducer
        data : data.reducer
    }
})