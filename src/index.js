document.addEventListener("DOMContentLoaded", () => {


   const baseURL = "http://localhost:3000/films";
   const movieList = document.querySelector("#films");
   const poster = document.querySelector("#poster");
   const title = document.querySelector("#title");
   const runtime = document.querySelector("#runtime");
   const filmInfo = document.querySelector("#film-info");
   const showtime = document.querySelector("#showtime");
   const ticketNum = document.querySelector("#ticket-num");
   const buyTicketButton = document.querySelector("#buy-ticket");

   let currentFilm;


   fetch(baseURL)

   .then((res) => res.json())
   .then((films) => {
   films.forEach((film) => {
   const li = document.createElement("li");
   li.className = "film item";
  li.textContent = film.title;
   li.addEventListener("click", () => displayFilmDetails(film));
   movieList.appendChild(li);
  });

   displayFilmDetails(films[0]);
   });


   function displayFilmDetails(film) {
   currentFilm = film;
   poster.src = film.poster;
   title.textContent = film.title;
    runtime.textContent = `${film.runtime} minutes`;
   filmInfo.textContent = film.description;
  showtime.textContent = film.showtime;
 ticketNum.textContent = `${film.capacity - film.tickets_sold} remaining tickets`;

   if (film.capacity - film.tickets_sold === 0) {
   buyTicketButton.textContent = "Sold Out";
  buyTicketButton.disabled = true;
   } else {

   buyTicketButton.textContent = "Buy Ticket";
  buyTicketButton.disabled = false;
  }
  
   }


 buyTicketButton.addEventListener("click", () => {
   if (currentFilm.tickets_sold < currentFilm.capacity) {
   currentFilm.tickets_sold += 1;
   ticketNum.textContent = `${currentFilm.capacity - currentFilm.tickets_sold} remaining tickets`;


   fetch(`${baseURL}/${currentFilm.id}`, {
  method: "PATCH",
   headers: {
   "Content-Type": "application/json"
  },
  body: JSON.stringify({
   tickets_sold: currentFilm.tickets_sold
  })
   });


   if (currentFilm.tickets_sold === currentFilm.capacity) {
  buyTicketButton.textContent = "Sold Out";
   buyTicketButton.disabled = true;
   }
  }
  });
  });