const btn = document.querySelector("form");
const input = document.querySelector('input[type="file"]');
let id = 0;

btn.addEventListener("submit", (e) => {
    e.preventDefault();
    id += 1;

    const title = document.querySelector("input[type='text']").value;
    const textParagraph = document.getElementById("textParagraph").value;
    const file = input.files[0];

    const reader = new FileReader();

    reader.onload = function (event) {
        const imageBase64 = event.target.result;

        const dados = {
            id: id,
            title,
            paragraphText: textParagraph,
            imgUrl: imageBase64,
        };

        fetch(`http://localhost:8080/upload-image`, {
            method: "POST",
            body: JSON.stringify(dados),
            headers: { "Content-Type": "application/json" },
        });

        btn.reset();
    };

    reader.readAsDataURL(file);
});
