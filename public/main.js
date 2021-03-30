const deleteButtons = Array.from(document.querySelectorAll(".delete"))

deleteButtons.forEach(button => {
    button.addEventListener("click", deleteOnServer)
})

async function deleteOnServer(){
    console.log(this.parentElement.childNodes[1].innerText, this.parentElement.childNodes[3].innerText)
    const quoteAuthor = this.parentElement.childNodes[1].innerText;
    const quoteBody = this.parentElement.childNodes[3].innerText;
    try{
        const response = await fetch("deleteQuote", {
            method: "delete",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                authorName: quoteAuthor,
                quoteBody : quoteBody
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }
    catch(err){
        console.log(err)
    }
}