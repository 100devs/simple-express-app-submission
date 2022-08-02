const deleteText = document.querySelectorAll('.delete')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteServant)
})


async function deleteServant(){

let confirmation = confirm('Are you sure you want to delete this?')

if(confirmation){
  let info = this.parentNode.parentNode.parentNode.childNodes[1].childNodes
  let stats = this.parentNode.parentNode.parentNode.childNodes[5].childNodes

  const servantName = info[3].innerText
  const gender = info[7].innerText
  const servantID = info[11].innerText
  const servantClass = info[15].innerText
  const rarity = info[19].innerText
  const servantImage = this.parentNode.parentNode.parentNode.childNodes[3].src.split('/')[3]
  const starAbsorption = info[22].innerText
  const starGeneration = info[25].innerText
  const deathRate = info[28].innerText
  const alignments = info[31].innerText
  const attack = stats[5].innerText
  const attackMax = stats[9].innerText
  const attackGrail = stats[13].innerText
  const health = stats[17].innerText
  const healthMax = stats[21].innerText
  const healthGrail = stats[25].innerText
  const cost = stats[29].innerText
  const npCharge = stats[32].innerText
  const npAttack = stats[35].innerText
  const likes =  Number(this.parentNode.childNodes[4].innerText)


    try{
      const response = await fetch('deleteServant', {
          method: 'delete',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': servantName,
            'gender': gender,
            'servantID' : servantID,
            'class': servantClass,
            'image': servantImage,
            'rarity': rarity,
            'starAbsorption': starAbsorption,
            'starGeneration': starGeneration,
            'deathRate': deathRate,
            'alignments': alignments,
            'npCharge':  npCharge,
            'npAttack': npAttack,
            'attack': attack,
            'attackMax' : attackMax,
            'attackGrail' : attackGrail,
            'health': health,
            'healthMax': healthMax,
            'healthGrail': healthGrail,
            'cost' : cost,
            'likes' : likes
          })
        })
      const data = await response.json()
      location.reload()

  }catch(err){
      console.log(err)
  }
}

   
}

const thumbText = document.querySelectorAll('.likes')


Array.from(thumbText).forEach((element)=>{
    element.addEventListener('click', addLike)
})

async function addLike(){
  let info = this.parentNode.parentNode.parentNode.childNodes[1].childNodes
  let stats = this.parentNode.parentNode.parentNode.childNodes[5].childNodes

    const servantName = info[3].innerText
    const gender = info[7].innerText
    const servantID = info[11].innerText
    const servantClass = info[15].innerText
    const rarity = info[19].innerText
    const servantImage = this.parentNode.parentNode.parentNode.childNodes[3].src.split('/')[3]
    const starAbsorption = info[22].innerText
    const starGeneration = info[25].innerText
    const deathRate = info[28].innerText
    const alignments = info[31].innerText
    const attack = stats[5].innerText
    const attackMax = stats[9].innerText
    const attackGrail = stats[13].innerText
    const health = stats[17].innerText
    const healthMax = stats[21].innerText
    const healthGrail = stats[25].innerText
    const cost = stats[29].innerText
    const npCharge = stats[32].innerText
    const npAttack = stats[35].innerText
    const likes =  Number(this.parentNode.childNodes[4].innerText)

        try{
            const response = await fetch('addOneLike', {
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    'name': servantName,
                    'gender': gender,
                    'servantID' : servantID,
                    'class': servantClass,
                    'image': servantImage,
                    'rarity': rarity,
                    'starAbsorption': starAbsorption,
                    'starGeneration': starGeneration,
                    'deathRate': deathRate,
                    'alignments': alignments,
                    'npCharge':  npCharge,
                    'npAttack': npAttack,
                    'attack': attack,
                    'attackMax' : attackMax,
                    'attackGrail' : attackGrail,
                    'health': health,
                    'healthMax': healthMax,
                    'healthGrail': healthGrail,
                    'cost' : cost,
                    'likes': likes
                })
              })
            const data = await response.json()
            console.log(data)
            location.reload()
    
        }catch(err){
            console.log(err)
        }
    }
