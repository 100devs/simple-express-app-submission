import { useState } from 'react';
import UpdateTransaction from '../components/UpdateTransaction';
import { FaTimes, FaInfoCircle } from 'react-icons/fa';

function LineItem({ transaction, onDelete, onInfo }) {
    const [expand, setExpand] = useState(false);

    return (
        <>
            <tr>
                <td>
                    <input type="checkbox" />
                </td>
                <td>
                    <div className="date">{transaction.date}</div>
                </td>
                <td>
                    <div className="payer">{transaction.payer}</div>
                </td>
                <td>
                    <div className="receiver">{transaction.receiver}</div>
                </td>
                <td>
                    <div className="description">{transaction.description}</div>
                </td>
                <td>
                    <div className="amount">{transaction.amount}</div>
                </td>
                <td>
                    <div className="delete">
                        <FaTimes onClick = {() => onDelete(transaction._id)} />
                    </div>
                </td>
                <td>
                    <div className="details">
                        <FaInfoCircle onClick={() => setExpand(!expand)} />
                    </div>
                </td>
            </tr>
            {expand === true && <tr><td colSpan="8"><UpdateTransaction transaction = {transaction} /></td></tr>}
        </>
    )
}

export default LineItem;