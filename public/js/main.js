const deleteText = document.querySelectorAll('.fa-trash')
const thumbText = document.querySelectorAll('.fa-thumbs-up')
const thumbDown = document.querySelectorAll('.fa-thumbs-down')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteEpisode)
})

Array.from(thumbText).forEach((element)=>{
    element.addEventListener('click', addLike)
})

Array.from(thumbDown).forEach((element)=>{
    element.addEventListener('click', removeLike)
})

async function deleteEpisode(){
    const nameOfEpisode = this.parentNode.childNodes[3].innerText
    const seasonNum = this.parentNode.childNodes[7].innerText
    const episodeNum = this.parentNode.childNodes[11].innerText
    const epDescription = this.parentNode.childNodes[15].innerText
    try{
        const response = await fetch('deleteEpisode', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'nameOfEpisodeS': nameOfEpisode,
                'seasonNumS': seasonNum,
                'episodeNumS': episodeNum,
                'epDescriptionS': epDescription,
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function addLike(){
    const nameOfEpisode = this.parentNode.childNodes[3].innerText
    const seasonNum = this.parentNode.childNodes[7].innerText
    const episodeNum = this.parentNode.childNodes[11].innerText
    const epDescription = this.parentNode.childNodes[15].innerText
    const tLikes = Number(this.parentNode.childNodes[19].innerText)
    try{
        const response = await fetch('addOneLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'nameOfEpisodeS': nameOfEpisode,
              'seasonNumS': seasonNum,
              'episodeNumS': episodeNum,
              'epDescriptionS': epDescription,
              'likesS': tLikes,
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function removeLike(){
    const nameOfEpisode = this.parentNode.childNodes[3].innerText
    const seasonNum = this.parentNode.childNodes[7].innerText
    const episodeNum = this.parentNode.childNodes[11].innerText
    const epDescription = this.parentNode.childNodes[15].innerText
    const tLikes = Number(this.parentNode.childNodes[19].innerText)
    try{
        const response = await fetch('removeOneLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'nameOfEpisodeS': nameOfEpisode,
              'seasonNumS': seasonNum,
              'episodeNumS': episodeNum,
              'epDescriptionS': epDescription,
              'likesS': tLikes,
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}




