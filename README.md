# ☕ FundMe DApp (JavaScript + Viem)

This project is a **simple decentralized app (DApp)** that allows you to:

- Connect a wallet with **MetaMask**  
- Send ETH to the smart contract with `fund()`  
- Withdraw funds (only the owner) with `withdraw()`  
- Check the current balance of the contract  

The project uses **Anvil (Foundry)** as the local blockchain and **Vite** as the frontend dev server.  

---

## 🚀 How to run the project

### 1. Clone the repository
```bash
git clone <REPO_URL>
cd html-js-coffee-cu
```

### 2. Install dependencies
Make sure you have **pnpm** installed. If not, install it globally:
```bash
npm install -g pnpm
```

Then install project dependencies:
```bash
pnpm install
```

### 3. Start Anvil (local blockchain)
In one terminal:
```bash
pnpm anvil
```
This runs:
```bash
anvil --load-state fundme-anvil.json --block-time 5
```
> It will start a local blockchain at `http://127.0.0.1:8545`.

### 4. Start the frontend
In another terminal:
```bash
pnpm dev
```
This runs **Vite**, which serves the frontend at:
👉 [http://localhost:5173](http://localhost:5173)

---

## 🛠️ Extra scripts

- **Start both (Anvil + Vite) at once**
  ```bash
  pnpm start
  ```
  (uses `concurrently`)

- **Stop processes on ports 8545 and 5173**
  ```bash
  pnpm stop
  ```

- **Restart everything cleanly**
  ```bash
  pnpm restart
  ```

- **Format code with Prettier**
  ```bash
  pnpm format
  ```


---

## 📦 Dependencies

The project depends on:

**Dependencies**
- [`viem`](https://viem.sh) → Interact with Ethereum smart contracts  

**Dev dependencies**
- [`vite`](https://vitejs.dev/) → Dev server and bundler  
- [`typescript`](https://www.typescriptlang.org/) → TypeScript compiler  
- [`prettier`](https://prettier.io/) → Code formatter  
- [`concurrently`](https://www.npmjs.com/package/concurrently) → Run Anvil and Vite together  
- [`kill-port`](https://www.npmjs.com/package/kill-port) → Free ports before restart  

---

## ⚡ Requirements

- [Node.js](https://nodejs.org/) (>=18)  
- [pnpm](https://pnpm.io/) (>=9)  
- [Foundry](https://book.getfoundry.sh/getting-started/installation) (for `anvil`)  
- [MetaMask](https://metamask.io/) installed in your browser  

---
