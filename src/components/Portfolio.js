import React, { useState } from 'react';

const Portfolio = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const portfolioImages = [
    { src: `${process.env.PUBLIC_URL}/images/IMG_2410.jpeg`, alt: 'Modern Fade Cut' },
    { src: `${process.env.PUBLIC_URL}/images/IMG_2556.jpeg`, alt: 'Textured Crop Style' },
    { src: `${process.env.PUBLIC_URL}/images/IMG_2639.jpeg`, alt: 'Clean Side Part' },
    { src: `${process.env.PUBLIC_URL}/images/IMG_4500.JPG`, alt: 'Contemporary Cut' },
    { src: `${process.env.PUBLIC_URL}/images/IMG_4637.JPG`, alt: 'Stylish Layer Cut' }
  ];

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === portfolioImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? portfolioImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="portfolio">
      <div className="portfolio-container">
        <div className="portfolio-carousel">
          <button className="carousel-nav carousel-prev" onClick={prevImage}>
            ←
          </button>

          <div className="portfolio-deck">
            {portfolioImages.map((image, index) => (
              <div
                key={index}
                className={`portfolio-card ${index === currentIndex ? 'active' : ''} ${index < currentIndex ? 'prev' : ''} ${index > currentIndex ? 'next' : ''}`}
                style={{
                  transform: `translateX(${(index - currentIndex) * 100}%)`,
                  opacity: index === currentIndex ? 1 : 0,
                  zIndex: index === currentIndex ? 10 : 1
                }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="portfolio-image"
                />
              </div>
            ))}
          </div>

          <button className="carousel-nav carousel-next" onClick={nextImage}>
            →
          </button>
        </div>

        <div className="portfolio-indicators">
          {portfolioImages.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio; 