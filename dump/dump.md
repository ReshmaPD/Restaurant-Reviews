// Register service worker
// mapboxToken: 'pk.eyJ1IjoicmF2ZW5iIiwiYSI6ImNqbnZkMHRpeTE5eDYzcXBqbDhwNXF5Z20ifQ.QumZTPDgwPABAZJxU_G_5Q',
//image.alt = restaurant.alt;//MOD GO
//image.alt = DBHelper.imageAltForRestaurant(restaurant); //MOD GO adding attribute as per semantics
// image.alt = restaurant.name; MOD MCMR
//image.setAttribute('alt', 'An image of ' + restaurant.name); CG

        // mapboxToken: 'pk.eyJ1IjoicmF2ZW5iIiwiYSI6ImNqbnZkMHRpeTE5eDYzcXBqbDhwNXF5Z20ifQ.QumZTPDgwPABAZJxU_G_5Q',

/\*\*

- Restaurant image ALT. MOD GO
  \*/
  // static imageAltForRestaurant(restaurant) {
  // return (`${restaurant.name}`); //Added Attribute
  // }
  /**
  /**
- Restaurant image ALT. MOD GO
  \*/
  // static imageAltForRestaurant(restaurant) {
  // return (`${restaurant.name}`); //Added Attribute
  // }
  /\*\*
- Restaurant image URL.MOD ME
  // \*/
  // static imageUrlForRestaurant(restaurant) {
  // return (`/img/${restaurant.photograph}`);
  // }

/_ .filter-options h2 {
color: white;
font-size: 1rem;
font-weight: normal;
line-height: 1;
margin: 0 20px;
} _/
/_ MR
label {
visibility: hidden;
} _/

/_ ====================== End Section====================== _/
/_ ====================== Section====================== _/
/_ tested on chrome this delte now 8th nov mediasmall.css _/

/_ #restaurants-list {
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: space-evenly;
padding: 30px 15px 40px 30px;
margin: auto;
} _/

/_ mod 8 IMP CHROME BUG _/
/_ #reviews-container{
padding-right: 0px;
padding-left: 0px;
margin-right: 0px;
} _/
/_ Chrome bug test 8th nov _/
/_ #reviews-container {
padding: 30px 40px 80px;
} _/
/_ Chrome bug test 8th nov _/
/_ #restaurant-container {
padding: 140px 0 40px 0;
} _/

style.css-
/_ mod 8th nov _/
/_ display: block; _/

/_ #restaurant-container {
padding: 140px 30px 30px 30px;
width: 45%;
} _/




//service worker
/** At Service Worker Install time, cache all static assets */
 // Default behavior: respond with cached elements, if any, falling back to network.
 // Since requests made to restaurant.html have search params (like ?id=1), the url can't be used as the
        // key to access the cache, so just respondWith restaurant.html if pathname startsWith '/restaurant.html'
            // if image is in cache, return it, else fetch from network, cache a clone, then return network response

    // Make a new URL with a stripped suffix and extension from the request url
    // i.e. /img/1-medium.jpg  will become  /img/1
    // we'll use this as the KEY for storing image into cache