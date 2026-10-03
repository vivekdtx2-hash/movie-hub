

// API = "https://www.omdbapi.com/?apikey=3eed3bad&t=avenger"

const moveiForm = document.querySelector("#moveiForm");
const movieInput = document.querySelector("#movieInput");
const movieHub = document.querySelector("#movieHub");
const searchSection = document.querySelector("#searchSection");
const popularMovies = document.querySelector("#popularMovies");
const loginBtn = document.querySelector("#loginBtn");





moveiForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let query = movieInput.value.trim()

    if (!query) {
        return
    }
    console.log(query);
    searchMovie(query)
})

movieHub.classList.remove("hidden");
movieHub.classList.add("grid");
// async function searchMovie(movieName) {

//     movieHub.innerHTML = ` <div class="loader"></div>`

//     let response = await fetch(`https://www.omdbapi.com/?apikey=3eed3bad&s=${encodeURIComponent(movieName)}`)
//     let data = await response.json()
//     console.log(data);

//     if (data.Response === "True") {
//         displayMovies(data.Search)
//     }else{
//         console.log(data.Error)
//          movieHub.innerHTML = ` <p>${data.Error}</p>`

//     }
// }


async function searchMovie(movieName) {

    searchSection.classList.remove("hidden");
    popularMovies.style.display = "none";



    movieHub.innerHTML = `
        <p class="text-white text-lg col-span-full">
            Searching...
        </p>
    `;

    try {

        let response = await fetch(
            `https://www.omdbapi.com/?apikey=3eed3bad&s=${encodeURIComponent(movieName)}`
        );

        let data = await response.json();

        console.log(data);

        if (data.Response === "True") {

            displayMovies(data.Search);

        } else {

            movieHub.innerHTML = `
                <p class="text-red-400 text-lg col-span-full">
                    ${data.Error}
                </p>
            `;

        }

    } catch (error) {

        console.error(error);

        movieHub.innerHTML = `
            <p class="text-red-400 text-lg col-span-full">
                Something went wrong. Please try again.
            </p>
        `;
    }
}

// function displayMovies(movies) {

//     movieHub.innerHTML = ""

//     movies.forEach((movie) => {
//         const div = document.createElement("div")
//         div.dataset.imdbID = movie.imdbID
//         div.setAttribute("class", "movie-card")

//         div.innerHTML = `
//             <div>
//                 <img src=${movie.Poster} alt="">
//             </div>
//             <div>
//                 <p>${movie.Title}</p>
//                 <p>${movie.Year}</p>
//             </div>

//           `

//         //   div.addEventListener("click" ,(e) => {
//         //     console.log(movie.imdbID);
//         //   })
//         movieHub.append(div)

//     })
// }


function displayMovies(movies) {

    movieHub.innerHTML = "";

    // movieHub.classList.remove("hidden");
    // movieHub.classList.add("grid");
    // movieHub.classList.add("hidden");

    movies.forEach((movie) => {

        const div = document.createElement("div");

        // div.dataset.imdbId = movie.imdbID;

        div.className =
            "movie-card cursor-pointer bg-[#11191f] border border-[#273138] rounded-xl overflow-hidden hover:-translate-y-1.5 hover:border-yellow-400 transition";

        div.dataset.imdbId = movie.imdbID;

        div.innerHTML = `
            
            <img 
                src="${movie.Poster !== "N/A" ? movie.Poster : "poster.jpg"}"
                alt="${movie.Title}"
                class="w-full aspect-[2/3] object-cover"
            >

            <div class="p-4">

                <h3 class="text-white text-[17px] font-semibold mb-2">
                    ${movie.Title}
                </h3>

                <p class="text-gray-500 text-sm">
                    ${movie.Year}
                </p>

            </div>
        `;

        movieHub.appendChild(div);
    });
}

// movieHub.addEventListener("click" , (e) => {
//     e.stopPropagation();
//    const movieCard = e.target.closest(".movie-card")
//    const imdbID = movieCard.dataset.imdbID
//   location.href = `Movie-details.html?id=${imdbID}`

// })

document.addEventListener("click", (e) => {

    const movieCard = e.target.closest(".movie-card");

    if (!movieCard) {
        return;
    }

    const imdbID = movieCard.dataset.imdbId;

    if (imdbID) {
        location.href = `Movie-details.html?id=${imdbID}`;
    }

});

const watchNowBtn =
    document.querySelector("#watchNowBtn");

watchNowBtn.addEventListener("click", () => {
    location.href = "Movies.html";
})






const watchlistBtn = document.querySelector("#watchlistBtn");

watchlistBtn.addEventListener("click", () => {

    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

    const movie = {
        imdbID: "tt1375666",
        title: "Inception",
        year: "2010"
    };

    const alreadyAdded = watchlist.some(
        item => item.imdbID === movie.imdbID
    );

    if (!alreadyAdded) {
        watchlist.push(movie);

        localStorage.setItem(
            "watchlist",
            JSON.stringify(watchlist)
        );

        watchlistBtn.innerHTML = "✓ Added to Watchlist";
    } else {
        watchlistBtn.innerHTML = "✓ Already Added";
    }
});




const savedUser = localStorage.getItem("movieHubUser");

if (savedUser && loginBtn) {

    const firstLetter = savedUser.charAt(0).toUpperCase();

    loginBtn.textContent = firstLetter;

    loginBtn.classList.remove("bg-yellow-400", "text-black");

    loginBtn.classList.add(
        "w-10",
        "h-10",
        "rounded-full",
        "bg-yellow-400",
        "text-black",
        "font-bold"
    );
}
