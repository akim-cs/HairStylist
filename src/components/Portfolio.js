import React from 'react';

const images = [
  { src: `${process.env.PUBLIC_URL}/images/IMG_2410.jpeg`, alt: 'Modern Fade Cut' },
  { src: `${process.env.PUBLIC_URL}/images/IMG_2556.jpeg`, alt: 'Textured Crop Style' },
  { src: `${process.env.PUBLIC_URL}/images/IMG_2639.jpeg`, alt: 'Clean Side Part' },
  { src: `${process.env.PUBLIC_URL}/images/IMG_4500.JPG`, alt: 'Contemporary Cut' },
  { src: `${process.env.PUBLIC_URL}/images/IMG_4637.JPG`, alt: 'Stylish Layer Cut' },
];

const Portfolio = () => {
  return (
    <section className="portfolio">
      <p className="portfolio-label">Selected Work</p>
      <div className="portfolio-grid">
        {images.map((img, i) => (
          <div key={i} className={`portfolio-grid-item item-${i}`}>
            <img src={img.src} alt={img.alt} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
