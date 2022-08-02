console.log("hello world");

const SERVER_PORT = 5500;
const SERVER_HOST = "localhost";
const SERVER_PROTOCOL = "http";
const DEBUG = true;

window.addEventListener('DOMContentLoaded', (e) => {
    document.getElementById('newcomment_form').addEventListener('submit', newcommentformhandler);
    const LikeButtons = Array.from(document.querySelectorAll('.likebutton'))
    // add like button handler to every comment rendered.
    LikeButtons.forEach((likebutton) => {
        likebutton.addEventListener('click', addlikehandler);
    })
    const DislikeButtons = Array.from(document.querySelectorAll('.dislikebutton'));
    // add dislike button handler to every comment rendered.
    DislikeButtons.forEach((dislikebutton) => {
        dislikebutton.addEventListener('click', adddislikehandler);
    })
})

// on form submit, do stuff.
function newcommentformhandler(e) {
    // prevent page from reloading.
    e.preventDefault();
    // grab post ID that's attached to post you're commenting on
    const OriginPostId = document.getElementById('newcomment_form')?.dataset.postid;
    // grab comment contents. Validate it. 
    const InnerText = document.querySelector('#newcomment_form textarea.newcomment')?.value;
    if(!inputvalidator(InnerText)) {
        alert('Comment cannot be empty');
        return;    
    }
    // grab author.
    const Author = document.querySelector('#newcomment_form input[type=text].newcomment_nameinput')?.value;
    if(!inputvalidator(Author)) {
        alert('Name cannot be empty');
        return;
    }
    // grab email.
    const Email = document.querySelector('#newcomment_form input[type=text].newcomment_emailinput')?.value;
    if(!inputvalidator(Author)) {
        alert('Email cannot be empty');
        return;
    }
    // grab website. this is optional. 
    const Website = document.querySelector('#newcomment_form input[type=text].newcomment_websiteinput').value;
    if(!optionalinputvalidator(Website)) {
        alert('Invalid website.')
        return;
    }
    // all new comments start with zero likes, dislikes, and replies.
    const Likes = 0;
    const Dislikes = 0;
    const RepliesCount = 0;
    // wrap it all up in an object.
    const data = {
        OriginPostId: OriginPostId,
        InnerText: InnerText,
        Author: Author,
        Email: Email,
        Website: Website,
        Likes: Likes,
        Dislikes: Dislikes,
        RepliesCount: RepliesCount,
        Username: Author
    }
    console.log("Data input: ");
    console.log(data);
    fetch(`${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)    
    }).then(response => {
        console.log(response);
        if(!response.ok)
        {
            if(response.status === 400) {
                throw "Comment too long"
            }
            if(response.status === 500) {
                throw "Internal Server error";
            }
        }
        return response.text();
    }).then(returndata => {
        console.log(returndata);
        addnewcommenttoDOM(data, Number.parseInt(returndata));
    }).catch((err) => {
        alert(`Error: ${err}`);
    })
}

function addnewcommenttoDOM(comment, CommentID) {
    let newdata = comment;
    newdata.CommentID = CommentID;
    // render comment HTML from comment.js.
    fetch(`${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/ejs/partials/comment.ejs`)
        .then(res => res.text())
        .then(template => {
            let HTML = ejs.render(template, newdata);
            let newCommentDiv = document.createElement('div');
            newCommentDiv.innerHTML = HTML;
            document.querySelector('.comment__grid').appendChild(newCommentDiv);
            // add like button handler to new comment
            newCommentDiv.querySelector('.likebutton').addEventListener('click', addlikehandler)
        })
        .catch((err) => {
            alert(`Error: ${err}`)
            console.log(newdata);
            console.error(err);
        });
    /*
    SAMPLE COMMENT: 
    <div class="comment" data-commentid=<%= CommentID %>>
    <p class="comment__innertext">
        <%= InnerText %>
    </p>
    <p class="comment__author">Left by <span id="author_id<%= CommentID %>"> <%=  Author %></span></p>
    
    <div class="likes__and__dislikes">
        <div class="likebutton">&#128077;<p class="comment__likes"><span id="likes_id0001"><%= Likes %></span></p></div>
        <div class="dislikebutton">	&#128078;<p class="comment__dislikes"><span id="dislikes_id0001"><%= Dislikes %></span></p></div>
    </div>
    
    </div>
    */
}
function inputvalidator(input) {
    if(input === '' || input === null ) {
        return false
    }
    return true;
}
function optionalinputvalidator(input) {
    return true;
}

function addlikehandler(e) {
    const ldiv = e.target;
    if(DEBUG) {

        console.log("Event: ");
        console.log(e);
        console.log("Target div: ");
        console.log(ldiv);
        console.log("Type of target using 'typeof': ");
        console.log(typeof ldiv);
        console.log("Tag name of target:");
        console.log(ldiv.tagName);
    }
    let commentid;
    // find comment ID
    // comment ID is in paragraph tag.
    if(ldiv.tagName === 'DIV' && ldiv.classList.contains('likebutton')) {
        console.log('User clicked on div');
        commentid = ldiv.children[0].dataset.commentid;
        console.log("Type of comment ID found: " + typeof commentid);
    } else if(ldiv.tagName === 'SPAN') {
        commentid = ldiv.parentNode.dataset.commentid;
    } else if(ldiv.tagName === 'P' && ldiv.classList.contains('comment__likes')) {
        commentid = ldiv.dataset.commentid;
    }
    // Next, increase like count in DOM

    // find span containing the number of likes.
    const spanid = "likes_id" + commentid;
    const lcountspan = document.getElementById(spanid);
    if(DEBUG) {
        console.log("Span ID searching for: " + spanid);
        console.log("Div found: ");
        console.log(lcountspan);
    }
    let likes = Number(lcountspan.innerText);
    likes+= 1;
    lcountspan.innerText = String(likes);
    fetch(`${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/comments/addlike/${commentid}`,
    {
        method: 'PUT',
        headers: {
            'Content-Type': 'text'
        }
    }).then(response => {
        if(!response.ok)
        {
            console.log('');
        }
        return response.json()
    })
    .then(data => {
        if(data.status === 'good') {
            if(DEBUG) {
                console.log(`Successfully liked comment #${commentid}`);
            }
        }
    }).catch(err => {
        alert("Error handling like. Check the console for details.")
        console.error("Error: " + err);
    })
}

