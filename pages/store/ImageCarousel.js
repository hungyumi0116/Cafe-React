import React, { useState } from 'react'
import Slider from 'react-slick'
import Image from 'next/image'

const images = [
  { src: '/images/pic2.jpg', alt: 'Image2' },
  { src: '/images/pic3.jpg', alt: 'Image 3' },
  { src: '/images/pic4.jpg', alt: 'Image 4' },
  { src: '/images/pic5.jpg', alt: 'Image 5' },
]

const ImageCarousel = () => {
  const [currentImage, setCurrentImage] = useState(images[0])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '200px' }}>
        {images.map((image, index) => (
          <images
            key={index}
            src={image.src}
            alt={image.alt}
            style={{ cursor: 'pointer', width: '100%', marginBottom: '10px' }}
            onClick={() => setCurrentImage(image)}
          />
        ))}
      </div>
      <div style={{ flex: 1 }}>
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <img src={image.src} alt={image.alt} style={{ width: '100%' }} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default ImageCarousel
