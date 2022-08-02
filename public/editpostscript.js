const SERVER_PORT = 5500;
const SERVER_HOST = "localhost";
const SERVER_PROTOCOL = "http";
const DEBUG = true;

window.addEventListener('DOMContentLoaded', () => {
    const editform = document.getElementById("editpost_form01");
    console.log("PostID: " + editform.dataset.postid);
    editform.addEventListener('submit', editpostformhandler);
})

function editpostformhandler(e) {
    e.preventDefault();
    const PostID = e.target.dataset.postid;
    const newTitle = document.querySelector("input[name='title_edit']")?.value;
    const newSubtitle = document.querySelector("input[name='subtitle_edit'")?.value;
    const newMainbody = document.querySelector("textarea[name='mainbody_edit'")?.value;
    const newConclusion = document.querySelector("input[name='conclusion_edit'")?.value;
    console.log("Post ID: " + PostID);
    const data = {
        title: newTitle,
        subtitle: newSubtitle,
        mainbody: newMainbody,
        conclusion: newConclusion
    };
    console.log("Data to be sent: ");
    console.log(data);
    fetch(`${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/editpost/${PostID}`,
    {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)  
     }).then(response => {
        if(!response.ok) {
            if(response.status === 500) {
                throw "Internal Server Error";
            }
        }
        // our server is programmed to redirect you to the new edited post.
        if(response.redirected) {
            window.location.href = response.url;
        }
     })
     .catch(err => {
        alert("Error: " + err);
     });
}