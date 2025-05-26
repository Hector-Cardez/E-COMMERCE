import "../styles/About.css";

function About() {
  return (
    <div className="about-container">
      <div className="animated-text">
        <span className="word">WE</span>
        <span className="word">SERVE</span>
        <span className="word">ATHLETES</span>
      </div>
      <div className="video-container">
        <iframe
          width="660"
          height="415"
          src="https://www.youtube.com/embed/CStMPHXMEhQ?si=V3sykS5eoBKl6pum&controls=0"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </div>
  );
}

export default About;
