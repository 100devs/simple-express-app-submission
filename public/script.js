console.log("hello world");

const SERVER_PORT = 5500;
const SERVER_HOST = "localhost";
const SERVER_PROTOCOL = "http";


window.addEventListener('DOMContentLoaded', (e) => {
    document.getElementById('newpost_form').addEventListener('submit', newpostformhandler);
    document.getElementById('newcomment_form').addEventListener('submit', newcommentformhandler);
})


function newpostformhandler(e) {
    e.preventDefault();
    console.log("meow"); 
    const title = document.getElementById('post_title')
    const subtitle = document.getElementById('post_subtitle')
    const mainbody = document.getElementById('post_mainbody')
    const conclusion = document.getElementById('post_conclusion')
    console.log(title)
    console.log(subtitle)
    console.log(mainbody)
    console.log(conclusion)
    console.log(title.value)
    console.log(subtitle.value)
    console.log(mainbody.value)
    console.log(conclusion.value)
    const data = {
        'title': title.value,
        'subtitle': subtitle.value,
        'mainbody': mainbody.value,
        'conclusion': conclusion.value
    }
    fetch(`${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/newpost`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
        console.log(response);
        return response.json();
    }).then(data => {
        console.log(data)
    })
}

function newcommentformhandler(e) {
    e.preventDefault();
    const OriginPostId = 1;
    const InnerText = document.querySelector('#newcomment_form input[type=text].newcomment').value;
    const Author = "jasmine";
    const Likes = 0;
    const Dislikes = 0;
    const RepliesCount = 0;
    const data = {
        OriginPostId: OriginPostId,
        InnerText: InnerText,
        Author: Author,
        Likes: Likes,
        Dislikes: Dislikes,
        RepliesCount: RepliesCount
    }
    fetch(`${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
        console.log(response);
        return response.json();
    }).then(data => {
        console.log(data)
    })
}