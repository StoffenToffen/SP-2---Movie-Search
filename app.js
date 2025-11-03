function activateSearch() {
  document.querySelector(".nav__input").focus();
}

function setSearchParameterEnter(event) {
  let searchParameter = "";
  if (event && event.key === "Enter") {
    if (document.querySelector(".nav__input") === document.activeElement) {
      searchParameter = document.querySelector(".nav__input").value;
      fetchMovies(searchParameter);
    } else {
      searchParameter = document.querySelector(".header__src__input").value;
      fetchMovies(searchParameter);
    }
  }
}

function setSearchParameterClick() {
  let searchParameter = document.querySelector(".header__src__input").value;
  fetchMovies(searchParameter);
}

async function fetchMovies(searchParameter) {
  try {
    if (!!searchParameter) {
      document.querySelector(
        ".src-results__name"
      ).innerHTML = `"${searchParameter}"`;
    } else {
      searchParameter = "avengers";
    }

    const response = await fetch(
      `http://www.omdbapi.com/?apikey=caccfb1f&s=${searchParameter}`
    );
    const data = await response.json();
    const movies = data.Search.slice(0, 6);
    renderMovies(movies);
  } catch (error) {
    console.log(error);
  }
}

function renderMovies(movies) {
  const movieList = document.querySelector("#movie-list");

  movieList.innerHTML = `<i class="fa-solid fa-spinner src-results__movies__spinner"></i>`;

  const moviesHTML = movies
    .map(
      (movie) => `
            <figure class="src-results__movie">
              <div class="src-results__movie__content">
                <img
                  src="${movie.Poster}"
                  alt="movie name"
                  class="src-results__movie__content__poster"
                />
                <div class="src-results__movie__content__info">
                  <h3 class="src-results__movie__content__info__title">
                    ${movie.Title}
                  </h3>
                  <div class="src-results__movie__content__info__wrapper">
                    <div class="src-results__movie__content__info__stats">
                      <i
                        class="fa-solid fa-clock src-results__movie__content__info__stats__icon"
                      ></i>
                      <p class="src-results__movie__content__info__stats__para">
                        136m
                      </p>
                    </div>
                    <div class="src-results__movie__content__info__stats">
                      <i
                        class="fa-solid fa-star src-results__movie__content__info__stats__icon"
                      ></i>
                      <p class="src-results__movie__content__info__stats__para">
                        4.5
                      </p>
                    </div>
                    <div class="src-results__movie__content__info__stats">
                      <i
                        class="fa-solid fa-earth-americas src-results__movie__content__info__stats__icon"
                      ></i>
                      <p class="src-results__movie__content__info__stats__para">
                        English
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <h4 class="src-results__movie__subtitle">
                ${movie.Title}
              </h4>
            </figure>`
    )
    .join("");
  movieList.innerHTML = moviesHTML;
}

fetchMovies();
