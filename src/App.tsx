import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AudioPlayer } from './components/AudioPlayer';
import Tracks from './Tracks'; // Import your Tracks component
import About from './About';
import logo from './logo/logo.png'; //



function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#011d36]">
        <header className="p-4 bg-black bg-opacity-30 text-white">
          <div className="container mx-auto">
            <div className="flex flex-wrap justify-between items-center">
            <img
            src={logo}
            alt="App Logo"
            width={100}
            height={100}
          />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden text-white focus:outline-none"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
              <nav className={`${isMenuOpen ? 'block' : 'hidden'} lg:flex w-full lg:w-auto mt-4 lg:mt-0`}>
                <ul className="flex flex-col lg:flex-row lg:space-x-4">
                  <li><Link to="/" className="block py-2 hover:text-pink-300">Home</Link></li>
                  <li><Link to="/tracks" className="block py-2 hover:text-pink-300">Tracks</Link></li>
                  <li><Link to="/about" className="block py-2 hover:text-pink-300">About</Link></li>
                  <li><Link to="/contact" className="block py-2 hover:text-pink-300">Contact Us</Link></li>
                </ul>
              </nav>
              <div className="hidden lg:flex space-x-2 mt-4 lg:mt-0">
                <button className="bg-pink-500 hover:bg-pink-900 text-white font-bold py-2 px-4 rounded ">
                  Login
                </button>
                <button className="bg-purple-500 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-grow flex items-center justify-center">
          <Routes>
            <Route path="/" element={
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-5 text-white">
                  Audio player in React
                </h2>
                <AudioPlayer />
              </div>
            } />
            <Route path="/tracks" element={<Tracks />} />
            <Route path="/about" element={<About />} />
            
          </Routes>
        </main>

        <footer className="p-4 bg-black bg-opacity-30 text-white text-center">
          <p>&copy; {currentYear} Created with ❤️ by <a href="https://github.com/jaan0">Jan</a>. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}



export default App;
