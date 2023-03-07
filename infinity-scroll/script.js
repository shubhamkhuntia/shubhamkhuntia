
let photosArray = [];
const imageContainer = document.getElementById('image-container');
// Helper func for setting attributes
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
        
    }
}

let loaded = 0;
let totalimages = 0;
let ready = false;
function imageLoaded(){
    loaded++;
    if(loaded === totalimages){
        ready = true;
        loader.hidden = true;
        count=30;
    }
}

function displayPhotos() {

    totalimages = photosArray.length;
    loaded = 0;
    photosArray.forEach(function passingEachPhoto(photo){
        // Creating <a>
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Creating img
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            // title: photo.alt.description,
        });
        img.addEventListener('load', imageLoaded);
        // Appending img inside a & then a inside image container
        item.appendChild(img);
        imageContainer.appendChild(item);


    })
}

// Unsplash API making
const count = 5;
const apiKey = 'mKW9tl7dUqYQpqTc62due3wcxulHip6IH1UH3qe_9lI';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Getting photos from Unsplash API
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        const data = await response.json();
        photosArray = data;
        displayPhotos();
        
    } catch(error) {

    }
}

// To check if scrollong near bottom of page to load more photos
window.addEventListener('scroll', function exec(){
    if(this.window.scrollY + this.window.innerHeight > this.document.body.offsetHeight -1000 && ready){
        ready=false;
        getPhotos();
        
    }
});

// To know how many images are loaded


// Loading
getPhotos();
