const toggleTodo = document.getElementById('todo-selection')
const toggleGrocery = document.getElementById('grocery-selection')
const groceryList = document.getElementById('grocery-list')
const todoList = document.getElementById('todo-list')
const category = document.getElementById('category')
const groceryCategory = document.getElementById('gc')
const deadline = document.getElementById('deadline')
const deleteText = document.querySelectorAll('.fa-trash')

toggleTodo.addEventListener('click', selectTodo)
toggleGrocery.addEventListener('click', selectGrocery)
Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteTask)
})

function selectTodo() {
    localStorage.setItem('selected-list', 'todo')
    groceryList.style.display = 'none'
    groceryCategory.style.display = 'none'
    todoList.style.display = 'grid'
    deadline.style.display = 'block'
    category.value = 'todo'
}
// load with Todo selected
if (localStorage.getItem('selected-list') === null) {
    selectTodo();
}

if (localStorage.getItem('selected-list') === 'todo') {
    groceryList.style.display = 'none'
    groceryCategory.style.display = 'none'
    todoList.style.display = 'grid'
    deadline.style.display = 'block'
    category.value = 'todo'
}

function selectGrocery() {
    localStorage.setItem('selected-list', 'grocery')
    groceryList.style.display = 'grid'
    groceryCategory.style.display = 'block'
    todoList.style.display = 'none'
    deadline.style.display = 'none'
    category.value = 'grocery'
}
if (localStorage.getItem('selected-list') === 'grocery') {
    groceryList.style.display = 'grid'
    groceryCategory.style.display = 'block'
    todoList.style.display = 'none'
    deadline.style.display = 'none'
    category.value = 'grocery'
}

async function deleteTask(){
    const ids = this.parentNode.id;
    const filtered = JSON.parse(localStorage.getItem('store')).filter(ele => ele.element !== ids)
    localStorage.setItem('store', JSON.stringify(filtered))
    // const tBody = this.parentNode.childNodes[3].innerText
    try{
        // 
        const response = await fetch('deleteTask', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'elementids': ids,
                // 'taskBodyS': tBody
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

// Dragula

// function init() {
//     dragula([document.querySelector('#dragUncategorized'), document.querySelector('#dragProduce'), document.querySelector('#dragFrozen'), document.querySelector('#dragBakery'), document.querySelector('#dragOther')]);
// }

var dragAndDrop = {

    store: [],
    
    init: function () {  
    
    	self = this;
        this.dragula();
        this.eventListeners(); 
        
        if(localStorage.getItem('store'))
            this.store = JSON.parse(localStorage.getItem('store'));
          
        // querySelectorAll returns a nodelist and should be converted to array to use filter, map and foreach  
        var nodesArray = Array.prototype.slice.call(document.querySelectorAll("#dragUncategorized li"));      
        
        var nodesArray = nodesArray.filter( e => { 
            return self.store.map(d => { return d['element']; }).indexOf(e.id) === -1; 
        }).forEach( e => { 
        	self.store.push({'element':e.id, 'container': 'dragUncategorized'}); 
        });  
        
        this.store.forEach( obj => {
        		document.getElementById(obj.container).appendChild(document.getElementById(obj.element));                        
        });
    },

    eventListeners: function () {
        this.dragula.on('drop', this.dropped.bind(this));
    },

    dragula: function () {
        this.dragula = dragula([document.getElementById('dragUncategorized'), document.getElementById('dragProduce'), document.getElementById('dragFrozen'), document.getElementById('dragBakery'), document.getElementById('dragOther')],
        // this.dragula = dragula([document.getElementById('left'), document.getElementById('right')],
        {           
            copy: false,
        });
    },   
   
    
    dropped: function (el, target, source, sibling) {
    		// Remove element from store if it exists
    		var indexEl = this.store.map( d => { return d['element']; }).indexOf(el.id);
        if (indexEl>-1)
    			this.store.splice(indexEl, 1);         
        
        var indexDrop = this.store.length;
        if(sibling) { // If sibling store before sibling          	
            indexDrop = this.store.map( d => { return d['element']; }).indexOf(sibling.id);     
        }
       
        this.store.splice(indexDrop, 0, {'element': el.id, 'container': target.id}); 
        
        localStorage.setItem('store', JSON.stringify(this.store));
    }
}

// dragAndDrop.init();