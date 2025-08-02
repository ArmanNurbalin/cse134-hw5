const PROJECT_URL = "https://my-json-server.typicode.com/ArmanNurbalin/cse134-hw5/projects"


window.addEventListener("DOMContentLoaded", init);

function init() {
    let projects = getProjectsFromStorage();
    addProjects(projects);

    document.getElementById("local")?.addEventListener("click", () => {
        const local = getProjectsFromStorage();
        addProjects(local);
    });

    document.getElementById("remote")?.addEventListener("click", async () => {
        try {
            const remoteProjects = await getProjectsFromRemote();
            saveProjectsToStorage(remoteProjects);
            addProjects(remoteProjects);
            } catch (err) {
            console.error(err);
            alert("Failed to load remote projects.");
        }
    });
}

function getProjectsFromStorage() {
    return JSON.parse(localStorage.getItem("projects")) || [];
}

function saveProjectsToStorage(projects) {
    localStorage.setItem("projects", JSON.stringify(projects));
}

function addProjects(projects) {
    const container = document.querySelector("#projects-container");
    if (!container) return;
    for (const project of projects) {
        const projectCard = document.createElement("project-card");
        projectCard.data = project;
        container.appendChild(projectCard);
    }
}

async function getProjectsFromRemote() {
    const res = await fetch(PROJECT_URL);
    if (!res.ok) {
        throw new Error(`Network error: ${res.status}`);
    }
    const data = await res.json();
    return Array.isArray(data) ? data : data.projects || [];
}