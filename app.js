import './components/movie-list.js';

const main = document.querySelector('main');
const API_KEY = 'aec3ff8f04c9975c02bd13e968111e05';
const POPULAR = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
const TRENDING = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
const NOW_PLAYING = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;
const NETFLIX = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=213`;

const COMEDY = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35`;
const ANIMATION = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=16`;
const navbar = document.querySelector('nav');
const sticky = navbar.offsetTop;

window.addEventListener('scroll', (e) => {
    handleScroll();
})
window.addEventListener('load', (event) => {
    createListRow(NETFLIX, "NETFLIX ORIGINALS", true);
    createListRow(POPULAR, "Popular on Netflix");
    createListRow(TRENDING, "Trending");
    createListRow(NOW_PLAYING, "New to Netflix");
    createListRow(COMEDY, "Comedy");
    createListRow(ANIMATION, "Animation");
    
    fetchData(NOW_PLAYING).then(response => {
        const {results} = response;
        results.forEach((result, index )=> {
            if(index === Math.floor(Math.random() * 20)){
                mainInfo(result);
            }
        });
    })

});

const handleScroll = () => {
    if (window.pageYOffset > sticky) {
        navbar.style.backgroundColor = "#131313";
      } else if(window.pageYOffset == 0){
        navbar.style.backgroundColor = "transparent";
      }
}
 const fetchData = (url) => {
   return fetch(url)
    .then(response =>  response.json())
    .then(data => {
        console.log(data);
        return data
    })
    .catch(error => console.warn(error))
}
const createListRow = (url, category, isPoster)=> {
    const div = document.createElement('div');
    div.classList.add('list-row');
    const list_category = document.createElement('h2');
    list_category.innerText = category;

    div.appendChild(list_category);
    main.appendChild(div);

    const list_row = document.createElement('div');
    list_row.classList.add('list-container');

    fetchData(url).then(response => {
        const {results} = response;
        results.forEach((result, index )=> {
            createList(result, list_row, isPoster);
        });
    })

    div.appendChild(list_row);

}

const createList = (item, element, isPoster) => {
    if(isPoster != true){
        const movie_list = document.createElement('movie-list');
        movie_list.item = item;
        movie_list.addEventListener('click', (e) => {
            mainInfo(item);
        });
        element.append(movie_list);
    } else {
        const movie_list = document.createElement('movie-list');
        movie_list.poster = item;
        movie_list.addEventListener('click', (e) => {
            mainInfo(item, isPoster);
        });
        element.append(movie_list);
    }
}

const mainInfo = (item, isPoster) => {
    const hero = document.getElementById('hero');
    hero.innerHTML = '';
    const hero_img = document.createElement('img');
    hero_img.setAttribute('src', `https://image.tmdb.org/t/p/original${item.backdrop_path}`);
    const title = document.createElement('h1');
    if(isPoster != true){
        title.innerText = item.title;

    } else {
        title.innerText = item.original_name;
    }
    const description = document.createElement('p');
    description.innerText = item.overview;
    const hero_info = document.createElement('div');
    hero_info.id = 'hero-info';

    hero_info.append(title, description);

    const buttons = [{name: 'Play', icon: '<i class="fas fa-play"></i> '}, {name: 'More Info', icon: '<i class="fas fa-info-circle"></i>'}];
    buttons.forEach(element => {
        const btn = document.createElement('button');
        btn.innerHTML = element.icon + ' ' + element.name;
        hero_info.append(btn);
    });
    hero.append(hero_info, hero_img );

}

