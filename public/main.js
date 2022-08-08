
const voteBtn = document.querySelectorAll('.vote');
const deleteBtn = document.querySelectorAll('.delete');
const messageDiv = document.querySelector('#message');

Array.from(deleteBtn).forEach(btn => {
    btn.addEventListener('click', deletePoll);
})

Array.from(voteBtn).forEach(btn => {
    btn.addEventListener('click', updateVote);
})


async function updateVote() {

    const question = this.parentNode.parentNode.childNodes[1].innerText;    //Get the question
    const numVotes = this.parentNode.childNodes[1].nextElementSibling.innerText; //get the number of votes for this option
    const voteOption = this.parentNode.childNodes[1].nextElementSibling.dataset.vote; //get the value of the data-vote attribute so we know which option to update
    console.log(voteOption)

    try {
        const response = await fetch('/votes', {
                             method: 'put',
                             headers: {'Content-type': 'application/json'},
                             body: JSON.stringify({
                                question: question,
                                optionNumber: voteOption,
                                votes: +numVotes + 1, //increment the vote count
                             })       
                    })
            const data = await response.json();
            location.reload();
        }catch(error) {
            console.log(error);
        }  
}


async function deletePoll() {

    const pollToDelete = this.parentNode.childNodes[1].innerText;
    console.log(pollToDelete)

    try {
        const response = await fetch('/deletePolls', {
                            method: 'delete',
                            headers: {'Content-type': 'application/json'},
                            body: JSON.stringify({
                            'poll': pollToDelete,
                        })
                    })
        const data = await response.json() //convert the response to json
        console.log(data)
        location.reload()
    } catch (error) {
        console.log('error', error);
    }
    
}

