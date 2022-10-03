const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 8000;
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

const stretches = {
    'neck': {
        'name': 'Side Neck Stretch',
        'muscle': 'Neck',
        'difficulty': 'Advanced',
        'instructions': [`Starting position: Stand up straight and relax your shoulders`, `Tilt your head gently towards your shoulder.`, `Gently pull on the side of the head.`]
    },
    'chest': {
        'name': 'Dynamic Chest Stretch',
        'muscle': 'Chest',
        'difficulty': 'Beginner',
        'instructions': [`Starting position: Stand with your hands together, arms extended directly in front of you.`, `Move your arms back as far as possible and back in again, increasing speed as you do so.`]
    },
    'shoulder': {
        'name': 'Cross Body Shoulder Stretch',
        'muscle': 'Shoulder',
        'difficulty': 'Beginner',
        'instructions': [`Starting position: Stand up straight and relax your shoulders`, `Start with any arm, reach across your body and hold that arm straight`, `With the opposite hand or arm, grab your elbow and pull the straightened arm across your body and towards the chest.`]
        // 'shouldercircles': {
        //     'name': 'Shoulder Circles',
        //     'muscle': 'Shoulder',
        //     'difficulty': 'Beginner',
        //     'instructions': [`Starting position: Stand up straight, relax your shoulders, with your arms resting loosely at your side.`, `Roll your shoulders forward, up, back, and down.`]
        // }
    },
    'triceps': {
        'name': 'Triceps Stretch',
        'muscle': 'Triceps',
        'difficulty': 'Advanced',
        'instructions': [`Starting position: Stand up straight and relax your shoulders`, `Start with any hand, reach behind your head, resting your palm on your neck`, `Grab and gently push the elbow in toward the center and down the spine`, `Switch sides and repeat.`]
    },
    'lats': {
        'name': 'Standing Side Bend Stretch',
        'muscle': 'Latissimus dorsi',
        'difficulty': 'Advanced',
        'instructions': [`Starting position: Stand up straight, place feet hip-width apart, and place the left hand on your left hip`, `Raise the right arm vertically, fully extending the elbow and shoulder`, `Lean to the left`, `Switch sides and repeat.`]
    },
    'abdominal': {
        'name': 'Standing Torso Twist',
        'muscle': 'Abdominal',
        'difficulty': 'Advanced',
        'instructions': [`Starting position: Stand up straight, place feet shoulder-width apart, relax your shoulders, and place both arms on your side at a 90-degree angle`, `Rotate torso and shoulders to the right and look in that direction`, `Rotate torso and shoulders to the center and look in that direction`, `Rotate torso and shoulders to the left and look in that direction`]
    },
    'lowerback': {
        'name': `Child's Pose`,
        'muscle': 'Lower back',
        'difficulty': 'Expert',
        'instructions': [`Starting position: Sit on the floor and get on your hands and knees.`, `Lower your buttocks down and rest them on your heels.`, `Rest your belly on your thighs and your forehead on the floor.`]
            // 'pelvictiltintobridge': {
            //     'name': 'Pelvic Tilt Into Bridge',
            //     'muscle': 'Lower back',
            //     'difficulty': 'Advanced',
            //     'instructions': [`Starting position: Sit on the floor, lay on your back, and bend both knees, keeping your heels below your knees.`, `Tuck your chin in, looking down your chest`, `Lift your buttocks to the ceiling.`, `Lift entire spine to start the bridge.`]
            // },
            // 'seatedspinaltwisted': {
            //     'name': 'Seated Spinal Twist',
            //     'muscle': 'Lower back',
            //     'difficulty': 'Advanced',
            //     'instructions': [`Starting position: Sit on the floor and extend both legs straight.`, `Bend your right knee, place your right foot beside the outer left thigh.`, `Place your left arm beside the outer right thigh.`, `Place your right hand behind you.`, `Twist to the right.`]
            // }
    },
    'glutes': {
        'name': 'Lying Glutes Stretch',
        'muscle': 'Glutes',
        'difficulty': 'Advanced',
        'instructions': [`Starting position: Sit down on the floor, lay on your back, and bend both knees, keeping your feet on the floor.`, `Place your left ankle on your right knee`, `Grab the inside of your right knee, between the leg and thigh.`, `Pull both legs toward your chest`, `Switch sides and repeat.`]
        // 'onekneetochest': {
        //     'name': 'One Knee to Chest',
        //     'muscle': 'Glutes',
        //     'difficulty': 'Beginner',
        //     'instructions': [`Starting position: Sit down on the floor, lay on your back, and extend both legs straight.`, `Bend your left knee while keeping your right leg straight.`, `Use both hands to hug your leg toward your chest.`, `Switch sides and repeat.`]
        // }
    },
    'quadriceps': {
        'name': 'Standing Quadriceps Stretch',
        'muscle': 'Quadriceps',
        'difficulty': 'Beginner',
        'instructions': [`Starting position: Stand up straight, relax your shoulders, and place your feet hip-width apart.`, `Bend your right leg and bring your heel toward your buttocks.`, `Grab the inside of your right foot with your left hand.`, `Gently pull the foot up.`, `Switch sides and repeat.`]
    },
    'hamstrings': {
        'name': 'Standing Toe Touches',
        'muscle': 'Hamstrings',
        'difficulty': 'Beginner',
        'instructions': [`Starting position: Stand up straight, place your feet hip-width apart, straighten your legs and do not lock them.`, `Bend at the waist and let your upper body hang down in front of you.`]
    },
    'unknown': {
        'name': 'Try again - Resubmit button',
        'muscle': 'Try again - Resubmit button',
        'type': 'unknown',
        'equipment': 'unknown',
        'difficulty': 'Try again - Resubmit button',
        'instructions': 'Try again - Resubmit button',
        'summary': `unknown`,
        'benefits': `unknown`
    }
}


