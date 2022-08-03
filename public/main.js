const deleteSpam = document.querySelectorAll(".spam");
const helpBtns = document.querySelectorAll(".help")

Array.from(deleteSpam).forEach(btn => {
    btn.addEventListener("click", deleteHack);
});

Array.from(helpBtns).forEach(btn => {
    btn.addEventListener("click", incHelpCount)
})

async function deleteHack() {
    console.log("deleting spam...");
    //1. get item text to find the hack
    const hText = this.parentNode.childNodes[1].innerText;
    // console.log(hText);

    //2.fetch for deleting the item
    try {
        const res = await fetch("delete-hack", {
            method: "delete", 
            headers: {"Content-type": "application/json"}, 
            body: JSON.stringify({
                "text": hText
            })
        });
        const data = await res.json();
        console.log(data);
 
        // 3. reload the page
        window.location.reload();
    } catch(err) {
        console.error(err);
    } 
}

async function incHelpCount() {
    console.log("increasing help count");
    const hText = this.parentNode.childNodes[1].innerText;
    const hCount = this.parentNode.childNodes[3].innerText;
    console.log(hCount);

    try {
        const res = await fetch("helped-me", {
            method: "put", 
            headers: {"Content-type": "application/json"}, 
            body: JSON.stringify({ "text": hText})
        });
        const data = await res.json();
        console.log(data);
        
        window.location.reload();
    } catch(err) {
        console.error(err);
    }
}


// Improvements:
// TODO check for blank on updates
// TODO check for duplicates