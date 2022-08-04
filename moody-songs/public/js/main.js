//Loop through all li elements and give them evenetlisteners that on click will call function that fetches api
let emojis = document.querySelectorAll('li')
emojis.forEach(x => {
    x.addEventListener('click', (e) => {
        //this gets the value of element and removes 'emoji' from it to match api path
        makeReq(e.target.classList.value.split('-')[0])
    })
})

//based on selection, function fetches api from server
async function makeReq(mood) {
  let title = document.querySelector('header span')
  //path/ value name for love songs was inLove songs. This statement manipulates string if 'in' is included and makes first letter uppercase and rest lowercase 
  mood.includes('in') ? title.innerText = mood.split('').slice(2).join('') : title.innerText = mood[0].toUpperCase() + mood.substr(1).toLowerCase()
  //fetches api from server based on which emoji clicked
  const res = await fetch(`/api/${mood}`);
  //stores data from fetch
  const data = await res.json();
  console.log(data);
  //gets random number to pick random index
  let random = Math.floor(Math.random() * data.length);

  
  const song = new Songs(data[random].url, data[random].artist, data[random].song, data[random].lyrics, random, data.length);
  
  //clears previous song from container
  song.clear();
  //dpending on what value is selected calls getSongInfo function
  switch (mood) {
    case "happy":
      song.getSongInfo();
      break;
    case "angry":
      song.getSongInfo();
      break;
    case "sad":
      song.getSongInfo();
      break;
    case "chill":
      song.getSongInfo();
      break;
    case "inLove":
      song.getSongInfo();
      break;
  }
}

//creates song class
class Songs {
    //parameters are what values from api obj we want
  constructor(url, artist, song, lyrics, random, length) {
    this.url = url;
    this.artist = artist;
    this.song = song;
    this.lyrics = lyrics;
    this.random = random
    this.length = length
  }

  //clears container
  clear() {
    const albumInfo = document.querySelector(".albumInfo");
    while (albumInfo.firstChild) {
      albumInfo.removeChild(albumInfo.firstChild);
    }
  }

  //function creates div, div conentent gets added using fetched data, appends div to DOM
  getSongInfo() {
    const div = document.createElement("div");
    div.classList.add("albumStuff");
    div.innerHTML = `
                <div class="songDetails">
                    <iframe frameBorder="0" src="${this.url}"></iframe>
                    <div class="titleArtist">
                        <h1>${this.artist}</h1>
                        <h2>${this.song}</h2>
                        <span>Track ${this.random + 1} / ${this.length}</span>
                    </div>
                </div>
                <div class="lyrics">
                    <h2>Lyrics</h2>
                    <p>${this.lyrics}</p>
                </div>
            `;
    document.querySelector(".albumInfo").appendChild(div);
  }
}
