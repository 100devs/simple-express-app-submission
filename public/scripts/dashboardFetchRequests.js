import { setSuccessFor, setErrorFor, isValidDate } from './formValidationFunctions.js'
// import autocomplete from './autocomplete.js';

const mainSection = document.querySelector('#main-section')

// Add location fetch request and form validation

const addLocationForm = document.querySelector('#add-location-form')
addLocationForm.addEventListener('submit', (e) => {
  e.preventDefault()
  let errors = 0;
  const locationInput = document.getElementById('newLocation')
  if (locationInput.value === '') {
    errors++
    setErrorFor(locationInput, 'Enter a location!');
  } if (locationInput.length > 40) {
    errors++
    setErrorFor(locationInput, 'Location names must be fewer than 40 characters!');
  }
  if (errors === 0) {
    const userId = addLocationForm.dataset.userid
    fetch(`/users/${userId}/locations`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        newLocation: locationInput.value
      })
    })
      .then(response => {
      window.location = response.url    
    })
      .catch(err => {
      console.log(err)
    })      
  
  }
})

function checkInputs(name, plantSpecies, location, wateringFrequency, lastWatered, lastFertilized, lastRepotted) {

  let errors = 0

  let speciesValue = plantSpecies.value.split("(")[0]
  let nameValue = name.value.trim()
  if (
    nameValue === '' &&
    speciesValue === ''
  ) {
    errors++
    setErrorFor(name, 'Please input a nickname and/or plant species!');
  } else if(nameValue === '') {
    nameValue = plantSpecies.value.split("-")[1]
    setSuccessFor(name);
  }  else {
    setSuccessFor(name);
  }

  let locationValue = location.value.trim()    
  if(locationValue === '') {
    errors++
    setErrorFor(location, 'Choose a location!');
  } else {
    setSuccessFor(location);
  }

  let wateringFrequencyValue = wateringFrequency.value.trim()
  if(wateringFrequencyValue === '' || 
  wateringFrequencyValue < 1 || 
  wateringFrequencyValue > 90) {
    errors++
    setErrorFor(wateringFrequency, 'Enter a valid watering frequency value (between 1 and 90)!');
  } else {
    setSuccessFor(wateringFrequency);
  }
      
  let minDate = new Date('1899-01-01');
  let maxDate = new Date(Date.now());

  let lastWateredValue = lastWatered.value
  if (lastWateredValue === '') {
    lastWateredValue = new Date(0);
    setSuccessFor(lastWatered);
  } else if (
    !isValidDate(new Date(lastWateredValue)) ||
    new Date(lastWateredValue) >= maxDate ||
    new Date(lastWateredValue) <= minDate) {
    errors++
    setErrorFor(lastWatered, 'Please enter a date between 1/1/1899 and today.');
  } else {
    lastWateredValue = new Date(lastWateredValue)
    setSuccessFor(lastWatered);
  }

  let lastFertilizedValue = lastFertilized.value
  if (lastFertilizedValue === '') {
    lastFertilizedValue = new Date(0);
    setSuccessFor(lastFertilized);
  } else if (
    !isValidDate(new Date(lastFertilizedValue)) ||
    new Date(lastFertilizedValue) >= maxDate ||
    new Date(lastFertilizedValue) <= minDate) {
    errors++
    setErrorFor(lastFertilized, 'Please enter a date between 1/1/1899 and today.');
  } else {
    lastFertilizedValue = new Date(lastFertilizedValue)
    setSuccessFor(lastFertilized);
  }


  let lastRepottedValue = lastRepotted.value
  if (lastRepottedValue === '') {
    lastRepottedValue = new Date(0);
    setSuccessFor(lastRepotted);
  } else if (
    !isValidDate(new Date(lastRepottedValue)) ||
    new Date(lastRepottedValue) >= maxDate ||
    new Date(lastRepottedValue) <= minDate) {
    errors++
    setErrorFor(lastRepotted, 'Please enter a date between 1/1/1899 and today.');
  } else {
    lastRepottedValue = new Date(lastRepottedValue)
    setSuccessFor(lastRepotted);
  }

if (errors === 0) {
  const userId = addPlantForm.dataset.userid
  fetch(`/users/${userId}/plants`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      species: speciesValue,
      name: nameValue,
      location: locationValue,
      wateringInterval: wateringFrequencyValue,
      lastWatered: lastWateredValue,
      lastFertilized: lastFertilizedValue,
      lastRepotted: lastRepottedValue
    })
  })
    .then(response => {
    window.location = response.url    
  })
    .catch(err => {
    console.log(err)
  })      

}
}


