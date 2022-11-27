const deleteText = document.querySelectorAll('.delete');
const thumbText = document.querySelectorAll('.update');

Array.from(deleteText).forEach((element) => {
  element.addEventListener('click', deletePriority);
});

Array.from(thumbText).forEach((element) => {
  element.addEventListener('click', update);
});

async function deletePriority() {
  const title = this.parentNode.parentNode.childNodes[1].innerText;
  const body = this.parentNode.parentNode.childNodes[3].innerText;

  try {
    const response = await fetch('deletePriority', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title,
        body: body,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

async function update() {
  const title = this.parentNode.parentNode.childNodes[1].innerText;
  const body = this.parentNode.parentNode.childNodes[3].innerText;
  const date = this.parentNode.parentNode.childNodes[5].innerText;

  console.log(title, body, date);
  try {
    const response = await fetch('updatePriority', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title,
        body: body,
        date: date,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}
