export class Car{
    
    async post(url,data){
        const getresponse = await fetch(url,{
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify(data)
        });
        const res = await getresponse.json()
        return res
    }
    async delete(url,data){
            const deletePost = await fetch(url,{
                method: 'delete',
                headers: {'Content-Type' : 'application/json'},
                body : JSON.stringify(data)
            })
            const res = await deletePost.json()
            return res
       
    }

    printToBrowser(message,className){
        //create a div
      const div =  document.createElement("div");
      div.className =className
      div.appendChild(document.createTextNode(message))
      const body = document.querySelector('body')
      const form = document.querySelector('form')
      body.insertBefore(div,form)
    }
}

