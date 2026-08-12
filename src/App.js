// import './App.css';
import './css/style.css'
// import './js/script.js'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ScrollToTop from './components/ScrollToTop';
import Starfield from './components/Starfield';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="bg-black text-white">
        {/* One viewport-sized canvas for the entire site. Being fixed, it sits
            at z-1 above every section background -- including SectionMenu's
            opaque photo, which used to hide the stars -- while all content
            sits at z-10 or above. One instance means one animation loop and a
            star density that never changes with page length. */}
        <Starfield fixed direction="down-left" density={1} meteorRate={1} maxMeteors={4} />
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
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
