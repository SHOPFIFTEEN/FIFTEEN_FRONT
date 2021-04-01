import logo from './logo.svg';
import './App.css';
import Header from "./components/header/Header";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Footer from './components/footer/Footer';
import Sidenav from './components/sidenav/Sidenav';

function App() {
  return (
    <div className="App">
      <Header/>
      <Sidenav />
      <Footer/>
    </div>
  );
}

export default App;
