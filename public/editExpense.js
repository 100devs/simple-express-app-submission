function handleUpdateExpense(e) {
  e.preventDefault();

  const { title, date, category, amount } = e.target;
  const expenseId = e.target.dataset.expenseid;

  fetch(`/user/${user.uid}/expenses/${expenseId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: title.value,
      date: date.value,
      category: category.value,
      amount: amount.value
    })
  })
    .then(() => {
      location.replace('/dashboard');
    })
}

const editForm = document.querySelector('.edit-expense');

editForm.addEventListener('submit', handleUpdateExpense)