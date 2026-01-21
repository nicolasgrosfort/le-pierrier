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
