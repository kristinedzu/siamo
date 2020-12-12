// EVENTS
fetch("http://kasialaniecka.com/siamo/wp-json/tribe/events/v1/events")
    .then(function (response) {
        return response.json();
    })
    .then(function (json) {
        appendCalendar(json);
    });

function appendCalendar(data) {
    for (const event of data.events) {
        document.querySelector('.events-calendar').innerHTML += `
        <div class="events-calendar-line" onclick="selectEventId(this.id)" id="${event.id}">
        <p>${event.start_date_details.day}/${event.start_date_details.month}/${event.start_date_details.year}</p>
        <p>${event.title}</p>
        </div>
         `;
    }
}


async function selectEventId(id) {
    let response = await fetch(`http://kasialaniecka.com/siamo/wp-json/tribe/events/v1/events/${id}`);
    let data = await response.json();
    appendEvent(data);
}

function appendEvent(event) {

    console.log(event);
    // add event info
    document.querySelector('.event-info').innerHTML = `
        <h2>${event.title}</h2>
        <div class="event-info-line">
            <p>Date:</p>
            <p>${event.start_date_details.day}/${event.start_date_details.month}/${event.start_date_details.year}</p>
        </div>
        <div class="event-info-line">
            <p>Time:</p>
            <p>${event.start_date_details.hour}/${event.start_date_details.minutes}</p>
        </div>
        <div class="event-info-line">
            <p>Place:</p>
            <p>${event.venue.venue}</p>
        </div>
        <div class="event-info-line">
            <p>Address:</p>
            <p>${event.venue.address}</p>
        </div>
        <div class="event-info-line">
            <p>Price:</p>
            <p>${event.cost}</p>
        </div>
    `;
    //add description
    document.querySelector('.event-description').innerHTML = `
    ${event.description}
    `;


}
