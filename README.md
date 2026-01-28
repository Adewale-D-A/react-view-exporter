# React View Exporter to PNG and PDF

This project provides a reusable server and client logic built with Next.js, and TypeScript. The intent of this project is to provide a way of exporting a view (i.e. receipt) fromt the client to a downloadable PNG and/or PDF file for offline use. The reason for server addition arose when the initial client implementation failed in Safari browser making it unreliable which brought about another approach from with help from the server using Puppetteer. The entire logic both for the client and server is in this repository for manipulation to suite the developer's needs.

## Prerequisites

The following tools are required to run and maintain this project:

| Package    | Purpose                                                   |
| ---------- | --------------------------------------------------------- |
| Next.js    | Application framework                                     |
| TypeScript | Static typing                                             |
| Pupetter   | Server library for remote access to chrome browser engine |

A working knowledge of these tools is required for collaboration.

---

## Local Development Setup

1. Install dependencies:

```bash
npm install
```

2. Startup the application:

```bash
npm run dev
```

> The application will run on http://localhost:3000
