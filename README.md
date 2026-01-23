# Le Pierrier

Topographie interactive.

![Le Pierrier](./docs/2026-01-21-le-pierrier.png)

## Requirements

- Node.js >= 22
- yarn

### Installation

Node.js and yarn can be installed via Homebrew:

```bash
brew install node
brew install yarn
```

## Development

Use : `http://localhost:3001`

```bash
yarn dev:all
```

### Setup the environment variables

Copy the `exemple.env` file to a new `.env` file.

```bash
cp exemple.env .env
```

## Production

Use : `http://localhost:3000`

```bash
yarn prod:all
```

### Deploy on the server

Copy files on the server and run:

```bash
yarn prod:all
```

## Usage

The `/` page is the wall-control interface.
The `/wall` page is the wall display interface.
The `/editor` page is the wall editor interface.

### Transforming the wall view

- Use the arrow keys to translate the view.
- Use the `+` and `-` keys to zoom in and out.
- Use the `r` and `l` keys to rotate the view.
- Use the `0` key to reset the view.
- Use the `a` key to toggle display of all holds.
