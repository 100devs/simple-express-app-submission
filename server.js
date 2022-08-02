const express = require('express');
const app = express();
const cors = require('cors')
const PORT = 8000;

app.use(cors());

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
});

app.get('/api/:pie', (request, response) => {
    const pieName = request.params.pie.toLowerCase();
    if(pie[pieName]) {
        response.json(pie[pieName])
    }else{
        response.json('unknown');
    }
});

app.listen(process.env.PORT || PORT, () => {
    console.log(`The server is now running on port ${PORT} better go catch it! xDDDD`);
});

const pie = {
    'apple': {
        'type': 'pie',
        'taste': 'sweet',
        'filling': 'apples',
        'topping': 'pastry',
        'crust': 'pastry',
        'origin': 'England'
    },
    'boston cream': {
        'type': 'cake',
        'taste': 'sweet',
        'filling': 'cream, custard',
        'topping': 'chocolate',
        'crust': 'n/a',
        'origin': 'Boston, Massachuesetts',
        'controversial': 'yes'
    },
    'key lime': {
        'type': 'pie',
        'taste': 'sweet',
        'filling': 'sweetened condensed milk',
        'topping': 'meringue',
        'crust': 'graham cracker',
        'origin': 'Key West, Florida'
    },
    'shepherd\'s': {
        'type': 'pie',
        'taste': 'savory',
        'filling': 'minced lamb',
        'topping': 'mashed potato',
        'crust': 'n/a',
        'origin': 'United Kingdom'
    },
    'empanada': {
        'type': 'hand pie',
        'taste': 'savory',
        'filling': 'ground beef, veg',
        'topping': 'n/a',
        'crust': 'pastry',
        'origin': 'Spain'
    },
    'lemon meringue': {
        'type': 'pie',
        'taste': 'sweet',
        'filling': 'lemon curd',
        'topping': 'meringue',
        'crust': 'pastry',
        'origin': 'Philadelphia, Pennsylvania'
    },
    'blueberry': {
        'type': 'pie',
        'taste': 'sweet',
        'filling': 'blueberries',
        'topping': 'pastry',
        'crust': 'pastry',
        'origin': 'Northern United States'
    },
    'sweet potato': {
        'type': 'pie',
        'taste': 'sweet',
        'filling': 'mashed sweet potatoes',
        'topping': 'marshmallow, meringue, whipped cream',
        'crust': 'pastry',
        'origin': 'Southern United States'
    },
    'pumpkin': {
        'type': 'pie',
        'taste': 'sweet',
        'filling': 'pumpkin-based custard',
        'topping': 'n/a',
        'crust': 'pastry',
        'origin': 'United Kingdom'
    },
    'pecan': {
        'type': 'pie',
        'taste': 'sweet',
        'filling': 'pecans, sugar-syrup',
        'topping': 'n/a',
        'crust': 'pastry',
        'origin': 'Southern United States'
    },
    'egg tart': {
        'type': 'tart',
        'taste': 'sweet',
        'filling': 'egg custard',
        'topping': 'n/a',
        'crust': 'puff pastry or shortcrust pastry',
        'origin': 'Guangzhou, China'
    },
    'dan tat': {
        'type': 'tart',
        'taste': 'sweet',
        'filling': 'egg custard',
        'topping': 'n/a',
        'crust': 'puff pastry or shortcrust pastry',
        'origin': 'Guangzhou, China'
    },
    'quiche': {
        'type': 'tart',
        'taste': 'savory',
        'filling': 'egg, cheese, meat, seafood, veg, various',
        'topping': 'n/a',
        'crust': 'shortcrust pastry or pastry',
        'origin': 'France'
    },
    'pizza': {
        'type': 'pie',
        'taste': 'savory',
        'filling': 'sauce, cheese',
        'topping': 'various',
        'crust': 'leavened dough',
        'origin': 'Naples, Italy'
    },
    'calzone': {
        'type': 'hand pie',
        'taste': 'savory',
        'filling': 'sauce, cheese, various',
        'topping': 'n/a',
        'crust': 'leavened dough',
        'origin': 'Naples, Italy'
    },
    'pot': {
        'type': 'pie',
        'taste': 'savory',
        'filling': 'poultry, beef, seafood, gravy, veg, various',
        'topping': 'pastry',
        'crust': 'pastry',
        'origin': 'Greece'
    },
    'chicken pot': {
        'type': 'pie',
        'taste': 'savory',
        'filling': 'poultry, beef, seafood, gravy, veg, various',
        'topping': 'pastry',
        'crust': 'pastry',
        'origin': 'Greece'
    },
    'coconut cream': {
        'type': 'pie',
        'taste': 'sweet',
        'filling': 'custard, pudding',
        'topping': 'whipped cream',
        'crust': 'pastry',
        'origin': 'United States, Germany'
    },
    'bumbleberry': {
        'type': 'pie',
        'taste': 'sweet',
        'filling': 'mixed berries, fruits',
        'topping': 'pastry',
        'crust': 'pastry',
        'origin': 'The Maritimes, Canada'
    },
    'french silk':{
        'type': 'pie',
        'taste': 'sweet',
        'filling': 'mousse',
        'topping': 'whipped cream, chocolate shavings',
        'crust': 'pastry',
        'origin': 'Maryland, United States'
    },
    'chiffon': {
        'type': 'pie',
        'taste': 'sweet',
        'filling': 'custard or curd set with gelatin',
        'topping': 'whipped cream',
        'crust': 'pastry',
        'origin': 'United States'
    },
    'fish': {
        'type': 'pie',
        'taste': 'savory',
        'filling': 'white fish, cheddar sauce, shellfish, hard-boiled eggs',
        'topping': 'mashed potatoes',
        'crust': 'n/a',
        'origin': 'Britain'
    },
    'fisherman\'s': {
        'type': 'pie',
        'taste': 'savory',
        'filling': 'white fish, cheddar sauce, shellfish, hard-boiled eggs',
        'topping': 'mashed potatoes',
        'crust': 'n/a',
        'origin': 'Britain'
    },
    'steak': {
        'type': 'pie',
        'taste': 'savory',
        'filling': 'steak, beef gravy',
        'topping': 'pastry',
        'crust': 'pastry',
        'origin': 'United Kingdom'
    },
    'steak and ale': {
        'type': 'pie',
        'taste': 'savory',
        'filling': 'steak, beef gravy',
        'topping': 'pastry',
        'crust': 'pastry',
        'origin': 'United Kingdom'
    },
    'galette': {
        'type': 'hand pie',
        'taste': 'sweet or savory',
        'filling': 'various',
        'topping': 'various',
        'crust': 'pastry',
        'origin': 'Brittany, France'
    },
    'crostata': {
        'type': 'hand pie',
        'taste': 'sweet or savory',
        'filling': 'various',
        'topping': 'various',
        'crust': 'pastry',
        'origin': 'Italy'
    },
    'mince': {
        'type': 'hand pie',
        'taste': 'sweet',
        'filling': 'mixed fruits and spices',
        'topping': 'pastry',
        'crust': 'pastry',
        'origin': 'England'
    },
    'mincemeat': {
        'type': 'hand pie',
        'taste': 'sweet',
        'filling': 'mixed fruits and spices',
        'topping': 'pastry',
        'crust': 'pastry',
        'origin': 'England'
    },
    'rhubarb': {
        'type': 'pie',
        'taste': 'sweet',
        'filling': 'strawberries, rhubarb',
        'topping': 'pastry',
        'crust': 'pastry',
        'origin': 'Germany, United Kingdom'
    },
    'tarte tatin': {
        'type': 'tart',
        'taste': 'sweet',
        'filling': 'apples or other fruit',
        'topping': 'n/a',
        'crust': 'puff pastry or shortcrust pastry',
        'origin': 'France'
    },
    'cherry': {
        'type': 'pie',
        'taste': 'sweet',
        'filling': 'cherries',
        'topping': 'pastry',
        'crust': 'pastry',
        'origin': 'England'
    },
    'cheesecake': {
        'type': 'technically pie??? idk i don\'t make the rules...',
        'taste': 'sweet',
        'filling': 'cream cheese',
        'topping': 'various',
        'crust': 'graham crackers, crushed cookies',
        'origin': 'Ancient Greece',
        'controversial': 'absolutely'
    },
    'peach': {
        'type': 'pie',
        'taste': 'sweet',
        'filling': 'peaches',
        'topping': 'various',
        'crust': 'pastry',
        'origin': 'United States'
    },
    'blackberry': {
        'type': 'pie',
        'taste': 'sweet',
        'filling': 'blackberries',
        'topping': 'pastry',
        'crust': 'pastry',
        'origin': 'United States, Germany, or United Kingdom'
    },
    'banoffee': {
        'type': 'pie',
        'taste': 'sweet',
        'filling': 'bananas, cream',
        'topping': 'toffee',
        'crust': 'pastry',
        'origin': 'Jevington, England'
    },
    'apple crumble': {
        'type': 'pie',
        'taste': 'savory',
        'filling': 'apples',
        'topping': 'streusel',
        'crust': 'n/a',
        'origin': 'Great Britain'
    },
    'mississippi mud': {
        'type': 'pie',
        'taste': 'sweet',
        'filling': 'brownie cake, chocolate custard',
        'topping': 'whipped cream, chocolate sauce',
        'crust': 'crumbly chocolate',
        'origin': 'Mississippi, United States'
    },
    'buko': {
        'type': 'pie',
        'taste': 'sweet',
        'filling': 'young coconut custard',
        'topping': 'pastry',
        'crust': 'pastry',
        'origin': 'Luzon, Philippines'
    },
    'pastilla': {
        'type': 'pie',
        'taste': 'savory',
        'filling': 'meat, seafood',
        'topping': 'warka',
        'crust': 'warka',
        'origin': 'North Africa'
    },
    'bisteeya': {
        'type': 'pie',
        'taste': 'savory',
        'filling': 'meat, seafood',
        'topping': 'warka',
        'crust': 'warka',
        'origin': 'North Africa'
    },
    'zwetschgenkuchen': {
        'type': 'pie',
        'taste': 'sweet',
        'filling': 'plums',
        'topping': 'streusel',
        'crust': 'yeasted or shortcrust dough',
        'origin': 'Augsburg, Germany'
    },
    'spanakopita': {
        'type': 'pie',
        'taste': 'savory',
        'filling': 'spinach, feta',
        'topping': 'phyllo',
        'crust': 'phyllo',
        'origin': 'Greece'
    },
    'salteña': {
        'type': 'hand pie',
        'taste': 'savory',
        'filling': 'beef, pork, chicken',
        'topping': 'n/a',
        'crust': 'pastry',
        'origin': 'Bolivia'
    },
    'coulibiac': {
        'type': 'pie',
        'taste': 'savory',
        'filling': 'salmon or sturgeon, rice or buckwheat, hard-boiled eggs, mushrooms, onion, dill',
        'topping': 'brioche or puff pastry',
        'crust': 'brioche or puff pastry',
        'origin': 'Russia'
    },
    'bündner nusstorte': {
        'type': 'pie',
        'taste': 'sweet',
        'filling': 'caramelized walnuts',
        'topping': 'shortcrust pastry',
        'crust': 'shortcrust pastry',
        'origin': 'Switzerland'
    },
    'bundner nusstorte': {
        'type': 'pie',
        'taste': 'sweet',
        'filling': 'caramelized walnuts',
        'topping': 'shortcrust pastry',
        'crust': 'shortcrust pastry',
        'origin': 'Switzerland'
    },
    'cornish pasty': {
        'type': 'pie',
        'taste': 'savory',
        'filling': 'beef, potato, swede, onion',
        'topping': 'n/a',
        'crust': 'shortcrust pastry',
        'origin': 'Cornwall, England'
    },
    'pasty': {
        'type': 'pie',
        'taste': 'savory',
        'filling': 'beef, potato, swede, onion',
        'topping': 'n/a',
        'crust': 'shortcrust pastry',
        'origin': 'Cornwall, England'
    },
    'icebox': {
        'type': 'pie',
        'taste': 'sweet',
        'filling': 'various',
        'topping': 'various',
        'crust': 'crumb or pastry',
        'origin': 'Southern United States'
    },
    'tourtiere': {
        'type': 'pie',
        'taste': 'savory',
        'filling': 'pork, veal, beef, fish, wild game, potatoes',
        'topping': 'pastry',
        'crust': 'pastry',
        'origin': 'Quebec, Canada'
    },
    'tourtière': {
        'type': 'pie',
        'taste': 'savory',
        'filling': 'pork, veal, beef, fish, wild game, potatoes',
        'topping': 'pastry',
        'crust': 'pastry',
        'origin': 'Quebec, Canada'
    },
    'chicken and mushroom': {
        'type': 'pie',
        'taste': 'savory',
        'filling': 'chicken, mushrooms, cream sauce',
        'topping': 'pastry or puff pastry',
        'crust': 'pastry or puff pastry',
        'origin': 'Great Britain'
    },
    'cottage': {
        'type': 'pie',
        'taste': 'savory',
        'filling': 'minced beef',
        'topping': 'mashed potatoes',
        'crust': 'pastry',
        'origin': 'United Kingdom'
    },
    'steak and kidney': {
        'type': 'pie',
        'taste': 'savory',
        'filling': 'diced beef, diced kidney, onion, brown gravy',
        'topping': 'pastry',
        'crust': 'pastry',
        'origin': 'Britain'
    },
    'cheese and onion': {
        'type': 'pie',
        'taste': 'savory',
        'filling': 'cheese and onion mixture',
        'topping': 'n/a',
        'crust': 'pastry',
        'origin': 'Northern England'
    },
    'homity': {
        'type': 'pie',
        'taste': 'savory',
        'filling': 'potato, onion, leek mixture',
        'topping': 'cheese',
        'crust': 'pastry',
        'origin': 'Great Britain'
    },
    'aloo': {
        'type': 'hand pie',
        'taste': 'savory',
        'filling': 'spiced mashed potatoes, green peas',
        'topping': 'n/a',
        'crust': 'pastry',
        'origin': 'Trinidad and Tobago'
    },
    'apple crisp': {
        'type': 'pie',
        'taste': 'sweet',
        'filling': 'apples',
        'topping': 'streusel',
        'crust': 'pastry',
        'origin': 'United States'
    },
    'meat': {
        'type': 'hand pie',
        'taste': 'savory',
        'filling': 'minced meat, gravy',
        'topping': 'pastry',
        'crust': 'pastry',
        'origin': 'Australia, New Zealand'
    },
    'australian meat': {
        'type': 'hand pie',
        'taste': 'savory',
        'filling': 'minced meat, gravy',
        'topping': 'pastry',
        'crust': 'pastry',
        'origin': 'Australia, New Zealand'
    },
    'new zealand meat': {
        'type': 'hand pie',
        'taste': 'savory',
        'filling': 'minced meat, gravy',
        'topping': 'pastry',
        'crust': 'pastry',
        'origin': 'Australia, New Zealand'
    },
    'bacon and egg': {
        'type': 'pie',
        'taste': 'savory',
        'filling': 'bacon, eggs, peas',
        'topping': 'pastry',
        'crust': 'pastry or shortcrust pastry',
        'origin': 'Australia, New Zealand'
    },
    'bakewell tart': {
        'type': 'tart',
        'taste': 'sweet',
        'filling': 'jam, frangipane',
        'topping': 'flaked almonds',
        'crust': 'shortcrust pastry',
        'origin': 'Derbyshire, England'
    },
    'bay tat': {
        'type': 'pie or tart',
        'taste': 'sweet',
        'filling': 'coconut milk, pineapple jam, coconut jam',
        'topping': 'pastry',
        'crust': 'pastry',
        'origin': 'Benkulu, Indonesia'
    },
    'bavarian cream': {
        'type': 'pie',
        'taste': 'sweet',
        'filling': 'chocolate mixture',
        'topping': 'Bavarian cream',
        'crust': 'pastry',
        'origin': 'Bavaria'
    },
    'bean': {
        'type': 'pie',
        'taste': 'sweet',
        'filling': 'sweet custard, mashed beans, spices',
        'topping': 'n/a',
        'crust': 'pastry',
        'origin': 'United States'
    },
    'bedfordshire clanger': {
        'type': 'hand pie',
        'taste': 'sweet or savory',
        'filling': 'liver or meat, potatoes, onions, or fruit, jam',
        'topping': 'n/a',
        'crust': 'suet crust or pastry',
        'origin': 'Bedforshire, England'
    },
    'black bottom': {
        'type': 'pie',
        'taste': 'sweet',
        'filling': 'chocolate pastry cream or pudding',
        'topping': 'whipped cream or meringue',
        'crust': 'various',
        'origin': 'Southern United States'
    },
    'black bun': {
        'type': 'fruit cake',
        'taste': 'sweet',
        'filling': 'fruitcake',
        'topping': 'pastry',
        'crust': 'pastry',
        'origin': 'Scotland'
    },
    'bob andy': {
        'type': 'pie',
        'taste': 'sweet',
        'filling': 'custard',
        'topping': 'cinnamon, cloves',
        'crust': 'pastry',
        'origin': 'Amish community, United States'
    },
    'bougatsa': {
        'type': 'pastry',
        'taste': 'sweet or savory',
        'filling': 'semolina, custard, cheese, or minced meat',
        'topping': 'n/a',
        'crust': 'phyllo',
        'origin': 'Greece'
    },
    'boysenberry': {
        'type': 'pie',
        'taste': 'sweet',
        'filling': 'boysenberries',
        'topping': 'pastry',
        'crust': 'pastry',
        'origin': 'United States'
    },
    'Bridie': {
        'type': 'hand pie',
        'taste': 'savory',
        'filling': 'minced steak, butter, beef suet',
        'topping': 'n/a',
        'crust': 'shortcrust pastry or pastry',
        'origin': 'North Africa'
    },
    'bundevara': {
        'type': 'pie',
        'taste': 'sweet',
        'filling': 'pumpkin',
        'topping': 'phyllo',
        'crust': 'phyllo',
        'origin': 'Serbia'
    },
    'burek': {
        'type': 'pie',
        'taste': 'savory',
        'filling': 'cheese, meat, potatoes, veg',
        'topping': 'phyllo',
        'crust': 'phyllo',
        'origin': 'Anatolia, Turkey'
    },
    'borek': {
        'type': 'pie',
        'taste': 'savory',
        'filling': 'cheese, meat, potatoes, veg',
        'topping': 'phyllo',
        'crust': 'phyllo',
        'origin': 'Anatolia, Turkey'
    },
    'börek': {
        'type': 'pie',
        'taste': 'savory',
        'filling': 'cheese, meat, potatoes, veg',
        'topping': 'phyllo',
        'crust': 'phyllo',
        'origin': 'Anatolia, Turkey'
    },
    'butter': {
        'type': 'pie',
        'taste': 'savory',
        'filling': 'sliced potatoes, onion, butter',
        'topping': 'n/a',
        'crust': 'pastry',
        'origin': 'England'
    },
    'butter tart': {
        'type': 'tart',
        'taste': 'sweet',
        'filling': 'butter, sugar, eggs, walnuts, pecans, raisins',
        'topping': 'n/a',
        'crust': 'pastry',
        'origin': 'Canada'
    },
    'buttermilk': {
        'type': 'pie',
        'taste': 'sweet',
        'filling': 'buttermilk custard',
        'topping': 'n/a',
        'crust': 'pastry',
        'origin': 'United States'
    },
    'cantaloupe': {
        'type': 'pie',
        'taste': 'sweet',
        'filling': 'custard, cantaloupe, nutmeg',
        'topping': 'meringue',
        'crust': 'pastry',
        'origin': 'United States'
    },
    'caramel tart': {
        'type': 'tart',
        'taste': 'sweet',
        'filling': 'soft piped caramel',
        'topping': 'whipped cream or chocolate drizzle',
        'crust': 'shortcrust pastry or pastry',
        'origin': 'Australia'
    },
    'cashew': {
        'type': 'pie',
        'taste': 'sweet',
        'filling': 'cashews, sugar syrup',
        'topping': 'n/a',
        'crust': 'pastry',
        'origin': 'United States'
    },
    'cheese': {
        'type': 'pie',
        'taste': 'sweet',
        'filling': 'cream cheese',
        'topping': 'fruit',
        'crust': 'graham wafer',
        'origin': 'United States'
    },
    'chess': {
        'type': 'pie',
        'taste': 'sweet',
        'filling': 'custard',
        'topping': 'n/a',
        'crust': 'pastry',
        'origin': 'England'
    },
    'chestnut': {
        'type': 'pie',
        'taste': 'sweet or savory',
        'filling': 'chestnuts',
        'topping': 'n/a',
        'crust': 'biscuit dough',
        'origin': 'Italy'
    },
    'chinese': {
        'type': 'pie',
        'taste': 'savory',
        'filling': 'ground beef, onions, canned or creamed corn',
        'topping': 'mashed potatoes',
        'crust': 'n/a',
        'origin': 'Quebec, Canada'
    },
    'crack': {
        'type': 'pie',
        'taste': 'sweet',
        'filling': 'mixture of egg yolk, sugar, cream',
        'topping': 'confectioner\'s sugar',
        'crust': 'oat cookie',
        'origin': 'United States'
    },
    'cobbler': {
        'type': 'cobbler',
        'taste': 'sweet',
        'filling': 'fruit',
        'topping': 'batter, biscuit, or pastry',
        'crust': 'batter, biscuit, or pastry',
        'origin': 'United States, England'
    },
    'peach cobbler': {
        'type': 'cobbler',
        'taste': 'sweet',
        'filling': 'peaches',
        'topping': 'batter, biscuit, or pastry',
        'crust': 'batter, biscuit, or pastry',
        'origin': 'United States, England'
    },
    'cookie cake': {
        'type': 'pie',
        'taste': 'sweet',
        'filling': 'cookie dough, cake batter',
        'topping': 'frosting',
        'crust': 'pastry',
        'origin': 'United States'
    },
    'corned beef': {
        'type': 'pie',
        'taste': 'savory',
        'filling': 'corned beef, onion, veg',
        'topping': 'pastry',
        'crust': 'pastry',
        'origin': 'United Kingdom'
    },
    'sugar': {
        'type': 'pie',
        'taste': 'sweet',
        'filling': 'sugar and cream mixture',
        'topping': 'n/a',
        'crust': 'pastry',
        'origin': 'United States'
    },
    'sugar cream': {
        'type': 'pie',
        'taste': 'sweet',
        'filling': 'sugar and cream mixture',
        'topping': 'n/a',
        'crust': 'pastry',
        'origin': 'United States'
    },
    'hoosier': {
        'type': 'pie',
        'taste': 'sweet',
        'filling': 'sugar and cream mixture',
        'topping': 'n/a',
        'crust': 'pastry',
        'origin': 'United States'
    },
    'kapustnik': {
        'type': 'pie',
        'taste': 'savory',
        'filling': 'cabbage',
        'topping': 'pastry',
        'crust': 'pastry',
        'origin': 'Russia'
    },
    'plăcintă': {
        'type': 'pastry',
        'taste': 'sweet or savory',
        'filling': 'soft cheese or apples',
        'topping': 'pastry',
        'crust': 'pastry',
        'origin': 'Romania, Moldova, Ukraine'
    },
    'placinta': {
        'type': 'pastry',
        'taste': 'sweet or savory',
        'filling': 'soft cheese or apples',
        'topping': 'pastry',
        'crust': 'pastry',
        'origin': 'Romania, Moldova, Ukraine'
    },
    'pi': {
        'type': '3.1415926535897932384626433832795028841',
        'taste': '971693993751058209749445923078164062862',
        'filling': '089986280348253421170679821480865132823',
        'topping': '066470938446095505822317253594081284811',
        'crust': '174502841027019385211055596446229489549',
        'origin': '303819644288109756659334461284756482337'
    },
    '3.14': {
        'type': '3.1415926535897932384626433832795028841',
        'taste': '971693993751058209749445923078164062862',
        'filling': '089986280348253421170679821480865132823',
        'topping': '066470938446095505822317253594081284811',
        'crust': '174502841027019385211055596446229489549',
        'origin': '303819644288109756659334461284756482337'
    },
    'cumberland pie': {
        'type': 'pie',
        'taste': 'savory',
        'filling': 'minced meat, veg',
        'topping': 'mashed potatoes, bread crumbs',
        'crust': 'n/a',
        'origin': 'Cumbria, United Kingdom'
    },
    'curry': {
        'type': 'pie',
        'taste': 'savory',
        'filling': 'curry, meat, veg',
        'topping': 'pastry',
        'crust': 'pastry',
        'origin': 'United Kingdom'
    },
    'curry puff': {
        'type': 'hand pie',
        'taste': 'savory',
        'filling': 'curry, chicken, potatoes',
        'topping': 'n/a',
        'crust': 'pastry',
        'origin': 'Malaysia, Singapore, Thailand, Indonesia'
    },
    'custard tart': {
        'type': 'tart',
        'taste': 'sweet',
        'filling': 'egg custard',
        'topping': 'n/a',
        'crust': 'pastry',
        'origin': 'Portugal, United Kingdom, France'
    },
    'derby': {
        'type': 'pie',
        'taste': 'sweet',
        'filling': 'chocolate chips, walnuts, bourbon',
        'topping': 'walnuts',
        'crust': 'pastry',
        'origin': 'Kentucky, United States'
    },
    'egg': {
        'type': 'pie',
        'taste': 'sweet',
        'filling': 'egg custard',
        'topping': 'toasty top made from egg whites',
        'crust': 'pastry',
        'origin': 'Phillipines'
    },
    'flan': {
        'type': 'pie',
        'taste': 'sweet or savory',
        'filling': 'egg based mixture, various',
        'topping': 'n/a',
        'crust': 'pastry or sponge',
        'origin': 'Europe'
    },
    'flapper': {
        'type': 'pie',
        'taste': 'sweet',
        'filling': 'custard',
        'topping': 'meringue',
        'crust': 'graham cracker wafer',
        'origin': 'Western Canada'
    },
    'fleischkuekle ': {
        'type': 'hand pie',
        'taste': 'savory',
        'filling': 'meat',
        'topping': 'n/a',
        'crust': 'fried dough',
        'origin': 'Crimea'
    },
    'fleischkuechle': {
        'type': 'hand pie',
        'taste': 'savory',
        'filling': 'meat',
        'topping': 'n/a',
        'crust': 'fried dough',
        'origin': 'Crimea'
    },
    'flipper': {
        'type': 'pie',
        'taste': 'savory',
        'filling': 'harp seal flippers',
        'topping': 'pastry',
        'crust': 'pastry',
        'origin': 'Newfoundland, Labrador'
    },
    'fried': {
        'type': 'hand pie',
        'taste': 'sweet',
        'filling': 'fruit',
        'topping': 'n/a',
        'crust': 'pastry',
        'origin': 'United States'
    },
    'biganica': {
        'type': 'pastry',
        'taste': 'savory',
        'filling': 'white cheese, feta, sirene, eggs',
        'topping': 'phyllo',
        'crust': 'phyllo',
        'origin': 'The Balkans'
    },
    'green grape': {
        'type': 'pie',
        'taste': 'sweet',
        'filling': 'green grapes',
        'topping': 'pastry',
        'crust': 'pastry',
        'origin': 'United States'
    },
    'hornazo': {
        'type': 'pie',
        'taste': 'savory',
        'filling': 'pork loin, chorizo, hard-boiled eggs',
        'topping': 'yeasted dough',
        'crust': 'yeasted dough',
        'origin': 'Spain'
    },
    'indian potato': {
        'type': 'pie',
        'taste': 'savory',
        'filling': 'spiced potatoes, sweet potato',
        'topping': 'phyllo',
        'crust': 'phyllo',
        'origin': 'India'
    },
    'jamaican patty': {
        'type': 'hand pie',
        'taste': 'savory',
        'filling': 'ground beef',
        'topping': 'n/a',
        'crust': 'flakey pastry',
        'origin': 'Jamaica'
    },
    'jamaican beef patty': {
        'type': 'hand pie',
        'taste': 'savory',
        'filling': 'ground beef',
        'topping': 'n/a',
        'crust': 'flakey pastry',
        'origin': 'Jamaica'
    },
    'beef patty': {
        'type': 'hand pie',
        'taste': 'savory',
        'filling': 'ground beef',
        'topping': 'n/a',
        'crust': 'flakey pastry',
        'origin': 'Jamaica'
    },
    'unknown': {
        'type': '',
        'taste': '',
        'filling': '',
        'topping': '',
        'crust': '',
        'origin': ''
    }
}