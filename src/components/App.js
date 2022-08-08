import AuthProvider from "../contexts/AuthContext";
import Signup from "./Authentication/Signup";
import Login from "./Authentication/Login";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' 
import PrivateRoute from "./Authentication/PrivateRoute";
import ForgotPassword from "./Authentication/ForgotPassword";
import UpdateProfile from "./Authentication/UpdateProfile";
import Header from "./Header";
import Selection from "./Selection";
import Coffee from "./Coffee";
import Profile from "./Profile";
import Nav from "./Nav";

function App() {
  return (
      // <Container className="d-flex align-items-center justify-content-center"
      //   style={ {minHeight: "100vh" }}>
      //     <div className="w-300" style= {{ maxWidth: "800px" }}>
            <Router>
              <AuthProvider>
                <Routes>
                  {/* <Route exact path ='/' element={<PrivateRoute><Dashboard /></PrivateRoute>} /> */}
                  <Route path='/' exact element={<PrivateRoute> <Nav /> <Header /> <Selection /></PrivateRoute>} />
                  <Route path ='/update-profile' element={<PrivateRoute><UpdateProfile /></PrivateRoute>} />
                  <Route path="/signup" element={<Signup/>} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/coffee" element={<><Nav /> <Coffee /></>} />
                </Routes>
              </AuthProvider>
            </Router>
      //     </div>
      // </Container>
  );
}

export default App;
