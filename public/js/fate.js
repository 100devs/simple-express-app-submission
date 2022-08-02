document.querySelector('#play').addEventListener('click',playMusic)

function playMusic(){

}


class Fate{
    constructor(attack, servantClass, cost, deathRate, gender, health, name, npAttack, npCharge, rarity, servantID, starAbsorption, starGeneration, skill1,skill2,skill3 ){
this.attack = attack
this.class= servantClass
this.cost= cost
this.deathRate= deathRate 
this.gender= gender
this.health= health
this.name= name
this.npAttack= npAttack
this.npCharge= npCharge
this.rarity= rarity
this.servantID= servantID
this.starAbsorption= starAbsorption
this.starGeneration= starGeneration
this.skill1 = skill1
this.skill2 = skill2
this.skill3 = skill3
this.quick = .90
this.arts = 1.00
this.buster = 1.20
    }
    s1(){
        let skill1 =  this.attack + this.attack* (this.arts+ (this.arts *this.skill1))
          return skill1
          //costdown 4 turns
      }
      s2(){
         //apply invincible
        //costdown 6 turns
     }
       s3(){
           let skill3 = servant.attack + servant.attack * this.skill2
            return skill3
        //    Increases own critical star absorption for 1 turn. 500%
        //    Increases own attack for 1 turn.
        //    costdown 5 turns
       }
}

let salter = new Fate(12408,"Saber",12,'19.2%',"Female",16514,"Artoria Pendragon (Alter)",'0.86%','3%','4 Star',3,99,'9.9%',.20,.100,.50)
// console.log(salter)
let servant

class Fetch extends Fate{
    getFetch(){
        let url = 'https://fgo-app.herokuapp.com/api/servants'
    
        fetch(url)
            .then(res=>res.json())
            .then(data=>{
                // console.log(data)
                for(let i =0;i<data.length;i++){
                    if(data[i].name!==null){
                        servant = new Fate(data[i].attackMax,data[i].class,data[i].cost,data[i].deathRate,data[i].gender,data[i].healthMax,data[i].name,data[i].npAttack,data[i].npCharge,data[i].rarity,data[i].servantID,data[i].starAbsorption,data[i].starGeneration)
                        document.querySelector('.np1').innerHTML = '&#9899;' // fills in circle
                    }
                }
                })
            .catch(err=>console.error(err))
    }
}

let fetchAPI = new Fetch()
fetchAPI.getFetch()


class Click{
    showSkills(){
        document.querySelector('#skills').addEventListener('click',_=>{
            document.querySelector('.skills').classList.remove('hidden')
            document.querySelector('#skills').classList.add('hidden')
            document.querySelector('#deck').classList.add('hidden')
            document.querySelector('#back').classList.remove('hidden')
        })
    }
    showDeck(){
        document.querySelector('#deck').addEventListener('click',_=>{
            document.querySelector('.deck').classList.remove('hidden')
            document.querySelector('#skills').classList.add('hidden')
            document.querySelector('#deck').classList.add('hidden')
            document.querySelector('#back').classList.remove('hidden')
        })
    }   
    goBack(){
        document.querySelector('#back').addEventListener('click',_=>{
            document.querySelector('.deck').classList.add('hidden')
            document.querySelector('.skills').classList.add('hidden')
            document.querySelector('#back').classList.add('hidden')
            document.querySelector('#skills').classList.remove('hidden')
            document.querySelector('#deck').classList.remove('hidden')
        })
    }   
}

let click = new Click()
click.goBack()
click.showDeck()
click.showSkills()

// skills.skill1()
// skills.skill3()
// alignments: "Female"
// attack: "13166"
// attackGrail: "9261"
// attackMax: "11213"
// class: "Lancer"
// comments: null
// cost: "12"
// deathRate: "28%"
// gender: "Female"
// health: "11749"
// healthGrail: "16743"
// healthMax: "14246"
// image: "Mysterious_Alter-Ego_Lambda_Sprite1.png"
// likes: 0
// name: "Mysterious Alter Ego Λ"
// npAttack: "0.76%"
// npCharge: "4%"
// rarity: "★ ★ ★ ★"
// servantID: "266"
// starAbsorption: "91"
// starGeneration: "12.1%"
// _id: "62af85df55da1c8b81971c2c"


let url1 ='https://api.atlasacademy.io/export/JP/asset_storage.json'
fetch(url1)
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        document.querySelector('#test').src = data[1024].fileName
    })


let url = 'https://api.atlasacademy.io/export/JP/nice_servant_lore_lang_en.json'

fetch(url)
  .then(res=>res.json())
  .then(data=>{
    data.forEach(ele=>{
     if(ele.name === servant.name && ele.className === servant.class.toLowerCase()){
        // console.log(ele)
        for(let i =0;i<ele.skills.length;i++){

            // console.log(ele.skills[i].name)
            // console.log(ele.skills[i].icon)
            // console.log(`/${ele.skills[i].icon}`)
            
// console.log(ele.skills[i].icon)
            // console.log(ele.skills[i].functions)

            ele.skills[i].functions.forEach(ele=>{
                // console.log(ele.funcPopupIcon)
                if(ele.funcPopupIcon!==undefined ){
              
                    image = ele.funcPopupIcon.split('/')
                    image = image[image.length-1]
                //  console.log(image)
                //  console.log(addArr(image))
                    let icon = document.createElement('img')
                    icon.src = ele.funcPopupIcon
                    // console.log(icon)
                    document.querySelector('#icon').appendChild(icon)
                }
            })
        }


        deck(ele.cards)


      
            // console.log(ele.skills)
            for(let index = 0;index<3;index++){
                // console.log(ele.skills)
            document.querySelector(`#skill${index}`).src = `${ele.skills[index].icon}`
                }

         }
    })


    
})

function deck(arr){
    for(let i =0;i<5;i++){
        document.querySelector(`#card${i}`).src = `/simulator/${arr[i]}.png`
    }
}
