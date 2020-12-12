// EVENTS
fetch("http://kasialaniecka.com/siamo/wp-json/tribe/events/v1/events")
    .then(function (response) {
        return response.json();
    })
    .then(function (json) {
        appendEvent(json);
    });

function appendEvent(data) {
    for (const event of data.events) {
        console.log(event);

        document.querySelector('.event').innerHTML += `
            <h1>${event.title}</h1>
            <p>${event.description}</p>
            <p>Date: ${event.start_date_details.day}/${event.start_date_details.month}/${event.start_date_details.year} at ${event.start_date_details.hour}:${event.start_date_details.minutes}</p>
         `;

    }
}