function adddislikehandler(e)
{
    const rdiv = e.target;
    if(DEBUG) {

        console.log("Event: ");
        console.log(e);
        console.log("Target div: ");
        console.log(rdiv);
        console.log("Type of target using 'typeof': ");
        console.log(typeof rdiv);
        console.log("Tag name of target:");
        console.log(rdiv.tagName);
    }
    let commentid;
    // find comment ID
    // comment ID is in paragraph tag.
    if(rdiv.tagName === 'DIV' && rdiv.classList.contains('dislikebutton')) {
        console.log('User clicked on div');
        commentid = rdiv.children[0].dataset.commentid;
        console.log("Type of comment ID found: " + typeof commentid);
    } else if(rdiv.tagName === 'SPAN') {
        commentid = rdiv.parentNode.dataset.commentid;
    } else if(rdiv.tagName === 'P' && rdiv.classList.contains('comment__dislikes')) {
        commentid = rdiv.dataset.commentid;
    }
    // Next, increase like count in DOM

    // find span containing the number of likes.
    const spanid = "dislikes_id" + commentid;
    const rcountspan = document.getElementById(spanid);
    if(DEBUG) {
        console.log("Span ID searching for: " + spanid);
        console.log("Div found: ");
        console.log(rcountspan);
    }
    let likes = Number(rcountspan.innerText);
    likes+= 1;
    rcountspan.innerText = String(likes);
    fetch(`${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/comments/adddislike/${commentid}`,
    {
        method: 'PUT',
        headers: {
            'Content-Type': 'text'
        }
    }).then(response => {
        if(!response.ok)
        {
            console.log('');
        }
        return response.json()
    })
    .then(data => {
        if(data.status === 'good') {
            if(DEBUG) {
                console.log(`Successfully disliked comment #${commentid}`);
            }
        }
    }).catch(err => {
        alert("Error handling dislike. Check the console for details.")
        console.error("Error: " + err);
    })
    return;
}
