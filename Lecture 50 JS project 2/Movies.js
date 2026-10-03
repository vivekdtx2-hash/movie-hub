

const API_KEY = "3eed3bad&s";

const moviesGrid = document.querySelector("#moviesGrid");
const movieModal = document.querySelector("#movieModal");
const movieDetails = document.querySelector("#movieDetails");
const closeModal = document.querySelector("#closeModal");


const movieIDs = [
    "tt1375666", // Inception
    "tt0816692", // Interstellar
    "tt0468569", // The Dark Knight
    "tt0137523", // Fight Club
    "tt0133093", // The Matrix
    "tt0111161", // Shawshank Redemption
    "tt0109830", // Forrest Gump
    "tt0110912", // Pulp Fiction
    "tt0167260", // LOTR
    "tt0120737"  // LOTR
];


async function loadMovies() {

    moviesGrid.innerHTML = `
        <p class="text-gray-400 col-span-full">
            Loading movies...
        </p>
    `;

    for (const id of movieIDs) {

        try {

            const response = await fetch(
                `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`
            );

            const movie = await response.json();

            if (movie.Response === "True") {
                createMovieCard(movie);
            }

        } catch (error) {

            console.log(error);

        }

    }
}


function createMovieCard(movie) {

    const card = document.createElement("div");

    card.className = `
        group cursor-pointer
        bg-[#11191f]
        border border-white/10
        rounded-2xl
        overflow-hidden
        hover:-translate-y-2
        hover:border-yellow-400
        transition-all duration-300
    `;

    card.innerHTML = `

        <div class="relative overflow-hidden">

            <img
                src="${movie.Poster !== "N/A" ? movie.Poster : "poster.jpg"}"
                alt="${movie.Title}"
                class="w-full h-[300px] object-cover
                       group-hover:scale-105 transition duration-500"
            >

            <div class="absolute inset-0
                        bg-gradient-to-t from-black/80
                        via-transparent to-transparent">
            </div>

            <span class="absolute top-3 right-3
                         bg-yellow-400 text-black
                         px-2 py-1 rounded-lg
                         text-sm font-bold">

                ⭐ ${movie.imdbRating}

            </span>

        </div>


        <div class="p-4">

            <h3 class="font-bold text-lg truncate">
                ${movie.Title}
            </h3>

            <p class="text-gray-400 text-sm mt-1">
                ${movie.Year} • ${movie.Runtime}
            </p>

            <p class="text-gray-400 text-sm mt-2 truncate">
                ${movie.Genre}
            </p>

        </div>
    `;


    card.addEventListener("click", () => {

        showMovieDetails(movie);

    });


    moviesGrid.appendChild(card);
}


function showMovieDetails(movie) {

    movieDetails.innerHTML = `

        <div class="grid md:grid-cols-[250px_1fr] gap-7">

            <!-- Poster -->

            <div>

                <img
                    src="${movie.Poster}"
                    alt="${movie.Title}"
                    class="w-full rounded-2xl shadow-2xl"
                >

            </div>


            <!-- Details -->

            <div>

                <p class="text-yellow-400 font-bold uppercase">
                    Movie Details
                </p>

                <h2 class="text-3xl md:text-4xl font-extrabold mt-2">
                    ${movie.Title}
                </h2>


                <div class="flex flex-wrap gap-2 mt-5">

                    <span class="px-3 py-2 rounded-full bg-white/10">
                        ${movie.Year}
                    </span>

                    <span class="px-3 py-2 rounded-full bg-white/10">
                        ${movie.Runtime}
                    </span>

                    <span class="px-3 py-2 rounded-full bg-white/10">
                        ${movie.Rated}
                    </span>

                    <span class="px-3 py-2 rounded-full bg-yellow-400 text-black font-bold">
                        ⭐ ${movie.imdbRating}
                    </span>

                </div>


                <p class="text-gray-300 leading-7 mt-6">
                    ${movie.Plot}
                </p>


                <div class="mt-6 space-y-3 text-gray-300">

                    <p>
                        <strong class="text-white">
                            Director:
                        </strong>
                        ${movie.Director}
                    </p>

                    <p>
                        <strong class="text-white">
                            Actors:
                        </strong>
                        ${movie.Actors}
                    </p>

                    <p>
                        <strong class="text-white">
                            Genre:
                        </strong>
                        ${movie.Genre}
                    </p>

                </div>


                <!-- IMDb Trailer -->

                <a
                    href="https://www.imdb.com/title/${movie.imdbID}/videogallery/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-2
                           mt-7 px-6 py-3
                           rounded-xl
                           bg-yellow-400
                           text-black
                           font-bold
                           hover:bg-yellow-300
                           hover:scale-105
                           transition"
                >

                    🎬 Watch Trailer on IMDb
                    ↗

                </a>

            </div>

        </div>
    `;


    movieModal.classList.remove("hidden");
    movieModal.classList.add("flex");
}


closeModal.addEventListener("click", () => {

    movieModal.classList.add("hidden");
    movieModal.classList.remove("flex");

});


movieModal.addEventListener("click", (e) => {

    if (e.target === movieModal) {

        movieModal.classList.add("hidden");
        movieModal.classList.remove("flex");

    }

});


loadMovies();