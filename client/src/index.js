import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import NewTransaction from './routes/NewTransaction';
import ListTransactions from './routes/ListTransactions';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} >
        <Route path="new-transaction" element={<NewTransaction />} />
        <Route path="list-transactions" element={<ListTransactions />} />
      </Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);