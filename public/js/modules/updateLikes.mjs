export default async function updateLikes(event){
  const topping = this.parentNode.parentNode.childNodes[3].innerText;
  const id = this.parentNode.parentNode.id;
  const voteDirection = event.currentTarget.vote
  const votedToppings = JSON.parse(localStorage.getItem('votedToppings'))
  let isSwapped = null;
  let count = Number(this.parentNode.childNodes[3].innerText)

  //if previously voted
  if(votedToppings[topping]){
    isSwapped = !isSwapped;
  }

  //Undo if already voted in the same direction
  if(votedToppings[topping] && votedToppings[topping].vote === voteDirection) {
    //undo vote
    voteDirection === 'up'? count -= 2 : count += 2;
    //no longer swapped
    isSwapped = !isSwapped;
    //remove from local storage
    delete votedToppings[topping]
    localStorage.setItem('votedToppings', JSON.stringify(votedToppings))
  } else {
    //add vote into local storage
    votedToppings[topping] = {
      id,
      vote: voteDirection
    };
    localStorage.setItem('votedToppings', JSON.stringify(votedToppings))

    //if swapping previous vote, do an extra to account for previous vote
    if(isSwapped) {
      voteDirection === 'up'? count += 1 : count -= 1;
    }
  }

  //update data
  try {
    const response = await fetch('updateLike', {
      method:'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'topping': topping,
        'likes': count,
        '_vote': voteDirection
      })
    })
    const data = await response.json();
    console.log(data)
    location.reload()
  }
  catch(err){
    console.error(error)
  }
}
