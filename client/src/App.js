
import './App.css';
import Nav from './Components/Nav/Nav';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Pages/home/Home';


import Profile from './Pages/profile/Profile';
import Signup from './Pages/Signup/Signup';
import Login from './Pages/Login/Login';
import NewRecipe from './Pages/NewRecipe/NewRecipe';
import CategoryPage from './Pages/CategoryPage/CategoryPage';
import RecipePage from './Pages/RecipePage/RecipePage';
import EditRecipe from './Pages/EditRecipe/EditRecipe';

function App() {

  

  return (
    <div className="App">
      <div className="blur" style={{ top: '-10%', left: '0' }}></div>
      <div className="blur" style={{ top: '36%', right: '2rem' }}></div>
      <BrowserRouter>
      <Nav />
        <Routes>
          <Route path = '/' element = {<Home />} />
          <Route path = '/profile/:id' element = {<Profile />} />
          <Route path = '/new-recipe' element = {<NewRecipe />} />
          <Route path = '/recipes/:id' element = {<RecipePage />} />
          <Route path = '/recipes/:id/edit' element = {<EditRecipe />} />
          <Route path = '/signup' element = {<Signup />} />
          <Route path = '/login' element = {<Login />} />
          <Route path = '/category/:category' element = {<CategoryPage />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
