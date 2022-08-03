// Use strict
"use strict";

// Populate filters
populateFilters();
async function populateFilters() {
  let data = await (await fetch('/tags')).json();
  let filterParent = document.querySelector('.filters');
  data.forEach(tag => {
    let filterChild = document.createElement('button');
    filterChild.classList.add('filter');
    filterChild.innerHTML = tag[0].toUpperCase() + tag.substring(1);
    filterParent.appendChild(filterChild);
  })
  // Enable filters
  const filterButtons = document.querySelectorAll('.filter');
  Array.from(filterButtons).forEach(filterBtn => {
    filterBtn.addEventListener('click', filterItems)
  })
  function filterItems(e) {
    console.log('yeh')
    Array.from(filterButtons).forEach(filterBtn => {
      filterBtn.classList.remove('active')
    })
    e.target.classList.add('active');
    const tagTarget = e.target.innerHTML.toLowerCase();
    if (tagTarget === 'all') {
      const items = document.querySelectorAll('.item');
      Array.from(items).forEach(item => {
        item.style.display = 'flex';
      })
    } else {
      const items = document.querySelectorAll('.item');
      Array.from(items).forEach(item => {
        const tags = item.querySelector('.tags').innerHTML
        if (tags.includes(tagTarget)) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      })
    }
  }
}

// Listen for 
const addButtonsPopup = document.querySelectorAll('.addItemToggle')
Array.from(addButtonsPopup).forEach(a => {
  a.addEventListener('click', function() {
    document.querySelector('.addItemContainer').classList.toggle('active');
  })
})

// Listen for deletes
const deleteButtons = document.querySelectorAll('.delete');
Array.from(deleteButtons).forEach(deleteBtn => {
  deleteBtn.addEventListener('click', deleteItem);
});
function deleteItem(e) {
  console.log(e)
  const parent = e.target.parentElement.parentElement.parentElement;
  const title = parent.querySelector('h3').innerHTML;
  const image = (parent.querySelector('img').src).match(/(?<=images\/).*jpg$/);
  console.log(image)
  fetch('/delete', {
    method: 'delete',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      title: title,
      image: image
    })
  })
    .then(res => {
      window.location.reload(true);
    })
    .catch(err => {
      console.log(err)
    })
}

// Listen for updates
const updateSubmit = document.querySelector('.updateItem input.updateSubmit')
updateSubmit.addEventListener('click', updateItem);
function updateItem() {
  const formData  = new FormData();
  formData.append('updateimage', document.querySelector('.updateItem #updateimage').files[0])
  formData.append('title', document.querySelector('.updateItem #updatetitle').value)
  formData.append('price', document.querySelector('.updateItem #updateprice').value)
  formData.append('brand', document.querySelector('.updateItem #updatebrand').value)
  formData.append('dateAcquired', document.querySelector('.updateItem #updatedateAcquired').value)
  formData.append('placeAcquired', document.querySelector('.updateItem #updateplaceAcquired').value)
  formData.append('image', (document.querySelector('.updateItem .img img').src).match(/(?<=images\/).*jpg$/))
  formData.append('tags', getCheckBoxes('.updateItem .form'))
  fetch('/update', {
    method: 'put',
    body: formData,
  })
    .then(res => {
      window.location.reload(true);
    })
    .catch(err => {
      console.log(err)
    })
}

// Toggle update modal
const updateButtons = document.querySelectorAll('.update');
Array.from(updateButtons).forEach(updateBtn => {
  updateBtn.addEventListener('click', showUpdateModal);
});
const updateItemBg = document.querySelector('.updateItem .bg');
updateItemBg.addEventListener('click', hideUpdateModal)

async function showUpdateModal(e) {
  const title = e.target.querySelector('span').innerHTML;
  const updateItem = document.querySelector('.updateItem');
  updateItem.classList.add('active');
  const response = await fetch (`/item/${title}`);
  const data = await response.json();
  document.querySelector('.updateItem #renderimage').src = `uploads/images/${data[0].image}`;
  document.querySelector('.updateItem #updatetitle').value = data[0].title;
  document.querySelector('.updateItem #updateprice').value = data[0].price;
  document.querySelector('.updateItem #updatebrand').value = data[0].brand;
  document.querySelector('.updateItem #updatedateAcquired').value = formatToDateInput(data[0].dateAcquired);
  document.querySelector('.updateItem #updateplaceAcquired').value = data[0].placeAcquired;
  if (!(data[0].tags.length === 1 && data[0].tags[0] === null)) {
    data[0].tags.forEach(tag => {
      document.querySelector(`.updateItem #update${tag}`).checked = true;
    })
  } 
}
function hideUpdateModal() {
  const updateItem = document.querySelector('.updateItem');
  updateItem.classList.remove('active');
}


// Helpers
function formatToDateInput(date) {
  var d = new Date(date);
  return [
    d.getFullYear(),
    ('0' + (d.getMonth() + 1)).slice(-2),
    ('0' + d.getDate()).slice(-2)
  ].join('-');
}

function getCheckBoxes(checkboxParent) {
  let array = []
  let checkboxes = document.querySelectorAll(`${checkboxParent} input[type=checkbox]:checked`);
  Array.from(checkboxes).forEach(checkbox => {
    array.push(checkbox.value)
  })
  return array
}

function getFilename(path) {
  return path.replace(/C:\\fakepath\\/gi, '')
}


// Show preview of image
let updateimage = document.querySelector('#updateimage')
updateimage.onchange = evt => {
  const [file] = updateimage.files;
  console.log(file, URL.createObjectURL(file))
  if (file) {
    document.querySelector('#renderimage').src = URL.createObjectURL(file)
  }
}