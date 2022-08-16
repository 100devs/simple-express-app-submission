import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: "https://open-recipe-v1.herokuapp.com/"}),
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (user) => ({
                url: '/users/signup',
                method: 'POST',
                body: user,
            }),
        }),
        login: builder.mutation({
            query: (user) => ({
                url: '/users/login',
                method: 'POST',
                body: user,
            }),
        }),
        //creating a recipe
        createRecipe: builder.mutation({
            query: (recipe) => ({
                url: '/recipes',
                method: 'POST',
                body: recipe,
            }),
        }),
        //updating a recipe
        updateRecipe: builder.mutation({
            query: (recipe) => ({
                url: `/recipes/${recipe.id}`,
                method: 'PATCH',
                body: recipe,
            }),
        }),
        //deleting a recipe
        deleteRecipe: builder.mutation({
            query: (recipe, userId) => ({
                url: `/recipes/${recipe.id}`,
                method: 'DELETE',
                body: userId,
            }),
        }),
        //like a recipe
        likeRecipe: builder.mutation({
            query: (recipe) => ({
                url: `/recipes/${recipe.id}/likes`,
                method: 'PUT',
                body: recipe,
            }),
        }),
        //dislikes
        dislikeRecipe: builder.mutation({
            query: (recipe) => ({
                url: `/recipes/${recipe.id}/dislikes`,
                method: 'PUT',
                body: recipe,
            }),
        }),
        //comments
        comment: builder.mutation({
            query: (recipe) => ({
                url: `/recipes/${recipe.id}/comments`,
                method: 'POST',
                body: recipe
            }),
        }),
        //delete comment
        deleteComment: builder.mutation({
            query: (recipe) => ({
                url: `/recipes/${recipe.id}/comments/delete`,
                method: 'PUT',
                body: recipe
            }),
        }),
        //update profile
        updateProfile: builder.mutation({
            query: (currentUser) => ({
                url: `/users/${currentUser.id}`,
                method: 'PATCH',
                body: currentUser
            })
        })
    })
})

export const {
    useSignupMutation, 
    useLoginMutation, 
    useCreateRecipeMutation, 
    useUpdateRecipeMutation, 
    useDeleteRecipeMutation,
    useLikeRecipeMutation,
    useDislikeRecipeMutation,
    useCommentMutation,
    useDeleteCommentMutation,
    useUpdateProfileMutation,
} = api
export default api