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
        
        </div>
    `;

    document.querySelector(".preview-bg").classList.add("active-bg");

}

function closePhotoPreview() {
    document.querySelector(".photo-preview-container").innerHTML = "";
    document.querySelector(".preview-bg").classList.remove("active-bg");
}
