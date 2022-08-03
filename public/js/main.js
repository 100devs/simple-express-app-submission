const update = document.querySelector('#update-button')
const next = document.querySelector('#nesteOrdtak')

update.addEventListener('click', _ => {
    fetch('/ordtak', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        
      })
    })
  })

  next.addEventListener ('click', _ =>{
    fetch('/', {
      method:'get',
      headers:{'Content-Type': 'application/json' },
      body:JSON.stringify({
        
      })
   
      
    })
  })

  function refreshPage(){
    window.location.reload();
    } 
    
    function toggleCssMenu(icon) {
        var cssmenu = document.getElementById('cssmenu');
        if (icon.className.indexOf('active') == -1) {
            icon.className = 'menu-icon active';
            cssmenu.style.display = "block";
            setTimeout(function(){cssmenu.className = 'active';},0);            
        }
        else {
            icon.className = 'menu-icon';
            cssmenu.className = '';
            setTimeout(function(){cssmenu.style.display = "none";},411); 
        }
    }


