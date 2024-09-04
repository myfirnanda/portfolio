import logo from './logo.svg';
// import './App.css';
import './css/style.css'
// import './js/script.js'

import Header from './layouts/Header';
import Main from './layouts/Main';
import Footer from './layouts/Footer';

function App() {
  return (
    <body class="bg-black text-white">
      <Header />
      <Main />
      <Footer />
    </body>
  )
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React Yookkss
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
