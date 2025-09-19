import {
  createWalletClient,
  custom,
  createPublicClient,
  parseEther,
  formatEther,
  defineChain,
} from "https://esm.sh/viem";
import { contractAddress, coffeeAbi } from "./constants-js.js";

const connectButton = document.getElementById("connectButton");
const fundButton = document.getElementById("fundButton");
const ethAmountInput = document.getElementById("ethAmount");
const balanceButton = document.getElementById("balanceButton");
const withdrawButton = document.getElementById("withdrawButton");
const fundersButton = document.getElementById("fundersButton");

let walletClient;
let publicClient;

async function connect() {
  if (typeof window.ethereum !== "undefined") {
    walletClient = createWalletClient({
      transport: custom(window.ethereum),
    });

    const addresses = await walletClient.requestAddresses();
    connectButton.innerHTML = "Connected: " + addresses[0];
  } else {
    connectButton.innerHTML = "Please install MetaMask!";
  }
}

async function fund() {
  const ethAmount = ethAmountInput.value;
  console.log(`Funding with ${ethAmount}...`);

  if (typeof window.ethereum !== "undefined") {
    walletClient = createWalletClient({
      transport: custom(window.ethereum),
    });
    const [connectedAccount] = await walletClient.requestAddresses();
    const currentChain = await getCurrentChain(walletClient);

    publicClient = createPublicClient({
      transport: custom(window.ethereum),
    });
    const { request } = await publicClient.simulateContract({
      address: contractAddress,
      abi: coffeeAbi,
      functionName: "fund",
      account: connectedAccount,
      chain: currentChain,
      value: parseEther(ethAmount),
    });

    const hash = await walletClient.writeContract(request);
    console.log(hash);
  } else {
    connectButton.innerHTML = "Please install MetaMask!";
  }
}

async function getCurrentChain(client) {
  const chainId = await client.getChainId();
  const currentChain = defineChain({
    id: chainId,
    name: "Custom Chain",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ["http://localhost:8545"],
      },
    },
  });
  return currentChain;
}

async function getBalance() {
  publicClient = createPublicClient({
    transport: custom(window.ethereum),
  });
  const balance = await publicClient.getBalance({
    address: contractAddress,
  });
  console.log("Contrato tiene:", formatEther(balance), "ETH");
}

async function withdraw() {
  console.log("Withdrawing funds...");

  if (typeof window.ethereum !== "undefined") {
    walletClient = createWalletClient({
      transport: custom(window.ethereum),
    });
    const [connectedAccount] = await walletClient.requestAddresses();
    const currentChain = await getCurrentChain(walletClient);

    publicClient = createPublicClient({
      transport: custom(window.ethereum),
    });

    const { request } = await publicClient.simulateContract({
      address: contractAddress,
      abi:coffeeAbi,
      functionName: "withdraw",
      account: connectedAccount,
      chain: currentChain,
    });

    const hash = await walletClient.writeContract(request);
    console.log("Withdraw tx hash:", hash);
  } else {
    connectButton.innerHTML = "Please install MetaMask!";
  }
}

async function revealFunders() {
  if (typeof window.ethereum === "undefined") {
    connectButton.innerHTML = "Please install MetaMask!";
    return;
  }

  publicClient = createPublicClient({
    transport: custom(window.ethereum),
  });

  const funders = [];
  const seen = new Set(); 
  const MAX_FUNDERS = 200;

  for (let i = 0; i < MAX_FUNDERS; i++) {
    try {
      const addr = await publicClient.readContract({
        address: contractAddress,
        abi: coffeeAbi,
        functionName: "getFunder",
        args: [BigInt(i)],
      });

      
      if (!seen.has(addr)) {
        seen.add(addr);
        funders.push(addr);
      }
    } catch {

      break;
    }
  }
  console.log("Funders :", funders);
}



connectButton.onclick = connect;
fundButton.onclick = fund;
balanceButton.onclick = getBalance;
withdrawButton.onclick = withdraw;
fundersButton.onclick = revealFunders;
