class ProjectCard extends HTMLElement{
    constructor() {
        super();

        const shadow = this.attachShadow({mode: 'open'});

        const article = document.createElement('article');

        const style = document.createElement("style");

        style.textContent = `
        :host {
            --card-background: #fff;
        
        }
        
        * {
            font-family: sans-serif;
            margin: 0;
            padding: 0;
        }
        
        article {
            background: var(--card-background);
            border: 1px solid;
            border-radius: 12px;
            padding: 1rem;
            display: grid;
            gap: 0.75rem;
        }
        .images {
            width: 100%;
            border-radius: 8px;
            object-fit: cover;
            display: block;
        }
        h2 {
            margin: 0;
            font-size: 1.2rem;
            line-height: 1.1;
        }
        h2 a {
            text-decoration:none;
        }

        h2 a:hover {
            text-decoration: underline;
        }
        p.description {
            margin: 0.5rem 0;
            font-size: 0.9rem;
            line-height: 1.3;
        }
        a {
            font-weight: 600;
            font-size: 0.9rem;
            color: #0066cc;
        }`;

        shadow.appendChild(article);
        shadow.append(style); 
    }

    set data(data) {
        if (!data) return;

        const article = this.shadowRoot.querySelector("article");
        article.innerHTML = `
        <h2 class="title">
            <a href="${data.titleLink}">${data.title}</a>
        </h2>   
        <picture class="images">
            <img src="${data.imgSrc}" alt="${data.imgAlt}">
        </picture>
        <p class="description">${data.description}</p>
        `


    }

    
}
customElements.define("project-card", ProjectCard);