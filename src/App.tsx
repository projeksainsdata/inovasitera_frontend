import KategoriHome from './components/KategoriHome';
import ProdukHome from './components/ProdukHome';
import AboutHome from './components/AboutHome';
import Footer from './components/Footer';
import Navbar from './components/navbar';
import Hero from './components/Hero';

function App() {
  return (
    <>
    <Navbar/>
    <Hero/>
    <AboutHome/>
    <KategoriHome/>
    <ProdukHome/>
    <Footer/>
    </>
  );
}

export default App;
