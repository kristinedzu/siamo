

// fetch("http://kasialaniecka.com/siamo/wp-json/wp/v2/teams")
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (json) {
//         appendTeams(json);
//     });

// function appendTeams(posts) {
//     for (const post of posts) {

//         document.querySelector(".teams").innerHTML += /*html*/`
//             <h3>Name: ${post.acf.teamname}</h3>
//             <p>Points: ${post.acf.p}</p>

//             `;
//     }
// }


// fetch("http://kasialaniecka.com/siamo/wp-json/wp/v2/players")
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (json) {
//         appendPlayers(json);
//     });


// function appendPlayers(posts) {
//     for (const post of posts) {

//         document.querySelector(".players").innerHTML += /*html*/`
//             <h3>Name: ${post.acf.name}</h3>
//             <p>Events participated: ${post.acf.ep}</p>

//             `;
//     }
// }

// GOOGLE SHEETS

const preFix = 'https://spreadsheets.google.com/feeds/list/';
const sheetID = '12hy5bg59X6E6P0b2mMTDjKZKALCoEEpRw0OR2P5Anlg';
const postFixTeams = '/1/public/full?alt=json';
const postFixPlayers = '/2/public/full?alt=json';

fetch(preFix + sheetID + postFixTeams)
    .then(function (response) {
        return response.json();
    })
    .then(function (json) {
        appendEvents(json);
    });

function appendEvents(posts) {
    for (const post of posts.feed.entry) {
        let array = Object.values(post);
        if (post.gsx$event.$t === 'Street Cup 1') {
            document.querySelector(".teams").innerHTML += /*html*/`            
            <h1>Event: ${post.gsx$event.$t}</h1>
            <h3>Team: ${post.gsx$team.$t}</h3>
            <p>Points: ${post.gsx$points.$t}</p>`;
        }
    }
}

fetch(preFix + sheetID + postFixPlayers)
    .then(function (response) {
        return response.json();
    })
    .then(function (json) {
        calculateScores(json);
    });


function calculateScores(posts) {
    let points = 0;
    let ep = 0;
    for (const post of posts.feed.entry) {
        if (post.gsx$player.$t == "Kasia") {
            points += parseFloat(post.gsx$points.$t);
            ep += parseFloat(post.gsx$ep.$t);
        }
    }

    let finalOutput = {
        points: points,
        ep: ep
    }

    document.querySelector(".players").innerHTML += `
    <h3>Name: Kasia</h3>
    <p>Points: ${finalOutput.points}</p>
    <p>EP: ${finalOutput.ep}</p>
    `;
}

function appendPlayers() {
    // document.querySelector(".players").innerHTML += /*html*/`            
    //         <h3>Name: ${post.gsx$player.$t}</h3>
    //         <p>EP: ${post.gsx$ep.$t}</p>
    //         <p>Points: ${points}</p>
    //         `;

}
