const movieDetail = document.querySelector("#movie-detail");
const params = new URLSearchParams(location.search)
const imdbID = params.get("id");
console.log("IMDb ID:" ,imdbID);

if(imdbID){
    searchMovie(imdbID.trim())
}

async function searchMovie(imdbID) {

    // movieHub.innerHTML = ` <div class="loader"></div>`

    let response = await fetch(`https://www.omdbapi.com/?apikey=3eed3bad&i=${imdbID}&plot=full`)
    let data = await response.json()
    console.log(data);

    if (data.Response === "True") {
        displayMovies(data)
    }else{
        console.log(data.Error)
        //  movieHub.innerHTML = ` <p>${data.Error}</p>`

    }



}

// searchMovie()


function displayMovies(data){

movieDetail.innerHTML = ` <div class="w-full min-h-screen bg-[#080e12] relative overflow-hidden">
<div
    class="absolute inset-0 bg-cover bg-center opacity-20 blur-2xl scale-110"
    style="background-image: url('${data.Poster}');">
</div>
<div class="absolute inset-0 bg-gradient-to-r from-[#080e12] via-[#080e12]/90 to-[#080e12]/60"></div>
    <img
        src="${data.Poster}"
        alt="${data.Title}"
        class="w-full max-w-[280px] rounded-xl shadow-2xl object-cover"
    >
</div>

<div class="space-y-5">
      
           <h2 class="text-4xl font-extrabold md:text-5xl mb-5 tracking-tight text-white">
    ${data.Title}
</h2>

<section class="flex flex-wrap gap-3 mb-7">
    <span class="px-4 py-2 rounded-full bg-white/10 text-gray-200 text-sm font-medium border border-white/10">
        ${data.Released}
    </span>

    <span class="px-4 py-2 rounded-full bg-white/10 text-gray-200 text-sm font-medium border border-white/10">
        ${data.Rated}
    </span>

    <span class="px-4 py-2 rounded-full bg-white/10 text-gray-200 text-sm font-medium border border-white/10">
        ${data.Runtime}
    </span>

    <span class="px-4 py-2 rounded-full bg-white/10 text-gray-200 text-sm font-medium border border-white/10">
        ${data.Genre}
    </span>

    <span class="px-4 py-2 rounded-full bg-yellow-400 text-black text-sm font-bold">
        ⭐ ${data.imdbRating} / 10
    </span>

</section>
          <div class="mt-8 p-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg">
    
    <h3 class="text-xl font-bold text-white mb-3 flex items-center gap-2">
        🈴 Plot Overview
    </h3>

    <p class="text-gray-300 leading-7 text-sm md:text-base">
        ${data.Plot}
    </p>

</div> 

        <div class="grid md:grid-cols-2 gap-4 mt-6">

    <div class="p-5 rounded-2xl bg-white/5 border border-white/10">
        <p class="text-sm text-gray-400 mb-2"> Director</p>
        <p class="text-white font-semibold">
            ${data.Director}
        </p>
    </div>

    <div class="p-5 rounded-2xl bg-white/5 border border-white/10">
        <p class="text-sm text-gray-400 mb-2"> Writer</p>
        <p class="text-white font-semibold">
            ${data.Writer}
        </p>
    </div>

    <div class="md:col-span-2 p-5 rounded-2xl bg-white/5 border border-white/10">
        <p class="text-sm text-gray-400 mb-2"> Actors</p>
        <p class="text-white font-semibold">
            ${data.Actors}
        </p>
    </div>

</div>

       <div class="grid md:grid-cols-2 gap-4 mt-6">

    <div class="p-5 rounded-2xl bg-white/5 border border-white/10">
        <p class="text-sm text-gray-400 mb-2"> Language</p>
        <p class="text-white font-semibold">
            ${data.Language}
        </p>
    </div>

    <div class="p-5 rounded-2xl bg-white/5 border border-white/10">
        <p class="text-sm text-gray-400 mb-2"> Country</p>
        <p class="text-white font-semibold">
            ${data.Country}
        </p>
    </div>

</div>

            <button>
     <a
    href="https://www.imdb.com/title/${data.imdbID}"
    target="_blank"
    rel="noopener noreferrer"
    class="inline-flex items-center gap-2 mt-7 px-6 py-3
           rounded-xl bg-yellow-400 text-black
           font-bold shadow-lg shadow-yellow-400/20
           hover:bg-yellow-300 hover:scale-105
           transition-all duration-300"
>
     View on IMDb
    <span class="text-lg">↗️</span>
</a>
            </button>

        </div>`
}