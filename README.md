# 🌌 zk-identity-soroban

A Zero-Knowledge proof application built on Stellar that allows users to prove they are over 18 **without revealing their birth date**.

---

## 🚀 Overview

This project demonstrates how Zero-Knowledge (ZK) proofs can be used for **privacy-preserving identity verification**.

Users can:
- Input their birth year
- Generate a Zero-Knowledge proof locally
- Prove they meet an age requirement (18+) without revealing sensitive data

---

## 🧠 How It Works

1. User inputs birth year
2. Noir circuit computes:

current_year - birth_year >= 18

3. A ZK proof is generated using:
- Noir (circuit execution)
- Barretenberg (proof generation)
4. The proof can be verified (simulated or on-chain)

---

## 🛠 Tech Stack

- **Frontend:** Next.js (React)
- **ZK Framework:** Noir
- **Proof Backend:** Barretenberg
- **Blockchain (target):** Stellar (Soroban smart contracts)

---

## 📂 Project Structure

zk-identity-soroban/
├── circuits/
│ └── age_verifier/
│ ├── src/main.nr
│ ├── Nargo.toml
│
├── contract/
│ └── zk_identity_verifier/
│
├── frontend/
│ ├── app/page.tsx
│ ├── public/
│ └── package.json
│
└── README.md


---

## ⚙️ Setup Instructions

### 1. Clone the repo

git clone https://github.com/larry007/zk-identity-soroban.git
cd zk-identity-soroban

# 2. Install frontend dependencies
cd frontend
npm install


# 3. Run the app
npm run dev -- --webpack

Open:

http://localhost:3000


🧪 Usage
Enter a birth year (e.g. 1994)
Click Generate ZK Proof
View generated proof
(Optional) Submit for verification

⚠️ Notes
- Proof generation happens client-side
- Some parts may use mock/simulated verification
- WASM + Barretenberg setup may require environment tuning.

💡 Future Improvements
- Full on-chain verification on Stellar
- Wallet integration (Freighter)
- Better UX and validation
- Deploy to production