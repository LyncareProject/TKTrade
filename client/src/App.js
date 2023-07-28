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

function App() {
  const [ sidebar, setSidebar ] = useState(false)
  return (
    <div className="App">
      <Header setSidebar={ setSidebar } />
      <Sidebar sidebar = { sidebar } setSidebar={ setSidebar } />
      <Quote />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/category' element={<Category />} />
        <Route path='/product/' element={<ProductList />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/product/editor' element={<ProductEditor />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
