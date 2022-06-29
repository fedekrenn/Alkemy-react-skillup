// Estilo
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Librerías
import { Routes, Route } from "react-router-dom";

// Componentes
import Loguin from "./components/Login/Login";
import Listado from "./components/Listado/Listado";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Loguin />} />
          <Route path="/listado" element={<Listado />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
