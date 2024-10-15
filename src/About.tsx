
import { FaGithub, FaEnvelope, FaGlobe,  FaInstagram } from 'react-icons/fa';

function About() {

  return (<>
    <div className="about-page">
      <h1 className='text-4xl font-bold text-center text-[#3be377]'>About Musico</h1><br />
        <p className='text-white'>
        Musico is a free music streaming website where you can find your favorite songs.
        If a song you're looking for isn't available, you can make a request, and we'll
        upload it for you. This platform is designed to bring you the best music experience,
        allowing you to discover new artists, create personalized playlists, and enjoy your
        favorite tunes.
      </p>
      <br />
      <p className='text-white'>
        Musico is single-handedly developed by <a href="https://github.com/jaan0" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#3be377]">Ali Jan</a>, a passionate developer with several
        other exciting projects under his belt.
      </p>
      {/* Add more sections as needed */}
      <div className="features ">
        <h2 className='font-bold text-2xl text-[#3be377] text-center'>Features:</h2>
        <br />
        <ul >
          <li className='text-white'>Large music library</li>
          <li className='text-white'>Personalized recommendations</li>
          <li className='text-white'>Offline listening</li>
          {/* ... more features */}
        </ul>
      </div>
      <div className="team">
        <h2 className='font-bold text-2xl text-[#3be377] text-center'>Our Team:</h2> 
        <br />
        <br />
          <p className="text-white text-center"><a href="https://github.com/jaan0" target="_blank" rel="noopener noreferrer" className="text-[#0c7531] hover:text-[#3be377]">●     Ali Jan</a> - Developer</p>  
      </div>
      <hr className='my-12 border-2 border-[#232323]' />
      <div className="contact-links mt-4 flex flex-col items-center mt-12]">
        <h2 className='text-2xl font-bold text-[#3be377] text-center'>Connect with us:</h2>
        <br />
        <div className="flex space-x-4 mt-2">
          <a href="https://github.com/jaan0" target="_blank" rel="noopener noreferrer" className="text-[#0c7531] hover:text-[#3be377]">
            <FaGithub size={24} />
          </a>
          <a href="mailto:ali.mahesar04@gmail.com" className="text-[#0c7531] hover:text-[#3be377]">
            <FaEnvelope size={24} />
          </a>
          <a href="https://portfolio-ali-jans-projects.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-[#0c7531] hover:text-[#3be377]">
            <FaGlobe size={24} />
          </a>
          < a href="https://www.instagram.com/a.l.i._.j.a.a.n/" target="_blank" rel="noopener noreferrer" className="text-[#0c7531] hover:text-[#3be377]">
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
    </div>  


 </> );
}

export default About;
