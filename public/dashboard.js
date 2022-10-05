// UI Components
const signUpComponent = () => {
  const markup = `
    <form id="sign-up" class="sign-up flow flex">
      <label for="username">Username:</label>
      <input id="username" name="username" type="text" placeholder="John Doe" required min="4" />
      <button>Sign Up</button>
    </form>
  `
  return markup;
}

const mobileTableComponent = user => {
  function tableRow(expense) {
    let markup = ``;

    for (let key in expense) { 
      if (key !== 'id') {
        markup += `
          <tr>
            <th>${key}</th>
            <td>${expense[key]}</td>
          </tr>
        `
      }
    }

    return markup;
  };

  function tableMarkup() {
    let markup = ``;

    for (let expense of user.expenses) {
      markup += `
        <table data-expenseid="${expense.id}">
          ${tableRow(expense)}
          <tr>
            <th>Action</th>
            <td class="expense-action">
              <button type="button" data-action="edit">
                <i class="ph-note-pencil"></i>
              </button>
              <button type="button" data-action="edit">
                <i class="ph-trash"></i>
              </button>
            </td>
          </tr>
        </table>
        `
    };

    return markup;
  }

  const markup = `
    <section id="mobile-table" class="container container--rounded-corner">
      <header>
        <h3>
          ${user.username}'s Expenses
        </h3>
      </header>

      <div class="expenses-container expenses-container--dashboard">
        ${tableMarkup()}
      </div>
    </section>
  `
  
  return markup;
}

const desktopTableComponent = user => {
  const thMarkup = () => {
    let markup = ``;
    
    for (let key in user.expenses[0]) {
      if (key !== 'id') {
        markup += `<th>${key}</th>`
      }
    }

    return markup;
  }

  const trMarkup = () => {
    let markup = ``;

    user.expenses.forEach(expense => {
      markup += `<tr data-expenseid="${expense.id}">`

      for (let key in expense) {
        if (key !== 'id') {
          markup += `<td>${expense[key]}</td>`
        }
      }

      markup += `
        <td class="expense-action">
          <button type="button" data-action="edit">
            <i class="ph-note-pencil"></i>
          </button>
          <button type="button" data-action="delete">
            <i class="ph-trash"></i>
          </button>
        </td>
      `

      // Close tr
      markup += `</tr>`
    })
  
    return markup;
  }

  const markup = `
    <section id="desktop-table" class="expenses-container expenses-container--dashboard container container--rounded-corner">
      <table>
        <caption>
          ${user.username}'s Expenses
        </caption>

        <thead>
          <tr>
            ${thMarkup()}
            <th>
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          ${trMarkup()}
        </tbody>
      </table>
    </section>
  `

  return markup;
}

const expenseTableComponent = user => {
  const markup = `
    <article class="expense-table">
      ${mobileTableComponent(user)}
      ${desktopTableComponent(user)}
    </article>
  `;

  return markup;
}

const createExpenseComponent = () => {
  const markup = `
    <form class="create-expense flow flex">

      <label for="title">Title:</label>
      <input id="title" type="text" placeholder="Expense Title" required min="4" />

      <label for="date">Date:</label>
      <input id="date" type="date" required />

      <label for="category-select">Category: </label>
      <select name="category" id="category-select" required>
        <option value="home">Home</option>
        <option value="transportation">Transportation</option>
        <option value="entertainment">Entertainment</option>
        <option value="food">Food</option>
        <option value="other">Other</option>
      </select>

      <label for="amount">Amount:</label>
      <input id="amount" type="number" required />

      <button>Create Expense</button>
    </form>
  `

  return markup;
}

const createPieChartComponent = (categoryPercentage) => {
  const markup = `
    <section class="graph grid-container grid-container--graph container">
      <h3>Breakdown by Category</h3>
      <div class="pie-chart"></div>
      <ul class="category">
        <li>
          <span class="color color--red"></span>
          Home
          <span class="percentage" data-category="home">
            ${categoryPercentage.home || 0}%
          </span>
        </li>
        <li>
          <span class="color color--blue"></span>
          Transportation
          <span class="percentage" data-category="transportation">
            ${categoryPercentage.transportation || 0}%
          </span>
        </li>
        <li>
          <span class="color color--green"></span>
          Entertainment
          <span class="percentage" data-category="entertainment">
            ${categoryPercentage.entertainment || 0}%
          </span>
        </li>
        <li>
          <span class="color color--yellow"></span>
          Food
          <span class="percentage" data-category="food">
            ${categoryPercentage.food || 0}%
          </span>
        </li>
        <li>
          <span class="color color--indigo"></span>
          Other
          <span class="percentage" data-category="other">
            ${categoryPercentage.other || 0}%
          </span>
        </li>
      </ul>
    </section>
  `

  return markup;
}

