// Importe tous les membres de la bibliothèque "react" sous le nom "React"
import * as React from "react";
// Importe le composant "App" depuis le fichier "./App.js"
import App from "./App";
import { hydrateRoot } from 'react-dom/client';

// Hydrate le composant "App" dans l'élément HTML avec l'identifiant "root"
hydrateRoot(document.getElementById("root"), <App />);