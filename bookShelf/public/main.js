var homeEvent = document.querySelector('#home');
var manageEvent = document.querySelector('#manage');
var updateBttn = document.querySelector("#update-button");
var deleteBttn = document.querySelectorAll(".delete-button");
homeEvent === null || homeEvent === void 0 ? void 0 : homeEvent.addEventListener('click', function () {
    fetch("/").then(function (res) {
        if (res.ok)
            return res.json();
    }).then(function (_) {
        window.location.reload();
    });
});
manageEvent === null || manageEvent === void 0 ? void 0 : manageEvent.addEventListener('click', function () {
    fetch("/manage", {
        method: "get",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ manage: true })
    }).then(function (res) {
        if (res.ok)
            return res.json();
    }).then(function (_) {
        window.location.reload();
    });
});
/* Loads a button with an event that will pass any used form filled
 * to server.js as updateObj
*/
updateBttn === null || updateBttn === void 0 ? void 0 : updateBttn.addEventListener("click", function () {
    var keysNeeded = ["title", "author", "rating", "pages", "desc", "tropes"];
    var updateObj = {};
    for (var i = 0; i < keysNeeded.length; i++) {
        // @ts-ignore
        if (document.getElementById("".concat(keysNeeded[i], "-form")).value != "") {
            // @ts-ignore
            updateObj[keysNeeded[i]] = document.getElementById("".concat(keysNeeded[i], "-form")
            //@ts-ignore
            ).value;
        }
    }
    fetch("/book-input-list", {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateObj)
    })
        .then(function (res) {
        if (res.ok)
            return res.json();
    })
        .then(function (_) {
        window.location.reload();
    });
});
// iterate through any cards rendered and attatch event
for (var i = 0; i < deleteBttn.length; i++) {
    console.log("in loop");
    deleteBttn[i].addEventListener("click", function (event) {
        fetch("/book-input-remove", {
            method: "delete",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: event.target.value
            })
        })
            .then(function (res) {
            if (res.ok)
                return res.json();
        })
            .then(function (_) {
            window.location.reload();
        })["catch"](function (error) { return console.error(error); });
    });
}
