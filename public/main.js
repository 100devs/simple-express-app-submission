const deleteSpam = document.querySelectorAll(".spam");

Array.from(deleteSpam).forEach(btn => {
    btn.addEventListener("click", deleteHack);
});

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
        //TODO this isn't working, why....
        window.location.reload;
    } catch(err) {
        console.error(err);
    } 
}


// TODO check for blank on updates
// TODO check for duplicates