<p align="center">
  <a href="https://github.com/goonism/dat-hyperproxy/">
    <img alt="hyperproxy" src="https://github.com/goonism/dat-hyperproxy/blob/master/icon.png" width="234">
  </a>
</p>

<h1 align="center">
    hyperproxy
</h1>

<h2 align="center">
    Dat WebRTC to TCP/UDP proxy
</h2>

# Goal

Check out this [post](https://louisgv.me/2018/blog/dat-hyperproxy-concept/)

Check out the [WIP RFC](https://docs.google.com/document/d/1zvGN7hmeOVHOaQjCUr3XuNLZxZxvOn1u0GwVhR_ucB4/edit?usp=sharing)

# Setup

Install global tooling dependencies:

```
npm i -g lerna browser-sync
```

Get `yarn`, either via package or via npm.

Run these anywhere within hyperproxy:

```
lerna bootstrap
lerna run build
lerna run --parallel watch
```

# Run Modes

To run the hub in local:

```
LOCAL=true lerna run watch --parallel
```

# Credits

Logo created using [DotGrid](https://github.com/hundredrabbits/Dotgrid) by [Devine Lu Linvega](https://twitter.com/neauoire)

# License

MIT
