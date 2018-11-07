    "presets": [ "es2015" ]
    "babel-preset-es2015": "^6.24.1",


    "babel-preset-env": "^1.7.0",

 /**
   * Restaurant sizes attribute so browser knows image sizes before deciding
   * what image to download.
   */
  static imageSizesForRestaurant(restaurant) {
    return `(max-width: 360px) 280px,
            (max-width: 600px) 600px,
            (max-width: 1485px) 600px,
            400px`;
  }
 /**
 static imageSrcsetForRestaurant(restaurant) {
    const imageSrc = `/img/${(restaurant.photograph.split('.')[0]||restaurant.id)}`;
    return `${imageSrc}-small.jpg 300w,
            ${imageSrc}-medium.jpg 600w,
            ${imageSrc}-large.jpg 800w`;
  }