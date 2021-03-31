document.querySelector('button').addEventListener('click', getYokaiInfo);
// Get the input field
const input = document.querySelector('input');

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.querySelector("button").click();
  }
});

async function getYokaiInfo() {
  console.log('here')
  const yokaiName = document.querySelector('input').value
  try {
    // need to remember await key word for response and data
    const response = await fetch(`https://yokai-api.herokuapp.com/api/yokai/${yokaiName}`) // need http or https for cors
    const data = await response.json()

    console.log(data)
    document.querySelector('.directions').style.display = 'none';
    document.querySelector('.results').style.display = 'block';
    document.getElementById('yokaiPic').src = data.yokaiPic
    document.getElementById('yokaiPic').alt = `${data.name} picture`
    document.getElementById('yokaiPic').href = data.yokaiPic
    document.querySelector('h2').innerText = data.name
    document.getElementById('medalPic').src = data.medalPic
    document.getElementById('medalPic').alt = `${data.name} medal`
    document.getElementById('medalPic').href = data.medalPic
    document.getElementById('tribe').innerText = 'Tribe:   ' + data.tribe
    document.querySelector('#bio').innerText = data.medalliumBio
    document.querySelector('input').innerText = ''
    document.querySelector('input').placeholder = 'Enter another Yokai name'

    const modalEleYokai = document.querySelector(".modalYokai");
    const modalEleMedal = document.querySelector(".modalMedal");
    const modalImageYokai = document.querySelector(".modalImageYokai");
    const modalImageMedal = document.querySelector(".modalImageMedal");
    let wow;
    document.querySelector('.imgThumbYokai').addEventListener('click',(event)=>{
      modalEleYokai.style.display = "block";
      modalImageYokai.src = data.yokaiPic;
    })
    document.querySelector('.imgThumbMedal').addEventListener('click',(event)=>{
      modalEleMedal.style.display = "block";
      modalImageMedal.src = data.medalPic;
    })
    document.querySelector(".closeYokai").addEventListener('click',()=>{
      modalEleYokai.style.display = "none";
    })
    document.querySelector(".closeMedal").addEventListener('click',()=>{
      modalEleMedal.style.display = "none";
    })

  } catch(err) {
    console.log(err)
  }

}
