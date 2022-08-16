import {createSlice} from '@reduxjs/toolkit'

//api
import api from '../Api/api'

const initialState = []

export const recipeSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        updateRecipes: (_, action) => {
            return action.payload
        },
        // comment: (_, action) => {
        //     return action.payload
        // }
    },
    extraReducers: (builder) => {
        builder.addMatcher(api.endpoints.createRecipe.matchFulfilled,(_, {payload})=>payload)
        builder.addMatcher(api.endpoints.updateRecipe.matchFulfilled,(_, {payload})=>payload)
        builder.addMatcher(api.endpoints.deleteRecipe.matchFulfilled,(_, {payload})=>payload)
        builder.addMatcher(api.endpoints.likeRecipe.matchFulfilled,(_, {payload})=>payload)
        builder.addMatcher(api.endpoints.dislikeRecipe.matchFulfilled,(_, {payload})=>payload)
        builder.addMatcher(api.endpoints.comment.matchFulfilled,(_, {payload})=>payload)
        builder.addMatcher(api.endpoints.deleteComment.matchFulfilled,(_, {payload})=>payload)


    }

})

export const {updateRecipes} = recipeSlice.actions
export default recipeSlice.reducer