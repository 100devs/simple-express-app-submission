import {configureStore} from '@reduxjs/toolkit'
import recipeSlice from './Slices/recipeSlice'
import userSlice from './Slices/userSlice'
import api from './Api/api'

//persist store
import storage from 'redux-persist/lib/storage'
import {combineReducers} from 'redux'
import {persistReducer} from 'redux-persist'
import thunk from 'redux-thunk'

//reducers

const reducer = combineReducers({
    user: userSlice,
    recipes: recipeSlice,
    [api.reducerPath]: api.reducer
})

const persistConfig = {
    key: 'root',
    storage,
    blacklist: [api.reducerPath, 'recipes']
}

//persist

const persistedReducer = persistReducer(persistConfig, reducer)

//store

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk, api.middleware]
})

export default store