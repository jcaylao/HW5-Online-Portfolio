//Project card coding
class ProjectCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
                    <style>
                        :host {
                            display: block;
                            background-color: var(--card-bg);
                            padding: 15px;
                            border-radius: 8px;
                            box-shadow: 0 4px 6px var(--card-shadow);
                            transition: transform 0.5s;
                        }
                        :host(:hover) {
                            transform: scale(1.05);
                        }
                        h2 {margin: 0; font-size: 1.2rem;}
                        p {font-size: 1rem; color: var(--text-color);}
                        a {color: blue; text-decoration: none;}
                        picture img{max-width: 100%; border-radius: 5px;}
                    </style>
                    <h2></h2>
                    <picture>
                        <img src="" alt="">
                    </picture>
                    <p></p>
                    <a href="#" target="_blank">Read more</a>
                `;
    }
    connectedCallback() {
        this.shadowRoot.querySelector("h2").textContent = this.getAttribute("title");
        this.shadowRoot.querySelector("img").src = this.getAttribute("image");
        this.shadowRoot.querySelector("img").alt = this.getAttribute("alt");
        this.shadowRoot.querySelector("p").textContent = this.getAttribute("description");
        this.shadowRoot.querySelector("a").href = this.getAttribute("link");
    }
}
customElements.define('project-card', ProjectCard);

const sampleProjects = [
    {
        title: "Grocery & Cooking App",
        image: "images/GROCERY-APP.png",
        alt: "Grocery App Screenshot",
        description: "A grocery and cooking app that allows users to easily find new recipes and keep track of " +
            "their groceries. One feature is recipe tinder, in which users are given a recipe and they can choose" +
            " to like or dislike a recipe. Another feature is a receipt scanner that allows users to scan their " +
            "receipts and upload it to their virtual pantry.",
        link: "https://www.figma.com/proto/9r7RyHn8One9VH4nq32Meb/Grocery%2FCooking-App?node-id=4-127&p=f&t=wrSh0UWjgd5Apj0J-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1"
    }
];
localStorage.setItem('projects', JSON.stringify(sampleProjects));

function loadProjects() {
    const container = document.getElementById('projects-list');
    const projects = JSON.parse(localStorage.getItem('projects'));
    projects.forEach((proj) => {
        const card = document.createElement('project-card');
        card.setAttribute('title', proj.title);
        card.setAttribute('image', proj.image);
        card.setAttribute('alt', proj.alt);
        card.setAttribute('description', proj.description);
        card.setAttribute('link', proj.link);
        container.appendChild(card);
    });
}
async function fetchProjects() {
    try {
        const response = await fetch("projects.json");
        const data = await response.json();
        localStorage.setItem('projects', JSON.stringify(data));
        loadProjects();
    } catch (error) {
        console.error("Failed to fetch projects", error);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('projects')) {
        fetchProjects();
    } else {
        loadProjects();
    }
});