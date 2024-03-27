import express from "express";
import fetch from "node-fetch";

const app = express();
const port = 3000;

app.get("/:uri", async (req, res) => {
  const uri = req.params.uri;

  // Check if the URI includes the protocol, if not, prepend 'http://'
  const fullUrl = uri.includes("://") ? uri : "http://" + uri;

  try {
    const response = await fetch(fullUrl, {
      headers: req.headers,
    });
    const data = await response.text();
    res.send(data);
  } catch (error) {
    console.error("Error fetching URL:", error);
    res.status(500).send("Error fetching URL");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
