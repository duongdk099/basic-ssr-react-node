// server/server.jsx
import express from "express";
import fs from "fs";
import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import App from "../src/App";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, "../build")));

app.get("*", (req, res) => {
  axios
    .get("https://jsonplaceholder.typicode.com/todos")
    .then((response) => {
      const todos = response.data;
      const appString = renderToString(<App todos={todos} />);

      fs.readFile(
        path.resolve(__dirname, "../public/index.html"),
        "utf8",
        (err, data) => {
          if (err) {
            console.error("Error reading index.html", err);
            return res.status(500).send("An error occurred");
          }

          const document = data.replace(
            '<div id="root"></div>',
            `<div id="root">${appString}</div><script>window.__INITIAL_DATA__ = ${JSON.stringify(
              todos
            )}</script>`
          );

          return res.send(document);
        }
      );
    })
    .catch((error) => {
      console.error("Error fetching todos", error);
      return res.status(500).send("An error occurred");
    });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
