$('#add_user').submit(function(event){
    alert("Data added successfully")
})

$("#update_user").submit(function(event){
    event.preventDefault()

    var unindexed_array = $(this).serializeArray()
    var data = {}

    $.map(unindexed_array,function(n,i){
        data[n['name']]=n['value']
    })

    console.log(data)

    var request ={
        "url":`https://powerful-plains-75111.herokuapp.com/api/users/${data.id}`,
        "method":"PUT",
        "data":data
    }

    $.ajax(request).done(function(response){
        alert("Data updated successfully!")
        location.reload
    })
})

if (window.location.pathname=='/'){
    $ondelete=$(".table tbody td a.delete")
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request ={
            "url":`https://powerful-plains-75111.herokuapp.com/api/users/${id}`,
            "method":"DELETE",
            
        }

        if(confirm("Are you sure you want to dee-lee-tay this record?")){
            $.ajax(request).done(function(response){
                alert("Data dee-lee-tayed successfully!")
                location.reload()
            })
        }
    })
}