import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
import Main from './pages/Main/Main';
import Product from './pages/Product/Product';
import Quote from './components/Quote/Quote';

function App() {
  return (
    <div className="App">
      <Header />
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
