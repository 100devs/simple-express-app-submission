function getLongAndLat() {
  return new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject)
  );
}

async function currLatLng() {
  let pos = await getLongAndLat();
  let latLng = {  }
  latLng.lng = pos.coords.longitude;
  latLng.lat = pos.coords.latitude;
  console.log(latLng);
  console.log(typeof latLng.lat);
  return latLng
}

async function getFive(){
  let latLng = await currLatLng()
  let response = await fetch ('/api/nearest', {
    method: 'post', body: JSON.stringify(latLng),
    headers: { 'Content-Type': 'application/json' }
  })
  let data = await response.json()
  data = [data[0], data[1], data[2], data[3], data[4]]
  console.log(data);
  return data
}
getFive()

.then(function(data){
  console.log(data);
  let firstSelectorName = document.querySelector("#firstName")
  firstData = data[0]
  firstSpaceName = firstData.name.replace(/\s+/g,'')
  firstSelectorName.innerText = `${firstData.name}`
    let firstSelectorDesc = document.querySelector("#firstDesc")
    firstSelectorDesc.innerText = `${firstData.description}`
      let firstSelectorLink = document.querySelector("#firstLink")
      firstSelectorLink.setAttribute(`href`, `/${firstSpaceName}`)

  let secondSelectorName = document.querySelector("#secondName")
  secondData = data[1]
  secondSpaceName = secondData.name.replace(/\s+/g,'')
  secondSelectorName.innerText = `${secondData.name}`
    let secondSelectorDesc = document.querySelector("#secondDesc")
    secondSelectorDesc.innerText = `${secondData.description}`
      let secondSelectorLink = document.querySelector("#secondLink")
      secondSelectorLink.setAttribute(`href`, `/${secondSpaceName}`)

  let thirdSelectorName = document.querySelector("#thirdName")
  thirdData = data[2]
  thirdSpaceName = thirdData.name.replace(/\s+/g,'')
  thirdSelectorName.innerText = `${thirdData.name}`
    let thirdSelectorDesc = document.querySelector("#thirdDesc")
    thirdSelectorDesc.innerText = `${thirdData.description}`
      let thirdSelectorLink = document.querySelector("#thirdLink")
      thirdSelectorLink.setAttribute(`href`, `/${thirdSpaceName}`)

  let fourthSelectorName = document.querySelector("#fourthName")
  fourthData = data[3]
  fourthSpaceName = fourthData.name.replace(/\s+/g,'')
  fourthSelectorName.innerText = `${fourthData.name}`
    let fourthSelectorDesc = document.querySelector("#fourthDesc")
    fourthSelectorDesc.innerText = `${fourthData.description}`
      let fourthSelectorLink = document.querySelector("#fourthLink")
      fourthSelectorLink.setAttribute(`href`, `/${fourthSpaceName}`)
})














// https://codepen.io/jamesqquick/pen/XWJxBQv?editors=1010
// https://codepen.io/ChrisBarberRiley/pen/eYdBXPP
// I could hardocde an object of names:nospace names
// 
// let searchable = [
//   'Elastic',
//   'PHP',
//   'Something about CSS',
//   'How to code',
//   'JavaScript',
//   'Coding',
//   'Some other item',
// ];


// then do the below

// const searchInput = document.getElementById('search');
// const searchWrapper = document.querySelector('.wrapper');
// const resultsWrapper = document.querySelector('.results');

// searchInput.addEventListener('keyup', () => {
//   let results = [];
//   let input = searchInput.value;
//   if (input.length) {
//     results = searchable.filter((item) => {
//       return item.toLowerCase().includes(input.toLowerCase());
//     });
//   }
//   renderResults(results);
// });

// function renderResults(results) {
//   if (!results.length) {
//     return searchWrapper.classList.remove('show');
//   }

//   const content = results
//     .map((item) => {
//       return `<li>${item}</li>`;
//     })
//     .join('');

//   searchWrapper.classList.add('show');
//   resultsWrapper.innerHTML = `<ul>${content}</ul>`;
// }


// then add event listener on the click of <ul>content</ul> to populate the url