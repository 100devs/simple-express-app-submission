document.querySelector('#clickMe').addEventListener('click', makeReq)

async function makeReq(){

  const res = await fetch(`/api`)
  const data = await res.json()

  console.log(data);

  //populates the textbox with info from the api via the server
  document.querySelector(".textbox").textContent = data.answer;

  //removes "before" class that will hide the 8ball logo
  
  document.querySelector(".window").classList.remove("before")
  
  //adds animation for the triangle 
  document.querySelector(".triangle").classList.add("flow")

  //adds animation for the text box
  document.querySelector(".textbox").classList.add("words")
 

  setTimeout(() => {
    document.querySelector(".window").classList.add("before")
    document.querySelector(".triangle").classList.remove("flow")
    document.querySelector(".textbox").classList.remove("words")
  }, 5500); 
    
}

