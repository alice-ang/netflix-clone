class MovieList extends HTMLElement {

    constructor() {
        super();
       this.root = this.attachShadow({mode: 'open'})
    }

    set item(item) {
        this.root.innerHTML = `
        <style>
        .image-container {
            position: relative;
            width: 300px;
            margin: 5px;
        }
        .image-container:hover {
           cursor:pointer;
        }
        .image {
            display: block;
            width: 100%;
            height: auto;
        }
        img {
            transition: transform .45s;
            object-fit: contain;
        }
        .image:hover img {
            transform: scale(1.05);

        }
        </style>
        <div class="image-container">
            <div class="image">
                <img src="https://image.tmdb.org/t/p/original${item.backdrop_path}" alt ="${item.title}" class="image">
            </div>
        </div>        
        `;
    }

}

customElements.define('movie-list', MovieList);