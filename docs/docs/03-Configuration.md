---
slug: /config
title: Configuration
---

## Environment variables

You can configure the app at runtime using various environment variables:

- `LOTUS__SERVER__HOST` -
  host to run the server on
  (default: `0.0.0.0`)
- `LOTUS__SERVER__PORT` -
  port to run the server on
  (default: `10230`)
- `LOTUS__COOKIES__DOMAIN` -
  domain for the cookies
  (default: ``)
- `LOTUS__SECRETS__AUTH` -
  secrets for encrypting auth cookies
  (default: `secret`)
- `LOTUS__URLS__PUBLIC` -
  public URL of the app
  (default: `http://localhost:10230`)
- `LOTUS__PELICAN__HTTP__SCHEME`
  scheme of the HTTP API of the pelican service
  (default: `http`)
- `LOTUS__PELICAN__HTTP__HOST`
  host of the HTTP API of the pelican service
  (default: `localhost`)
- `LOTUS__PELICAN__HTTP__PORT`
  port of the HTTP API of the pelican service
  (default: `10200`)
- `LOTUS__PELICAN__HTTP__PATH`
  path of the HTTP API of the pelican service
  (default: ``)
- `LOTUS__SCORPION__PUBLIC__SCHEME` -
  scheme of the public API of the scorpion service
  (default: `http`)
- `LOTUS__SCORPION__PUBLIC__HOST` -
  host of the public API of the scorpion service
  (default: `localhost`)
- `LOTUS__SCORPION__PUBLIC__PORT` -
  port of the public API of the scorpion service
  (default: `20000`)
- `LOTUS__SCORPION__PUBLIC__PATH` -
  path of the public API of the scorpion service
  (default: ``)
- `LOTUS__SCORPION__PUBLIC__CLIENT` -
  client ID to authenticate with the public API of the scorpion service
  (default: `lotus`)
- `LOTUS__SCORPION__PUBLIC__SECRET` -
  client secret to authenticate with the public API of the scorpion service
  (default: `secret`)
- `LOTUS__DEBUG` -
  enable debug mode
  (default: `true`)
