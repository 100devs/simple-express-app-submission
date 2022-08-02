import { useState } from 'react';

//TODO: Abstract form to separate component? Same thing here and in NewTransaction.js

export default function UpdateTransaction({ transaction }) {
    const [transactionState, setTransactionState] = useState(transaction);

    async function handleSubmit(e) {
        e.preventDefault();
        const id = transactionState._id;
        const putData = await fetch(`/api/transactions/update/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                payer: transactionState.payer,
                receiver: transactionState.receiver,    
                date: transactionState.date,
                amount: transactionState.amount
            })
        });
        const data = await putData.json();
        console.log(`Update Complete: ${JSON.stringify(data)}`);
        //TODO Add error handling
    }

    function handleTransactionChange(e) {
        setTransactionState(prevState => ({
            ...prevState, [e.target.name]: e.target.value
        }));
    }

    return(
        <form  onSubmit={handleSubmit}>
            <label>Date
                <input 
                    type="date" 
                    name="date" 
                    value={transactionState.date}
                    onChange={handleTransactionChange}
                />
            </label>
            <label>Payer
                <input
                    type="text"
                    name="payer"
                    value={transactionState.payer}
                    onChange={handleTransactionChange}
                />
                <button type="button" name="add-customer">Add Customer</button>
            </label>
            <label>Receiver
                <input 
                    type="text"
                    name="receiver"
                    value={transactionState.receiver}
                    onChange={handleTransactionChange}
                />
                <button type="button" name="add-vendor">Add Vendor</button>
            </label>

            <label>Amount
                <input 
                    type="number"
                    name="amount"
                    value={transactionState.amount}
                    onChange={handleTransactionChange}
                />
            </label>
            <button type="submit" name="confirm">Confirm</button>
            <button type="button" name="cancel">Cancel</button>
        </form>
    )
}