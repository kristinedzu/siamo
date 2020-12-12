
fetch("http://kasialaniecka.com/siamo/wp-json/wp/v2/posts?_embed")
    .then(function (response) {
        return response.json();
    })
    .then(function (json) {
        selectEvent(json);
    });

function selectEvent(posts) {
    let categories = [];
    let noDuplicatedCategories;

    for (const post of posts) {
        categories.push(post.categories);
        let flatCategories = categories.flat();
        noDuplicatedCategories = [...new Set(flatCategories)];

        // document.querySelector('.teams').innerHTML += `
        // <h3>${post.acf.event_name}</h3>
        // `;
    }
    eventSelected(noDuplicatedCategories);
}

async function eventSelected(categories) {
    let response = await fetch(`http://kasialaniecka.com/siamo/wp-json/wp/v2/posts?_embed&categories=${categories}`);
    let data = await response.json();
    appendEventsByCategory(data);
}

function appendEventsByCategory(posts) {


    let eventNames = []


    for (const post of posts) {

        eventNames.push(post.acf.event_name);

        if (post.acf.event_name) {
            document.querySelector('.teams').innerHTML += `
            <p>${post.acf.team_name} - ${post.acf.points} points</p>
            `;
        }
    }

    let seen = new Set();
    var hasDuplicates = eventNames.some(function (currentObject) {
        return seen.size === seen.add(currentObject.name).size;
    });

}



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

// // GOOGLE SHEETS

// const preFix = 'https://spreadsheets.google.com/feeds/list/';
// const sheetID = '12hy5bg59X6E6P0b2mMTDjKZKALCoEEpRw0OR2P5Anlg';
// const postFixTeams = '/1/public/full?alt=json';
// const postFixPlayers = '/2/public/full?alt=json';


// // TEAMS
// fetch(preFix + sheetID + postFixTeams)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (json) {
//         appendEvents(json);
//     });

// function appendEvents(data) {
//     let entries = data.feed.entry;

//     let newEvents = [];
//     let newEvent;
//     let eventNames = [];
//     let noDuplicatesEvents;

//     for (const entry of entries) {
//         eventNames.push(entry.gsx$event.$t);
//         noDuplicatesEvents = [...new Set(eventNames)];

//         newEvent = {
//             event: entry.gsx$event.$t,
//             team: entry.gsx$team.$t,
//             points: entry.gsx$points.$t
//         }

//         newEvents.push(newEvent);
//     }



//     function groupBy(objectArray, property) {
//         return objectArray.reduce(function (acc, obj) {
//             let key = obj[property]
//             if (!acc[key]) {
//                 acc[key] = []
//             }
//             acc[key].push(obj)
//             return acc
//         }, {})
//     }

//     let groupedEvents = groupBy(newEvents, 'event');

//     for (const event in groupedEvents) {
//         if (groupedEvents.hasOwnProperty(event)) {
//             const element = groupedEvents[event];
//             console.log(element);

//             for (const item of element) {

//                 document.querySelector('.teams').innerHTML += `
//                 <h3>${item.event}</h3>
//                 <p>${item.team} - ${item.points} Points</p>`;

//             }

//         }
//     }


// }


// // PLAYERS
// fetch(preFix + sheetID + postFixPlayers)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (json) {
//         calculateScores(json);
//     });

// function calculateScores(posts) {
//     // declare data to update
//     let points = 0;
//     let ep = 0;

//     // sum data
//     for (const post of posts.feed.entry) {
//         if (post.gsx$player.$t == "Kasia") {
//             points += parseFloat(post.gsx$points.$t);
//             ep += parseFloat(post.gsx$ep.$t);
//         }
//     }

//     // create new object to display
//     let finalOutput = {
//         points: points,
//         ep: ep
//     }


//     // display new object with updated data
//     document.querySelector(".players").innerHTML += `
//     <h3>Name: Kasia</h3>
//     <p>Points: ${finalOutput.points}</p>
//     <p>EP: ${finalOutput.ep}</p>
//     `;
// }
