const express = require('express')
const app = express()
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()
const PORT = 8000



// let db,
//     dbConnectionString = process.env.DB_STRING,
//     dbName = 'flavortown',
//     collection

MongoClient.connect(dbConnectionString)
    .then(client => {
        console.log(`Connected to Database`)
        const db = client.db('flavortown')
        const infoCollection = db.collection('meals')

        app.use(express.json())
        app.use(cors())


// const dinner = {
//     'flavortown': {
//             'mealName' : 'Flavortown',
//             'ingredientOne': 'Flavortown',
//             'ingredientTwo': '',
//             'ingredientThree': '',
//             'ingredientFour': '',
//             'ingredientFive': '',
//             'ingredientSix': '',
//             'ingredientSeven': '',
//             'ingredientEight': '',
//             'ingredientNine': '',
//             'ingredientTen': '',
//             'directionsStepOne':'Type in a real dinner to take the express train to Flavortown',
//             'directionsStepTwo':'',
//             'directionsStepThree':'',
//             'directionsStepFour':'',
//             'directionsStepFive':'',
//             'image': 'https://i.pinimg.com/564x/1b/7b/21/1b7b21819a5439e34b3a635ec0fa5521.jpg'
//     },
//     'falafel wrap': {
//         'mealName' : 'fresh as f*** falafel wrap',
//         'ingredientOne': '1 cucumber',
//         'ingredientTwo': '1 and 1/2 cups plain Greek yogurt',
//         'ingredientThree': '2 tablespoons olive oil',
//         'ingredientFour': '2 tablespoons dill',
//         'ingredientFive': '1 tablespoon lemon juice',
//         'ingredientSix': '2 cloves garlic, pressed or minced',
//         'ingredientSeven': '1/2 teaspoon fine sea salt',
//         'ingredientEight': 'falafel mix',
//         'ingredientNine': '',
//         'ingredientTen': '',
//         'directionsStepOne':'make falafel',
//         'directionsStepTwo':'Grate cucumber',
//         'directionsStepThree':'Combine rest of ingredients',
//         'directionsStepFour':'DOLLOP ON EVERYTHING',
//         'directionsStepFive':'put everthing inside wrap',
//         'image': 'https://www.vibrantplate.com/wp-content/uploads/2019/09/Falafel-04.jpg.webp'     
//     },
//     'tuna melt': {
//         'mealName' : 'totalllllyy tasty tuna melt',
//         'ingredientOne': '1 can tuna',
//         'ingredientTwo': 'dollup of TJs garlic aoili mustard',
//         'ingredientThree': 'squirt of mayonaise',
//         'ingredientFour': 'Small pour of some pickling liquid (could be from pickles, olives, pickled jalapenos, etc)',
//         'ingredientFive': 'Diced pickled jalapeno, pickles, onions, or capers (whatever you have on hand)',
//         'ingredientSix': '2 cloves garlic, pressed or minced',
//         'ingredientSeven': 'Squirt of any type of hot sauce or salsa',
//         'ingredientEight': 'Pepper to taste',
//         'ingredientNine': 'Cheese to melt. Lots.',
//         'ingredientTen': 'tortilla',
//         'directionsStepOne':'combine all ingredients',
//         'directionsStepTwo':'Toast the tortilla lightly on each side in a pan. Put cheese down first, then tuna mix.',
//         'directionsStepThree':'',
//         'directionsStepFour':'',
//         'directionsStepFive':'',
//         'image': 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/tuna-melt-081-1550261085.jpg?crop=0.646xw:0.431xh;0.243xw,0.388xh&resize=768:*' 
//     },
//     'fried rice': {
//         'mealName' : 'whatever I want cause I am delicous fried rice',
//         'ingredientOne': '1 block firm tofu',
//         'ingredientTwo': '½ pack chinese sausage',
//         'ingredientThree': '2 cups leftover rice',
//         'ingredientFour': '1 yellow onion',
//         'ingredientFive': '3 big carrots',
//         'ingredientSix': '1/2 pack frozen shelled edamame',
//         'ingredientSeven': '1 pack/8oz mushrooms',
//         'ingredientEight': '4 cloves garlic',
//         'ingredientNine': '2 tbsp. vegetable oil',
//         'ingredientTen': '6 eggs',
//         'directionsStepOne':'Chop up garlic and veggies. Mise en place baby!',
//         'directionsStepTwo':'Heat oil in pan. Add garlic as it is warming up (careful not to burn/brown the garlic). Then start adding vegetables in order of how long they take to cook (in this case - onion, carrot, bell pepper, broccoli, mushroom, edamame). Salt and add 1-2 tbsp. of soy sauce.',
//         'directionsStepThree':'Add rice to veggie mix once the vegetables are cooked to desired doneness.',
//         'directionsStepFour':'Separate pan: start soft scrambling eggs over low heat. Add to rice mix BEFORE it fully sets, eg. still some liquid egg. This will finish scrambling once added to rice mixture.',
//         'directionsStepFive':'Mix well. Optional sauces, to taste: sesame oil (~1 tbsp, a little goes a long way), kecap manis (sweet soy sauce), sriracha, chili oil (Lao Gan Ma!).',
//         'image': 'https://hot-thai-kitchen.com/wp-content/uploads/2021/01/Chinese-sausage-fried-rice-web.jpg'
//     },
//     'ramen': {
//         'mealName' : 'busy boss lady ramen',
//         'ingredientOne': 'Shin Ramyun instant ramen',
//         'ingredientTwo': 'mushrooms',
//         'ingredientThree': 'spinach',
//         'ingredientFour': 'baby bok choy',
//         'ingredientFive': '1 egg',
//         'ingredientSix': '',
//         'ingredientSeven': '',
//         'ingredientEight': '',
//         'ingredientNine': '',
//         'ingredientTen': '',
//         'directionsStepOne':'Boil 20-24oz water (this is more than package instructions as the veggies will absorb some liquid, vary depending on how soupy you want it). Add 3/4 to whole pack of seasoning mix (whole pack is quite spicy).',
//         'directionsStepTwo':'Add mushroom first. Cook for a few min until softened, then add ramen.',
//         'directionsStepThree':'When ramen is almost to desired doneness, prepare for egg flower. Scramble egg in separate bowl. Increase heat to bubbling boil, then add egg in small amounts. Allow to sit in liquid for few seconds, then whip.',
//         'directionsStepFour':'Add spinach last.',
//         'directionsStepFive':'Optional toppings: chili oil/LGM, scallion',
//         'image': 'https://assets.bonappetit.com/photos/5e3c7a3c866b940008106763/1:1/w_2240,c_limit/HLY-Veggie-Ramen-16x9.jpg'
//     },
//     'thai curry': {
//         'mealName' : 'creamy oh so dreamy thai curry',
//         'ingredientOne': 'Curry paste (I like Mae Ploy green)',
//         'ingredientTwo': '1 pound tofu or 1 pound chicken',
//         'ingredientThree': '1 bell pepper',
//         'ingredientFour': '1 yellow onion',
//         'ingredientFive': 'canned bamboo',
//         'ingredientSix': '2 zucchini squash',
//         'ingredientSeven': 'big bunch basil',
//         'ingredientEight': '32oz coconut milk',
//         'ingredientNine': '',
//         'ingredientTen': '',
//         'directionsStepOne':'Fry 3-4 tbsp curry paste in 2 tbsp oil for 1min. Careful with curry paste as it can be quite spicy! So err on less and you can always add more later.',
//         'directionsStepTwo':'Add coconut milk.',
//         'directionsStepThree':'Add rest of ingredients and cook until desired doneness',
//         'directionsStepFour':'Cook chicken seperately. Then add at end once vegetables are almost done in order to not overcook.',
//         'directionsStepFive':'Top with loads of basil.',
//         'image': 'https://www.wellplated.com/wp-content/uploads/2018/03/Thai-Chicken-Curry-with-Coconut-Milk-600x930.jpg'
//     },
//     'udon': {
//         'mealName' : 'MI-SO delicious udon',
//         'ingredientOne': '16 fl oz. chicken stock (½ carton)',
//         'ingredientTwo': '2 tbsp miso paste (usually use white but any would do!)',
//         'ingredientThree': '1 tbsp soy sauce',
//         'ingredientFour': 'fozen udon noodles',
//         'ingredientFive': 'shiitake mushrooms',
//         'ingredientSix': 'spinach',
//         'ingredientSeven': 'baby bok choy',
//         'ingredientEight': '',
//         'ingredientNine': '',
//         'ingredientTen': '',
//         'directionsStepOne':'Heat up stock. Mix miso paste into a bit of water and then add to stock.',
//         'directionsStepTwo':'Add soy sauce. Add veggies once boiling, turn down heat and simmer until done.',
//         'directionsStepThree':'Boil water in separate pot for udon. Should only take 1-2min.',
//         'directionsStepFour':'Add cooked udon to soup pot',
//         'directionsStepFive':'YUM IN MINUTES',
//         'image': 'https://www.wandercooks.com/wp-content/uploads/2019/04/udon-noodle-soup-recipe-4.jpg'
//     },

//     }

        app.get('/', (request, response) => {
        response.sendFile(__dirname + '/index.html')
})

    app.get('/api/:dinnerName', (request, response) => {
        const dinnerName = request.params.dinnerName.toLowerCase()
        infoCollection.find({name: dinnerName}).toArray()
   .then(results => {
        console.log(results)
        response.json(results[0])
   })
   .catch(error => console.error(error))
})

})

.catch(error =>console.error(error))

app.listen(process.env.PORT || PORT, () => {
    console.log('server is running.')
})
