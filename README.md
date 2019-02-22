# Restaurant Reviews -Stage I Project

[Live Website](https://reshma-restaurant-reviews.netlify.com)

**[Starter Code](https://github.com/udacity/mws-restaurant-stage-1) The starter code from Udacity was provided.Goal was convert a static webpage design that lacks accessibility and convert the design to be responsive on different sized displays and accessible for screen reader use and also add a service worker to begin the process of creating a seamless offline experience for our users.**

## Table of Contents
* [About the Application](#about-the-application)
* [Application dependencies](#application-dependencies)
* [How to Run the Application](#how-to-run-the-application)
* [Application Functionalities](#application-functionalities)
* [Resources](#resources)
* [Technologies](#technologies)
* [Contributing](#contributing)

## About the Application

A **Restaurant Reviews** web application about your neighbourhood restaurants, which is designed as per web accesibility standards and also to be responsive on different sized displays and accessible for screen reader use.The added functionality of service worker creates a seamless offline experience for the users


## Application-dependencies

            This application Requires Active Internet Connection to Run

* Our app uses [leafletjs](https://leafletjs.com/) for mobile-friendly interactive maps
* Our app uses [Mapbox](https://www.mapbox.com/) to display maps for restuarant location
* Our app uses [Normalize CSS](https://necolas.github.io/normalize.css/) for better cross-browser consistency


## How to Run the Application

 1. Download the zip folder and unzip it.
 2. _Open_ the main folder
 3. Do the _any_ of following two *options*  
        i. In this folder open the **terminal** and type `npm start` OR  
        ii.In this folder open the **terminal**, check the version of Python you have: `python -V`.
            If you have Python 2.x, spin up the server with `python -m SimpleHTTPServer 8887`  
            (or some other port, if port 8000 is already in use.)
            For Python 3.x, you can use `python3 -m http.server 8887`.
 4. With your server running, visit the site: `http://localhost:8887`


## Application-Functionalities

### 1. The application is reponsive on a variety of displays which is implemented using

    * Flexbox
    * Media queries
    * Gulp-responsive images
    * Srcset and sizes attributes


### 2. The application is designed as per web accesiblity standards and accessible for screen reader use which is implemented using

    * Alt attribtes for Images
    * Tabindex to implement focus on important content
    * Aria-labels and Skip links on important content
    * Semantic HTML


### 3. The application has functionality of service worker creates a seamless offline experience for the users implemented using

    * Caching api techniques of the service worker
    * Caching lets the user see the visted content even when they choose to go offline


## Resources

### 1. Responsive design Implementation
* [Responsive Image](https://developers.google.com/web/ilt/pwa/lab-responsive-images)
* [Responsive Image Course](https://in.udacity.com/course/responsive-images--ud882)
* [Media Queries](https://css-tricks.com/snippets/css/media-queries-for-standard-devices/)
* [Favicon](https://gauger.io/fonticon/)
* [gulp-responsive](https://www.npmjs.com/package/gulp-responsive)
* [gulp setup](https://github.com/AlexandroPerez/mws-gulp-setup)
* [flexbox article](https://blog.teamtreehouse.com/responsive-design-of-the-future-with-flexbox)


### 2. Web Accesibility Implementation
* [Web Accessibility](https://in.udacity.com/course/web-accessibility--ud891)
* [Accessibility](https://learn-the-web.algonquindesign.ca/topics/accessibility/)
* [ChromeVox Extention](https://chrome.google.com/webstore/detail/chromevox/)
* [chrispederick](https://chrome.google.com/webstore/detail/web-developer/)

### 3. Service Worker Implementation
* [Offline Web Appilcation](https://in.udacity.com/course/offline-web-applications--ud899)
* [Service-Workers](https://developers.google.com/web/fundamentals/primers/service-workers/)
* [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers#The_premise_of_service_workers)
* [Offline Cookbook](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/)
* [Cache Images](https://classroom.udacity.com/courses/ud899/lessons/6381510082/concepts/63774101810923)

## Technologies

* Visual Studio Code Editor
* Javascript
* HTML
* CSS

## Contributing
Any suggestions are welcome.


