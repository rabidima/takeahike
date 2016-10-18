# transitandtrails-cli

I am a command line client for the [Transit
& Trails](http://www.transitandtrails.org/) API. I use
[`transitandtrails`](https://github.com/mojodna/node-transitandtrails) under
the hood.

## Installation

```bash
npm install -g transitandtrails-cli
```

Or, if you want the current development version:

```bash
npm install -g "git+https://github.com/mojodna/node-transitandtrails-cli"
```

## Usage

```bash
tnt --help
tnt -k <key> trailhead -g 292
tnt -k <key> trailhead-maps 292
```

It can be used with [`jq`](http://stedolan.github.io/jq/) to pretty-print and
filter output:

```bash
tnt -k <key> trailheads -n 5 | jq .
tnt -k <key> trailheads -n 25 | jq '.[22].park_name'
```

It can also be used with [geojson.io](http://geojson.io) to see the raw data on
a map:

```bash
npm install -g geojsonio-cli
tnt -k <key> trip 1363 --geojson | geojsonio
```

## Environment Variables

* `TNT_KEY` - (optional) API key--can be used to avoid passing `-k`.
* `TNT_URL_PREFIX` - (optional) alternate URL prefix. Defaults to
  `https://www.transitandtrails.org`.

## License

Copyright (c) 2013 Seth Fitzsimmons

Published under the MIT license.
