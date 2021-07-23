const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

let pageNO = 1;
const main = document.getElementById("main");
const form = document.querySelector(".search-box");
const search = document.getElementById("search");

let preBtn = document.querySelector("#prev")
let nextBtn = document.querySelector("#next")
let page = document.querySelector("#page-number")

preBtn.addEventListener("click", () => {
    if (pageNO > 1) {
        pageNO--
        page.innerHTML = pageNO;
        getMovies(APIURL)
        window.scrollTo(0, 0)
    }
})
nextBtn.addEventListener("click", () => {
    if (pageNO < 500) {
        pageNO++
        page.innerHTML = pageNO;
        getMovies(APIURL)
        window.scrollTo(0, 0)
    }
})


getMovies(APIURL);

async function getMovies(url, bool = false) {
    if (!bool) {
        url = `${url}${pageNO}`;
    }
    const resp = await fetch(url);
    const respData = await resp.json();
    console.log(respData);
    showMovies(respData.results);
}

function showMovies(movies) {
    main.innerHTML = "";

    movies.forEach((movie) => {
        const { poster_path, title, vote_average, overview } = movie;

        const movieEl = document.createElement("div");
        movieEl.title = overview;
        movieEl.classList.add("movie-box");

        movieEl.innerHTML = `
            <img src="${IMGPATH +poster_path}" alt="">
            <div class="info">
                <h4>${title}</h4>
                <span class="${getClassByRate(vote_average)}" title="${`Moive rating is ${vote_average}`}">${vote_average}</span>
            </div>
         `;

        main.appendChild(movieEl);
    });
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;
    page.innerHTML = 'searched'
    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm, true);

        search.value = "";
    }
})