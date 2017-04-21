fetch("events.json")
    .then(response => {
        return response.json();
    }).then(events => {
        const eventsHTML = events.map(event => {
            return `<div class="mainCard">
                <div class="cardPicture">
                    <img class="article-image" src="${event.picture}" border="0" alt="">
                </div>
                <div class="cardHead">
                    <h2 class="cardHeader">${event.heading}</h2>
                </div>
                <div class="cardText">
                    ${event.text}
                </div>
                <div class="cardLink">
                    <a class="cardButton" href="${event.link}" >Read more<span class=""><span class=""></span></span></a>
                </div>
            </div>`;
        }).join("\n");
        const eventsContainer = document.getElementById('events');
        eventsContainer.innerHTML = eventsHTML;
    });
