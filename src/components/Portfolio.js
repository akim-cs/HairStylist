import React from 'react';

const Portfolio = () => {
  const portfolioImages = [
    { src: '/images/IMG_2410.jpeg', alt: 'Modern Fade Cut' },
    { src: '/images/IMG_2556.jpeg', alt: 'Textured Crop Style' },
    { src: '/images/IMG_2639.jpeg', alt: 'Clean Side Part' },
    { src: '/images/IMG_4500.JPG', alt: 'Contemporary Cut' },
    { src: '/images/IMG_4637.JPG', alt: 'Stylish Layer Cut' }
  ];

  return (
    <section className="portfolio">
      <div className="portfolio-container">
        <div className="portfolio-grid">
          {portfolioImages.map((image, index) => (
            <div key={index} className="portfolio-item">
              <img 
                src={image.src} 
                alt={image.alt} 
                className="portfolio-image"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio; 