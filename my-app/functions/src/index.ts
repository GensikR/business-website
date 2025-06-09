import admin from "firebase-admin";
import { onRequest } from "firebase-functions/v2/https";
import express from "express";
import next from "next";
import { join } from "path";

admin.initializeApp();

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({
  dev,
  dir: join(__dirname, "../../"), // 👈 path to the root of the Next.js project
  conf: {
    distDir: ".next", // or "next" if you customized it
  },
});
const handle = nextApp.getRequestHandler();
const server = express();

nextApp.prepare().then(() => {
  server.all("*", (req, res) => {
    return handle(req, res);
  });
});

export const nextServer = onRequest(
  { region: "us-central1", timeoutSeconds: 60, memory: "1GiB" },
  server
);
