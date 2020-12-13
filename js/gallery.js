fetch("http://kasialaniecka.com/siamo/wp-json/wp/v2/posts?_embed")
    .then(function (response) {
        return response.json();
    })
    .then(function (json) {
        appendGallery(json);
    });


function appendGallery(posts) {
    for (const post of posts) {
        // console.log(post);
    }
}