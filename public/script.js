const formEl = document.querySelector('form');
const itemContainerList = document.querySelectorAll('#item--js');
const confirmButtonEl = document.querySelector('form button');
const addButtonEl = document.querySelector('.add');

//------------------------
//----event listeners-----
//------------------------

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
});

Array.from(itemContainerList).map((el) =>
  el.addEventListener('click', handleItemContainerClick)
);

addButtonEl.addEventListener('click', (e) => {
  confirmButtonEl.insertAdjacentElement('beforebegin', createLogItemEl());
});

//--------------------------
//----utility functions-----
//--------------------------

function handleItemContainerClick(e) {
  const parentNode = e.target.parentNode;
  let timeStampEl;
  // if parentNode is the container div
  if (parentNode.id === 'item--js')
    timeStampEl = getTimeStampEl(parentNode.children);

  // if parentNode is label
  if (parentNode.parentNode.id === 'item--js')
    timeStampEl = getTimeStampEl(parentNode.parentNode.children);

  timeStampEl.textContent = `Time Last Taken: ${getTodaysDateString()} `;
}

function getTimeStampEl(childrenArr) {
  return Array.from(childrenArr).filter((el) =>
    Array.from(el.classList).includes('timestamp')
  )[0];
}

function getTodaysDateString() {
  const date = new Date();

  return new Intl.DateTimeFormat('default', {
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(date);
}

function createLogItemEl() {
  /*
  <div class="item-container" id="item--js">
          <label>
            Creatine Taken?
            <input type="checkbox" name="taken" />
            <!-- <span tabindex="0" class="checkbox"></span> -->
          </label>
          <p class="timestamp">Time Last Taken:</p>
        </div>
  
  
  */

  const div = document.createElement('div');
  const label = document.createElement('label');
  const input = document.createElement('input');
  const p = document.createElement('p');

  // container
  div.classList.add('item-container');
  div.id = 'item--js';

  // label
  label.textContent = 'Creatine Taken?';

  // input
  input.type = 'checkbox';
  input.name = 'taken';

  // build label
  label.insertAdjacentElement('beforeend', input);

  // p
  p.classList.add('timestamp');
  p.textContent = 'Time Last Taken:';

  //build div - fill from  bottom
  div.insertAdjacentElement('beforeend', label);
  div.insertAdjacentElement('beforeend', p);

  // attach event listener
  div.addEventListener('click', handleItemContainerClick);

  return div;
}
