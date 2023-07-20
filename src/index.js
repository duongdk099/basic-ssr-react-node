// Importe tous les membres de la bibliothèque "react" sous le nom "React"
import * as React from "react";
// Importe le module "react-dom" depuis la bibliothèque "react-dom"
import ReactDOM from "react-dom";
// Importe le composant "App" depuis le fichier "./App.js"
import App from "./App";

// Hydrate le composant "App" dans l'élément HTML avec l'identifiant "root"
ReactDOM.hydrate(<App />, document.getElementById("root"));