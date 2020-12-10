

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


// TEAMS
fetch(preFix + sheetID + postFixTeams)
    .then(function (response) {
        return response.json();
    })
    .then(function (json) {
        appendEvents(json);
    });

function appendEvents(data) {
    let entries = data.feed.entry;

    let newEvents = [];
    let newEvent;
    let eventNames = [];
    let noDuplicatesEvents;

    for (const entry of entries) {
        eventNames.push(entry.gsx$event.$t);
        noDuplicatesEvents = [...new Set(eventNames)];

        newEvent = {
            event: entry.gsx$event.$t,
            team: entry.gsx$team.$t,
            points: entry.gsx$points.$t
        }

        newEvents.push(newEvent);
    }



    function groupBy(objectArray, property) {
        return objectArray.reduce(function (acc, obj) {
            let key = obj[property]
            if (!acc[key]) {
                acc[key] = []
            }
            acc[key].push(obj)
            return acc
        }, {})
    }

    let groupedEvents = groupBy(newEvents, 'event');

    for (const event in groupedEvents) {
        if (groupedEvents.hasOwnProperty(event)) {
            const element = groupedEvents[event];
            console.log(element);

            for (const item of element) {

                document.querySelector('.teams').innerHTML += `
                <h3>${item.event}</h3>
                <p>${item.team} - ${item.points} Points</p>`;

            }

        }
    }


}




// function selectEvent(posts) {
//     let entries = posts.feed.entry;
//     let eventNames = [];

//     for (const entry of entries) {
//         eventNames.push(entry.gsx$event.$t);
//     }
//     appendEvents(entries, eventNames);
// }

// function appendEvents(entries, events) {

//     let noDuplicatesEvents = [...new Set(events)];
//     let teamDetailsArray = [];
//     let teamDetails;
//     let name;
//     let points;
//     let event;

//     for (const item of entries) {
//         name = item.gsx$team.$t;
//         points = item.gsx$points.$t;
//         event = item.gsx$event.$t;

//         // document.querySelector('.teams').innerHTML += `
//         //     <p>${teamDetails.name}</p>
//         //     <p>${teamDetails.points}</p>
//         //     `;

//         teamDetails = {
//             name: name,
//             points: points,
//             event: event
//         }

//         teamDetailsArray.push(teamDetails);

//     }


//     for (const event of noDuplicatesEvents) {


//         let finalEvents = {
//             name: event,
//             teamDetails: teamDetails

//         }

//         document.querySelector('.teams').innerHTML += `
//                     <h3>${finalEvents.name}</h3>
//                     <p>${finalEvents.teamDetails}</p>
//                     <p>${finalEvents.teamDetails}</p>
//                     `;
//     }


// }


// PLAYERS
fetch(preFix + sheetID + postFixPlayers)
    .then(function (response) {
        return response.json();
    })
    .then(function (json) {
        calculateScores(json);
    });

function calculateScores(posts) {
    // declare data to update
    let points = 0;
    let ep = 0;

    // sum data
    for (const post of posts.feed.entry) {
        if (post.gsx$player.$t == "Kasia") {
            points += parseFloat(post.gsx$points.$t);
            ep += parseFloat(post.gsx$ep.$t);
        }
    }

    // create new object to display
    let finalOutput = {
        points: points,
        ep: ep
    }


    // display new object with updated data
    document.querySelector(".players").innerHTML += `
    <h3>Name: Kasia</h3>
    <p>Points: ${finalOutput.points}</p>
    <p>EP: ${finalOutput.ep}</p>
    `;
}

