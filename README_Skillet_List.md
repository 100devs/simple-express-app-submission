# <a href="https://skilletlist.herokuapp.com/"><img src="https://github.com/celiackelly/skillet-list/blob/0d05a3f3875d38201a577039ed39600ddae4ca3f/public/img/skillet-icon.png" height="60px" alt="Logo- s skillet with eggs, tomatoes, and spinach">Skillet List</a> 

**Skillet List** is a tool for creative cooks who love trying new recipes.  
 - Add recipes to your Skillet List, tag them by meal, and link to the recipe source. 
 - Come back often for inspiration as you plan your meals. What will you cross off your Skillet List this week? 
 - Once you've cooked a recipe, cross it off your Skillet List and save it in your Recipe Box. 

<img src="https://github.com/celiackelly/skillet-list/blob/564a2e280ad18bc6ee301878c5b6432941e31a7b/public/img/screenshot.png" width="800px">
  
  
## How It's Made:
Skillet List is a full-stack application built with **Node.js, Express, MongoDB**. 

It uses **EJS (Embedded JavaScript)** as its view engine, as well as the **Bootstrap** framework for styling. 


## Lessons Learned:
Originally, to create the buttons for each dish in the Skillet List, I queried all the buttons of each type (mark as cooked, edit, and delete) and added separate event listeners to each of them, which is not optimal for performance. To solve this problem, I used event delegation and object-oriented programming. I created a class `DishLiBtnGroup` with methods for each action. Then I added `data-action` attributes to the buttons with the method to call on click. This way, I can have one event handler per button group, rather than one for each button. 

Within the buttons' callback functions (`delete()`, `markCooked()`, `populateEditModal()`), I was also using the line `const dishID = this.parentNode.id` to get the unique id of the dish to pass to the server; this approach caused problems when I later needed to change the HTML structure. To address this issue, I refactored the line to `const dishID = e.target.closest('li').id`. This approach allows me more freedom to change the markup. 


## Optimizations: 
- [ ] I believe I can take the lessons learned above to further simplify the event listeners for the button groups. I can refactor this code to have one event listener for the entire Skillet List `<ul>`, which listens for any button clicks on any of the button groups inside it. If the target of the click is not a button, the function will immediately return. This refactoring will make the code even more efficient. 
 
 
## Next Steps:
- [ ] Implement login functionality.
- [ ] Add additional url validation to ensure that users can input recipe links without the http or https scheme (e.g. www.foodnetwork.com) and have them work as expected.
- [ ] Change background colors of meal badges to differentiate them easily. 
- [ ] Add recipe rating and notes features. 
