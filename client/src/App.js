import { Link, Outlet } from "react-router-dom";

function App () {
    return (
        <div className="menu">
            {process.env.NODE_ENV === 'development' && <p>Running in {process.env.NODE_ENV} mode.</p>}
            <nav>
                <Link to="/">Home</Link>
                <Link to="/new-transaction">New Transaction</Link>
                <Link to="/list-transactions">List Transactions</Link>
            </nav>
            <Outlet />
        </div>
    )
}

export default App;