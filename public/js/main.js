import deleteTopping from "./modules/deleteTopping.mjs"
import updateLikes from "./modules/updateLikes.mjs"

//// Initialize storage for vote tracking ///////////
if(!localStorage.getItem('votedToppings')) localStorage.setItem('votedToppings', '{}')

//add active class to any voted items
const votedToppings = JSON.parse(localStorage.getItem('votedToppings'))

if(votedToppings){
  const toppings = Object.keys(votedToppings)
  const container = document.querySelector('.tile_container')
  
  //add active hightlight
  toppings.forEach( topping => {
    const {id,vote} = votedToppings[topping]
    //get topping voting container
    const inner_vote_container = container.querySelector('[id="' + id + '"]')

    //remove all previous active class
    Array.from(inner_vote_container.querySelectorAll('fa-pizza-slice')).forEach( btn => btn.classList.remove('active'))

    //get voted button
    const button = vote === 'up' ?
      inner_vote_container.querySelector('.up') :
      inner_vote_container.querySelector('.down')
    
    //add active class
    button.classList.add('active')
  })
}

const deleteButtons = document.querySelectorAll('.fa-trash')
const upvotes = document.querySelectorAll('.up')
const downvotes = document.querySelectorAll('.down')

Array.from(deleteButtons).forEach( deleteButton => deleteButton.addEventListener('click', deleteTopping))
Array.from(upvotes).forEach( upvote => {
  upvote.addEventListener('click', updateLikes)
  upvote.vote = 'up'
})
Array.from(downvotes).forEach( downvote => {
  downvote.addEventListener('click', updateLikes)
  downvote.vote = 'down'
})
