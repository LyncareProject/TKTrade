import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './pages/Main/Main';
import Product from './pages/Product/Product';
import Quote from './components/Quote/Quote'; 
import { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  const [ sidebar, setSidebar ] = useState(false)
  return (
    <div className="App">
      <Header setSidebar={ setSidebar } />
      <Sidebar sidebar = { sidebar } setSidebar={ setSidebar } />
      <Quote />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/product/:id' element={<Product />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
