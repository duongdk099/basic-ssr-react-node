// Importe tous les membres de la bibliothèque "react" sous le nom "React"
import React from "react";

// Définit le composant fonctionnel "App" en tant qu'export par défaut
export default function App({ todos }) {
  const todosList = Array.isArray(todos) ? todos : [];
  
  // Rendu du composant
  return (
    <div>
      <h1>To do lists</h1>
      <ul>
        {todosList.map((todo) => (
          <li key={todo.id}>
            {todo.title} {todo.completed ? "✔️" : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}