import {createSlice} from '@reduxjs/toolkit'

//api
import api from '../Api/api'
const initialState = null

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: () => initialState
    },
    extraReducers: (builder) => {
        builder.addMatcher(api.endpoints.signup.matchFulfilled,(_, {payload}) => payload)
        builder.addMatcher(api.endpoints.login.matchFulfilled,(_, {payload}) => payload)
        builder.addMatcher(api.endpoints.updateProfile.matchFulfilled,(_, {payload}) => payload)
    }
})

export const {logout} = userSlice.actions
export default userSlice.reducer
