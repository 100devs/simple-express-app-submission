// First fetch call to display object-properties as <option> elements
fetch(`/api/`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        const muscleNames = Object.keys(data);

        for (let i = 0; i < muscleNames.length; i++) {
            const optionTags = document.createElement('option');
            optionTags.innerText = muscleNames[i];
            optionTags.value = muscleNames[i];
            document.querySelector('select').appendChild(optionTags);
        }
  })

// Modal & Interactables
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnsOpenModal = document.querySelectorAll(".show-modal");
const upvoteQuoteIcon = document.querySelectorAll('.fa-thumbs-up')

// Helper functions
function openModal() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}
function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

// Open Modal behavior
for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener("click", openModal);
  btnsOpenModal[i].addEventListener('click', event => {
    getImage();
    makeFetch(event.target.innerText);
  });
}
// Close Modal behavior
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener('click', closeModal)
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// Like button behavior
Array.from(upvoteQuoteIcon).forEach((element) => {
  element.addEventListener('click', addUpvote);
});

async function getImage() {
  const url = 'https://dog.ceo/api/breeds/image/random';
  try {
      const response = await fetch(url);
      const data = await response.json();
      document.querySelector('.stretch-image').src = data.message
  } catch(error) {
      console.error(error);
  }
}

async function makeFetch(string) {
  let muscle = string.toLowerCase();
  try {
      const response = await fetch(`/api/${muscle}`);
      const data = await response.json();

      if (muscle.length > 0) {
        document.querySelector('.stretchMuscle').textContent = data.muscle;
        document.querySelector('.stretchName').textContent = data.name;
        document.querySelector('.stretchDifficulty').textContent = data.difficulty;
        document.querySelector('.stretchDirections').textContent = data.instructions;
      } else {
        document.querySelector('.stretchMuscle').textContent = data.unknown.muscle;
        document.querySelector('.stretchName').textContent = data.unknown.name;
        document.querySelector('.stretchDifficulty').textContent = data.unknown.difficulty;
        document.querySelector('.stretchDirections').textContent = data.unknown.instructions;
      }
  } 
  catch(error) {
      console.error(error);
  }
}

async function addUpvote() {
  const stretchName = this.parentNode.childNodes[1].innerText
  const upVotes = Number(this.parentNode.childNodes[5].innerText)

  try {
      const response = await fetch('addUpvote', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              'likes': upVotes,
              'name': stretchName
          })
      });
      const data = await response.json();

      console.log(data);
      window.location.reload(true);
  } catch(error) {
      console.error(error);
  }
}