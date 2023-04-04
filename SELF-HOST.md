# Self hosting T3 apps

## Introduction

In this guide, you will learn how to self-host your T3 app on a Custom VPS. We will use Oracle's Free Tier Linux to host our NextJS application with nginx and a PostgreSQL database. Related tech stack: Docker with Docker Compose, Github Actions as CI/CD Provider and Github Secrets for environment variables.

This guide will cover the following topics:

1.

## Oracle VMs

Oracle offers a free tier for Linux VMs. They are extremely powerful considered that they are free.

[This article](https://dawidkotarba.eu/oracle-cloud-free-tier-too-good-to-be-true/) sums up the free tier VMs and everything you have to know about them.

One powerful VM could have 4 OCPUs, 24GB of RAM, 100 GB of storage, and 4Gbps network bandwidth for absolutely free. This is more than enough to host multiple hobby projects or a portfolio website. You could also set up a free CDN Service like Cloudflare to speed up your website and decrease the load on your server.
