const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8000;

app.use(cors());


app.get('/', (request, response) => {
  response.sendFile(__dirname + '/index.html');
})

app.get('/api/yokai/:yokaiName', (request, response) => {
  const yokaiNm = request.params.yokaiName.toLowerCase();
  if (yokai[yokaiNm]) {
    response.json(yokai[yokaiNm]);
  } else {
    response.json(yokai['unknown']);
  }
})

app.listen(process.env.PORT || PORT, () => {
  console.log(`Serving running on port ${PORT}`)
})


let yokai = {
  'whisper' : {
    'name' : 'Whisper',
    'tribe' : 'Slippery',
    'medalPic' : 'https://static.wikia.nocookie.net/yo-kai/images/0/0c/MEDAL_Whisper_01.png/revision/latest/scale-to-width-down/955?cb=20160111004442',
    'yokaiPic' : 'https://static.wikia.nocookie.net/yokaiwatch/images/2/29/YW_-_Whisper.png/revision/latest/scale-to-width-down/688?cb=20200101174803'
    'medalliumBio' : `The self-proclaimed Yo-kai butler to the stars! He loves to give information on every Yo-kai, but in fact he's really more of a know nothing, who gets his information from his trusty Yo-kai Pad.`
  }
  'pandle' : {
    'name'  : 'Pandle',
    'tribe' : 'Brave',
    'effect'  : 'Those inspirited by Pandle will become very careless.',
    'medalPic'  : 'https://i.ibb.co/zHH1M8f/Pandle-NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/6/6e/Pandle_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/rxDYcWL/Pandle-Artwork.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/83/Pandle_Artwork.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : 'A careless Yo-kai who enters battle wearing only a loincloth...and a pan...on his head. Try not to take after him so much.'
  },
  'undy' : {
    'name'  : 'Undy',
    'tribe' : 'Brave',
    'effect'  : 'Those inpirited by Undy will lower their defenses.',
    'medalPic'  : 'https://i.ibb.co/xSHKGtL/Undy-TM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/3/3d/Undy_TM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/p4CzkH1/Undy-Artwork.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/4/4b/Undy_Artwork.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `Having abandoned the pan, Undy is pretty much bare to the world. That aside, you won't ever see him wince or bruise.`
  },
  'tanbo' : {
    'name'  : 'Tanbo',
    'tribe' : 'Brave',
    'effect'  : 'Those inspirited by Tanbo become gutsy and take action without thinking.',
    'medalPic'  : 'https://i.ibb.co/c8Y9yQ3/Tanbo-NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/a/ae/Tanbo_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/SV01zQT/Tanbo-official-art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/2/2a/Tanbo_official_art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `A Yo-kai who is always first to the battle! With nothing to slow him down, he shows up early and always has a nice tan.`
  },
  'benkei' : {
    'name'  : 'Benkei',
    'tribe' : 'Brave',
    'effect'  : 'Those inspirited by Benkei will act clumsily',
    'medalPic' : 'https://i.ibb.co/WHjyDX0/Benkei-NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/c/c2/Benkei_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/9gppDKL/Benkei2.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/e1/Benkei2.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `Hiding 999 weapons from fallen foes in his stomach, Benkei can call any one of them out in a moment of need.`
  },
  'b3-nk1' : {
    'name'  : 'B3-NK1',
    'tribe' : 'Brave',
    'effect'  : 'Those inspirited by B3-NK1 are affected in unknown ways.',
    'medalPic'  : 'https://i.ibb.co/PQd5MPJ/B3-NK1-NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/9/9c/B3-NK1_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/s2Spxbj/B3-NK1-Artwork.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/b/be/B3NK1_Artwork.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `Hiding 999 weapons from fallen foes in his stomach, Benkei can call any one of them out in a moment of need.`
  },
  'sushiyama' : {
    'name'  : 'Sushiyama',
    'tribe' : 'Brave',
    'effect'  : 'Those inspirited by Sushiyama fully embrace traditional Japanese culture and lifestyle.',
    'medalPic'  : 'https://i.ibb.co/KxTfjw2/Sushiyama-NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/75/Sushiyama_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/4PdnH1w/Sushiyama-Art.jpg',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/1/11/Sushiyama_Art.jpg/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `A Yo-kai who desperately wants to be Japanese. He sleeps on a futon and eats only sushi. I think he might be doing it wrong...`
  },
  'kapunki' : {
    'name'  : 'Kapunki',
    'tribe' : 'Brave',
    'effect'  : 'Those inspirited by Kapunki are affected in unknown ways.',
    'medalPic'  : 'https://i.ibb.co/Hx9H5bx/Kapunki-NM.jpg',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/81/Kapunki_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/F7gs6mW/Kapunki-Art.jpg',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/a/a4/Kapunki_Art.jpg/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `A punk Yo-kai who wears a kabuki-style makeup. He dreams of rocking the socks and faces off his fans all across the globe.`
  },
  'beetler' : {
    'name'  : 'Beetler',
    'tribe' : 'Brave',
    'effect'  : 'Those inspirited by Beetler are affected in unknown ways.',
    'medalPic'  : 'https://i.ibb.co/gwwXLW9/Beetler-NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/b/b2/Beetler_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/SKxMSy6/Kuwano-Bushi.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/0/0d/Kuwano-Bushi.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `Beetler is a young battler who fights with his horns and his fists. He trains with his rival, Rhinoggin.`
  },
  'beetall' : {
    'name'  : 'Beetall',
    'tribe' : 'Brave',
    'effect'  : 'Those inspirited by Beetall are affected in unknown ways.',
    'medalPic'  : 'https://i.ibb.co/rtF1Nw5/Beetall-NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/d/d8/Beetall_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/3F29tJt/Kuwaga-Taishou.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/c/cf/Kuwaga-Taishou.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `If Beetler bashes baddies in a bevy of brutal battles, the result will be a big-bodied Beetall.`
  },
  'cruncha' : {
    'name'  : 'Cruncha',
    'tribe' : 'Brave',
    'effect'  : 'Those inspirited by Cruncha are affected in unknown ways.',
    'medalPic'  : 'https://i.ibb.co/DgQ6vTX/Cruncha-NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/82/Cruncha_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/MRv5g7s/Cruncha-Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/e3/Cruncha_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `A stag beetle Yo-kai that represent the apex of the thorax. He can grant you incredible strength.`
  },
  'cutta-nah' : {
    'name'  : 'Cutta-nah',
    'tribe' : 'Brave',
    'effect'  : 'Those inspirited by Cutta-nah slack off.',
    'medalPic'  : 'https://i.ibb.co/0VpHhH1/Cutta-nah-NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/3/39/Cutta-nah_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/KFRCk3X/Cutta-nah.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/3/3a/Cutta-nah.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `A lazy katana Yo-kai that can drain all of your motivation. He's strangely sharp for being so lazy.`
  },
  'cutta-nah-nah' : {
    'name'  : 'Cutta-nah-nah',
    'tribe' : 'Brave',
    'effect'  : 'Those inspirited by Cutta-nah-nah are affected in unknown ways.',
    'medalPic'  : 'https://i.ibb.co/Ntqjy3K/Cutta-nah-nah-NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/e7/Cutta-nah-nah_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/SRw6Jw8/Zanbaratou.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/d/d3/Zanbaratou.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `Too lazy to get a haircut, but not too lazy to slash enemies with his untidy strands.`
  },
  'slacka-slash' : {
    'name'  : 'Slacka-slash',
    'tribe' : 'Brave',
    'effect'  : 'Those inspirited by Slacka-slash either achieve something to the highest or fail miserably.',
    'medalPic'  : 'https://i.ibb.co/sqWtZn6/Slacka-slash-NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/f/f3/Slacka-slash_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/pbM5Kyq/Slacka-slash.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/b/b3/Slacka-slash.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `More dangerous than he looks, Slacka-slash can beat his foes with only a single slice.`
  },
  'zerberker' : {
    'name'  : 'Zerberker',
    'tribe' : 'Brave',
    'effect'  : 'Those inspirited by Zerberker explode with rage.',
    'medalPic'  : 'https://i.ibb.co/Y7wZfkJ/Zerberker-NM.jpg',
    'medalPicThumb'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/f/f9/Zerberker_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/DY59ZrH/Kushamusha2.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/0/0f/Kushamusha2.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `Legend has it that this Yo-kai leveled an entire village with one tantrum. You'll explode with rage if he's around.`
  },
  'snartle' : {
    'name'  : 'Snartle',
    'tribe' : 'Brave',
    'effect'  : 'Snartle attacks misbehaving kids to teach them a lesson.',
    'medalPic'  : 'https://i.ibb.co/3YZ6cMf/Snartle-NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/e1/Snartle_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/34vqgdt/Namahage.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/81/Namahage.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `This Yo-kai visits homes asking 'Any brats here?' It's a way of scaring kids into behaving well. Kind of like a reverse Santa.`
  },
  'mochismo' : {
    'name'  : 'Mochismo',
    'tribe' : 'Brave',
    'effect'  : 'Those inspirited by Mochismo experience bouts of super strength.',
    'medalPic'  : 'https://i.ibb.co/s9SGPsB/Mochismo-NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/2/2b/Mochismo_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/FDyJvLS/Mochismo-Official-Artwork.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/ec/Mochismo_Official_Artwork.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `He's cute most of the time, but when he's mad, his body cracks and his manly face pops out.`
  },
  'minochi' : {
    'name'  : 'Minochi',
    'tribe' : 'Brave',
    'effect'  : 'Those inspirited by Minochi become irrationally jealous.',
    'medalPic'  : 'https://i.ibb.co/8scvpgL/Minochi-NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/a/a2/Minochi_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/frnkmcj/Minochi-Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/6/67/Minochi_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `When he's in love, he gets overly protective of his partner. He can make you a very jealous person.`
  },
  'helmsman' : {
    'name'  : 'Helmsman',
    'tribe' : 'Brave',
    'effect'  : 'Those inspirited by Helmsman are given head protection from damage.',
    'medalPic'  : 'https://i.ibb.co/F4cfgbb/Helmsman-NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/5/5e/Helmsman_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/s5Yczzn/Kabutosan.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/4/48/Kabutosan.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `A floating helmet that was worn by a famous military commander. It spends its time searching for its armor-- a good use of time.`
  },
  'reuknight' : {
    'name'  : 'Reuknight',
    'tribe' : 'Brave',
    'effect'  : 'Those inspirited by Reuknight are affected in unknown ways.',
    'medalPic'  : 'https://i.ibb.co/VBBZ97Q/Reuknight-NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/8d/Reuknight_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/b6BmZpY/Reuknight2.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/f/f2/Reuknight2.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `Helmsman and Armsman reunited. He now aspires to do what he couldn't do when he was alive; unify the country.`
  },
  'corptain' : {
    'name'  : 'Corptain',
    'tribe' : 'Brave',
    'effect'  : 'Those inspirited by Corptain are affected in unknown ways.',
    'medalPic'  : 'https://i.ibb.co/VTYpRBX/Corptain-NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/6/6b/Corptain_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/SVXPtbW/Corptain2.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/5/55/Corptain2.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `A popular leader when he was alive, Corptain leads an army of souls even after death. Now that's charisma!`
  },
  'blazion' : {
    'name'  : 'Blazion',
    'tribe' : 'Brave',
    'effect'  : 'Those inspirited by Blazion are affected in unknown ways.',
    'medalPic'  : 'https://i.ibb.co/0ZjG7Fr/Blazion-NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/2/25/Blazion_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/z4wKPsH/Blazion.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/7b/Blazion.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `The king of beasts with a mane of fire! This hot-blooded Yo-kai fills folks with fiery enthusiasm.`
  },
  'quaken' : {
    'name'  : 'Quaken',
    'tribe' : 'Brave',
    'effect'  : 'Those inspirited by Quaken can be cheered from even the saddest feeling.',
    'medalPic'  : 'https://i.ibb.co/sb0PFL4/Quaken-NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/c/cc/Quaken_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/920Z3XR/Quaken-Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/3/30/Quaken_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `Every step Quaken takes shakes the place... and some of those vibrations can even move your heart. Awwwww!`
  },
  'siro' : {
    'name'  : 'Siro',
    'tribe' : 'Brave',
    'effect'  : 'Those inspirited by Siro are at their best, shining lights for the future.',
    'medalPic'  : 'https://i.ibb.co/bKS35JY/Siro-NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/b/b9/Siro_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/9tM73bh/Siro-0.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/77/Siro-0.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `Siro brings out the best in those he inspirits. They become shining lights for the future.`
  },
  'chansin' : {
    'name'  : 'Chansin',
    'tribe' : 'Brave',
    'effect'  : 'Those inspirited by Chansin become obsessed with challenges, no matter how ridiculous.',
    'medalPic'  : 'https://i.ibb.co/Nm22053/Chansin-NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/5/51/Chansin_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/prVhrfL/Chansin2.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/b/b9/Chansin2.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `Once a proud warrior, Chansin threw it all away by gambling...Now his best odds are to retreat.`
  },
  'sheen' : {
    'name'  : 'Sheen',
    'tribe' : 'Brave',
    'effect'  : 'Those inspirited by Sheen are affected in unknown ways.',
    'medalPic'  : 'https://i.ibb.co/mhxmkxV/Exif-JPEG-PICTURE.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/6/6a/Sheen_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/7kdDhXd/Sheen2.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/d/d9/Sheen2.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `A Yo-kai swordsman who returned to the way of the sword when a legendary blade reignited his spirit.`
  },
  'snee' : {
    'name'  : 'Snee',
    'tribe' : 'Brave',
    'effect'  : `Snee's blade makes him crave blood, so he sneaks up on people to get some.`,
    'medalPic'  : 'https://i.ibb.co/zNFwJmp/Snee-NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/5/52/Snee_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/r7pvDmy/Snee2.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/2/20/Snee2.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `Cursed by his demon blade, Snee searches the world for blood. He excels at silently sneaking up on his enemies.`
  },
  'gleam' : {
    'name'  : 'Gleam',
    'tribe' : 'Brave',
    'effect'  : 'Those inspirited by Gleam are affected in unknown ways.',
    'medalPic'  : 'https://i.ibb.co/hMLKJpT/Gleam-NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/81/Gleam_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/rdQxsMh/Gleam2.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/e7/Gleam2.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `A swordsman who takes justice in his hands, using a sword from God. That sword is said to cut through evil and have world peace.`
  },
  'shogunyan' : {
    'name'  : 'Shogunyan',
    'tribe' : 'Brave',
    'effect'  : 'Those inspirited by Shogunyan are affected in unknown ways.',
    'medalPic' : 'https://i.ibb.co/RcRHW4p/Shogunyan-NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/83/Shogunyan_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/n1dJL1Y/Shogunyan.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/9/93/Shogunyan.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `Jibanyan turned into a legendary warrior. He just loves skipjack tuna and carries it around in his armor.`
  },
  'snotsolong'  : {
    'name'  : 'Snotsolong',
    'tribe' : 'Mysterious',
    'effect'  : 'Those inspirited by Snotsolong are plagued with an absurdly runny nose.',
    'medalPic'  : 'https://i.ibb.co/s5bSX7Q/Snotsolong-NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/4/45/Snotsolong_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/6YJPXzJ/Snotsolong2.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/8d/Snotsolong2.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `A crane Yo-kai with an insanely runny nose. He's scared his drippings will make him too heavy to fly...I'd be scared, too.`
  },
  'duchoo'  : {
    'name'  : 'Duchoo',
    'tribe' : 'Mysterious',
    'effect'  : `Those inspirited by Duchoo can trick people into thinking they're sick.`,
    'medalPic'  : 'https://i.ibb.co/7nLTLsq/Duchoo-NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/3/36/Duchoo_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/4dFNV0T/Duchoo-Art.jpg',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/f/f4/Duchoo_Art.jpg/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `Ever felt like you might be sick, but you're not totally sure if you are? Blame Duchoo.`
  },
  "d'wanna"  : {
    'name'  : `D'wanna`,
    'tribe' : 'Mysterious',
    'effect'  : `Those inspirited by D'Wanna abruptly decide to stop doing what they were doing, as if bored.`,
    'medalPic'  : 'https://i.ibb.co/5jb2gzJ/D-wanna-NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/6/60/D%27wanna_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/jWRVF5L/D-wanna-Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/d/d6/D%27wanna_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `D'wanna's chants will weaken your resolve! This can make you give up on... y'know, stuff and whatever.`
  },
  "n'more"  : {
    'name'  : `N'more`,
    'tribe' : 'Mysterious',
    'effect'  : `Those inspirited by N'More become lazy, grow bored easily, and sigh constantly.`,
    'medalPic'  : 'https://i.ibb.co/g6YhpMY/N-more-NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/6/65/N%27more_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/KbwtYBX/Nmore.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/eb/Nmore.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `N'more gets bored of things quickly. Some say his cool brows and beard grew from his boredom with shaving.`
  },
  "q'wit"  : {
    'name'  : `Q'wit`,
    'tribe' : 'Mysterious',
    'effect'  : `Those inspirited by Q'wit will quit whatever they're doing, no matter how excited they were about doing it.`,
    'medalPic'  : 'https://i.ibb.co/Vg9rKM1/Q-wit-NM.jpg.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/2/23/Q%27wit_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/fMKmKpz/Qwit.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/1/11/Qwit.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `He gives up on everything he tries and won't do the same thing twice. He has a lot of experience at doing things once.`
  },
  'wazzat'  : {
    'name'  : 'Wazzat',
    'tribe' : 'Mysterious',
    'effect'  : 'Those inspirited by Wazzat can have memories "eaten", causing them to become forgetful.',
    'medalPic'  : 'https://i.ibb.co/ZSSxQsZ/Wazzat-NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/f/f8/Wazzat_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/1L6bV2V/Wazzat-artwork.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/78/Wazzat_artwork.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `He fits snuggly on your head then devours your memories. It can be nice to forget the bad ones... or to just wear a hat.`
  },
  'dummkap'  : {
    'name'  : 'Dummkap',
    'tribe' : 'Mysterious',
    'effect'  : 'Those inspirited by Dummkap act very foolishly.',
    'medalPic'  : 'https://i.ibb.co/NCB2tFp/Dummkap-NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/4/48/Dummkap_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/m4YCf0T/Dummkap.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/b/be/Dummkap.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `This hat Yo-kai can make geniuses into dreamy fools. A foolish life can be more fun...but would you even realize if it were?!`
  },
  'lafalotta'  : {
    'name'  : 'Lafalotta',
    'tribe' : 'Mysterious',
    'effect'  : 'Lafalotta absorbs laughter that would have been heard from a joke, making it seem bad.',
    'medalPic'  : 'https://i.ibb.co/5K3zm1y/Lafalotta-NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/1/1d/Lafalotta_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/sHZkYJ0/Lafalotta-Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/2/26/Lafalotta_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `This Yo-kai sucks the laughter and fun out of a situation and keeps all the laughs for herself.`
  },
  'blips'  : {
    'name'  : 'Blips',
    'tribe' : 'Mysterious',
    'effect'  : 'Those inspirited by Blips have blue lips.',
    'medalPic'  : 'https://i.ibb.co/S6Fg6wf/Blips-NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/3/3e/Blips_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/0VNrqJJ/Blips-official-art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/86/Blips_official_art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `If you see someone get out of a pool with blue lips, they might just be inspirited by Blips...`
  },
  'tattletell'  : {
    'name'  : 'Tattletell',
    'tribe' : 'Mysterious',
    'effect'  : 'Those inspirited by Tattletell will reveal their secrets.',
    'medalPic'  : 'https://i.ibb.co/vxMKG2K/Tattletell-NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/b/b1/Tattletell_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/nR685vV/Tattletell.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/3/33/Tattletell.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `When Tattletell inspirits you, you'll feel inspired to TELL, TELL, TELL all of your secrets.`
  },
  'tattlecast'  : {
    'name'  : 'Tattlecast',
    'tribe' : 'Mysterious',
    'effect'  : 'Those inspiritied by Tattlecast will should their biggest secrets to town, cities or even countries.',
    'medalPic'  : 'https://i.ibb.co/6HBHV4q/Tattlecast-NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/83/Tattlecast_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/vjNxN7K/Tattlecast2.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/eb/Tattlecast2.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `She uses her massive speakers to broadcast scandalous secrets to the whole city. Hope they aren't yours!`
  },
  'skranny'  : {
    'name'  : 'Skranny',
    'tribe' : 'Mysterious',
    'effect'  : 'Those inspirited by Skranny will be affected in unknown ways.',
    'medalPic'  : 'https://i.ibb.co/j5zrpFZ/Skranny-NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/72/Skranny_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/BKV5mpX/Skranny-artwork.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/7a/Skranny_artwork.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `Only Tattletells who discover their love of heavy metal music can don the skull makeup and become a Skranny.`
  },
  'cupistol'  : {
    'name'  : 'Cupistol',
    'tribe' : 'Mysterious',
    'effect'  : 'Anyone Cupistol shoots will love those who it inspirits.',
    'medalPic'  : 'https://i.ibb.co/jvXYDN3/Cupistol-NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/eb/Cupistol_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/jVMFBJR/Cupistoartworkl.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/c/c7/Cupistoartworkl.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `This debonair Yo-kai is quite a hit with the ladies. Anyone he shoots will love you. He's just the greatest! *swoon*`
  },
  'casanuva'  : {
    'name'  : 'Casanuva',
    'tribe' : 'Mysterious',
    'effect'  : 'Those inspirited by Casanuva will be extremely popular and very noticeable.',
    'medalPic'  : 'https://i.ibb.co/gFXyFC2/Casanuva2.png',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/e3/CasanuvaNM2.png/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/Dbq85T1/Casanuva-NM2.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/c/c8/Casanuva2.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `This narcissist makes every lady he sees fall in love with him, regardless of appearance.`
  },
  'casanono'  : {
    'name'  : 'Casanono',
    'tribe' : 'Mysterious',
    'effect'  : 'Those inspirited by Casanono will be unpopular and disliked by all.',
    'medalPic'  : 'https://i.ibb.co/Ms47bKR/Casanono-NM2.png',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/f/fe/CasanonoNM2.png/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/nLJr30H/Motenasu.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/c/ca/Motenasu.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `Casanuva's opposite. He just can't get a date no matter what! He'll make you unpopular too. Best to give him some space.`
  },
  'signibble'  : {
    'name'  : 'Signibble',
    'tribe' : 'Mysterious',
    'effect'  : 'Those inspirited by Signibble will be affected in unknown ways.',
    'medalPic'  : 'https://i.ibb.co/hBG3tnW/Signibble-NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/9/96/Signibble_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/kBMKP9p/Signibble.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/a/a6/Signibble.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `A mischievous Yo-kai that snacks on radio waves in the air. You'll lose a few bars on your phone when he's around.`
  },
  'signiton'  : {
    'name'  : 'Signiton',
    'tribe' : 'Mysterious',
    'effect'  : 'Those inspirited by Signibble will be affected in unknown ways.',
    'medalPic'  : 'https://i.ibb.co/QfnvmbL/Signiton-NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/5/53/Signiton_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/Js2X1YL/Signiton2.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/7d/Signiton2.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `Signiton is almost a deity for those in desperate need of a wireless signal. He can boost your reception if you ask.`
  },
  'statiking'  : {
    'name'  : 'Statiking',
    'tribe' : 'Mysterious',
    'effect'  : 'Those inspirited by Statiking will be affected in unknown ways.',
    'medalPic'  : 'https://i.ibb.co/sRSS8Nb/Statiking-NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/f/ff/Statiking_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/xCN9Nmb/Statiking2.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/f/fa/Statiking2.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `He's pretty lazy, but if he got motivated, his power would fix a ton of the world's energy problems.`
  },
  'mirapo'  : {
    'name'  : 'Mirapo',
    'tribe' : 'Mysterious',
    'effect'  : 'Those inspirited by Mirapo will be affected in unknown ways.',
    'medalPic'  : 'https://i.ibb.co/XsdqnF4/Mirapo-NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/9/94/Mirapo_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/cKWJpMg/Mirapo.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/f/fb/Mirapo.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `An ancient mirror that embodied a soul and became a Yo-kai. It can make a portal between two mirrors.`
  },
  'mircle'  : {
    'name'  : 'Mircle',
    'tribe' : 'Mysterious',
    'effect'  : 'Those inspirited by Mircle are affected in unknown ways.',
    'medalPic'  : 'https://i.ibb.co/ypcRq0P/Mircle-NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/1/1b/Mircle_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/7yVt2sr/Mircle-Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/a/a8/Mircle_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `Mircle fills the space behind mirrors with evil by renting it out to a bad Yo-kai... at a wicked high rate, naturally.`
  },
  'illoo'  : {
    'name'  : 'Illoo',
    'tribe' : 'Mysterious',
    'effect'  : 'Those inspirited by Illoo are affected in unknown ways.',
    'medalPic'  : 'https://i.ibb.co/rv9swLk/Illoo-NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/3/3c/Illoo_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/rxyPT80/Illoo-artwork.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/a/a7/Illoo_artwork.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `A caring teacher who uses illusions to simplify his lessons. He can make complex topics seem pretty accessible.`
  },
  'elloo'  : {
    'name'  : 'Elloo',
    'tribe' : 'Mysterious',
    'effect'  : 'Those inspirited by Elloo are affected in unknown ways.',
    'medalPic'  : 'https://i.ibb.co/z5VmdXC/Elloo-NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/7d/Elloo_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/5sf2k6J/Elloo2.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/c/cb/Elloo2.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `A friendly old Yo-kai who can dissipate into a haze. He's Illoo's brother.`
  },
  'alloo'  : {
    'name'  : 'Alloo',
    'tribe' : 'Mysterious',
    'effect'  : 'Those inspirited by Alloo wander into forests, crowds, buildings, etc.',
    'medalPic'  : 'https://i.ibb.co/GR5cTfM/Alloo-NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/7f/Alloo_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/QJ3HWLp/Alloo-Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/a/a3/Alloo_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `He wanders the world without a goal. It's an absolute miracle if the three brothers Illoo, Elloo, and Alloo all meet up.`
  },
  'espy'  : {
    'name'  : 'Espy',
    'tribe' : 'Mysterious',
    'effect'  : `Those inspirited by Espy can read people's minds, reciting people's thoughts before they say them.`,
    'medalPic'  : 'https://i.ibb.co/vXFNmqJ/Espy-NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/9/98/Espy_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/yQSrLrY/Espy2.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/5/57/Espy2.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `Espy gets a kick out of reading people's minds. It's totally not fair that no one can read hers... and now she knows that too.`
  },
  'infour'  : {
    'name'  : 'Infour',
    'tribe' : 'Mysterious',
    'effect'  : 'Those inspirited by Infour are affected in unknown ways.',
    'medalPic'  : 'https://i.ibb.co/JvhcnN7/Infour-NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/1/10/Infour_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/Km5w9xK/Infour2.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/6/66/Infour2.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `Her four eyes can see a person's age, name, gender, and birthday, but she can't read minds. It's still kinda creepy, though.`
  },
  'tengu'  : {
    'name'  : 'Tengu',
    'tribe' : 'Mysterious',
    'effect'  : 'Those inspirited by Tengu are affected in unknown ways.',
    'medalPic'  : 'https://i.ibb.co/fxJps38/Tengu-NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/d/dc/Tengu_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/DLS910W/Tengu-Artwork.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/0/03/TenguArtwork.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `A popular tengu who controls the power of wind. Apparently all that power comes from his number-one fan.`
  },
  'flengu'  : {
    'name'  : 'Flengu',
    'tribe' : 'Mysterious',
    'effect'  : 'Those inspirited by Flengu are affected in unknown ways.',
    'medalPic'  : 'https://i.ibb.co/b5PkVGw/Flengu.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/ef/Flengu.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/6vB0m17/Flengu.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/e6/Flengu.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `A Tengu with hair the color of fire. Legend says it causes a drought when humanity needs to be taught a lesson.`
  },
  'kyubi'  : {
    'name'  : 'Kyubi',
    'tribe' : 'Mysterious',
    'effect'  : 'Those inspirited by Kyubi are affected in unknown ways.',
    'medalPic'  : 'https://i.ibb.co/p0MkYxR/KyubiNM2.png',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/74/KyubiNM2.png/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/4NTNCy4/Kyubi.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/4/43/Kyubi.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `This Fox Yo-kai is one of the strongest out of every Yo-kai. He can easily make a volcano erupt.`
  },
  'frostail'  : {
    'name'  : 'Frostail',
    'tribe' : 'Mysterious',
    'effect'  : 'Those inspirited by Frostail are affected in unknown ways.',
    'medalPic'  : 'https://i.ibb.co/GWRrZm0/Exif-JPEG-PICTURE.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/83/Frostail_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/726hg57/Frostail-Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/86/Frostail_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "Even a single hair of this rare Yo-kai's silvery coat can bring generations of good luck!"
  },
  'komashura'  : {
    'name'  : 'Komashura',
    'tribe' : 'Mysterious',
    'effect'  : 'Those inspirited by Komashura are affected in unknown ways.',
    'medalPic'  : 'https://i.ibb.co/VJfcjyx/Komashura-NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/2/2b/Komashura_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://i.ibb.co/nsmkFdN/Shurakoma.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/c/c4/Shurakoma.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "A legendary Komasan with the heart of a greater demon. He scorches his foes with infernal flame."
  },
  'dulluma'  : {
    'name'  : 'Dulluma',
    'tribe' : 'Tough',
    'effect'  : 'Those inspirited by __ are affected in unknown ways',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/d/da/Dulluma_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/d/da/Dulluma_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/9/9d/Dulluma.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/9/9d/Dulluma.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "He looks like a lucky daruma, but his real body is inside the shell. Dull and sluggish, he can really slow you down."
  },
  'daramacho'  : {
    'name'  : 'daramacho',
    'tribe' : 'Tough',
    'effect'  : 'Those inspirited by __ are affected in unknown ways',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/0/05/Darumacho_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/0/05/Darumacho_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/4/40/Darumacho_Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/4/40/Darumacho_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "Now a truly macho Yo-kai, this one worked tirelessly in a mountain retreat to train away his dullness."
  },
  'goruma'  : {
    'name'  : 'Goruma',
    'tribe' : 'Tough',
    'effect'  : 'Those inspirited by __ are affected in unknown ways',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/0/01/Goruma_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/0/01/Goruma_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/9/97/Goruma_Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/9/97/Goruma_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "Darumacho wasn't happy until he had the body and strength of a gorilla. Goruma can crush cars like marshmallows."
  },
  'noway'  : {
    'name'  : 'Noway',
    'tribe' : 'Tough',
    'effect'  : 'Those inspirited by __ are affected in unknown ways',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/0/0a/Noway_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/0/0a/Noway_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/6/67/Noway_Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/6/67/Noway_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `He rejects everything with a "No way!" Becoming a brain-surgeon astronaut is easier than getting past him.`
  },
  'impass'  : {
    'name'  : 'Impass',
    'tribe' : 'Tough',
    'effect'  : 'Those inspirited by __ are affected in unknown ways',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/0/0e/Impass_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/0/0e/Impass_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/a/a1/Impass_Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/a/a1/Impass_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "You...you just can't get by Impass. Why?! What's his motivation?! What's the story behind him?! Nobody knows..."
  },
  'walldin'  : {
    'name'  : 'Walldin',
    'tribe' : 'Tough',
    'effect'  : 'Those inspirited by __ are affected in unknown ways',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/5/53/Walldin_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/5/53/Walldin_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/e2/ShirokabeArtwork.jpg',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/e2/ShirokabeArtwork.jpg/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "'Formerly a sturdy castle wall, the fall of the family he once protected turned him into a Yo-kai."
  },
  'roughraff'  : {
    'name'  : 'Roughraff',
    'tribe' : 'Tough',
    'effect'  : 'Those inspirited by __ are affected in unknown ways',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/2/24/Rougraff_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/2/24/Rougraff_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/b/ba/Gurerulin_artwork.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/b/ba/Gurerulin_artwork.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "A Yo-kai whose only cause is rebellion, he Inspirits good kids into badness and delinquency."
  },
  'badude'  : {
    'name'  : 'Badude',
    'tribe' : 'Tough',
    'effect'  : 'Those inspirited by __ are affected in unknown ways',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/8c/Badude_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/8c/Badude_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/d/dd/GokudoArtworkTransparent.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/d/dd/GokudoArtworkTransparent.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "This gang leader runs into enemy territory wielding his brutal nail bat. That's his way of taking care of his gang."
  },
  'bruff'  : {
    'name'  : 'Bruff',
    'tribe' : 'Tough',
    'effect'  : 'Those inspirited by __ are affected in unknown ways',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/4/4d/Bruff_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/4/4d/Bruff_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/d/d3/Bruff_Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/d/d3/Bruff_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "Said to have taken down an entire Yo-kai gang by himself, many rebel Yo-kai revere him as a big brother."
  },
  'armsman'  : {
    'name'  : 'Armsman',
    'tribe' : 'Tough',
    'effect'  : 'Those inspirited by __ are affected in unknown ways',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/e3/Armsman_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/e3/Armsman_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/84/Yoroisan.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/84/Yoroisan.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "Even headless he gives 110 percent. He dreams of reuniting with his head someday... Not sure how he dreams-- he just does."
  },
  'blowkade'  : {
    'name'  : 'Blowkade',
    'tribe' : 'Tough',
    'effect'  : 'Those inspirited by __ are affected in unknown ways',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/f/ff/Blowkade_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/f/ff/Blowkade_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/4/41/Blowkade_Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/4/41/Blowkade_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "Blowkade is one weird Yo-kai. Nobody knows why he puts his all into blocking people's paths."
  },
  'ledballoon'  : {
    'name'  : 'Ledballoon',
    'tribe' : 'Tough',
    'effect'  : 'Those inspirited by __ are affected in unknown ways',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/9/9d/Ledballoon_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/9/9d/Ledballoon_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/f/ff/Ledballoon_Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/f/ff/Ledballoon_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "A dump truck couldn't move Ledballon's heavy body... which is bad news if it gets in your way."
  },
  'fidgephant'  : {
    'name'  : 'Fidgephant',
    'tribe' : 'Tough',
    'effect'  : 'Those inspirited by __ are affected in unknown ways',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/a/a0/Fidgephant_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/a/a0/Fidgephant_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/e1/Fidgefent2D.jpeg',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/e1/Fidgefent2D.jpeg/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `Fidgephant always feels like his nose is going to leak. He attacks with a water stream when he has to release it all!`
  },
  'touphant'  : {
    'name'  : 'Touphant',
    'tribe' : 'Tough',
    'effect'  : 'Those inspirited by __ are affected in unknown ways',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/a/aa/Touphant_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/a/aa/Touphant_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/c/c3/TouphantArtwork.jpeg',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/c/c3/TouphantArtwork.jpeg/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "Touphant can endure anything... with a certain amount of body-shaking effort. He can help you persevere as well."
  },
  'mad mountain'  : {
    'name'  : 'Mad Mountain',
    'tribe' : 'Tough',
    'effect'  : 'Those inspirited by __ are affected in unknown ways',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/4/42/Mad_Mountain_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/4/42/Mad_Mountain_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/6/6f/Mad_Mountain_Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/6/6f/Mad_Mountain_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "Hailing from the land of the frost, it's the wrestler with legs as thick as glaciers and a heart of ice: MAD MOUNTAIN!"
  },
  'lava lord'  : {
    'name'  : 'Lava Lord',
    'tribe' : 'Tough',
    'effect'  : 'Those inspirited by __ are affected in unknown ways',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/4/41/Lava_Lord_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/4/41/Lava_Lord_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/73/Lava_Lord_Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/73/Lava_Lord_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "And in red, we have the only wrestler to rival Mad Mountain! It's the violent volcano himself- LAAAVA LOOOOOOORD!."
  },
  'castelius iii'  : {
    'name'  : 'Castelius III',
    'tribe' : 'Tough',
    'effect'  : 'Those inspirited by __ are affected in unknown ways',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/3/32/Castelius_III_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/3/32/Castelius_III_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/e5/Castelius_III_Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/e5/Castelius_III_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "Castellius III will make you always come in third. There's not much of a future in that... unless you're a bronze tycoon."
  },
  'castelius ii'  : {
    'name'  : 'Castelius II',
    'tribe' : 'Tough',
    'effect'  : 'Those inspirited by __ are affected in unknown ways',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/4/46/Castelius_II_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/4/46/Castelius_II_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/7e/Castelius_II_Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/7e/Castelius_II_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "Castelius II will always lock you in second place. Not bad, but you could have done a bit better...?"
  },
  'castelius i'  : {
    'name'  : 'Castlelius I',
    'tribe' : 'Tough',
    'effect'  : 'Those inspirited by __ are affected in unknown ways',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/88/Castelius_I_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/88/Castelius_I_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/78/Castelius_I_Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/78/Castelius_I_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "First place. Gold medals. That's your life if Castelius I inspirits you. But with great power comes great... ness!"
  },
  'castlelius max'  : {
    'name'  : 'Castlelius Max',
    'tribe' : 'Tough',
    'effect'  : 'Those inspirited by __ are affected in unknown ways',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/f/f0/Castelius_Max_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/f/f0/Castelius_Max_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/5/56/Castelius-max.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/5/56/Castelius-max.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "Being inspirited by this extremely rare Yo-kai will let you transcend mere winning and losing."
  },
  'rhinoggin'  : {
    'name'  : 'Rhinoggin',
    'tribe' : 'Tough',
    'effect'  : 'Those inspirited by __ are affected in unknown ways',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/b/bb/Rhinoggin_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/b/bb/Rhinoggin_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/0/03/Rhinoggin-Musha-Kabuto.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/0/03/Rhinoggin-Musha-Kabuto.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "The hyperaggressive Rhinoggin is always battling Beetler for the title of Bug Yo-kai King."
  },
  'rhinormous'  : {
    'name'  : 'Rhinormous',
    'tribe' : 'Tough',
    'effect'  : 'Those inspirited by __ are affected in unknown ways',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/4/41/Rhinormous_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/4/41/Rhinormous_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/2/23/Rhinormous-Kabuto-Muso.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/2/23/Rhinormous-Kabuto-Muso.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "Only the select few Rhinoggin who have proven their might in battle can hold the name of Rhinormous."
  },
  'hornaplenty'  : {
    'name'  : 'Hornaplenty',
    'tribe' : 'Tough',
    'effect'  : 'Those inspirited by __ are affected in unknown ways',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/c/c6/Hornaplenty_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/c/c6/Hornaplenty_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/b/b3/Hornaplenty_Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/b/b3/Hornaplenty_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "When Rhinormous achieves power far beyond his peers, he can earn the rarified title of Hornaplenty."
  },
  'robonyan'  : {
    'name'  : 'Robonyan',
    'tribe' : 'Tough',
    'effect'  : 'Those inspirited by __ are affected in unknown ways',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/a/a0/Robonyan_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/a/a0/Robonyan_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/b/b5/Robonyan.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/b/b5/Robonyan.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `A robot that thinks it's actually Jibanyan. Stiff movement aside, the resemblance is uncatty! Meow meow.`
  },
  'goldenyan'  : {
    'name'  : 'Goldenyan',
    'tribe' : 'Tough',
    'effect'  : 'Those inspirited by __ are affected in unknown ways',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/1/17/GoldenyanNM2.png',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/1/17/GoldenyanNM2.png/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/2/20/Goldenyan2.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/2/20/Goldenyan2.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "Goldenyan glistens with purrfection. Meow meow. Truly priceless."
  },
  'dromp'  : {
    'name'  : 'Dromp',
    'tribe' : 'Tough',
    'effect'  : 'Those inspirited by __ are affected in unknown ways',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/3/35/Dromp_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/3/35/Dromp_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/1/1c/Dromp_Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/1/1c/Dromp_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "Fairy tales tell of the monstrous Dromp building mountains and digging ponds."
  },
  'swosh'  : {
    'name'  : 'Swosh',
    'tribe' : 'Tough',
    'effect'  : 'Those inspirited by __ are affected in unknown ways',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/b/bc/Swosh_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/b/bc/Swosh_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/6/64/Swosh_art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/6/64/Swosh_art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "A Yo-kai with a heart as big as the ocean. Some say that Swosh embodies the sea itself."
  },
  'gilgaros'  : {
    'name'  : 'Gilgaros',
    'tribe' : 'Tough',
    'effect'  : 'Those inspirited by __ are affected in unknown ways',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/d/da/Gilgaros_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/d/da/Gilgaros_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/5/58/Gilgaros.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/5/58/Gilgaros.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "The strongest oni ever born. His power is so great that it needs no explanation. None. At all. Even this is too much..."
  },
  'dazzabel'  : {
    'name'  : 'Dazzabel',
    'tribe' : 'Charming',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/4/43/Dazzabel_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/4/43/Dazzabel_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/76/DazzabelArtwork.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/76/DazzabelArtwork.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "Dazzabel loves wearing anything gaudy. If she inspirits you, you'll start liking that style too!"
  },
  'rattelle'  : {
    'name'  : 'Rattelle',
    'tribe' : 'Charming',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/1/14/Rattelle_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/1/14/Rattelle_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/9/91/Rattelle_Art.jpg',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/9/91/Rattelle_Art.jpg/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "While she looks calm in her gothic wear, she'll fly into a rage if you insult her style."
  },
  'skelebella'  : {
    'name'  : 'Skelebella',
    'tribe' : 'Charming',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/f/f1/Skelebella_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/f/f1/Skelebella_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/d/df/SkelebellaArtwork.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/d/df/SkelebellaArtwork.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "She's so confident in the unparalled beauty of her bones that she doesn't even need her skin."
  },
  'cadin'  : {
    'name'  : 'Cadin',
    'tribe' : 'Charming',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/83/Cadin_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/83/Cadin_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/9/94/Semimaru_official_artwork.jpg',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/9/94/Semimaru_official_artwork.jpg/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `He claims to practice "cicada ninjutsu"...but that's not really a thing. Unless it's a mastery of running away.`
  },
  'cadable'  : {
    'name'  : 'Cadable',
    'tribe' : 'Charming',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/81/Cadable_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/81/Cadable_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/1/19/Kagemaru.jpg',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/1/19/Kagemaru.jpg/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "Cadin has trained his 'cicada ninjitsu' to its peak. Now Cadable claims it's a worthy martial art! *crickets* *cicadas*"
  },
  'singcada'  : {
    'name'  : 'Singcada',
    'tribe' : 'Charming',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/f/f0/Singcada_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/f/f0/Singcada_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/87/Singcada_Art.jpg',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/87/Singcada_Art.jpg/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "His advanced style of 'cicada ninjutsu' makes him sing while he fights! His battles draw music fans sometimes!"
  },
  'pupsicle'  : {
    'name'  : 'Pupsicle',
    'tribe' : 'Charming',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/75/Pupsicle_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/75/Pupsicle_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/5/50/Pupsicle-Samugari.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/5/50/Pupsicle-Samugari.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "Pupsicle is always cold. He may be inspiriting those who wear layers of clothes in summer."
  },
  'chilhuahua'  : {
    'name'  : 'Chilhuahua',
    'tribe' : 'Charming',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/f/fc/Chilhuahua_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/f/fc/Chilhuahua_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/3/39/Chilhuahua_Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/3/39/Chilhuahua_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "Legends tell of Chilhuahua saving people lost in the snowy mountains. Some consider him a deity."
  },
  'swelterrier'  : {
    'name'  : 'Swelterrier',
    'tribe' : 'Charming',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/5/50/Swelterrier_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/5/50/Swelterrier_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/e4/Swelterrier_Art.jpg',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/e4/Swelterrier_Art.jpg/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "His fiery heart and body always make him feel too hot. Being near him is like being near a space heater."
  },
  'jibanyan'  : {
    'name'  : 'Jibanyan',
    'tribe' : 'Charming',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/b/bf/Jibanyan_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/b/bf/Jibanyan_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/72/JibanyanArtwork.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/72/JibanyanArtwork.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `After being run over by a truck, he inspirits an intersection and seeks to get his revenge on passing trucks.`
  },
  'thornyan'  : {
    'name'  : 'Thornyan',
    'tribe' : 'Charming',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/79/Thornyan_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/79/Thornyan_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/c/c6/ThornyanArtwork.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/c/c6/ThornyanArtwork.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "Jibanyan's proud of his new spiky body. Just don't walk behind him while you're barefoot."
  },
  'baddinyan'  : {
    'name'  : 'Baddinyan',
    'tribe' : 'Charming',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/72/Baddinyan_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/72/Baddinyan_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/9/91/Baddinyan_Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/9/91/Baddinyan_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `Jibanyan gone bad. REAL BAD. With an impressive pompadour haircut and classy tails, he's a delinquent with no cause.`
  },
  'walkappa'  : {
    'name'  : 'Walkappa',
    'tribe' : 'Charming',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/1/19/Walkappa_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/1/19/Walkappa_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/70/Nogappa.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/70/Nogappa.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "Most kappas stay in the water, but this one likes to walk around. He pours water on his head to make up for this."
  },
  'appak'  : {
    'name'  : 'Appak',
    'tribe' : 'Charming',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/a/ad/Appak_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/a/ad/Appak_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/4/46/Tabigappa.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/4/46/Tabigappa.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "Appak can cut just about anything with his water sword. He wanders the world in order to heighten his skills"
  },
  'supyo'  : {
    'name'  : 'Supyo',
    'tribe' : 'Charming',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/9/9c/Supyo_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/9/9c/Supyo_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/9/98/Supyo-0.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/9/98/Supyo-0.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "Whereas most kappas stick to rivers, this one likes to surf... and pick up girls while he's at it."
  },
  'komasan'  : {
    'name'  : 'Komasan',
    'tribe' : 'Charming',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/9/93/Komasan_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/9/93/Komasan_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/6/60/KomasanArtwork.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/6/60/KomasanArtwork.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "Komasan is a guardian lion-dog that got bored with guarding his shrine. Now he's looking for a new one."
  },
  'komane'  : {
    'name'  : 'Komane',
    'tribe' : 'Charming',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/d/db/Komane_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/d/db/Komane_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/e3/Komaneartwork.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/e3/Komaneartwork.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : 	"Komasan's travels made him grow up into a brave and dependable Yo-kai. He's strong too!"
  },
  'komajiro'  : {
    'name'  : 'Komajiro',
    'tribe' : 'Charming',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/8e/Komajiro_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/8e/Komajiro_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/88/KomajiroArtwork.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/88/KomajiroArtwork.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "Komajiro is Komasan's younger, more streetwise twin. But he'll always look up to his bumpkin big bro."
  },
  'komiger'  : {
    'name'  : 'Komiger',
    'tribe' : 'Charming',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/0/0a/Komiger_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/0/0a/Komiger_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/d/de/Torajirou.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/d/de/Torajirou.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "Komajiro's pursuit of his brother brought out his ferocious tiger spirit. He even has stripes!"

  },
  'baku'  : {
    'name'  : 'Baku',
    'tribe' : 'Charming',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/7c/Baku_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/7c/Baku_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/b/b7/Baku2.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/b/b7/Baku2.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "A Yo-kai that eats only human dreams. It puts people to sleep before digging in. Beaux rêves!"
  },
  'whapir'  : {
    'name'  : 'Whapir',
    'tribe' : 'Charming',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/6/68/Whapir_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/6/68/Whapir_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/9/90/Haku.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/9/90/Haku.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "A rare white Baku. Legends say that if a Whapir Inspirits you, you're guaranteed to have good dreams."
  },
  'shmoopie'  : {
    'name'  : 'Shmoopie',
    'tribe' : 'Charming',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/5/59/Shmoopie_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/5/59/Shmoopie_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/d/d9/Shmoopie-Kyuntarou-Yo-kai-Watch.jpg',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/d/d9/Shmoopie-Kyuntarou-Yo-kai-Watch.jpg/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "This Yo-kai is cute enough to melt anyone's heart...and he knows it! He can be quite the schemer, so look out!"
  },
  'pinkipoo'  : {
    'name'  : 'Pinkipoo',
    'tribe' : 'Charming',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/2/26/Pinkipoo_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/2/26/Pinkipoo_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/2/2b/Zukyukyunta.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/2/2b/Zukyukyunta.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `Known as the Aristocrat of Love, Pinkipoo uses his overpowering cuteness to win over new followers.`
  },
  'pookivil'  : {
    'name'  : 'Pookivil',
    'tribe' : 'Charming',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/4/4d/Pookivil_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/4/4d/Pookivil_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/e9/Pookivil_art.jpg',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/e9/Pookivil_art.jpg/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "This Yo-kai will make even nice people into scheming manipulators. An embodiment of Pinkipoo's bad side."
  },
  'frostina'  : {
    'name'  : 'Frostina',
    'tribe' : 'Charming',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/f/f7/Frostina_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/f/f7/Frostina_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/76/Frostina_Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/76/Frostina_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "Frostina has the power to freeze anything, but that keeps her pretty chilly- that and bad circulation."
  },
  'blizzaria'  : {
    'name'  : 'Blizzaria',
    'tribe' : 'Charming',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/5/5b/Blizzaria_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/5/5b/Blizzaria_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/2/2b/Blizzaria_Official_Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/2/2b/Blizzaria_Official_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "Now she can fully control her chilling power. Blizzaria can make snow fall in summer and freeze volcanoes."
  },
  'damona'  : {
    'name'  : 'Damona',
    'tribe' : 'Charming',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/3/3a/Damona_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/3/3a/Damona_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/a/a9/Damona2.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/a/a9/Damona2.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "The princess of a small netherworld region. Her power is immense, but she lacks the power to feel any emotions."
  },
  'sapphinyan'  : {
    'name'  : 'Sapphinyan',
    'tribe' : 'Charming',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/0/04/Sapphinyan_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/0/04/Sapphinyan_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/6/6c/Sapphinyan_Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/6/6c/Sapphinyan_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "A Yo-kai made of sapphire. His body is the color of a clear ocean on a beautiful summer day."
  },
  'emenyan'  : {
    'name'  : 'Emenyan',
    'tribe' : 'Charming',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/7f/Emenyan_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/7f/Emenyan_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/1/11/EmenyanArtwork.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/1/11/EmenyanArtwork.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "A Yo-kai made of emerald. If you could sell him, he'd be worth more than 100 million dollars."
  },
  'rubinyan'  : {
    'name'  : 'Rubinyan',
    'tribe' : 'Charming',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/0/08/Rubinyan_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/0/08/Rubinyan_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/4/42/RubinyanArtwork.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/4/42/RubinyanArtwork.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "A Yo-kai made of ruby. Fire-like light reflects off of him as he fights."
  },
  'topanyan'  : {
    'name'  : 'Topanyan',
    'tribe' : 'Charming',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/c/c1/Topanyan_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/c/c1/Topanyan_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/c/cd/TopanyanArtwork.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/c/cd/TopanyanArtwork.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "A Yo-kai made of topaz. Making friends with him means you have inherently good luck."
  },
  'dianyan'  : {
    'name'  : 'Dianyan',
    'tribe' : 'Charming',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/9/9b/Dianyan_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/9/9b/Dianyan_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/c/c7/Dianyan_Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/c/c7/Dianyan_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "A Yo-kai made of diamonds. He's said to be the most lavish, timeless, and romantic Yo-kai. Do you think so? I do!"
  },
  'wantston'  : {
    'name'  : 'Wantston',
    'tribe' : 'Heartful',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/c/ca/Wantson_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/c/ca/Wantson_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/a/ac/Wantston-0.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/a/ac/Wantston-0.png/revision/latest/scale-to-width-down/150',
    'medalliumBio' : "Wantston wants everything others have, but he won't even try to acquire what he envies. So no worries."
  },
  'grubsnitch'  : {
    'name'  : 'Grubsnitch',
    'tribe' : 'Heartful',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/81/Grubsnitch_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/81/Grubsnitch_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/75/Grubsnitch_Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/75/Grubsnitch_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio' : "If you can't stop snacking before dinner, Grubsnitch is probably nearby."
  },
  'wiglin'  : {
    'name'  : 'Wiglin',
    'tribe' : 'Heartful',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/6/63/Wiglin_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/6/63/Wiglin_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/1/18/Wakame-kunArtworkTransparent.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/1/18/Wakame-kunArtworkTransparent.png/revision/latest/scale-to-width-down/150',
    'medalliumBio' : "A seaweed Yo-kai who wants to spread his hometown dance to the world. And he's very healthy too!"
  },
  'steppa'  : {
    'name'  : 'Steppa',
    'tribe' : 'Heartful',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/d/d6/Steppa_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/d/d6/Steppa_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/d/de/Steppa-0.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/d/de/Steppa-0.png/revision/latest/scale-to-width-down/150',
    'medalliumBio' : "Steppa is one of Wiglin's rivals. He believes that kombu is the best kind of seaweed... if there even is such a thing."
  },
  'rhyth'  : {
    'name'  : 'Rhyth',
    'tribe' : 'Heartful',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/6/6e/Rhyth_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/6/6e/Rhyth_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/86/Rhyth-0.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/86/Rhyth-0.png/revision/latest/scale-to-width-down/150',
    'medalliumBio' : "The one female of the seaweed trio. Wiglin and Steppa both really like her, but she doesn't seem to notice."
  },
  'hungramps'  : {
    'name'  : 'Hungramps',
    'tribe' : 'Heartful',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/83/Hungramps_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/83/Hungramps_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/e4/Hungramps_Artwork.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/e4/Hungramps_Artwork.png/revision/latest/scale-to-width-down/150',
    'medalliumBio' : "A Yo-kai who is always hungry and can make other tummies rumble...That's really about the only thing he can do."
  },
  'hungorge'  : {
    'name'  : 'Hungorge',
    'tribe' : 'Heartful',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/c/ce/Hungorge_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/c/ce/Hungorge_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/1/1e/Hungorge_Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/1/1e/Hungorge_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio' : "A terribly gluttonous Yo-kai that'll eat anything in front of him. His mouth is like a black hole-- even rice can't escape it."
  },
  'grainpa'  : {
    'name'  : 'Grainpa',
    'tribe' : 'Heartful',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/ed/Grainpa_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/ed/Grainpa_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/9/95/Grainpa_Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/9/95/Grainpa_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio' : "A rare Hungramps with a body made of rice. He's so kind, he'll let a hungry person eat part of his body if necessary."
  },
  'lodo'  : {
    'name'  : 'Lodo',
    'tribe' : 'Heartful',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/b/b9/Lodo_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/b/b9/Lodo_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/a/a3/Lodo_Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/a/a3/Lodo_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio' : "You know when you just keep losing change or getting the wrong change back? Lodo's fault."
  },
  'chippa'  : {
    'name'  : 'Chippa',
    'tribe' : 'Heartful',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/f/fc/Chippa.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/f/fc/Chippa.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/9/99/Chippa-0.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/9/99/Chippa-0.png/revision/latest/scale-to-width-down/150',
    'medalliumBio' : "An eternal optimist that never worries about anything. Being Inspirited by him can be worse that you think."
  },
  'enerfly'  : {
    'name'  : 'Enerfly',
    'tribe' : 'Heartful',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/3/38/Enerfly_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/3/38/Enerfly_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/6/6e/Enerfly2.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/6/6e/Enerfly2.png/revision/latest/scale-to-width-down/150',
    'medalliumBio' : "A butterfly Yo-kai who brings those it inspirits to their peak condition. Often mistaken for Enefly."
  },
  'enefly'  : {
    'name'  : 'Enefly',
    'tribe' : 'Heartful',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/5/58/EneflyNM2.png',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/5/58/EneflyNM2.png/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/1/18/Enefly.PNG',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/1/18/Enefly.PNG/revision/latest/scale-to-width-down/150',
    'medalliumBio' : "A butterfly Yo-kai who makes those it Inspirits cut ties with their best friends. Often mistaken for Enerfly."
  },
  'betterfly'  : {
    'name'  : 'Betterfly',
    'tribe' : 'Heartful',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/f/fb/Betterfly.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/f/fb/Betterfly.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/6/6d/Betterflyartwork.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/6/6d/Betterflyartwork.png/revision/latest/scale-to-width-down/150',
    'medalliumBio' : "People will fulfill their potential in ways they've never imagined with Betterfly. Everyone wants this Yo-kai!"
  },
  'peppillon'  : {
    'name'  : 'Peppillon',
    'tribe' : 'Heartful',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/f/fd/Peppillon_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/f/fd/Peppillon_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/72/Pepillion_Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/72/Pepillion_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio' : "A butterfly Yo-kai with otherworldly wings. Breathing in its scales will boost your level of excitement to the max."
  },
  'happierre'  : {
    'name'  : 'Happierre',
    'tribe' : 'Heartful',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/1/13/Happierre_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/1/13/Happierre_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/0/00/Happierre.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/0/00/Happierre.png/revision/latest/scale-to-width-down/150',
    'medalliumBio' : "This heartwarming Yo-kai removes the tension in the air. He can cheer up even the angriest of people."
  },
  'reversa'  : {
    'name'  : 'Reversa',
    'tribe' : 'Heartful',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/d/d5/Reversa_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/d/d5/Reversa_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/d/d5/Reversa_Art.jpg',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/d/d5/Reversa_Art.jpg/revision/latest/scale-to-width-down/150',
    'medalliumBio' : "One moment she's happy, and the next, she's sad. She can be more difficult to deal with than Dismarelda sometimes."
  },
  'reversette'  : {
    'name'  : 'Reversette',
    'tribe' : 'Heartful',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/d/dc/Reversette_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/d/dc/Reversette_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/a/af/Reversette_Official_Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/a/af/Reversette_Official_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio' : "She resembles Reversa, but her reversed pattern is a rare sight. Her depression--not so rare."
  },
  'rollen'  : {
    'name'  : 'Rollen',
    'tribe' : 'Heartful',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/3/36/Rollen_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/3/36/Rollen_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/4/4d/RollenArtwork.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/4/4d/RollenArtwork.png/revision/latest/scale-to-width-down/150',
    'medalliumBio' : "Everything he does is decided by a roll of his dice eyes. Their outcome changes his personality!"
  },
  'dubbles'  : {
    'name'  : 'Dubbles',
    'tribe' : 'Heartful',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/0/09/Dubbles_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/0/09/Dubbles_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/88/Dubbles_Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/88/Dubbles_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio' : "Dubbles will inspirit you and point you toward an unknown fate. Even he doesn't know if it'll be a good or bad one."
  },
  "ol' saint trick"  : {
    'name'  : `Ol' Saint Trick`,
    'tribe' : 'Heartful',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/1/19/Ol%27_Saint_Trick_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/1/19/Ol%27_Saint_Trick_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/a/a6/Ol%27_Saint_Trick_Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/a/a6/Ol%27_Saint_Trick_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio' : "Take a guess and get one of three presents: bad, good, or average. He'll leave if you ask for all three, though..."
  },
  "ol' fortune"  : {
    'name'  : `Ol' Fortune`,
    'tribe' : 'Heartful',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/a/aa/Ol%27_Fortune_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/a/aa/Ol%27_Fortune_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/1/1a/Ol%27_Fortune_Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/1/1a/Ol%27_Fortune_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio' : "Another old man with bags full of gifts. Unlike Ol' Saint Trick, all of his presents are good!"
  },
  'papa bolt'  : {
    'name'  : 'Papa Bolt',
    'tribe' : 'Heartful',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/2/2b/Papa_Bolt_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/2/2b/Papa_Bolt_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/c/ce/PapaBolt-0.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/c/ce/PapaBolt-0.png/revision/latest/scale-to-width-down/150',
    'medalliumBio' : "No matter how lazy you are, you'll work fast when Papa Bolt's watching. His anger is SCAAAAARY!"
  },
  'uncle infinite'  : {
    'name'  : 'Uncle Infinite',
    'tribe' : 'Heartful',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/eb/Uncle_Infinite_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/eb/Uncle_Infinite_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/2/20/UncleInfinite-0.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/2/20/UncleInfinite-0.png/revision/latest/scale-to-width-down/150',
    'medalliumBio' : "Even Papa Bolt is scared of Uncle Infinite's power. He can throw a table an entire mile!"
  },
  'mama aura'  : {
    'name'  : 'Mama Aura',
    'tribe' : 'Heartful',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/9/91/Mama_Aura_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/9/91/Mama_Aura_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/d/de/Mama_Aura.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/d/de/Mama_Aura.png/revision/latest/scale-to-width-down/150',
    'medalliumBio' : "Sometimes strict and sometimes nice, she embraces Yo-kai with her warm aura. No Yo-kai can defy her."
  },
  'auntie heart'  : {
    'name'  : 'Auntie Heart',
    'tribe' : 'Heartful',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/1/10/Auntie_Heart_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/1/10/Auntie_Heart_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/1/13/Kokoro_Oba.jpg',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/1/13/Kokoro_Oba.jpg/revision/latest/scale-to-width-down/150',
    'medalliumBio' : "Regardless of how bad a Yo-kai is, Auntie Heart's healing hug will make it pure again. That is some true kindness!"
  },
  'elder bloom'  : {
    'name'  : 'Elder Bloom',
    'tribe' : 'Heartful',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/d/d7/Elder_Bloom_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/d/d7/Elder_Bloom_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/7a/Elder-Bloom.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/7a/Elder-Bloom.png/revision/latest/scale-to-width-down/150',
    'medalliumBio' : "This legendary Hungramps supposedly once filled a city with spirit-invigorating cherry blossoms."
  },
  'leadoni'  : {
    'name'  : 'Leadoni',
    'tribe' : 'Shady',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/f/f7/Leadoni_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/f/f7/Leadoni_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/e4/Leadoni.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/e4/Leadoni.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/1/13/Awevil_NM.jpg/revision/latest/scale-to-width-down/157?cb=20180806213521'
  },
  'mynimo'  : {
    'name'  : 'Mynimo',
    'tribe' : 'Shady',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/3/3f/Mynimo_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/3/3f/Mynimo_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/3/32/Mynimo_Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/3/32/Mynimo_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "People inspirited by Mynimo get much better treatment than those around them. Hey! That's not fair!"
  },
  'ake'  : {
    'name'  : 'Ake',
    'tribe' : 'Shady',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/3/34/Ake_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/3/34/Ake_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/e8/Autschi_Artwork.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/e8/Autschi_Artwork.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "A bratty Yo-kai that's always kicking people's shoulders. The kicks just make your shoulders stiff."
  },
  'payn'  : {
    'name'  : 'Payn',
    'tribe' : 'Shady',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/6/6c/Payn_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/6/6c/Payn_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/ef/Agujeto.jpg',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/ef/Agujeto.jpg/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "Payn will show your shoulders the meaning of pain using his massive strength. Payn is really into working out."
  },
  'agon'  : {
    'name'  : 'Agon',
    'tribe' : 'Shady',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/e3/Agon_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/e3/Agon_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/89/Machaka.jpg',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/89/Machaka.jpg/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "A horrible Yo-kai that gives people a slipped disc in their backs! You're more susceptible the older you are."
  },
  'negatibuzz'  : {
    'name'  : 'Negatibuzz',
    'tribe' : 'Shady',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/4/4e/Negatibuzz_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/4/4e/Negatibuzz_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/1/1e/Negatibuzz_art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/1/1e/Negatibuzz_art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "A Yo-kai that nurtures negativity and sucks it up with its needlelike nose."
  },
  'moskevil'  : {
    'name'  : 'Moskevil',
    'tribe' : 'Shady',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/9/95/Moskevil_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/9/95/Moskevil_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/1/19/Moskevil_Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/1/19/Moskevil_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "This nasty Yo-kai can drop you into the depths of despair. You cannot cheer up if he's nearby."
  },
  'scritchy'  : {
    'name'  : 'Scritchy',
    'tribe' : 'Shady',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/78/Scritchy_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/78/Scritchy_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/e3/Scritchy_art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/e3/Scritchy_art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "The mere presence of Scritchy will make your both itch. No amount of scratching can make it stop."
  },
  'dimmy'  : {
    'name'  : 'Dimmy',
    'tribe' : 'Shady',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/3/37/Dimmy_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/3/37/Dimmy_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/3/35/Dimmy_Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/3/35/Dimmy_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "Being Inspirited by Dimmy will tone down your presence. Dimmy uses this for his job as a ninja."
  },
  'blandon'  : {
    'name'  : 'Blandon',
    'tribe' : 'Shady',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/4/4d/Blandon_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/4/4d/Blandon_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/2/27/Blandon_Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/2/27/Blandon_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `Blandon's lack of presence makes him a really great spy, but he's sad that no one recognizes him for that.`
  },
  'nul'  : {
    'name'  : 'Nul',
    'tribe' : 'Shady',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/3/30/Null_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/3/30/Null_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/7b/Nul_Art.jpg',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/7b/Nul_Art.jpg/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "You can't sense Nul even if you're really close to him. He's really good at entertaining himself."
  },
  'suspicioni'  : {
    'name'  : 'Suspicioni',
    'tribe' : 'Shady',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/d/df/Suspicioni_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/d/df/Suspicioni_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/d/d3/Suspicioni_Art.jpg',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/d/d3/Suspicioni_Art.jpg/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "An Oni who doubts everything. He hangs out with his fellow Oni but doesn't trust them at all."
  },
  'tantroni'  : {
    'name'  : 'Tantroni',
    'tribe' : 'Shady',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/3/32/Tantroni_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/3/32/Tantroni_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/c/c5/Tantroni_Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/c/c5/Tantroni_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "This Yo-kai will throw a fit whenever he doesn't get his way... It's probably time to grow out of that."
  },
  'contrarioni'  : {
    'name'  : 'Contrarioni',
    'tribe' : 'Shady',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/c/c9/Contrarioni_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/c/c9/Contrarioni_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/6/62/Contraioni_Art.jpg',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/6/62/Contraioni_Art.jpg/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `Get ready to say no a lot if Contrarioni inspirits you. You'll disagree with anything people say. Always fun at parties.`
  },
  'hidabat'  : {
    'name'  : 'Hidabat',
    'tribe' : 'Shady',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/5/5e/Hidabat_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/5/5e/Hidabat_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/4/46/HidabatArtwork.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/4/46/HidabatArtwork.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "Hidabat will make you a shut-in who fears going outside. He’s better at inspiriting modern city dwellers."
  },
  'abodabat'  : {
    'name'  : 'Abodabat',
    'tribe' : 'Shady',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/c/c0/Abodabat_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/c/c0/Abodabat_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/b/bd/Abodabat-Tojikomori.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/b/bd/Abodabat-Tojikomori.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "After being inside the house for so long Hidabat fused with it. Now it can't ever leave!"
  },
  'belfree'  : {
    'name'  : 'Belfree',
    'tribe' : 'Shady',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/a/a9/Belfree_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/a/a9/Belfree_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/6/67/Belfree_Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/6/67/Belfree_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `A rare Abodabat in a temporary housing. Once a year, if you're lucky, you can see it change houses.`
  },
  'tengloom'  : {
    'name'  : 'Tengloom',
    'tribe' : 'Shady',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/0/0f/Tengloom_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/0/0f/Tengloom_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/0/09/TengloomArtwork.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/0/09/TengloomArtwork.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "A gloomy tengu who's always reading. He's somehow amassed a Yo-kai fan base that likes his pessimism."
  },
  'nird'  : {
    'name'  : 'Nird',
    'tribe' : 'Shady',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/3/30/Nird_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/3/30/Nird_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/4/4b/Nird-0.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/4/4b/Nird-0.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "This Yo-kai became a bookworm upon arrival in the human world. Noisiness will be severely punished! Shhhh!"
  },
  'negasus'  : {
    'name'  : 'Negasus',
    'tribe' : 'Shady',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/c/cd/Negasus_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/c/cd/Negasus_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/b/b8/Negasus_Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/b/b8/Negasus_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "Negasus will make you want to do things that'll get you in trouble. The more trouble the better!"
  },
  'neighfarious'  : {
    'name'  : 'Neighfarious',
    'tribe' : 'Shady',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/4/4c/Neighfarious_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/4/4c/Neighfarious_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/e1/Neighfarious_Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/e1/Neighfarious_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "Shining mysteriously in the night sky, Neighfarious is a bit of an enigma. What kind of evil Yo-kai is he?"
  },
  'timidevil'  : {
    'name'  : 'Timidevil',
    'tribe' : 'Shady',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/ee/Timidevil_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/ee/Timidevil_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/1/1a/Timidevil2.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/1/1a/Timidevil2.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "A nervous devil who's too scared to even use his own powers. If he'd just relax, he could be unstoppable."
  },
  'beelzebold'  : {
    'name'  : 'Beelzebold',
    'tribe' : 'Shady',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/4/42/Beelzebold_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/4/42/Beelzebold_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/2/2e/Beelzebold_Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/2/2e/Beelzebold_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "Timidevil at full power! He still gets nervous every so often, though."
  },
  'count cavity'  : {
    'name'  : 'Count Cavity',
    'tribe' : 'Shady',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/d/d8/Count_Cavity_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/d/d8/Count_Cavity_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/2/21/Count-Cavity.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/2/21/Count-Cavity.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "A terrifying Yo-kai who can dissolve your teeth. He loves the sound of kids crying over aching teeth. What a jerk."
  },
  'greesel'  : {
    'name'  : 'Greesel',
    'tribe' : 'Shady',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/a/a0/Greesel_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/a/a0/Greesel_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/9/95/Dokechingu.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/9/95/Dokechingu.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "A powerful, greedy Yo-kai who wants to control the world's wealth. He'll do anything for money."
  },
  'awevil'  : {
    'name'  : 'Awevil',
    'tribe' : 'Shady',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/1/13/Awevil_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/1/13/Awevil_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/1/10/Awevil_Official_Artwork.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/1/10/Awevil_Official_Artwork.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "An aristocrat of evil, pure depravity. A Yo-kai that will do anything just because it's bad. He's earned his name."
  },
  'coughkoff'  : {
    'name'  : 'Coughkoff',
    'tribe' : 'Eerie',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/3/3e/CoughkoffNM2.png',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/3/3e/CoughkoffNM2.png/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/6/6a/Coughkoff_Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/6/6a/Coughkoff_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "Coughkoff can cause your throat to feel tingly and make you sick. Try to stay healthy!"
  },
  'hurchin'  : {
    'name'  : 'Hurchin',
    'tribe' : 'Eerie',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/6/61/Hurchin.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/6/61/Hurchin.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/87/Hurchin_Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/87/Hurchin_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "He looks just like Coughkoff, but don't say that! He hates that guy."
  },
  'droplette'  : {
    'name'  : 'Droplette',
    'tribe' : 'Eerie',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/c/c3/Droplette_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/c/c3/Droplette_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/a/a8/Droplette_Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/a/a8/Droplette_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "Droplette makes his way to places that don't get much sun and makes them damp and moldy...Gross."
  },
  'drizzle'  : {
    'name'  : 'Drizzle',
    'tribe' : 'Eerie',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/d/df/Drizzle_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/d/df/Drizzle_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/f/fb/Drizzle_Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/f/fb/Drizzle_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "Drizzle creates rain cloud wherever it goes. You can find it in places that are thoroughly wet."
  },
  'slush'  : {
    'name'  : 'Slush',
    'tribe' : 'Eerie',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/6/64/Slush.png',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/6/64/Slush.png/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/3/32/Slush_Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/3/32/Slush_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : 'A large gathering of these frosty Yo-kai could frost anything. Just one can freeze a cup of water.'
  },
  'alhail'  : {
    'name'  : 'Alhail',
    'tribe' : 'Eerie',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/f/f4/Alhail_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/f/f4/Alhail_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/89/Alhail-0.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/89/Alhail-0.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `This Yo-kai has strong ice power by itself. Ice will gradually encase whatever it touches.`
  },
  'gush'  : {
    'name'  : 'Gush',
    'tribe' : 'Eerie',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/a/a0/GushNM2.png',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/a/a0/GushNM2.png/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/5/53/Gush_Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/5/53/Gush_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "If it Inspirits you, your nose won't stop bleeding. This Yo-kai can be much scarier than it looks."
  },
  'peckpocket'  : {
    'name'  : 'Peckpocket',
    'tribe' : 'Eerie',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/c/c0/Peckpocket_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/c/c0/Peckpocket_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/d/da/Peckpocket.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/d/da/Peckpocket.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `"When Peckpocket has its eye on you, you'll start wanting other people's stuff. I'll take that!"`
  },
  'rockabelly'  : {
    'name'  : 'Rockabelly',
    'tribe' : 'Eerie',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/2/2f/Rockabelly_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/2/2f/Rockabelly_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/9/94/Rockabelly.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/9/94/Rockabelly.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "A weird Yo-kai that's quite the belly dancer. Its stomach feathers look like an old man's face."
  },
  'buhu'  : {
    'name'  : 'Buhu',
    'tribe' : 'Eerie',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/f/ff/Buhu_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/f/ff/Buhu_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/ec/Buhu_Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/ec/Buhu_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "This bird Yo-kai is always bummed out. People she inspirits get depressed and distracted a lot."
  },
  'flumpy'  : {
    'name'  : 'Flumpy',
    'tribe' : 'Eerie',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/0/09/Flumpy.png',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/0/09/Flumpy.png/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/71/Flumpy2.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/71/Flumpy2.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "Flumpy can make even the coolest person unfashionable and awkward. He hates being so unstylish."
  },
  'skreek'  : {
    'name'  : 'Skreek',
    'tribe' : 'Eerie',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/1/10/Skreek_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/1/10/Skreek_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/72/Skreek_Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/72/Skreek_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "If you catch a glimpse of Skreek, just run. She can throw you into the deepest pits of despair."
  },
  'manjimutt'  : {
    'name'  : 'Manjimutt',
    'tribe' : 'Eerie',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/e0/Manjimutt_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/e0/Manjimutt_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/9/90/Manjimutt.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/9/90/Manjimutt.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "A man-faced poodle who enjoys scaring people frightened by a poodle with a man's face. Hopes one day to become a CEO."
  },
  'multimutt'  : {
    'name'  : 'Multimutt',
    'tribe' : 'Eerie',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/3/35/MultimuttNM2.png',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/3/35/MultimuttNM2.png/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/74/Multimutt2.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/74/Multimutt2.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "Nobody wants to get close to Multimutt, because both of his faces look mean. He's a perfect guard dog."
  },
  'sir berus'  : {
    'name'  : 'Sir Berus',
    'tribe' : 'Eerie',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/e0/Sir_Berus_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/e0/Sir_Berus_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/5/5b/Sir-Berus.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/5/5b/Sir-Berus.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "An elite guard dog born and raised in the Netherworld. He doesn't let a single soul escape his grasp."
  },
  'dismerelda'  : {
    'name'  : 'Dismerelda',
    'tribe' : 'Eerie',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/0/01/Dismarelda_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/0/01/Dismarelda_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/2/2b/DismareldaArtwork.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/2/2b/DismareldaArtwork.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "Her gloomy aura can darken the mood in any environment. It's even worse when she's in a bad mood."
  },
  'chatalie'  : {
    'name'  : 'Chatalie',
    'tribe' : 'Eerie',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/6/6e/Chatalie_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/6/6e/Chatalie_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/a/a0/Chatalie_Art.jpg',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/a/a0/Chatalie_Art.jpg/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "All talk and no action. If she inspirits you, you'll be the same and lose the trust of others."
  },
  'nagatha'  : {
    'name'  : 'Nagatha',
    'tribe' : 'Eerie',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/4/4f/Nagatha_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/4/4f/Nagatha_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/8b/Nagatha_Official_Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/8b/Nagatha_Official_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "Nagatha will make you into the kind of person that'll nag people over the smallest mistake."
  },
  'cheeksqueek'  : {
    'name'  : 'Cheeksqueek',
    'tribe' : 'Eerie',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/5/50/Cheeksqueek_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/5/50/Cheeksqueek_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/5/52/Cheeksqueek-0.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/5/52/Cheeksqueek-0.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "A Yo-kai that can't stop farting. There's a rumor that it just has really bad breath... but I'm not going to clear the air here."
  },
  'cuttincheez'  : {
    'name'  : 'Cuttincheez',
    'tribe' : 'Eerie',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/5/57/Cuttincheez_1_v181_2259772.png',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/5/57/Cuttincheez_1_v181_2259772.png/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/5/52/Cuttincheez_Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/5/52/Cuttincheez_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "A god of flatulence. Brace yourself for agony if you get stuck in a windowless room with Cuttincheez."
  },
  'compunzer'  : {
    'name'  : 'Compunzer',
    'tribe' : 'Eerie',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/79/Compunzer_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/79/Compunzer_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/c/c0/Compunzer.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/c/c0/Compunzer.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "Even though he wants to make people laugh, Compunzer's jokes fall flat and just lead to awkward silences."
  },
  'lamedian'  : {
    'name'  : 'Lamedian',
    'tribe' : 'Eerie',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/b/ba/Lamedian_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/b/ba/Lamedian_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/77/Lamedian.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/77/Lamedian.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `His jokes are the worst, inciting only involuntary guffaws at best. But he thinks he's hilarious. IS HE RITE, FOLKS?" /Recycles jokes like they're made of plastic.He'll be here all week,folks.`
  },
  'grumples'  : {
    'name'  : 'Grumples',
    'tribe' : 'Eerie',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/1/10/Grumples_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/1/10/Grumples_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/2/20/Grumplesartwork.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/2/20/Grumplesartwork.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "Bitter towards youth and beauty, Grumples makes people wrinkly. She was quite the beauty when she was young, though."
  },
  'everfore'  : {
    'name'  : 'Everfore',
    'tribe' : 'Eerie',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/5/53/Everfore.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/5/53/Everfore.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/1/13/Everfore.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/1/13/Everfore.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "Sustaining her own youth and beauty by absorbing it from others, Everfore is always out looking to meet beautiful woman."
  },
  'eterna'  : {
    'name'  : 'Eterna',
    'tribe' : 'Eerie',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/85/Eterna_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/85/Eterna_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/d/dc/Eterna_Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/d/dc/Eterna_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "They say this Yo-kai's immortality stems from her staff and that she'll age instantly without it."
  },
  'insomni'  : {
    'name'  : 'Insomni',
    'tribe' : 'Eerie',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/77/Insomni_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/77/Insomni_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/c/c0/Insomni2.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/c/c0/Insomni2.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `If you catch Insomni's eye, she won't let you fall asleep until she's bored with you...or you're almost dead.`
  },
  'sandi'  : {
    'name'  : 'Sandi',
    'tribe' : 'Eerie',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/e2/Sandi_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/e2/Sandi_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/9/98/Sandi_Art.jpg',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/9/98/Sandi_Art.jpg/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "When Sandi inspirits you, the two of you will play in your dreams. It's too fun to ever wake up from."
  },
  'dandoodle'  : {
    'name'  : 'Dandoole',
    'tribe' : 'Eerie',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/6/68/Dandoodle_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/6/68/Dandoodle_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/7f/Dandoodle.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/7f/Dandoodle.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "A legendary Manjimutt that, through some sort of mistake, got handsome. His smile's so soothing!"
  },
  'noko'  : {
    'name'  : 'Noko',
    'tribe' : 'Slippery',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/89/Noko_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/89/Noko_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/0/0a/Noko_Bowtie.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/0/0a/Noko_Bowtie.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "This Yo-kai is one lucky snake! He's really scared of being seen by humans, which happens a lot since he's terrible at hiding."
  },
  'bloominoko'  : {
    'name'  : 'Bloominoko',
    'tribe' : 'Slippery',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/ef/Bloominoko_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/ef/Bloominoko_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/b/ba/Bloominoko2.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/b/ba/Bloominoko2.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `The flower on top of Bloominoko's head brings people luck and happiness. Some folks even worship it.`
  },
  'pandanoko'  : {
    'name'  : 'Pandanoko',
    'tribe' : 'Slippery',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/a/a7/Pandanoko_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/a/a7/Pandanoko_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/9/9d/Pandanoko2.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/9/9d/Pandanoko2.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `A wandering Yo-kai from a faraway land. It's tough to find and a miracle to actually befriend.`
  },
  'heheheel'  : {
    'name'  : 'Heheheel',
    'tribe' : 'Slippery',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/6/67/Heheheel_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/6/67/Heheheel_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/0/0e/Heheheel2.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/0/0e/Heheheel2.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "This eel just can't stop laughing, and nobody knows why. Maybe its sense of humor is broken."
  },
  'croonger'  : {
    'name'  : 'Croonger',
    'tribe' : 'Slippery',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/a/a8/Croonger_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/a/a8/Croonger_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/e8/Croonger2.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/e8/Croonger2.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `A pot Yo-kai who sings a strange tune. If you hear singing coming from a pot, don't look at it!`
  },
  'urnaconda'  : {
    'name'  : 'Urnaconda',
    'tribe' : 'Slippery',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/ef/Urnaconda_TM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/ef/Urnaconda_TM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/ed/Urnaconda2.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/ed/Urnaconda2.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : 	"That's no regular pot- there's a huge snake inside! Some say this inspired the creation of the jack-in-the-box."
  },
  'fishpicable'  : {
    'name'  : 'Fishpicable',
    'tribe' : 'Slippery',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/5/51/Fishpicable_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/5/51/Fishpicable_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/6/62/Fishpicable_Artwork.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/6/62/Fishpicable_Artwork.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "Fishpicable sees only the bad in people and slaps things he hates with his tail. His tail is very busy."
  },
  'rageon'  : {
    'name'  : 'Rageon',
    'tribe' : 'Slippery',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/4/42/Rageon_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/4/42/Rageon_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/77/Rageon.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/77/Rageon.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `Rageon holds grudges for no reason. If you wake up to see him standing next to your bed... RUN!`
  },
  'tunatic'  : {
    'name'  : 'Tunatic',
    'tribe' : 'Slippery',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/5/51/Tunatic_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/5/51/Tunatic_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/f/fb/Tunatic.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/f/fb/Tunatic.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "Tunatic will go on a rampage if he's criticized at all. He makes kids angry when they get guidance from adults."
  },
  'draggie'  : {
    'name'  : 'Draggie',
    'tribe' : 'Slippery',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/f/f8/Draggie_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/f/f8/Draggie_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/b/b2/Draggie2.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/b/b2/Draggie2.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `A dragon kid who wants attention. He can see the hidden strengths of others with the ball on his head.`
  },
  'dragon lord'  : {
    'name'  : 'Dragon Lord',
    'tribe' : 'Slippery',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/b/bd/Dragon_Lord_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/b/bd/Dragon_Lord_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/7b/Dragon-Lord.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/7b/Dragon-Lord.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "Draggie has come into his own with dignity and might worth of the title 'dragon'."
  },
  'azure dragon'  : {
    'name'  : 'Azure Dragon',
    'tribe' : 'Slippery',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/1/14/Azure_Dragon_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/1/14/Azure_Dragon_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/e8/Azure_dragon.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/e8/Azure_dragon.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "A legendary divine beast. It/He holds domain over water, surpassing even the power of Dragon Lord."
  },
  'daiz'  : {
    'name'  : 'Daiz',
    'tribe' : 'Slippery',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/b/bb/Daiz_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/b/bb/Daiz_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/5/55/Daiz.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/5/55/Daiz.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "Daiz just stares off into space, sometimes not moving for three whole days. What's he thinking about all that time...?"
  },
  'confuze'  : {
    'name'  : 'Confuze',
    'tribe' : 'Slippery',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/88/Confuze_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/88/Confuze_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/7b/Confuze.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/7/7b/Confuze.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "Confuze will make you babble and mumble. It's the worst when you have to read out loud in class!"
  },
  'chummer'  : {
    'name'  : 'Chummer',
    'tribe' : 'Slippery',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/3/37/Chummer_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/3/37/Chummer_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/8a/Chummer_Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/8a/Chummer_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "Chummer loves eating kids. He'll make them loiter after school before devouring them. He likes asparagus too."
  },
  'shrook'  : {
    'name'  : 'Shrook',
    'tribe' : 'Slippery',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/9/91/Shrook_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/9/91/Shrook_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/d/dd/Shrook_Art.jpg',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/d/dd/Shrook_Art.jpg/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "Shrook will make you bad at whatever you're usually good at. He can make a master into a novice pretty quickly."
  },
  'spenp'  : {
    'name'  : 'Spenp',
    'tribe' : 'Slippery',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/6/6c/SpenpNM2.png',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/6/6c/SpenpNM2.png/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/2/20/Spenp_Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/2/20/Spenp_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "Being Inspirited by Spenp will make you buy things you don't even want. Wave bye to your cash!"
  },
  'almi'  : {
    'name'  : 'Almi',
    'tribe' : 'Slippery',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/3/3d/Almi_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/3/3d/Almi_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/e5/Almi_Art.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/e5/Almi_Art.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "When Almi Inspirits you, you'll want to treat others all the time. Your wallet will be empty before you know it."
  },
  'babblong'  : {
    'name'  : 'Babblong',
    'tribe' : 'Slippery',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/e9/Babblong_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/e/e9/Babblong_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/f/f2/Nagabana.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/f/f2/Nagabana.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "Don't agree to listen to Babblong or else he'll talk and talk and talk and talk and talk and talk. He's a terrible listener."
  },
  'bananose'  : {
    'name'  : 'Bananose',
    'tribe' : 'Slippery',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/4/4c/Bananose_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/4/4c/Bananose_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/0/0a/Bananose_Artwork.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/0/0a/Bananose_Artwork.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "This Yo-kai is made of banana and is often bothered by circling flies. No relation to Babblong."
  },
  'copperled'  : {
    'name'  : 'Copperled',
    'tribe' : 'Slippery',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/4/4c/Copperled_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/4/4c/Copperled_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/8b/Shikirunja.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/8b/Shikirunja.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `You just can't refuse orders from the fan on this old Yo-kai's tail. And he loves to micromanage everything he can!`
  },
  'cynake'  : {
    'name'  : 'Cynake',
    'tribe' : 'Slippery',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/3/3d/Cynake_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/3/3d/Cynake_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/85/Cynake-0.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/85/Cynake-0.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : `This sulky snake Yo-kai will make you sulk at the slightest problem. Hmph!`
  },
  'slitheref'  : {
    'name'  : 'Slitheref',
    'tribe' : 'Slippery',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/8b/Slitheref_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/8b/Slitheref_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/89/Slitheref-0.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/89/Slitheref-0.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "When a battle starts, Slitheref will appear out of nowhere and make sure the fight stays fair and square."
  },
  'venoct'  : {
    'name'  : 'Venoct',
    'tribe' : 'Slippery',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/9/97/Venoct_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/9/97/Venoct_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/5/57/Venoct_atwork.png',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/5/57/Venoct_atwork.png/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "An elite Yo-kai who fights with his dragon scarf. All of his abilities are truly first class."
  },
  'shadow venoct'  : {
    'name'  : 'Shadown Venoct',
    'tribe' : 'Slippery',
    'medalPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/1/19/Shadow_Venoct_NM.jpg',
    'medalPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/1/19/Shadow_Venoct_NM.jpg/revision/latest/scale-to-width-down/150',
    'yokaiPic'  : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/8a/Kage_Orochi.jpg',
    'yokaiPicThumb' : 'https://static.wikia.nocookie.net/yokaiwatch/images/8/8a/Kage_Orochi.jpg/revision/latest/scale-to-width-down/150',
    'medalliumBio'  : "Venoct's shadow, skilled in the deadly arts. Few who learn that he exists live long after that."
  },
  'unknown' : {
    'name'  : 'unknown',
    'tribe' : 'n/a',
    'medalPic'  : '#',
    'medalPicThumb' : '#',
    'yokaiPic'  : '#',
    'yokaiPicThumb' : '#',
    'medalliumBio'  : 'Unknown Yokai is not in Medallium.'
  }
}
