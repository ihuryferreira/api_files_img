const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const db = require("../../db.json");
const fs = require("fs");
const path = require("path");

app.use(cors());

app.set("json spaces", 4);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/upload-image", (req, res) => {
    return res.status(200).json(db);
});

app.get("/upload-image/:id", (req, res) => {
    const id = req.params.id;

    const foundItem = db["upload-image"].find((ele) => ele.id == id);

    if (foundItem) {
        res.status(200).send(foundItem);
    } else {
        res.status(404).json(
            `Não foi encontrado nenhum item com esse ID ${id}`
        );
    }
});

app.post("/upload-image", (req, res) => {
    const dbPath = path.join(__dirname, "../../db.json");
    fs.readFile(dbPath, "utf8", (err, data) => {
        if (err) {
            console.error("Erro ao ler o arquivo JSON:", err);
            return res
                .status(500)
                .json({ error: "Erro ao ler o arquivo JSON" });
        }

        let jsonData = JSON.parse(data);
        const newImage = req.body;

        if (!jsonData["upload-image"]) {
            jsonData["upload-image"] = [];
        }

        console.log(jsonData);

        // Obter o último valor do id
        const lastId =
            jsonData["upload-image"].length > 0
                ? jsonData["upload-image"][jsonData["upload-image"].length - 1]
                      .id
                : 0;

        // Incrementar o id
        newImage.id = lastId + 1;

        jsonData["upload-image"].push(newImage);

        fs.writeFile("./db.json", JSON.stringify(jsonData), (err) => {
            if (err) {
                console.error("Erro ao salvar os dados:", err);
                return res
                    .status(500)
                    .json({ error: "Erro ao salvar os dados" });
            }
            console.log("Dados salvos com sucesso!");
        });
    });
});

app.listen(8080, () => {
    console.log(
        "Servidor iniciado na porta 8080: http://localhost:8080/upload-image"
    );
});
