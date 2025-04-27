<p align="center"><img src="./src/lib/images/logo.png" width="100"></p>

<p align="center">Vidu - Mini</p>

<p align="center"><img src="https://github.com/user-attachments/assets/82d856cb-9078-438b-8744-439ba8393c62"></p>

![example](https://github.com/user-attachments/assets/82d856cb-9078-438b-8744-439ba8393c62)


## About

This is a (even more) minimal version of the former [Vidu](https://github.com/pa-nic/vidu) analytics project.

### Functionality

*Vidu* [see - /Esperanto/] consists of

- A [Netlify Function](https://docs.netlify.com/functions/overview/) that is included as "tracker" in your web pages to collect (anonymized) user data and sending these in [Netlify Blobs](https://docs.netlify.com/blobs/overview/).
- A [SvelteKit](https://svelte.dev) web app which displays all the data in a simple yet beautiful dashboard.

> [!TIP]
> Reading the blob data stores can sometimes be a little slow, and loading the stats page may seem unresponsive. Implement some loading indicator for use in production...

### Disclaimer

This project was created for fun and educational purposes.

Fork it. Extend it. It's "[unlicensed](./LICENSE)".

## Setup

I assume you already have a [Netlify](https://netlify.com) account.

### Setup Fauna DB and Vidu

1. **Deploy repository to Netlify**

You can easily clone this repo and deploy this app in a few seconds by clicking the deploy button.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/pa-nic/vidu-mini)

1. **Environment Variables**

> [!IMPORTANT]
> You need to create two environment variables for the app to be able to get the blobs data:

- VIDU_MONITORING_SITE_ID: The site ID of the webpage to track (*Site configuration - General - Site ID*)
- VIDU_MONITORING_AUTH_TOKEN: A personal access token (*User settings - Application - Personal access tokens*)

#### Tracking Code

The tracking code needs to be present on every page you want to track. It calls a Netlify function which pushes the tracking data to your blobs store and returns a bas64 encoded transparent image.

```
<img src="/.netlify/functions/counter"
      alt=""
      width="0"
      height="0"
      hidden
      decoding="async"
      loading="eager" />
```

### Gathered Data

- Page visits of every page
- Visits by country
- Visits for the last 10 days
