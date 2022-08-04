import { isValidDate, setErrorFor, setSuccessFor } from './formValidationFunctions.js'

const mainSection = document.querySelector('#main-section')
const imageInput = document.querySelector('#uploadImage')

const noteDeleteButtons = document.querySelectorAll(".note-open-delete-modal-button");
const submitNoteDeleteButton = document.querySelector(".submit-delete-note-button") 

// Delete a note
Array.from(noteDeleteButtons).forEach((button) => {
  button.addEventListener('click', function (e) {
    let noteId = e.target.dataset.noteid
    let plantId = mainSection.dataset.plantid
        
    submitNoteDeleteButton.addEventListener('click', function(e) {
      fetch(`/users/plants/notes/${noteId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'plantId': plantId
        })
      })
        .then(function (response) {
          window.location.reload(false)
        })
        .catch(err => {
          console.log(err)
        })
    })
  })
});

const noteEditButtons = document.querySelectorAll(".note-open-edit-modal-button");
const submitNoteEditButton = document.querySelector(".submit-edit-note-button") 

// Edit a note
Array.from(noteEditButtons).forEach((button) => {
  button.addEventListener('click', function (e) {
    let noteId = e.target.dataset.noteid
    let originalNoteDate = e.target.dataset.notedate
    let originalNoteBody = e.target.previousElementSibling.innerText
    let plantId = mainSection.dataset.plantid
          
    submitNoteEditButton.addEventListener('click', function() {
      const editedBody = document.querySelector('#note-body-edited').value || originalNoteBody
      const editedDate = document.querySelector('#edited-date').value || originalNoteDate
      fetch(`/users/plants/notes/${noteId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          'body': editedBody,
          'date': editedDate,
          'plantId': plantId
          })
        }).then(response => {
            window.location.reload(true)
        }).catch(err => {
            console.log(err)
        })
    })
  })
});

// Add a note 

