$(document).ready(function () {
    loadSearchData();
});

function search(fuse, text, defaultData) {
    return text == null || text === "" ? defaultData : fuse.search(text);
}

function loadSearchData() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        const sbsegSearchData = JSON.parse(this.responseText);
        addListeners("search-box", sbsegSearchData.posts);
    }
    xhttp.open("GET", "/" + document.documentElement.lang + "/search.json");
    xhttp.send();
}

function addListeners(searchBoxClass, data) {
    const options = {
        threshold: 0,
        ignoreLocation: true,
        keys: ["title", "url", "tags"]
    };
    const fuse = new Fuse(data, options);
    const defaultData = data.map(function (post) {
        return {item: post};
    });

    $("." + searchBoxClass).keyup(function (event) {
        const target = document.getElementById(event.target.dataset.resultsId);
        target.innerHTML = "";
        showResults(target, search(fuse, event.target.value, defaultData));
    });

    $("." + searchBoxClass + ".start-searching").keyup();
}

function showResults(contentArea, results) {
    for (const result of results) {
        const article = articleElement([
            titleElement(
                linkElement({url: result.item.url, text: result.item.title})
            ),
            excerptElement({subheading: result.item.subheading}),
        ]);
        contentArea.appendChild(article);
    }
}

function articleElement(elementList) {
    const article = document.createElement("article");
    for (const el of elementList) {
        article.appendChild(el);
    }
    return article;
}

function titleElement(textElement) {
    const title = document.createElement("h4");
    if (typeof textElement === "string") {
        title.textContent = textElement;
    } else {
        title.appendChild(textElement);
    }
    return title;
}

function linkElement({url, text}) {
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.textContent = text;
    return link;
}

function excerptElement({subheading}) {
    const p = document.createElement("p");
    p.textContent = subheading;
    return p;
}
