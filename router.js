const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
}

const routes = {
    "/" : "index.html",
    404 : "404.html",
    "/contact.html" : "contact.html"
}

const handleLocation = async () => {
    const path = window.location.pathname;
    if (path === "/") {
        window.location.reload();  
        return; 
    }
    const route = routes[path] || routes[404];
    const html = await fetch(route).then((data) => data.text());
    document.getElementById("main-page").innerHTML = html;
};

window.onpopstate = handleLocation;
window.route = route;
