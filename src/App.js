import './App.css';
import Tickets from './components/Tickets';
import Guru from './components/Guru';
import GuruTypes from './components/GuruTypes'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
       <Guru />

    </div>
  );
}

export default App;
