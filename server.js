const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8000

app.use(cors())


const race = {
    'altmer': {
        'raceName': 'altmer',
        'knownAs': 'High Elf',
        'homeland': 'Summerset Isles',
        'uniqueSkills': 'illusion, conjuration, destruction, restoration, alteration, enchanting',
        'startingSpells': 'healing, flames, fury',
        'uniquePower': "Highborn: Regenerate 25% of the character's maximum magicka per second for 60 seconds",
        'uniqueEffects': '+50 Magicka',
        'survivalMode': 'Your High Elf blood gives you 25% resistance to fatigue.',
        'history': "The Altmer are one of the oldest races on Tamriel, one of the earliest descendants of the original mer race of Aldmer, and from there, through the Ehlnofey to the divine et'Ada themselves. As a race, they are extremely proud of their Aldmeri heritage, and make a concerted effort to maintain their genetic lineage. Their name translates from the Aldmeri language as High Ones or Cultured Ones. For their part, the Altmer argue that they are the first true culture on Tamriel, and still the most civilized race, an argument that even human scholars find difficult to refute.",
        'img': 'https://static.wikia.nocookie.net/elderscrolls/images/8/8c/SepLnUp_Altmer_b1%26c1.png'
    },
    'argonian': {
        'raceName': 'Argonian',
        'knownAs': 'Argonian',
        'homeland': 'Black Marsh',
        'uniqueSkills': 'light armor, sneak, lockpicking, pickpocket, restoration, alteration',
        'startingSpells': 'healing, flames',
        'uniquePower': 'Histskin: regenerate health 10 times faster for 60 seconds',
        'uniqueEffects': '50% Disease Resistance, Waterbreathing',
        'survivalMode': 'Argonians become colder 25% faster in cold environments.", "Your Argonian blood allows you to eat raw meat without risk of disease.',
        'history': 'Enigmatic and intelligent, the Argonians are experts at guerrilla warfare, and their natural abilities suit their swampy homeland, Black Marsh. They have developed immunities to the diseases that have doomed many would-be explorers in the region, and they are capable of easily exploring underwater locations due to their ability to breathe underwater. Argonians make proficient thieves, due to their increased lockpicking and sneaking skills',
        'img': 'https://static.wikia.nocookie.net/elderscrolls/images/8/87/SepLnUp_Argonian_b5%26c3.png'
    },
    'bosmer': {
        'raceName': 'Bosmer',
        'knownAs': 'Wood Elf',
        'homeland': 'Valenwood',
        'uniqueSkills': 'archery, light armor, sneak, lockpicking, pickpocket, alchemy',
        'startingSpells': 'healing, flames',
        'uniquePower': 'Command Animal:	make an animal an ally for 60 seconds',
        'uniqueEffects': '50% Disease Resistance, 50% Poison Resistance',
        'survivalMode': 'Your Bosmer blood gives you 25% resistance to fatigue.',
        'history': 'Bosmer (or, more commonly, Wood Elves) are the elven people of Valenwood. They prefer a simple existence, living in harmony with the land and wild animals. They are known to be the best archers in all of Tamriel and are known for their ability to command wild creatures. They make great scouts or thieves, due to their natural stealth and light footing.',
        'img': 'https://static.wikia.nocookie.net/elderscrolls/images/b/be/Bosmer_%28Skyrim%29.png'
    },
    'breton': {
        'raceName': 'Breton',
        'knownAs': 'Breton',
        'homeland': 'High Rock',
        'uniqueSkills': 'speech, alchemy, illusion, conjuration, restoration, alteration,',
        'startingSpells': 'healing, flames, conjure familiar',
        'uniquePower': 'Dragonskin: absorb 50% of magicka from all incoming spells for 60 seconds.',
        'uniqueEffects': '25% Magic Resistance',
        'survivalMode': 'none',
        'history': 'Bretons are a race of both human and elven ancestry.[1] They populate the province of High Rock. They are excellent mages[2] with high magic resistance, but have few other distinctive features. They are considered an intelligent race in Tamriel, known for a proficiency in abstract thinking,[source?] a possible reason for their adeptness in the magical arts. It is suggested that they may also carry Aldmer blood, which would further account for their magical prowess.',
        'img': 'https://static.wikia.nocookie.net/elderscrolls/images/b/b4/SepLnUp_Breton_b5%26c2.png'
    },
    'dunmer': {
        'raceName': 'Dunmer',
        'knownAs': 'Dark Elf',
        'homeland': 'Morrowind',
        'uniqueSkills': 'light armor, sneak, alchemy, illusion, destruction, alteration',
        'startingSpells': 'healing, flames, sparks',
        'uniquePower': 'Ancestors Wrath: surrounds the character in fire for 60 seconds.',
        'uniqueEffects': '50% Fire Resistance',
        'survivalMode': 'Your Dunmer blood gives you 25% resistance to fatigue.',
        'history': "The Dunmer, more commonly known as Dark Elves, are the grey-skinned elven natives of the province of Morrowind. After the eruption of Red Mountain, many Dunmer fled to Skyrim, where they have endured extreme prejudice as a result of their elven heritage and status as refugees. In spite of this, many Dunmer have been able to establish themselves in Tamriel's northernmost province as skillful merchants and mages.",
        'img': 'https://static.wikia.nocookie.net/elderscrolls/images/8/81/SepLnUp_Dunmer_b4%26d4.png'
    },
    'imperial': {
        'raceName': 'Imperial',
        'knownAs': 'Imperial',
        'homeland': 'Cyrodiil',
        'uniqueSkills': 'heavy armor, block, one-handed, destruction, restoration, enchanting',
        'startingSpells': 'healing, flames',
        'uniquePower': 'Voice of the Emperor: nearby people are Calmed for 30 seconds.',
        'uniqueEffects': 'Find more gold than usual',
        'survivalMode': 'none',
        'history': 'Imperials are some of the most well-educated, wealthy and well-spoken of the races in Tamriel and the natives of the cosmopolitan province of Cyrodiil. Imperials are also known for their discipline and training of their citizen armies. Because of this, the Imperials have dominated Tamriel for more than 2,000 years.',
        'img': 'https://static.wikia.nocookie.net/elderscrolls/images/6/68/SepLnUp_Imperial_a1%26c2.png'
    },
    'khajiit' : {
        'raceName': 'Khajiit',
        'knownAs': 'Khajiit',
        'homeland': 'Elsweyr',
        'uniqueSkills': 'one-handed, archery, sneak, lockpicking, pickpocket, alchemy,',
        'startingSpells': 'healing, flames',
        'uniquePower': 'Night Eye: improved Night Vision for 60 seconds (can be toggled multiple times per day).',
        'uniqueEffects': '+15 Base Unarmed Damage',
        'survivalMode': 'Your Khajiit blood improves your resistance to cold environments by 15 points.", "Your Khajiit blood allows you to eat raw meat without risk of disease.',
        'history': 'The Khajiit are a playable race present in The Elder Scrolls V: Skyrim. Khajiit are one of the beast races which inhabit the continent of Tamriel, primarily their home province of Elsweyr. The Khajiit have feline appearance and sly accent common to Cathay, however their type is not specified. Along with the Argonians, they are referred to as the beast-races of Skyrim. Because of this, Khajiit have a negative public image. They are the rarest race encountered in Skyrim, most commonly found only in caravans.',
        'img': 'https://static.wikia.nocookie.net/elderscrolls/images/4/44/SepLnUp_Khajiit_a1%26c1.png'
    },
    'nord' : {
        'raceName': 'Nord',
        'knownAs': 'Nord',
        'homeland': 'Skyrim',
        'uniqueSkills': 'smithing, block, two-handed, one-handed, light armor, speech',
        'startingSpells': 'healing, flames',
        'uniquePower': 'Battle Cry: nearby enemies are Frightened for 30 seconds',
        'uniqueEffects': '50% Frost Resistance',
        'survivalMode': 'Your Nord blood improves your resistance to cold environments by 25 points.',
        'history': "Nords are a race that were led to Skyrim by Ysgramor. They are tall (standing at a scale of 1.03), fair-haired and pale-skinned humans from Atmora who are known for their incredible resistance to cold and even magical frost. They are enthusiastic warriors, and act as soldiers, mercenaries, merchants and blacksmiths all over Tamriel. Eager to augment their martial skills beyond the traditional methods of Skyrim, they excel in all manner of warfare. Above all else in Nord culture is the quest for honor and glory, and a great emphasis is placed on family values. They thrive in the cold, reminiscent of their native Atmora, and are known as a militant people by their neighbors. Nords are also naturally superior at sea, and have benefited from nautical trade since their first migrations across the sea from Atmora. They captain and crew the merchant fleets of many regions, and may be found all along Tamriel's coasts. They issue a battle cry to make their enemies flee for a short time. Nords comprise the majority of the Stormcloaks, as well as the majority of the population of Skyrim.",
        'img': 'https://static.wikia.nocookie.net/elderscrolls/images/e/ec/SepLnUp_Nord_a1%26c1.png'
    },
    'orsimer' : {
        'raceName': 'Orsimer',
        'knownAs': 'Orc',
        'homeland': 'High Rock and Orsinium',
        'uniqueSkills': 'smithing, heavy armor, block, two-handed, one-handed, enchanting',
        'startingSpells': 'healing, flames',
        'uniquePower': 'Berserker Rage: take half damage and do double physical damage for 60 seconds',
        'uniqueEffects': 'Are allowed to enter Orc mining camps and strongholds without first becoming Blood-kin',
        'survivalMode': 'Your Orc blood gives you 15% resistance to hunger and fatigue, and increases your resistance to cold environments by 10 points',
        'history': "The Orsimer (more commonly known as Orcs), are the native people of the Wrothgarian and Dragontail Mountains. They are possibly a variant of elves or mer. Other sources state they are beastfolk. Following in the footsteps of Trinimac, and subsequently Malacath, Orcs have consistently held a standard as a race as some of Tamriel's greatest warriors and smiths.",
        'img': 'https://static.wikia.nocookie.net/elderscrolls/images/4/40/SK_Orsimer_Race.jpg'
    },
    'redguard' : {
        'raceName' : 'Redguard',
        'knownAs' : 'Redguard',
        'homeland' : 'Hammerfell',
        'uniqueSkills' : 'smithing, block, one-handed, archery, destruction, alteration',
        'startingSpells' : 'healing, flames',
        'uniquePower' : 'Adrenaline Rush: regenerate stamina 10 times faster for 60 seconds',
        'uniqueEffects' : '50% Poison Resistance',
        'survivalMode' : 'none',
        'history' : 'Redguards hail from the great desert province of Hammerfell. They are descended from a long line of warriors and mystic seers. Legend has it that Redguards are innately more proficient with the use of weaponry than any other race. They excel in all arts concerning blade and shield. The most naturally talented warriors in Tamriel, the dark-skinned Redguards of Hammerfell seem born to battle. However, their pride and fierce independence of spirit makes them more suitable as scouts or skirmishers, or as free ranging heroes and adventurers, than as rank and file soldiers. In addition to their cultural affinities for many weapon and armor styles, Redguards are also blessed with hardy constitutions and fleetness of foot.',
        'img': 'https://static.wikia.nocookie.net/elderscrolls/images/2/2c/SepLnUp_Redguard_b3%26c5.png'
    },
    'nonPlayable': {
        'raceName' : 'undefined',
    }
}

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/api/:raceName', (req,res) => {
    //console.log(race)
    const racesName = req.params.raceName.toLowerCase()
    if(race[racesName]){
        res.json(race[racesName])
    }else{
        res.json(race['nonPlayable'])
    }
    
})

app.listen(process.env.PORT || PORT, () => { console.log(`server active on PORT ${PORT}`)
})