const updatePieChartGraph = (categoryPercentage) => {
  const pieChart = document.querySelector('.pie-chart');
  const colors = {
    home: "#d9534f",
    transportation: "#4582ec",
    entertainment: "#02b875",
    food: "#f0d74e",
    other: "#8c4df2",
  }
  let startPercentage = 0;

  let colorString = ``

  Object.entries(categoryPercentage).forEach(([key, value], idx, arr) => {
    const percentage = value + startPercentage;

    colorString += `${colors[key]} ${startPercentage}% ${percentage}%,`
    startPercentage = percentage;

    // Remove comma from last color
    if (idx + 1 === arr.length) colorString = colorString.slice(0, -1);
  })

  pieChart.style.background = `conic-gradient(${colorString})`
}

// Helper Function
async function createUser(e) {
  e.preventDefault();
  
  try {
    const response = await fetch('/user', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'username': e.target.username.value
      })
    });
    const data = await response.json();

    localStorage.setItem('user', JSON.stringify(data))

    // Re-render page to show username
    location.replace('/dashboard');
  } catch(err) {
    console.error(err)
  }
}

function getExpenseId(target) {
  return target.closest('[data-expenseid]').dataset.expenseid;
}

function deleteExpense(expenseId) {
  const confirmDeletion = confirm(`Do you want to delete this expense?`);
  const user = JSON.parse(localStorage.getItem('user'));
  
  console.log(expenseId);
  if (confirmDeletion) {
    fetch(`/user/${user.uid}/expenses/${expenseId}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Refresh page
        location.replace('/dashboard')
      })
      .catch(error => console.error(error));
  }
}

function redirectToEditExpense(expenseId, uid) {
  return location.replace(`/dashboard/expenses/${expenseId}/${uid}`)
}

function calculateCategoryPercentage(expenses) {
  let category = {}
  let totalCategory = 0;

  // Extract all categories
  for (let expense of expenses) {
    if ( !(expense.category in category) ) {
      category[expense.category] = 0;
    }

    category[expense.category] += 1;
    totalCategory += 1;
  }

  // Work out percentages
  // Formula: num / total * 100
  for (let key in category) {
    category[key] = Math.round(category[key] / totalCategory * 100);
  }

  return category;
}

// Event Handler
const handleButtonClick = (e) => {
  const { action } = e.target.dataset;

  if (action) {
    let expenseId = getExpenseId(e.target);
   
    switch (action) {
      case 'edit':
        redirectToEditExpense(expenseId, user.uid)
        break;
      case 'delete':
        deleteExpense(expenseId)
        break;
    }
  }
}

const handleCreateExpense = (e) => {
  e.preventDefault();

  const { title, date, category, amount } = e.target;

  fetch(`/expenses/${user.uid}`, {
    method: 'POST',
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

const renderPage = async () => {
  const mainContainer = document.querySelector('main.dashboard');

  // Display signup form when not signed in
  if (!user) {
    mainContainer.insertAdjacentHTML('beforeend', signUpComponent());

    // Display user's UI
  } else {
    const response = await fetch(`/user/${user.uid}`);
    user = await response.json();

    const categoryPercentage = calculateCategoryPercentage(user.expenses);

    mainContainer.insertAdjacentHTML('beforeend', createExpenseComponent());
    mainContainer.insertAdjacentHTML('beforeend', createPieChartComponent(categoryPercentage));

    if (user.expenses.length > 0) {
      mainContainer.insertAdjacentHTML('beforeend', expenseTableComponent(user));
    }

    updatePieChartGraph(categoryPercentage);
  }

  return user;
}

renderPage()
  .then(user => {
    if (!user) {
      const signUpForm = document.querySelector('form#sign-up');
      signUpForm.addEventListener('submit', createUser);
    }
    const allButton = document.querySelectorAll('button');
    const createForm = document.querySelector('.create-expense');

    allButton.forEach(button => {
      button.addEventListener('click', handleButtonClick)
    })

    createForm.addEventListener('submit', handleCreateExpense);
  })