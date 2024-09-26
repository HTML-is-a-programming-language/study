import { createSlice } from '@reduxjs/toolkit'

let user = createSlice({
    name: 'user',
    initialState : { name : 'kim', age : 20 },

    // Redux의 state 변경하는 법
    // - state 수정해주는 함수만들고
    // - 원할 때 그 함수 실행해달라고 store.js에 요청
    // 1. state 수정해주는 함수만들기
    reducers : {
        changeName(state){
            // array/object의 경우 직접수정해도 state 변경됩니다
            state.name = 'park'
        },
        // state 변경함수에 파라미터 뚫는 법
        // state 변경함수를 action 이라고 합니다
        increase(state, action){
            state.age += action.payload // payload 보내줘야함
            console.log(state.age)
        },
    }
})

// 2. 만든 함수 export 해야함
export let { changeName, increase } = user.actions

export default user
