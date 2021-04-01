const deleteNote = document.querySelectorAll('.del');
const completeNote = document.querySelectorAll('.check');

Array.from(deleteNote).forEach((element) => {
  element.addEventListener('click', deleteTodo);
});

Array.from(completeNote).forEach((element) => {
  element.addEventListener('click', completeTodo);
});

async function deleteTodo() {
  const tTitle = this.parentNode.childNodes[1].innerText;
  const tMessage = this.parentNode.childNodes[3].innerText;
  try {
    const response = await fetch('deleteTodoItem', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        itemTitle: tTitle,
        itemMessage: tMessage,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

async function completeTodo() {
  const tTitle = this.parentNode.childNodes[1].innerText;
  const tMessage = this.parentNode.childNodes[3].innerText;
  const tLike = Number(this.parentNode.childNodes[7].innerText);
  try {
    const response = await fetch('changeLike', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'itemTitle': tTitle,
        'itemMessage': tMessage,
        'itemLike': tLike,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}
