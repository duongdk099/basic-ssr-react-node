// Importe le module "path" depuis la bibliothèque "path"
import path from "path";
// Importe le module "fs" depuis la bibliothèque "fs"
import fs from "fs";
// Importe le module "React" depuis la bibliothèque "react"
import React from "react";
// Importe le module "ReactDOMServer" depuis la bibliothèque "react-dom"
import ReactDOMServer from "react-dom/server";
// Importe le module "express" depuis la bibliothèque "express"
import express from "express";
// Importe le composant "App" depuis le fichier "../src/App.js"
import App from "../src/App";

// Définit une constante "PORT" qui prend la valeur de la variable d'environnement "process.env.PORT" ou 3000 si non définie
const PORT = process.env.PORT || 3000;
// Crée une application express
const app = express();

// Définit une route pour la racine du serveur (http://localhost:PORT/)
app.get("/", (req, res) => {
  // Lit le contenu du fichier "index.html" dans le dossier "public" en utilisant l'encodage "utf8" (utilisé comme un modèle de réponse)
  fs.readFile(path.resolve("./public/index.html"), "utf8", (err, data) => {
    if (err) {
      // En cas d'erreur lors de la lecture du fichier, logge l'erreur dans la console et renvoie une réponse avec le code d'erreur 500 et le message "An error occurred"
      return res.status(500).send("An error occurred");
    }

    // Remplace la balise "<div id="root"></div>" dans le contenu du fichier "index.html" par le rendu du composant "App" au format permet l'interactivité. 
    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`
      )
    );
  });
});

// Utilise le middleware "express.static" pour servir les fichiers statiques depuis le dossier "dist" (par exemple, des fichiers JavaScript, CSS, etc.), avec une mise en cache de 30 jours (ici le fichier bundle.js généré)
app.use(
  express.static(path.resolve(__dirname, "..", "dist"), { maxAge: "30d" })
);

// Met le serveur en écoute sur le port spécifié, et affiche un message dans la console lorsque le serveur démarre
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
