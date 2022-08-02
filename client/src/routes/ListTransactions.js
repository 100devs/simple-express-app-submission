import React, { useEffect, useState } from "react";
import LineItem from "../components/LineItem";

function ListTransactions() {
    const [transactions, setTransactions] = useState([]);    
    useEffect(()=> {
        async function getTransactions() {
            const response = await fetch('/api/transactions');
            if(!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
            const transactions = await response.json();
            setTransactions(transactions);
        }
        getTransactions();
        return;
    }, [transactions.length]);

    function transactionsList() {
        return transactions.map((item) => {
            return <LineItem key = {item._id} transaction = {item} onDelete = {deleteTransaction} />
        })
    }

    const deleteTransaction = (id) => {
        //console.log(`Delete ${id}`);
        async function deleteOne(id) {
            const res = await fetch(
                `/api/transactions/delete/${id}`,
                { method: 'DELETE' }
            );
            if(!res.ok) {
                const message = `Error: ${res.statusText}`;
                window.alert(message);
                return;
            }
            console.log(`Deleted transaction ${id}`);
            setTransactions(transactions.filter((item) => {
                return item._id !== id;
            }))
            return res;
        }
        deleteOne(id);
    }

    return (
        <div>
            <h2>Bobberton's Contracting Inc.</h2>
            <img href="#" alt="Avatar" />
            <p>Bobbert</p>
            <div className="transactions-wrapper">
                <h2>Transaction List</h2>
                <a href="/new-transaction"><button type="button" name="add-new-transaction">Add New</button></a>
                <table>
                    <thead>
                        <tr>
                            <th>Select</th>
                            <th>Date</th>
                            <th>Payer</th>
                            <th>Receiver</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactionsList()}
                    </tbody>
                </table>
                <button type="button" name="delete">Delete</button>
            </div>
        </div>
    )
}

export default ListTransactions;