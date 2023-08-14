const classStyle = [
    { id: 1, style: "steel" },
    { id: 2, style: "fire" },
    { id: 3, style: "grass" },
    { id: 4, style: "electric" },
    { id: 5, style: "water" },
    { id: 6, style: "ice" },
    { id: 7, style: "ground" },
    { id: 8, style: "rock" },
    { id: 9, style: "fairy" },
    { id: 10, style: "poison" },
    { id: 11, style: "bug" },
    { id: 12, style: "dragon" },
    { id: 13, style: "psychic" },
    { id: 14, style: "flying" },
    { id: 15, style: "fighting" },
    { id: 16, style: "ghost" },
    { id: 17, style: "normal" },
];

function pokemon(element) {
    const li = document.createElement("li");

    classStyle.map((list) => {
        li.classList = `card ${list.style}`;
    });

    const img = document.createElement("img");
    img.src = element.imgUrl;
    img.classList = "card-image";
    img.alt = "";
    li.appendChild(img);

    const h2 = document.createElement("h2");
    h2.classList = "card-title";
    h2.textContent = element.title;
    li.appendChild(h2);

    const p = document.createElement("p");
    p.classList = "card-subtitle";
    p.textContent = element.paragraphText;
    li.appendChild(p);

    return li;
}
async function App() {
    const db = await Api();

    db["upload-image"].forEach((element) => {
        console.log(element);
        let div = document.querySelector(".pokedex");
        var caixa = pokemon(element);
        div.appendChild(caixa);
    });
}

async function Api() {
    return (await fetch("http://localhost:8080/upload-image/")).json();
}

document.addEventListener("DOMContentLoaded", App);
