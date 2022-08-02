

const list = document.querySelector('#inventory')
// const updateAll = document.querySelector('#update-all')
const inventory=document.querySelectorAll(".partnumber");

let test
// =================================================
// EVENT LISTENERS


//add or substract amount from stock buttons
list.addEventListener('click', (event)=>{
    changeInventory(event)

})




//event listener for update button
// updateAll.addEventListener('click',(event)=>{
    
//     //get all inventory
//     const inventory=document.querySelectorAll(".partnumber");
//         // console.log(inventory);


//     //what items where changed and need update
//     const itemsNeedUpdate = itemsChanged(inventory);

//     updateAllItems(itemsNeedUpdate);
// })




// ============================================================
// FUNCTIONS
// =============================================================

// update all items
// =================================
async function updateAllItems(list_){
    
   const updatePromises =  list_.map(async (element) => {
        // let responseArr=[]
        const part = `${element.querySelector('.part_id').innerText}`
        const model = element.querySelector('.model_id').innerText
        const quantity = +element.querySelector('.quantity input').value

        //do fetch update for all
        console.log(`fetch`)
        console.log(` ${part}:: ${model}:: ${quantity} `)
    
       const updateObj=makeEntryObj(element)

       //update entry at api
       updateSingle(updateObj)
    });

    //
    let results  = await Promise.allSettled(updatePromises)
    
    location.reload();//good
}




//update single entry at api
// ======================================================
async function updateSingle(obj_){
  
    console.log(`updating single`)
    console.log(obj_)

    try{
        let response = await fetch('/inventory',{
            method: 'put',
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify(obj_)
        })

    }
    catch(error){
        console.error(error)
    }
    
}



// return object from .partnumber html element
function makeEntryObj(htmlElement_){
    let part = `part-number`;
    let model = `model-number`;
    let quantity = 0;
    let engineManufacturer =`engine-manufacturer`;

     part = `${htmlElement_.querySelector('.part_id span').innerText}`;
     model = htmlElement_.querySelector('.model_id span').innerText;
     quantity = htmlElement_.querySelector('.quantity input').value;
     engineManufacturer = htmlElement_.querySelector('.engine_man')?.innerText ?? engineManufacturer; //if .engine_man exists then get innertext property


    obj = {
        partnumber: part,
        model: model,
        instock: quantity,
        engineMake: engineManufacturer
    }
    return obj
}



// what items had there quantities changed?
// =========================================================
function itemsChanged(htmlNodeList_){
    let newList=[];
    let checklist= htmlNodeList_


    //filter html nodes list that have not been changed
    checklist.forEach((e)=>{
        let instock = Number(e.querySelector('.instock span').innerText) ? Number(e.querySelector('.instock span').innerText) : 0 ;
        let updateInstock =  Number(e.querySelector('.quantity input').value) ? Number(e.querySelector('.quantity input').value) : 0 ;

        console.log(` ${updateInstock} ::: ${instock}  `)

        if( instock != updateInstock ){
            newList.push(e)
            // console.log(`${e.querySelector('.quantity').value} ::: ${e.querySelector('.instock').innerText}  `)
        }
    })
    console.log(newList);
    //return new list with items needing update at database
   return newList;
}





//event listener function for all buttons inside a partnumber listing
// ===================================================================
function changeInventory(event_){
    const target = event_.target
        // console.log(event_.target)

        // get parent element of the item clicked on
    const item = event_.target.closest('.partnumber')
       

        //quantity of stock
    const quantity = item.querySelector("input[type=number]")

        //partnumber to use later to search database
    const part_id = String(item.querySelector('.part_id').innerText)

        //model description
    // const model_id = item.querySelector('.model_id').innerText

    const  updatedObj = makeEntryObj(item)


    //  switch (target.id) {
    switch (target.dataset.button) {

            //reduce button
        case 'reduce-button':
                // console.log(`its reduce button`)
                // console.dir(quantity)

                quantity.classList.add('changed')

                if(quantity.value<=0){
                    quantity.value=0
                }else{
                    quantity.value= +quantity.value - 1
                    // console.log( `quantity ${quantity.value}`)
                }
                break;


            //add button
        case 'add-button':
                // console.log(`its reduce button`)
                // console.log( `quantity ${quantity.value}`)
                
                quantity.classList.add('changed')

                quantity.value= +quantity.value + 1
                console.log( `quantity ${quantity.value}`)
                break;


            //update button local to entry
        case 'update-button':
            console.log(`its update button`)
           

            //get all inventory
            const inventory=document.querySelectorAll(".partnumber");
            // console.log(inventory);


            //what items where changed and need update
            const itemsNeedUpdate = itemsChanged(inventory);
            updateAllItems(itemsNeedUpdate)
           //was item changed 
            // const didItChange = itemsChanged([item]) //takes an array and returns array of any items that changed
            
            //if array returned something then update the items in array
            // didItChange.length > 0 ? updateSingle(updatedObj) : console.log('nothing to update')

            setTimeout(() => {
                console.log(`timeout over`)
                location.reload()
            }, 500);
           
            break;


            // delete button
        case 'delete-button':
            console.log(`its delete button`)
            deletePart(updatedObj)
            
            break;
         
        default:
            console.log(`nothing wanted clicked`)
            console.dir(updatedObj)
            break;
     }
}




