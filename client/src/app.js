import React from 'react';

// We use Route in order to define the different routes of our application
import { Route, Routes } from 'react-router-dom';

// We import all the components we need in our app
import Mynavbar from './components/mynavbar';
import RecordList from './components/recordList';

import Edit from './components/edit';
import Create from './components/create';

function App() {
  return (
    <div>
      <Mynavbar />
      <Routes>
        <Route exact path="/" element={<RecordList />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </div>
  );
}

export default App;
