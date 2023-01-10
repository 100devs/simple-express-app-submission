const deleteBtn = document.querySelectorAll(".fa-trash");
const show = document.querySelectorAll(".show span");
const showCompleted = document.querySelectorAll(".show span.completed");

Array.from(deleteBtn).forEach(element => {
    element.addEventListener("click", deleteShow);
});

Array.from(show).forEach(element => {
    element.addEventListener("click", markComplete);
});

Array.from(showCompleted).forEach(element => {
    element.addEventListener("click", markIncomplete);
});

async function deleteShow() {
    const showText = this.parentNode.childNodes[1].innerText;
    try {
        const response = await fetch("deleteShow", {
            method: "delete",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                "itemFromJS": showText
            })
        })

        const data = await response.json();
        console.log(data);
        location.reload();
    } catch(error) {
        console.log(`Error: ${error}`);
    }
}

async function markComplete() {
    const showText = this.parentNode.childNodes[1].innerText;
    try {
        const response = await fetch("markComplete", {
            method: "put",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                "itemFromJS": showText
            })
        })

        const data = await response.json();
        console.log(data);
        location.reload();
    } catch(error) {
        console.log(`Error: ${error}`);
    }
}

async function markIncomplete() {
    const showText = this.parentNode.childNodes[1].innerText;
    try {
        const response = await fetch("markIncomplete", {
            method: "put",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "itemFromJS": showText
            })
        })

        const data = await response.json();
        console.log(data);
        location.reload();
    } catch(error) {
        console.log(`Error: ${error}`);
    }
}