let db,
dbConnectionStr = process.env.DB_STRING,
dbName = 'exercise';

try {
    const mongoAtlasLogin = require('./.env/config.js');
    dbConnectionStr = mongoAtlasLogin.DB_STRING
} catch(error) {
    console.error(error)
}

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
})

app.set('view engine', 'ejs')
app.use(cors());
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', async (request,response) => {
    const todoItems = await db.collection('stretches').find().sort({likes:-1}).toArray()
    const itemsLeft = await db.collection('stretches').countDocuments()
    response.render('index.ejs', { items: todoItems, left: itemsLeft })
});
app.get('/api/', (request, response) => {
    response.json(stretches);
})
app.get('/api/:name', (request, response) => {
    const muscleName = request.params.name.toLowerCase();
    console.log(request.params.name);
    if (stretches[muscleName]) {
        response.json(stretches[muscleName]);
    } else {
        response.json(stretches.unknown);
    }
})

app.put('/addUpvote', (request, response) => {
    db.collection('stretches').findOneAndUpdate({name: request.body.name, likes: request.body.likes}, {
        $set: {
            likes: request.body.likes + 1
          }
    },{
        sort: {_id: -1},
        upsert: true
    })
    .then(result => {
        console.log('Added One Like')
        response.json('Like Added')
    })
    .catch(error => console.error(error))
})

// app.get('/', async (request, response) => {
    // const todoItems = await db.collection('stretches').find().toArray()
    // const itemsLeft = await db.collection('stretches').countDocuments()
    // response.render('index.ejs', { items: todoItems, left: itemsLeft })
    // db.collection('todos').find().toArray()
    // .then(data => {
    //     db.collection('todos').countDocuments({completed: false})
    //     .then(itemsLeft => {
    //         response.render('index.ejs', { items: data, left: itemsLeft })
    //     })
    // })
    // .catch(error => console.error(error))
// });

app.post('/addStretch', (request, response) => {
    db.collection('stretches').insertOne(
        {
            name: request.body.stretchName, 
            muscle: request.body.muscleRegion, 
            difficulty: request.body.stretchDiff, 
            instructions: request.body.stretchDir,
            likes: 0
        })
    .then(result => {
        console.log('Stretch Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});