const addNoteForm = document.querySelector('#add-note-form')
addNoteForm.addEventListener('submit', (e) => {
  e.preventDefault()
  let errors = 0;
  const noteBody = document.getElementById('new-note-body')
  console.log(noteBody.value, noteBody.value.length === 0)
  if (noteBody.value.length == 0) {
    errors++
    setErrorFor(noteBody, 'Enter a note!');
  } else if (noteBody.value.length > 400) {
    errors++
    setErrorFor(noteBody, 'Notes should be shorter than 400 characters!');
  } else {
    setSuccessFor(noteBody)
  }

  const noteDate = document.getElementById('new-note-date-written')
  let noteDateValue = noteDate.value

  let minDate = new Date('1899-01-01');
  let maxDate = new Date(Date.now());

  if (typeof(noteDateValue) === 'undefined') {
    noteDateValue = Date.now()
    setSuccessFor(noteDate);
  } else if (
    !isValidDate(new Date(noteDate.value)) ||
    new Date(noteDateValue) >= maxDate ||
    new Date(noteDateValue) <= minDate) {
    errors++
    setErrorFor(noteDate, 'Please enter a date between 1/1/1899 and today.');
  } else {
    noteDateValue = new Date(noteDate.value)
    setSuccessFor(noteDate);
  }
  if (errors === 0) {
    const plantId = addNoteForm.dataset.plantid

    fetch(`/users/plants/${plantId}/notes`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        date: noteDateValue,
        body: noteBody.value
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
  
const deletePlantModalOpenButton = document.querySelector('#delete-plant-modal-open-button')
const deletePlantButton = document.querySelector('#submit-delete-plant-button')

// Delete a user's plant
deletePlantModalOpenButton.addEventListener('click', function () {    
  let plantId = mainSection.dataset.plantid
  const userId = mainSection.dataset.userid

  deletePlantButton.addEventListener('click', function(e) {
    e.preventDefault()
    fetch(`/users/plants/${plantId}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        userId: userId
      })
    }).then(response => {
      if (response.url) {
        window.location = response.url 
      } else {
        window.location.reload(true);
      }
    })
      .catch(err => {
        console.log(err)
    })
  })
})

const editPlantModalOpenButton = document.querySelector('#edit-plant-modal-open-button')
const editPlantButton = document.querySelector('#edit-plant')

// Edit a user's plant
editPlantModalOpenButton.addEventListener('click', function (e) {    
  const plantId = mainSection.dataset.plantid
  const userId = mainSection.dataset.userid

  editPlantButton.addEventListener('click', function(e) {
    e.preventDefault()

    const nickname = document.querySelector('#edited-plant-name').value || document.querySelector('#nickname').textContent
    const location = document.querySelector('#edited-location').value 
    const wateringInterval = document.querySelector('#edited-watering-interval').value || document.querySelector('#wateringInterval').textContent
    const lastWatered = document.querySelector('#edited-last-watered').value || document.querySelector('#lastWatered').textContent || new Date(0)
    const lastFertilized = document.querySelector('#edited-last-fertilized').value || document.querySelector('#lastFertilized').textContent || new Date(0)
    const lastRepotted = document.querySelector('#edited-last-repotted').value || document.querySelector('#lastRepotted').textContent || new Date(0)


    fetch(`/users/plants/${plantId}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        userId: userId,
        nickname: nickname,
        location: location,
        wateringInterval: wateringInterval,
        lastWatered: lastWatered,
        lastFertilized: lastFertilized,
        lastRepotted: lastRepotted
      })
    }).then(response => {
      window.location = response.url    
    })
      .catch(err => {
        console.log(err)
    })
  })
})

const addImageModalOpenButton = document.querySelector('#add-image-modal-open-button')
const addImageButton = document.querySelector('#add-image')

// Add image fetch request
addImageModalOpenButton.addEventListener('click', function () {  
  let plantId = mainSection.dataset.plantid

  addImageButton.addEventListener('click', function(e) {
    e.preventDefault()
    const fileInput = document.getElementById("uploadImage")
    if (fileInput.files.length !== 0) {
      let loader = `<div class="loader-container"><div class="loader"><div class="circle"></div><div class="circle"></div></div></div>`
      const form = document.getElementById("uploadImageForm");
    
      const formData = new FormData(form);
      form.innerHTML = loader;
      fetch(`/users/plants/${plantId}/images`, {
        method: 'POST',
        body: formData
      }).then( response => window.location = response.url   
      ).catch( error => console.log(error) 
      );
    } else {
      document.getElementById('file-error').textContent = "No file selected!"
    }
  })
})

const deleteImageModalOpenButtons = document.querySelectorAll('#deleteImageModalOpenButton')
const deleteImageButton = document.querySelector('#deleteImage')

// Delete image fetch request
Array.from(deleteImageModalOpenButtons).forEach((button) => {
  button.addEventListener('click', function (e) {  
    let cloudinaryId = e.target.parentElement.dataset.cloudinaryid
    let plantId = mainSection.dataset.plantid
    deleteImageButton.addEventListener('click', function(e) {
      e.preventDefault()
      fetch(`/users/plants/${plantId}/images/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'plantId': plantId,
          'cloudinaryId': cloudinaryId
        })
      })
        .then(function (response) {
          window.location = response.url    
        })
        .catch(err => {
          console.log(err)
      })
    })  
  })
})

const editImageModalOpenButtons = document.querySelectorAll('#editImageModalOpenButton')
const editImageButton = document.querySelector('#edit-image')

// Update image fetch request
Array.from(editImageModalOpenButtons).forEach((button) => {
  button.addEventListener('click', function (e) {  
    let cloudinaryId = e.target.parentElement.dataset.cloudinaryid
    let plantId = mainSection.dataset.plantid
    editImageButton.addEventListener('click', function(e) {
      if (document.querySelector('#editImageDate').value !== "") {
        let date = document.querySelector('#editImageDate').value
        e.preventDefault()
        fetch(`/users/plants/${plantId}/images/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'plantId': plantId,
            'cloudinaryId': cloudinaryId,
            'uploaded': date
          })
        })
          .then(function (response) {
            window.location = response.url    
          })
          .catch(err => {
            console.log(err)
        })
      } 
    })  
  })
})

