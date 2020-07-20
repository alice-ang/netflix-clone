import './components/movie-list.js';

const main = document.querySelector('main');
const API_KEY = 'aec3ff8f04c9975c02bd13e968111e05';
const POPULAR = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
const TRENDING = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
const NOW_PLAYING = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;
const navbar = document.querySelector('nav');
const sticky = navbar.offsetTop;

window.addEventListener('scroll', (e) => {
    handleScroll();
})
window.addEventListener('load', (event) => {
    createListRow(TRENDING, "NETFLIX ORIGINALS");
    createListRow(POPULAR, "Popular on Netflix");
    createListRow(NOW_PLAYING, "Trending Now");
    
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
        return data
    })
    .catch(error => console.warn(error))

}
const createListRow = (url, category)=> {
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
            createList(result, list_row);
        });
    })

    div.appendChild(list_row);

}

const createList = (item, element) => {
    const movie_list = document.createElement('movie-list');
    movie_list.item = item;
    movie_list.addEventListener('click', (e) => {
        mainInfo(item);
    });
    element.append(movie_list);
}

const mainInfo = (item) => {
    const hero = document.getElementById('hero');
    hero.innerHTML = '';
    const hero_img = document.createElement('img');
    hero_img.setAttribute('src', `https://image.tmdb.org/t/p/original${item.backdrop_path}`);
    const title = document.createElement('h1');
    title.innerText = item.title;
    const description = document.createElement('p');
    description.innerText = item.overview;
    const hero_info = document.createElement('div');
    hero_info.id = 'hero-info';

    hero_info.append(title, description);

    const buttons = [{name: 'Play', icon: '<i class="fas fa-play"></i> '}, {name: 'More Info', icon: '<i class="fas fa-info-circle"></i>'}];
    buttons.forEach(element => {
        console.log(element);
        const btn = document.createElement('button');
        btn.innerHTML = element.icon + ' ' + element.name;
        hero_info.append(btn);
    });
    hero.append(hero_info, hero_img );

}

