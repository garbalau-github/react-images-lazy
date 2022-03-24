import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function App() {
  const API_KEY = '<unsplash API key>';
  const url = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=30`;

  const [images, setImages] = useState([]);

  const getImages = () => {
    axios.get(url).then((res) => {
      console.log(res.data);
      setImages(res.data);
    });
  };

  useEffect(() => {
    getImages();
  }, []);

  if (!images || images.length <= 0) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className='App'>
        <header className='App-header'>
          {images.map((image) => {
            return (
              <div>
                <LazyLoadImage
                  effect='blur'
                  height='200px'
                  width='300px'
                  src={image.urls.regular}
                  alt={image.alt_description}
                  key={image.id}
                  placeholderSrc={process.env.PUBLIC_URL + '/logo192.png'}
                />
              </div>
            );
          })}
        </header>
      </div>
    );
  }
}

export default App;
