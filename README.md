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

## Run the project

```bash
yarn && yarn dev:all
```

### To make the project work on your local network

Go to `./src/lib/config.ts` and change the `IP_ADDRESS` constant to your computer's local IP address.

## Usage

The `/` page is the wall-control interface.
The `/wall` page is the wall display interface.

### Transforming the wall view

- Use the arrow keys to translate the view.
- Use the `+` and `-` keys to zoom in and out.
- Use the `r` and `l` keys to rotate the view.
- Use the `0` key to reset the view.
