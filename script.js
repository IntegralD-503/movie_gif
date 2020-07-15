// Use omdb API for searching/retrieving movies
// http://www.omdbapi.com/?i=tt3896198&apikey=5303e3e1

let omdb_url = "https://www.omdbapi.com/?";
let omdb_key = "apikey=5303e3e1";
let omdb_param = "&s=";
let numCards = 0;

document.getElementById("submit_btn").addEventListener("click", (e) => {
  e.preventDefault();

  let searchKeyword = document.getElementById("search").value;
  let searchURL = omdb_url + omdb_key + omdb_param + searchKeyword;
  // create a new bootstrap card
  let newCard = document.createElement("div");
  newCard.setAttribute("class", "card");
  newCard.setAttribute("id", "myCard");
  let cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card-body");

  // make tags to go inside body
  let cardHeader = document.createElement("h5");
  cardHeader.setAttribute("class", "card-title");
  cardHeader.innerHTML = "View Movies";

  let cardContent = document.createElement("p");
  cardContent.setAttribute("class", "card-text");
  let moviesButton = document.createElement("a");
  moviesButton.setAttribute("class", "btn btn-primary");
  moviesButton.addEventListener("click", (e) => {
    fetchMovies(searchURL);
  });

  cardBody.appendChild(cardHeader);
  cardBody.appendChild(moviesButton);
  newCard.appendChild(cardBody);
  document.getElementById("button_container").appendChild(newCard);
});

function fetchMovies(url) {
  fetch(url)
    .then(function (response) {
      if (response.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + response.status
        );
        return;
      }

      // Examine the text in the response
      response.json().then(function (data) {
        displayData(data);
      });
    })
    .catch(function (err) {
      console.log("Fetch Error :-S", err);
    });
}

function displayData(jsonObj) {
  console.log(jsonObj.Search);

  jsonObj.Search.forEach((movie) => {
    createCard(movie);
  });
  // let count = 0;

  // jsonObj.Search.forEach((element) => {
  //   if(count <= 12)
  //   createCard(element);
  //   count++;
  //   else

  // });
}
// add event listerns to submit button
// create card when button is pressed
// append values to card
//

function createCard(obj) {
  let myDiv = document.createElement("div");
  myDiv.setAttribute("class", "card");

  let header = document.createElement("div");
  header.setAttribute("class", "card-header");
  header.innerHTML = obj.Title;

  myDiv.appendChild(header);

  let img = document.createElement("img");
  img.setAttribute("class", "card-img-top");
  img.setAttribute("src", obj.Poster);

  myDiv.appendChild(img);

  document.getElementById("card_container").appendChild(myDiv);
}

// Bootstrap Card Template
// <div class="card" style="width: 18rem;">
//   <img src="..." class="card-img-top" alt="...">
//   <div class="card-body">
//     <h5 class="card-title">Card title</h5>
//     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//     <a href="#" class="btn btn-primary">Go somewhere</a>
//   </div>
// </div>
