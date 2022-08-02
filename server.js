const express = require('express')
const app = express()
const PORT = 8000

const characters = {
    'bloodhound': {
        'name': 'Bloodhound',
        'imgURL': 'https://media.contentapi.ea.com/content/dam/apex-legends/images/2019/01/legends-character-tiles/apex-grid-tile-legends-bloodhound.png.adapt.crop16x9.png',
        'description': 'Technological Tracker',
        'skills': {
            'passive': {
                'name': 'Tracker',
                'description': 'Foes leave behind clues for you to find'
            },
            'tactical': {
                'name': 'Eye of the Allfather',
                'description': 'Briefly reveal enemies, traps, and clues through all structures in front of you'
            },
            'ultimate': {
                'name': 'Beast of the Hunt',
                'description': 'Transform into the ultimate hunter. Enchances your senses, allowing you to see could tracks and move faster. Knockdowns extend duration'
            }
        }
    },
    'gibraltar': {
        'name': 'Gibraltar',
        'imgURL': 'https://media.contentapi.ea.com/content/dam/apex-legends/images/2019/01/legends-character-tiles/apex-grid-tile-legends-gibraltar.png.adapt.crop16x9.png',
        'description': 'Shielded Fortress',
        'skills': {
            'passive': {
                'name': 'Gun Shield',
                'description': 'Aiming down sights deploys a guns shield that blocks incoming fire'
            },
            'tactical': {
                'name': 'Dome of Protection',
                'description': 'Blocks incoming and outgoing attacks'
            },
            'ultimate': {
                'name': 'Defensive Bombardment',
                'description': 'Call in a concentrated mortar strike on a position you mark with smoke'
            }
        }
    },
    'lifeline': {
        'name': 'Lifeline',
        'description': 'Combat Medic',
        'imgURL': 'https://media.contentapi.ea.com/content/dam/apex-legends/images/2019/01/legends-character-tiles/apex-grid-tile-legends-lifeline.png.adapt.crop16x9.png',
        'skills': {
            'passive': {
                'name': 'Combat Revive',
                'description': 'Deploy D.O.C. to revive teammates, leaving Lifeline free to defend'
            },
            'tactical': {
                'name': 'D.O.C Heal Drone',
                'description': 'The drone of compassion (DOC) automatically heals those near it over time'
            },
            'ultimate': {
                'name': 'Care Package',
                'description': 'Call in a droppod full of high quality defensive gear.'
            }
        }
    },
    'pathfinder': {
        'name': 'Pathfinder',
        'imgURL':'https://media.contentapi.ea.com/content/dam/apex-legends/images/2019/01/legends-character-tiles/apex-grid-tile-legends-pathfinder.png.adapt.crop16x9.png',
        'description': 'Foward Scout',
        'skills': {
            'passive': {
                'name': 'Insider Knowledge',
                'description': 'Scan a survey beacon to reduce the cooldown of Zipline Gun'
            },
            'tactical': {
                'name': 'Grappling Hook',
                'description': 'Grapple to get to out-of-reach places quickly'
            },
            'ultimate': {
                'name': 'Zipline Gun',
                'description': 'Creates a zipline for everyone to use'
            }
        }
    },
    'wraith': {
        'name': 'Wraith',
        'imgURL': 'https://media.contentapi.ea.com/content/dam/apex-legends/images/2019/01/legends-character-tiles/apex-grid-tile-legends-wraith.png.adapt.crop16x9.png',
        'description': 'Interdimensional Skirmisher',
        'skills': {
            'passive': {
                'name': 'Voices From The Void',
                'description': "You hear a voice when danger approaches. As far as you can tell, it's on your side"
            },
            'tactical': {
                'name': 'Into The Void',
                'description': "Reposition quickly through the saftey of the 'void' space, avoiding all damage"
            },
            'ultimate': {
                'name': 'Dimensional Rift',
                'description': 'Link 2 locations with portals for 60 seconds'
            }
        }
    },
    'bangalore': {
        'name': 'Bangalore',
        'imgURL': 'https://media.contentapi.ea.com/content/dam/apex-legends/images/2019/01/legends-character-tiles/apex-grid-tile-legends-bangalore.png.adapt.crop16x9.png',
        'description': 'Professional Soldier',
        'skills': {
            'passive': {
                'name': 'Double Time',
                'description': 'Taking fire while sprinting makes you move faster for a     brief time.'
            },
            'tactical': {
                'name': 'Smoke Launcher',
                'description': 'Fire a high velocity canister that explodes into a smoke    wall on impact.'
            },
            'ultimate': {
                'name': 'Rolling Thunder',
                'description': 'Call in an artillery strike that slowly creeps across the   landscape'
            }
        }
    },
    'caustic': {
        'name': 'Caustic',
        'imgURL': 'https://media.contentapi.ea.com/content/dam/apex-legends/images/2019/01/legends-character-tiles/apex-grid-tile-legends-caustic.png.adapt.crop16x9.png',
        'description': 'Toxic Trapper',
        'skills': {
            'passive': {
                'name': 'Nox Vision',
                'description': 'You gain threat vision on enemies moving through your gas'
            },
            'tactical': {
                'name': 'Nox Gas Trap',
                'description': 'Place up to 6 canisters that release deadly Nox gas when shot or triggered by enemies'
            },
            'ultimate': {
                'name': 'Nox Gas Grenade',
                'description': 'Blanket a large area in Nox gas'
            }
        }
    },
    'mirage': {
        'name': 'Mirage',
        'imgURL': 'https://media.contentapi.ea.com/content/dam/apex-legends/images/2019/01/legends-character-tiles/apex-grid-tile-legends-mirage.png.adapt.crop16x9.png',
        'description': 'Holographic Trickster',
        'skills': {
            'passive': {
                'name': 'Now You See Me...',
                'description': 'Automatically cloak when using Respawn Beacons and reviving teammates'
            },
            'tactical': {
                'name': 'Psyche Out',
                'description': 'Send out a holographic decoy to confuse the enemy. Can also control the decoy'
            },
            'ultimate': {
                'name': 'Life of the Party',
                'description': 'Mirage deploys a team of controllable decoys to distract enemies'
            }
        }
    },
    'octane': {
        'name': 'Octane',
        'imgURL': 'https://media.contentapi.ea.com/content/dam/apex-legends/images/2019/01/legends-character-tiles/apex-grid-tile-legends-octane.png.adapt.crop16x9.png',
        'description': 'High-Speed DareDevil',
        'skills': {
            'passive': {
                'name': 'Swift Mend',
                'description': 'Automatically restores health over time'
            },
            'tactical': {
                'name': 'Stim',
                'description': 'Move 30% faster for six seconds. Costs health to use'
            },
            'ultimate': {
                'name': 'Launch Pad',
                'description': 'Deploy a jump that catapults teammates through the air'
            }
        }
    },
    'wattson': {
        'name': 'Wattson',
        'imgURL': 'https://media.contentapi.ea.com/content/dam/apex-legends/images/2019/01/legends-character-tiles/apex-grid-tile-legends-wattson.png.adapt.crop16x9.png',
        'description': 'Static Defender',
        'skills': {
            'passive': {
                'name': 'Spark of Genius',
                'description': 'Ultimate Accelerants fully charge your Ultiamte Ability'
            },
            'tactical': {
                'name': 'Perimeter Security',
                'description': 'Connect nodes to create electrified fences that damage and slow enemies'
            },
            'ultimate': {
                'name': 'Interception Pylon',
                'description': 'Place an electrified pylon that destroys incoming ordnance and repairs damanged shields'
            }
        }
    },
    'crypto': {
        'name': 'Crypto',
        'imgURL': 'https://media.contentapi.ea.com/content/dam/apex-legends/images/2019/01/legends-character-tiles/apex-grid-tile-legends-crypto.png.adapt.crop16x9.png',
        'description': 'Surveillance Expert',
        'skills': {
            'passive': {
                'name': 'Neurolilnk',
                'description': 'Enemines detected by the serveillance drone within 30 meteres of your position are marked for you and your teammates to see'
            },
            'tactical': {
                'name': 'Surveillance Drone',
                'description': 'Deploy and aerial dron that allows you to view the surrounding area from above. If the drone is destroyed, there is forty-second cooldown before you can deploy another'
            },
            'ultimate': {
                'name': 'Drone EMP',
                'description': 'Your Surveillanace drone sets of an EMP blast that deals shield damage, slows enemies, and disables traps'
            }
        }
    },
    'revenant': {
        'name': 'Revenant',
        'imgURL': 'https://media.contentapi.ea.com/content/dam/apex-legends/images/2020/02/apex-legend-revenant-grid-tile.png.adapt.crop16x9.png',
        'description': 'Synthetic Nightmare',
        'skills': {
            'passive': {
                'name': 'Stalker',
                'description': 'You crouch-walk faster and can climb higher than other legends'
            },
            'tactical': {
                'name': 'Silence',
                'description': 'Throw a device that deals damage and disables enemy abilities'
            },
            'ultimate': {
                'name': 'Death Totem',
                'description': 'Drop a totem that protects those who use it from death for a set amount of time. Instead of being killed or downed, users will return to the totem'
            }
        }
    },
    'loba': {
        'name': 'Loba',
        'imgURL': 'https://media.contentapi.ea.com/content/dam/apex-legends/images/2020/05/apex-grid-tile-legends-loba.png.adapt.crop16x9.png',
        'description': 'Translocating Thief',
        'skills': {
            'passive': {
                'name': 'Eye of Quality',
                'description': 'Nearby epic and legendary loot can be seen through walls. The range is the same as Black Market Boutique'
            },
            'tactical': {
                'name': "Burglar's Best Friend'",
                'description': 'Teleport to hard-to-reach places or escape trouble quickly by throwing your Jump Drive bracelet.'
            },
            'ultimate': {
                'name': 'Black Market Boutique',
                'description': 'Place a portable device that allows you to teleport nearby loot to you inventory. Each friendly or enemy Legend can take up to two items'
            }
        }
    },
    'rampart': {
        'name': 'Rampart',
        'imgURL': 'https://media.contentapi.ea.com/content/dam/apex-legends/images/2020/08/rampart/apex-grid-tile-legends-rampart.png.adapt.crop16x9.png',
        'description': 'Amped Modder',
        'skills': {
            'passive': {
                'name': 'Modder Loader',
                'description': 'Increased magazine capacity and faster reloads when using LMGs and the Minigun'
            },
            'tactical': {
                'name': 'Amped Cover',
                'description': 'Build a crouch-over wall, which deploys a full-cover amped wall that blocks incoming shots and amps outgoing shots'
            },
            'ultimate': {
                'name': 'Emplaced Minigun "Sheila"',
                'description': 'Place a monted machine gun that anyone can use.'
            }
        }
    },
    'horizon': {
        'name': 'Horizon',
        'imgURL': 'https://media.contentapi.ea.com/content/dam/apex-legends/images/2020/10/horizon/apex-grid-tile-legends-horizon.png.adapt.crop16x9.png',
        'description': 'Gravitational Manipulator',
        'skills': {
            'passive': {
                'name': 'Space Walk',
                'description': "Increase air control and reduce fall impacts with Horizon's custom spacesuit"
            },
            'tactical': {
                'name': 'Gravity Lift',
                'description': 'Reverses the flow of gravity, lifting players upwards and boosting them outwards when theye exit'
            },
            'ultimate': {
                'name': 'Black Hole',
                'description': 'Deploy N.E.W.T. to create a micro black hole that pulls players in towards it, and hits them witha graviton blast at the end'
            }
        }
    },
    'fuse': {
        'name': 'Fuse',
        'imgURL': 'https://media.contentapi.ea.com/content/dam/apex-legends/images/2021/01/apex-grid-tile-legends-fuse.png.adapt.crop16x9.png',
        'description': 'Bombastic Explosives Expert',
        'skills': {
            'passive': {
                'name': 'Grenadier',
                'description': 'Stack an extra grenade per inventory slot. Fire grenades farther, faster, and more acccurately'
            },
            'tactical': {
                'name': 'Knuckle Cluster',
                'description': 'Launch a cluster bumb that continously expels airburst explosives on impact'
            },
            'ultimate': {
                'name': 'The MotherLode',
                'description': 'Launch a bombardment that encircles a target area in wall of flame'
            }
        }
    },
    'valkrie': {
        'name': 'Valkrie',
        'imgURL': 'https://media.contentapi.ea.com/content/dam/apex-legends/images/2021/04/apex-grid-tile-legends-valkyrie.png.adapt.crop16x9.png',
        'description': 'Winged Avenger',
        'skills': {
            'passive': {
                'name': 'Vtol Jets',
                'description': 'Use jetpack to fly. Fuel is limited but refills overtime'
            },
            'tactical': {
                'name': 'Missle Swarm',
                'description': 'Fire a swarm of mini-rockets that damage and disorient the enemy'
            },
            'ultimate': {
                'name': 'Skyward Dive',
                'description': 'Launch into the air and sky dive. Allies can hook into take-off systems to join you'
            }
        }
    },
    'ash': {
        'name': 'Ash',
        'imgURL': 'https://media.contentapi.ea.com/content/dam/apex-legends/common/legends/ash/apex-grid-tile-legends-ash.png.adapt.crop16x9.png',
        'description': 'Incisive Instigator',
        'skills': {
            'passive': {
                'name': 'Marked For Death',
                'description': "Ahs's map shows location of recent deathboxes and marks surviving attackers"
            },
            'tactical': {
                'name': 'Arc Snare',
                'description': 'Throw a spining snare that damanges and tethers the first enemeny who gets too close'
            },
            'ultimate': {
                'name': 'Phase Breach',
                'description': 'Tear open a one-way portal to a targeted location'
            }
        }
    },
    'seer': {
        'name': 'Seer',
        'imgURL': 'https://media.contentapi.ea.com/content/dam/apex-legends/images/2021/07/seer-assets/apex-grid-tile-legends-seer.png.adapt.crop16x9.png',
        'description': 'Ambush Artist',
        'skills': {
            'passive': {
                'name': 'Heart Seeker',
                'description': 'Hear and Visualize the hearbeats of nearby enemies when aiming down sights.'
            },
            'tactical': {
                'name': 'Focus of Attention',
                'description': 'Seer summons his micro-drones to emit a delayed blast that goes through walls interrupting and revealing enemies'
            },
            'ultimate': {
                'name': 'Exhibit',
                'description': 'Create a sphere of micro-drones that reveal the location of enemies moving quickly or firing their weapong withing'
            }
        }
    },
    'mad maggie': {
        'name': 'Mad Maggie',
        'imgURL': 'https://media.contentapi.ea.com/content/dam/apex-legends/common/legends/mad-maggie/apex-grid-tile-legends-maggie.png.adapt.crop16x9.png',
        'description': 'Rebel Warlord',
        'skills': {
            'passive': {
                'name': "Warlord's IRE",
                'description': "Temporarily highlight enemies you've damaged, and move faster with a shotgun"
            },
            'tactical': {
                'name': 'Riot Drill',
                'description': 'Fire a drill that burns enemies through obstacles'
            },
            'ultimate': {
                'name': 'Wrecking Ball',
                'description': 'Throw a ball that releases speed-boosting pads and detonates near enemies'
            }
        }
    },
    'newcastle': {
        'name': 'NewCastle',
        'imgURL': 'https://media.contentapi.ea.com/content/dam/apex-legends/common/saviors/newcastle-legends-page/apex-grid-tile-legends-newcastle.png.adapt.crop16x9.png',
        'description': 'Heroic Defender',
        'skills': {
            'passive': {
                'name': 'Retrieve the Wounded',
                'description': 'Dragae downed allies as your revive and protect them with your revive shield'
            },
            'tactical': {
                'name': 'Mobile Shield',
                'description': 'Throw a controllable drone that creates a moving energy shield'
            },
            'ultimate': {
                'name': 'Castle Wall',
                'description': 'Leap to an ally or target area and slam down, creting a fortified stronghold'
            }
        }
    },
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/random', (req, res) => {
    let keys = Object.keys(characters)
    let randomCharacter = keys[Math.floor(Math.random() * keys.length)]
    console.log(`Random is ${characters[randomCharacter].name}`)
    res.json(characters[randomCharacter])
})

app.get('/api/:name', (req, res) => {
    let character = req.params.name.toLowerCase()
    if(characters[character]) {
        res.json(characters[character])
    } else {
        res.json('uknown')
    }
})

app.get('/main.js', (req, res) => {
    res.sendFile(__dirname + '/main.js')
})

app.get('/style.css', (req, res) => {
    res.sendFile(__dirname + '/style.css')
})

app.listen(process.env.PORT || PORT, () => {console.log(`listening on PORT: ${PORT}`)})