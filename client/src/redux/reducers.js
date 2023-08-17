import { createSlice } from '@reduxjs/toolkit'
import { initialData } from './initialData'


//   "createSlice" creates it own action by giving the reducers name
export const userSlice = createSlice({

    name: 'users',
    initialState: { value: initialData }, //initialState of redux

    reducers: {
        addUser: (state, action) => { //name of reducer

            //preventing duplicate entry
            const duplicateMail = state.value.find((globalState) => globalState.email === action.payload.email)

            if (duplicateMail) {
                alert('email id already exist')
            }
            else {
                state.value.push(action.payload)
            }
        },

        deleteUser: (state, action) => {           
            state.value = state.value.filter((user) => user.id !== action.payload.id)
        },
        updateUser: (state, action) => {

            //state - global state
            //action.payload  - Inputted Data
            state.value.map((user) => {

                if (user.id === action.payload.id) {
                    user.name = action.payload.name
                    user.number = action.payload.number
                    user.age = action.payload.age
                    user.email = action.payload.email
                    user.gender = action.payload.gender
                    user.image = action.payload.image
                }
            })
        }
    }

})

export const { addUser, deleteUser, updateUser } = userSlice.actions
export default userSlice.reducer