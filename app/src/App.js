import logo from './Mira.png';
import './App.css';


<div className = "body"></div>
function App() {
  return (
    <div className="App">
      <div className = "App-logo-container">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
      <div className = "App-background-container">
        <div className = "bg"></div>
      </div>      
    </div>
  );
}

export default App;
