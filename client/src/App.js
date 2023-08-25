import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './pages/Main/Main';
import Product from './pages/Product/Product';
import Quote from './components/Quote/Quote'; 
import { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import ProductList from './pages/Product/ProductList';
import ProductEditor from './pages/Product/ProductEditor';
import Category from './components/Category/Category';
import Login from './pages/Login/Login';
import { useSelector } from 'react-redux';
import Admin from './pages/Admin/Admin';
import ProductAdmin from './pages/Product/ProductAdmin';
import AdminBar from './pages/Admin/AdminBar';
import Contact from './pages/Contact/Contact';
import About from './pages/About/About';
import Sending from './components/Sending/Sending';

function App() {
  const [ sidebar, setSidebar ] = useState(false)
  const [ sending, setSending ] = useState(false)
  const [ mode, setMode ] = useState("category")
  const isLogined = useSelector((state) => state.user.value.isLogined)
  return (
    <div className="App">
      {
        !isLogined
        ? null
        : <AdminBar />
      }
      <Header setSidebar={ setSidebar } />
      <Sidebar sidebar = { sidebar } setSidebar={ setSidebar } />
      <Sending sending={ sending } />
      <Quote />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/profile' element={<About />} />
        <Route path='/product/' element={<ProductList />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/login' element={<Login />} />
        <Route path='/contact' element={<Contact setSending={ setSending } />} />
        <Route path='/admin' element={
          !isLogined
          ? <Login />
          : <Admin mode={ mode } setMode={ setMode }/>
        } >
          <Route path='' element={<Category setMode={ setMode }/>} />
          <Route path='category' element={<Category setMode={ setMode }/>} />
          <Route path='product' element={<ProductAdmin setMode={ setMode }/>} />
          
          <Route path='editor' element={<ProductEditor setMode={ setMode }/>} />
          <Route path='editor/:id' element={<ProductEditor setMode={ setMode }/>} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
