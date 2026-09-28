# open.debounce-throttle

Dependency-free debounce and throttle helpers with cancel and flush controls.

## Install

```bash
npm install @journey-to-code/open-debounce-throttle
```

## Usage

```js
const onSearch = debounce(search, 250);
const onScroll = throttle(update, 100);
```

## Runtime

- Node.js 18+
- modern ESM-capable tooling
- zero runtime dependencies

## Development

```bash
npm test
```

## Scope

This package intentionally focuses on one small, reusable responsibility.
Application-specific behavior belongs in higher-level packages.

## License

MIT
