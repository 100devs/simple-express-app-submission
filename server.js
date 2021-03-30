const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 3000

app.use(cors())

app.get('/', (req,res)=>{
  res.sendFile(__dirname + '/index.html')
})

let heroes = {
  'flash' : {
    'name': 'The Flash',
    'power': 'Speed Force',
    'license': 'DC',
    'bio': `Bartholomew Henry "Barry" Allen is a student at Central City University who was struck by a bolt of lightning one fateful night, gaining the ability to think and move at incredible superhuman speeds. Using these powers, he became a superhero in Central City known as The Flash, fighting against criminals like Captain Boomerang while trying his best to keep a low profile in the process. He is also desperate to prove his father's innocence for the grisly murder of his mother.`
  },
  'batman' : {
    'name': 'Batman',
    'power': 'Peak Human Conditioning, Master Combatant, Genius Intellect',
    'license': 'DC',
    'bio': `Batman is the superhero protector of Gotham City, a tortured, brooding vigilante dressed as a sort of human bat who fights against evil and strikes fear into the hearts of criminals everywhere. In his public identity he is Bruce Wayne, billionaire industrialist and notorious playboy. Although he has no superhuman abilities, he is one of the world's smartest men and greatest fighters. His physical prowess, technical ingenuity, and tactical thinking make him an incredibly dangerous opponent. He is also a founding member of the Justice League.`
  },
  'superman' : {
    'name': 'Superman',
    'power': 'Flight, Invulneralabity, Heat Vision, Superhuman strength',
    'license': 'DC',
    'bio': `Clark Joseph Kent (born Kal-El) is a extremely powerful and nigh-indestructible Kryptonian, a superhero of the House of El, one of the extremely few survivors of the destruction of the planet Krypton, and an investigative reporter of the Daily Planet alongside his lover and confidant Lois Lane. In addition, Kal-El is the first Kryptonian of natural birth in centuries, the host of the Growth Codex, and a member of the Justice League.`
  },
  'wonder woman' : {
    'name': 'Wonder Woman',
    'power': 'Flight, Superhuman strength, Superhuman durability, Superhuman speed, Divine energy generation',
    'license': 'DC',
    'bio': `Princess Diana of Themyscira is an Amazon warrior princess and one of the world's first superheroes, known as Wonder Woman. She is the daughter of Queen Hippolyta and Zeus, the king of the Old Gods, as well as a member of the Justice League.
Born on Themyscira, Diana was raised in paradise, hearing tales of the Amazons’ great task of defeating the corrupt God of War, Ares, ushering in a new era of peace to the world. Upon coming of age, Diana began pursuing the life of a warrior, despite her mother's objections. Determined to serve, she ultimately enticed her aunt Antiope to train her in secret. This, however, was soon discovered by her mother. Begrudgingly, the queen accepted Diana as a warrior, and ordered Antiope to train her better than any other Amazon.`
  },
  'green lantern' : {
    'name': 'Green Lantern',
    'power': 'Flight, Invulneralabity, Energy Projection',
    'license': 'DC',
    'bio': `Hal Jordan is a former combat pilot who works for Ferris Aircraft as a test pilot, a member and occasionally leader of an intergalactic police force called the Green Lantern Corps, as well as a founding member of the Justice League.`
  },
  'classified' : {
    'name': 'Classified',
    'power': 'Classified',
    'license': 'Classified',
    'bio': `Classified`
  }
}
app.get('/api/heroes/:heroName', (req,res)=>{
  const hero = req.params.heroName.toLowerCase()
  if(heroes[hero]){
    res.json(heroes[hero])
  } else {
    res.json(heroes['classified'])
  }
})

app.listen(process.env.PORT || PORT, ()=>{
  console.log(`Server running on ${PORT}`)
})