async function deletePart(obj_){
    let responseArr=[]

    let response = await fetch('/inventory',{
        method: 'delete',
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify(obj_)
    })

    console.log(response);
    location.reload()

}









// let databasebackup = [
//     {
//       _id: new ObjectId("62a154031f1148ad397e86de"),
//       partnumber: '3618046',
//       model: 'Celect',
//       instock: '10'
//     },
//     {
//       _id: new ObjectId("62a154031f1148ad397e86e1"),
//       partnumber: '3408303',
//       model: 'Celect Plus',
//       instock: 7
//     },
//     {
//       _id: new ObjectId("62a154031f1148ad397e86e2"),
//       partnumber: '3408300',
//       model: 'Celect Plus',
//       instock: 7
//     },
//     {
//       _id: new ObjectId("62a154031f1148ad397e86e3"),
//       partnumber: '3096662',
//       model: 'Celect Plus',
//       instock: '6'
//     },
//     {
//       _id: new ObjectId("62a154031f1148ad397e86e4"),
//       partnumber: '3944105',
//       model: 'ISC',
//       instock: 0
//     },
//     {
//       _id: new ObjectId("62a154031f1148ad397e86df"),
//       partnumber: '3619037',
//       model: 'Celect',
//       instock: 5
//     },
//     {
//       _id: new ObjectId("62a154031f1148ad397e86e7"),
//       partnumber: 3945868,
//       model: 'ISB',
//       instock: 0
//     },
//     {
//       _id: new ObjectId("62a154031f1148ad397e86e0"),
//       partnumber: '3614473',
//       model: 'Celect',
//       instock: 0
//     },
//     {
//       _id: new ObjectId("62a154031f1148ad397e86e8"),
//       partnumber: 3990517,
//       model: 'ISB',
//       instock: 0
//     },
//     {
//       _id: new ObjectId("62a154031f1148ad397e86e9"),
//       partnumber: 3942858,
//       model: 'ISB',
//       instock: 0
//     },
//     {
//       _id: new ObjectId("62a154031f1148ad397e86ea"),
//       partnumber: 3942335,
//       model: 'ISB',
//       instock: 0
//     },
//     {
//       _id: new ObjectId("62a154031f1148ad397e86eb"),
//       partnumber: 3492860,
//       model: 'ISB',
//       instock: 0
//     },
//     {
//       _id: new ObjectId("62a154031f1148ad397e86ec"),
//       partnumber: 3682729,
//       model: 'ISX EGR',
//       instock: 0
//     },
//     {
//       _id: new ObjectId("62a154031f1148ad397e86ed"),
//       partnumber: 3683289,
//       model: 'ISX EGR',
//       instock: 0
//     },
//     {
//       _id: new ObjectId("62a154031f1148ad397e86ee"),
//       partnumber: 3684009,
//       model: 'ISX EGR',
//       instock: 0
//     },
//     {
//       _id: new ObjectId("62a154031f1148ad397e86ef"),
//       partnumber: 3684275,
//       model: 'ISX EGR',
//       instock: 0
//     },
//     {
//       _id: new ObjectId("62a154031f1148ad397e86f0"),
//       partnumber: 4921776,
//       model: 'ISX',
//       instock: 0
//     },
//     {
//       _id: new ObjectId("62a154031f1148ad397e86f1"),
//       partnumber: 3681404,
//       model: 'ISX/ISM',
//       instock: 0
//     },
//     {
//       _id: new ObjectId("62a154031f1148ad397e86f2"),
//       partnumber: 3681405,
//       model: 'ISX/ISM',
//       instock: 0
//     },
//     {
//       _id: new ObjectId("62a154031f1148ad397e86f3"),
//       partnumber: 3408501,
//       model: 'ISX/ISM',
//       instock: 0
//     },
//     {
//       _id: new ObjectId("62a154031f1148ad397e86f5"),
//       partnumber: 3408426,
//       model: 'ISX NON EGR',
//       instock: 1
//     },
//     {
//       _id: new ObjectId("62a154031f1148ad397e86e5"),
//       partnumber: '3944125',
//       model: 'ISC',
//       instock: 0
//     },
//     {
//       _id: new ObjectId("62a154031f1148ad397e86e6"),
//       partnumber: 3944124,
//       model: 'ISB',
//       instock: 0
//     },
//     {
//       _id: new ObjectId("62a154031f1148ad397e86f6"),
//       partnumber: 3103533,
//       model: 'ISX NON EGR',
//       instock: 0
//     },
//     {
//       _id: new ObjectId("62a154031f1148ad397e86f4"),
//       partnumber: 3680509,
//       model: 'ISX NON EGR',
//       instock: 0
//     }
// ]