const waterPlantButtons = document.querySelectorAll('#water-plant')

// Water plant fetch request
Array.from(waterPlantButtons).forEach((button) => {
    button.addEventListener('click', function (e) {    
    const plantId = e.target.parentElement.dataset.plantid
    const userId = mainSection.dataset.userid

    e.preventDefault()
  
    fetch(`/users/plants/${plantId}/water`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        userId: userId,
      })
    })
      .then(response => {
      window.location = response.url    
    })
      .catch(err => {
      console.log(err)
    })
    })
  })

const fertilizePlantButtons = document.querySelectorAll('#fertilize-plant')

// Fertilize plant fetch request
Array.from(fertilizePlantButtons).forEach((button) => {
    button.addEventListener('click', function (e) {    
    const plantId = e.target.parentElement.dataset.plantid
    const userId = mainSection.dataset.userid

    e.preventDefault()
  
    fetch(`/users/plants/${plantId}/fertilize`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        userId: userId,
      })
    })
      .then(response => {
      window.location = response.url    
    })
      .catch(err => {
      console.log(err)
    })
    })
  })

const deleteLocationModalOpenButtons = document.querySelectorAll('#deleteLocationModalOpenButton')
const deleteLocationButton = document.querySelector("#delete-location")

//   Delete location fetch request
  Array.from(deleteLocationModalOpenButtons).forEach((button) => {
    button.addEventListener('click', function (e) {    
    const location = e.target.parentElement.innerText
    const userId = mainSection.dataset.userid

    e.preventDefault()
  
    deleteLocationButton.addEventListener('click', function() {
        fetch(`/users/${userId}/locations`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              location: location,
            })
          })
            .then(response => {
            window.location = response.url    
          })
            .catch(err => {
            console.log(err)
          })      
    })
    })
  })
  const editLocationModalOpenButtons = document.querySelectorAll('#editLocationModalOpenButton')
  const editLocationButton = document.querySelector("#edit-location")
  
  //   Edit location fetch request
  Array.from(editLocationModalOpenButtons).forEach((button) => {
    button.addEventListener('click', function (e) {    
    const location = e.target.parentElement.innerText
    const userId = mainSection.dataset.userid
  
    editLocationButton.addEventListener('click', function() {
      e.preventDefault()
      const newLocation = document.querySelector('#edit-location-input').value
        fetch(`/users/${userId}/locations`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              location: location,
              newLocation: newLocation
            })
          })
            .then(response => {
            window.location = response.url    
          })
            .catch(err => {
            console.log(err)
          })      
    })
    })
  })

  // Set maximum date of form date picker to today
  const datePickers = document.querySelectorAll('.date-picker')
  datePickers.forEach(datePicker => datePicker.max = new Date().toLocaleDateString('en-ca'))

  // Form validation for add plant form

  const addPlantForm = document.querySelector('.add-plant-form')

  addPlantForm.addEventListener('submit', e => {
    const name = document.querySelector('#plant-name')
    const plantSpecies = document.querySelector('#plantSpecies')
    const location = document.querySelector('#location')
    const wateringFrequency = document.querySelector('#wateringFrequency')
    const lastWatered = document.querySelector('#lastWatered')
    const lastFertilized = document.querySelector('#lastFertilized')
    const lastRepotted = document.querySelector('#lastRepotted')
  
    e.preventDefault();
    
    checkInputs(name, plantSpecies, location, wateringFrequency, lastWatered, lastFertilized, lastRepotted);
  });

  function checkInputs(plantName, plantSpecies, location, wateringFrequency, lastWatered, lastFertilized, lastRepotted) {

    let errors = 0

    let nameValue = plantName.value.trim()
    let speciesValue = plantSpecies.value.split("(")[0]

    if (
      nameValue === '' &&
      speciesValue === ''
    ) {
      errors++
      setErrorFor(plantName, 'Please input a nickname and/or plant species!');
    } else if(nameValue === '') {
      nameValue = plantSpecies.value.split("(")[0]
      setSuccessFor(plantName);
    }  else {
      setSuccessFor(plantName);
    }

    let locationValue = location.value.trim()    
    if(locationValue === '') {
      errors++
      setErrorFor(location, 'Choose a location!');
    } else {
      setSuccessFor(location);
    }

    let wateringFrequencyValue = wateringFrequency.value.trim()
    if(wateringFrequencyValue === '' || 
    wateringFrequencyValue < 1 || 
    wateringFrequencyValue > 90) {
      errors++
      setErrorFor(wateringFrequency, 'Enter a valid watering frequency value (between 1 and 90)!');
    } else {
      setSuccessFor(wateringFrequency);
    }
        
    let minDate = new Date('1899-01-01');
    let maxDate = new Date(Date.now());

    let lastWateredValue = lastWatered.value
    if (lastWateredValue === '') {
      lastWateredValue = new Date(0);
      setSuccessFor(lastWatered);
    } else if (
      !isValidDate(new Date(lastWateredValue)) ||
      new Date(lastWateredValue) >= maxDate ||
      new Date(lastWateredValue) <= minDate) {
      errors++
      setErrorFor(lastWatered, 'Please enter a date between 1/1/1899 and today.');
    } else {
      lastWateredValue = new Date(lastWateredValue)
      setSuccessFor(lastWatered);
    }

    let lastFertilizedValue = lastFertilized.value
    if (lastFertilizedValue === '') {
      lastFertilizedValue = new Date(0);
      setSuccessFor(lastFertilized);
    } else if (
      !isValidDate(new Date(lastFertilizedValue)) ||
      new Date(lastFertilizedValue) >= maxDate ||
      new Date(lastFertilizedValue) <= minDate) {
      errors++
      setErrorFor(lastFertilized, 'Please enter a date between 1/1/1899 and today.');
    } else {
      lastFertilizedValue = new Date(lastFertilizedValue)
      setSuccessFor(lastFertilized);
    }


    let lastRepottedValue = lastRepotted.value
    if (lastRepottedValue === '') {
      lastRepottedValue = new Date(0);
      setSuccessFor(lastRepotted);
    } else if (
      !isValidDate(new Date(lastRepottedValue)) ||
      new Date(lastRepottedValue) >= maxDate ||
      new Date(lastRepottedValue) <= minDate) {
      errors++
      setErrorFor(lastRepotted, 'Please enter a date between 1/1/1899 and today.');
    } else {
      lastRepottedValue = new Date(lastRepottedValue)
      setSuccessFor(lastRepotted);
    }

    
        let plantSpeciesName = document.querySelector("#plantSpecies").value
        const botanicalNames = []
        document.querySelector("#plantSpeciesOptions").querySelectorAll('option').forEach(node => {
          botanicalNames.push(node.value.split("(")[1].slice(0, -1))
        })

        if (plantSpeciesName === '') {
          errors++
          setErrorFor(plantSpecies, 'Choose a plant species!');
        } else {
          if (!plantSpeciesName.includes("(")) {
            errors++
            setErrorFor(plantSpecies, 'Choose a plant species on the list!');  
          } else {
            let botanicalName = plantSpeciesName.split("(")[1].slice(0, -1)
            if (!botanicalNames.includes(botanicalName)) {
              errors++
              setErrorFor(plantSpecies, 'Choose a plant species on the list!');  
            } else {
              setSuccessFor(plantSpecies);
            }  
          }
        } 
    
        if (errors === 0) {
          const userId = addPlantForm.dataset.userid;
          let botanicalName = plantSpeciesName.split("(")[1].slice(0, -1)
          fetch(`/users/${userId}/plants`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              botanicalName: botanicalName,
              name: nameValue,
              location: locationValue,
              wateringInterval: wateringFrequencyValue,
              lastWatered: lastWateredValue,
              lastFertilized: lastFertilizedValue,
              lastRepotted: lastRepottedValue
            })
        })
        .then(response => {
          window.location = response.url    
        })
          .catch(err => {
          console.log(err)
        })      
    }
  } 
