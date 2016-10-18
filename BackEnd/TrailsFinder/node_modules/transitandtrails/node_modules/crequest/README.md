# crequest

[![Build
Status](https://secure.travis-ci.org/mojodna/node-crequest.png?branch=master)](http://travis-ci.org/mojodna/node-crequest)

[request](https://github.com/mikeal/request) with transparent compression. It
also deviates slightly from `request`'s behavior by automatically parsing
`application/json` responses. If you need the raw response body (in whatever
encoding was requested), use the `body` property of the callback's second
argument (the response).

This is intended as a drop-in replacement for `request`--to use it, replace
`require("request")` with `require("crequest"). Where it's not a drop-in
replacement (not everything in `request` is proxied yet), please send a pull
request.

## License

Copyright (c) 2013 Seth Fitzsimmons

Published under the same license as `request` itself (Apache 2.0).
