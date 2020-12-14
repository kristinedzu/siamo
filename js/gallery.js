let photos = [
    {
        id: 653,
        path: "./images/gallery/SiamoStreetAirplane-min.jpg"
    },
    {
        id: 625,
        path: "./images/gallery/SiamoStreetBall-min.jpg"
    },
    {
        id: 234,
        path: "./images/gallery/SiamoStreetFootball-min.jpg"
    },
    {
        id: 532,
        path: "./images/gallery/SiamoStreetGuyPointing-min.jpg"
    },
    {
        id: 286,
        path: "./images/gallery/SiamoStreetHappyGuy-min.jpg"
    },
    {
        id: 956,
        path: "./images/gallery/SiamoStreetKick-min.jpg"
    },
    {
        id: 213,
        path: "./images/gallery/SiamoStreetPeople-min.jpg"
    },
]



let galleryEvents = document.querySelectorAll(".gallery-date img");

galleryEvents.forEach(event => event.addEventListener('click', function () { navigateTo("gallery-event") }));

function appendPhotos() {
    for (const photo of photos) {
        document.querySelector(".gallery-event-photos").innerHTML += `
            <img src="${photo.path}" id="${photo.path}" onclick="openPhotoPreview(this.id)">
        `;
    }
}

appendPhotos();

function openPhotoPreview(photoPath) {
    document.querySelector(".photo-preview-container").innerHTML = `
        <div class="photo">
        <span onclick=closePhotoPreview()>&times;</span>
        <img src="${photoPath}" class="photo-preview">
        <img src="../images/next.svg" class="previous" id="${photoPath}" onclick="showPreviousPhoto(this.id)">
        <img src="../images/next.svg" class="next" id="${photoPath}" onclick="showNextPhoto(this.id)">
        </div>
    `;

    document.querySelector(".preview-bg").classList.add("active-bg");

    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

}

function closePhotoPreview() {
    document.querySelector(".photo-preview-container").innerHTML = "";
    document.querySelector(".preview-bg").classList.remove("active-bg");
}

function showNextPhoto(photoPath) {

    let photoObject = photos.find(obj => {
        return obj.path == photoPath;
    })

    let indexOfCurrentPhoto = photos.indexOf(photoObject);
    let indexOfNextPhoto = indexOfCurrentPhoto + 1;


    if (indexOfNextPhoto >= photos.length) {
        openPhotoPreview(photos[0].path);
    } else {
        openPhotoPreview(photos[indexOfNextPhoto].path);
    }

}
function showPreviousPhoto(photoPath) {

    let photoObject = photos.find(obj => {
        return obj.path == photoPath;
    })

    let indexOfCurrentPhoto = photos.indexOf(photoObject);
    let indexOfPreviousPhoto = indexOfCurrentPhoto - 1;

    openPhotoPreview(photos[indexOfPreviousPhoto].path);

}
