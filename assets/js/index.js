$("#add_item").submit(function(event){
    alert("Item Added!")
})




if(window.location.pathname=="/"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id");
 
        var request = {
            "url" : `/api/item/${id}`,
            "method": "DELETE"
        }

        if(confirm("Do you really want to delete this item?")){
            $.ajax(request).done(function(response){
                alert("Item deleted.");
                location.reload()
            })
        }
    })
}

const checkboxes = document.getElementsByClassName('gotIt')

for(i=0; i< checkboxes.length; i++){
    checkboxes[i].addEventListener('click', function(){
       let id = $(this).attr("data-id");

       var data = {}

       if(this.checked){
            data["gotIt"] = "yes"
       }else{
            data["gotIt"] = "no"
       }
    
       var request = {
        "url" : `/api/item/${id}`,
        "method": "POST",
        "data" : data
       }

       $.ajax(request).done(function(response){
        console.log(response)
       })
    })
}








