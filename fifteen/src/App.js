import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import {Route} from 'react-router-dom';
import Index from './pages/index/index';
import Login from './pages/login/login_page';
import Join from './pages/join/join_page';

function App() {
  return (
    <div className="App">
        <Route path='/' component={Index} exact/>
        <Route path='/login' component={Login}/>
        <Route path='/join' component={Join}/>
    </div>
  );
}

export default App;
