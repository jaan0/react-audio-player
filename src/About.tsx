
function About() {

  return (<>
    <div className="about-page">
      <h1>About Musico</h1>
      <p>
        Musico is a music streaming platform designed to bring you the best
        music experience. Discover new artists, create personalized playlists,
        and enjoy your favorite tunes.
      </p>
      {/* Add more sections as needed */}
      <div className="features">
        <h2>Features:</h2>
        <ul>
          <li>Large music library</li>
          <li>Personalized recommendations</li>
          <li>Offline listening</li>
          {/* ... more features */}
        </ul>
      </div>
      <div className="team">
        <h2>Our Team:</h2>
        <ul>
          <li className="text-[#FFD700]">Ali Jan - CEO</li>
          
        </ul>   
      </div>
    </div>  


 </> );
}

export default About;
