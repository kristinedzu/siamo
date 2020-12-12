// fetch all events
fetch("http://kasialaniecka.com/siamo/wp-json/tribe/events/v1/events")
    .then(function (response) {
        return response.json();
    })
    .then(function (json) {
        appendCalendar(json);
    });



function appendCalendar(data) {
    // group events by months
    // var eventsByMonth = {};
    // for (var key in data.events) {
    //     var month = data.events[key].start_date_details.month;
    //     if (!eventsByMonth[month]) {
    //         eventsByMonth[month] = [];
    //     }
    //     eventsByMonth[month].push(data.events[key]);
    // }

    for (const event of data.events) {
        document.querySelector('.events-calendar').innerHTML += `
        <div class="events-calendar-line" onclick="selectEventId(this.id)" id="${event.id}">
        <p>${event.start_date_details.day}/${event.start_date_details.month}/${event.start_date_details.year}</p>
        <p>${event.title}</p>
        </div>
         `;
    }

    // append first upcoming event
    addEventInfo(data.events[0]);

}

//fetch selected event
async function selectEventId(id) {
    let response = await fetch(`http://kasialaniecka.com/siamo/wp-json/tribe/events/v1/events/${id}`);
    let data = await response.json();
    addEventInfo(data);
}

// add event info based on the selected event
function addEventInfo(e) {
    document.querySelector('.event-info').innerHTML = `
    <h2>${e.title}</h2>
    <div class="event-info-line">
        <p>Date:</p>
        <p>${e.start_date_details.day}/${e.start_date_details.month}/${e.start_date_details.year}</p>
    </div>
    <div class="event-info-line">
        <p>Time:</p>
        <p>${e.start_date_details.hour}/${e.start_date_details.minutes}</p>
    </div>
    <div class="event-info-line">
        <p>Place:</p>
        <p>${e.venue.venue}</p>
    </div>
    <div class="event-info-line">
        <p>Address:</p>
        <p>${e.venue.address}</p>
    </div>
    <div class="event-info-line">
        <p>Price:</p>
        <p>${e.cost}</p>
    </div>
    `;

    //add description
    document.querySelector('.event-description').innerHTML = `
    ${e.description}
    `;

}

// sign up modal
let signUpBtn = document.querySelector(".signup-button");

signUpBtn.addEventListener('click', showSignUpModal);

function showSignUpModal() {
    console.log('hi');
}
