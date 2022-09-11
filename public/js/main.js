const originators = document.querySelectorAll('.update-originator');
const quotes = document.querySelectorAll('.update-quote');
const deleteBtn = document.querySelectorAll('.delete');

// Quotes span
console.log(originators[0].parentNode.previousElementSibling);

// Originator span
console.log(originators[0].parentNode.previousElementSibling.previousElementSibling);


quotes.forEach( node => {
    // Variables storing Originator and Quotes
    const originatorElement = node.parentNode.previousElementSibling.previousElementSibling.innerText;
    const quoteElement = node.parentNode.previousElementSibling.innerText;
    
    node.addEventListener('click', () => {
        const updateText = document.querySelector('#input-update').value;
        console.log(originatorElement, quoteElement);
        
        fetch('/updateQuote', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'originatorS': originatorElement,
                'quoteS': quoteElement,
                'quoteU': updateText
            })
        })
        .then(res => {
            console.log(res);
            location.reload();
        })
        .catch(err => {
            console.log(err);
        })
    });
} )

originators.forEach( node => {
    const quoteElement = node.parentNode.previousElementSibling.innerText;
    const originatorElement = node.parentNode.previousElementSibling.previousElementSibling.innerText;
    
    node.addEventListener('click', () => {
        const updateText = document.querySelector('#input-update').value;
        console.log(originatorElement, quoteElement);
        
        fetch('/updateOriginator', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'originatorS': originatorElement,
                'quoteS': quoteElement,
                'originatorU': updateText
            })
        })
        .then(res => {
            console.log(res);
            location.reload();
        })
        .catch(err => {
            console.log(err);
        })
    });
} )


deleteBtn.forEach( node => {
    // Variables storing Originator and Quotes
    const originatorElement = node.parentNode.previousElementSibling.previousElementSibling.innerText;
    const quoteElement = node.parentNode.previousElementSibling.innerText;

    node.addEventListener('click', () => {
        console.log(originatorElement, quoteElement);

        fetch('/deleteQuote', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'originatorS': originatorElement,
                'quoteS': quoteElement
            })
        })
        .then(res => {
            console.log(res);
            location.reload();
        })
        .catch(err => {
            console.log(err);
        })
    });
} )