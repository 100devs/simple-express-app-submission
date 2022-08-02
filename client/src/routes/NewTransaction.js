function NewTransaction() {
    return (
        <div>
            <h2>Add New Transaction</h2>
            <form action="/api/transactions/add" method="POST">                    
                <label>Payer
                    <input type="text" name="payer" placeholder="Payer Name" />
                    <button type="button" name="add-customer">Add Customer</button>
                </label>
                <label>Receiver
                    <input type="text" name="receiver" placeholder="Receiver Name" />
                    <button type="button" name="add-vendor">Add Vendor</button>
                </label>
                <label>Date
                    <input type="date" name="date"/>
                </label>
                <label>Amount
                    <input type="number" name="amount"/>
                </label>
                <button type="submit" name="confirm">Confirm</button>
                <button type="button" name="cancel">Cancel</button>
            </form>
        </div>
    )
}

export default NewTransaction;