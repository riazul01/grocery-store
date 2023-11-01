import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// auth
import Login from './auth/Login';
import Signup from './auth/Signup';

// pages
import Home from './pages/Home';
import Groceries from './pages/Groceries';
import Beverages from './pages/Beverages';
import RawProducts from './pages/RawProducts';
import TrendingProducts from './pages/TrendingProducts';
import CategoryProducts from './pages/CategoryProducts';
import SearchResults from './pages/SearchResults';

// user
import Profile from './pages/Profile';
import UpdateProfile from './pages/UpdateProfile';
import Orders from './pages/Orders';

// cart
import Cart from './pages/Cart';

// context
import { LoginContext } from './context/LoginContextProvider';

// style
import './App.css';
import OfferDetails from './pages/OfferDetails';
import About from './pages/About';

const App = () => {
  const { currentUser } = useContext(LoginContext);

  const RequireAuth = ({children}) => {
    return currentUser ? (children) : <Navigate to="/user/login" replace/>
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* pages */}
        <Route path="/" element={<Home/>}/>
        <Route path="/groceries" element={<Groceries/>}/>
        <Route path="/groceries/beverages" element={<Beverages/>}/>
        <Route path="/groceries/raw-products" element={<RawProducts/>}/>
        <Route path="/groceries/trending-now" element={<TrendingProducts/>}/>
        <Route path="/groceries/search-results" element={<SearchResults/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/offers/offer-details" element={<OfferDetails/>}/>

        {/* categories */}
        <Route path="/groceries/beverages/:category" element={<CategoryProducts/>}/>
        <Route path="/groceries/trending-now/:category" element={<CategoryProducts/>}/>
        <Route path="/groceries/raw-products/:category" element={<CategoryProducts/>}/>
        
        {/* auth */}
        <Route path="/user/login" element={<Login/>}/>
        <Route path="/user/register" element={<Signup/>}/>

        {/* user */}
        <Route path="/user/profile" element={<RequireAuth><Profile/></RequireAuth>}/>
        <Route path="/user/update-profile" element={<RequireAuth><UpdateProfile/></RequireAuth>}/>
        <Route path="/user/orders" element={<RequireAuth><Orders/></RequireAuth>}/>
        
        {/* cart */}
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;