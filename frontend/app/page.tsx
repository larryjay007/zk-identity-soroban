"use client";

import { useState } from "react";

type ZkProof = {
  proof: string;
  publicInputs: string[];
};

export default function ZkIdentityApp() {
  const [secretInput, setSecretInput] = useState("");
  const [status, setStatus] = useState("Idle");
  const [proof, setProof] = useState<ZkProof | null>(null);

  const handleGenerateProof = async () => {
    if (!secretInput) {
      setStatus("Please enter a birth year first.");
      return;
    }

    setStatus("Generating REAL ZK proof...");
    setProof(null);

    try {
      const { Noir } = await import("@noir-lang/noir_js");
      const { BarretenbergBackend } = await import(
        "@noir-lang/backend_barretenberg"
      );

      const res = await fetch("/circuit.json");
      if (!res.ok) throw new Error("circuit.json not found");

      const circuit = await res.json();

      const backend = new BarretenbergBackend(circuit);
      const noir = new Noir(circuit);

      const birthYear = Number(secretInput);
      const currentYear = 2026;

      const input = {
        birth_year: birthYear,
        current_year: currentYear,
      };

      const { witness } = await noir.execute(input);

      if (!witness) throw new Error("Witness generation failed");

      const proofResult = await backend.generateProof(witness);

      const rawProof = proofResult.proof;
      const publicInputs = proofResult.publicInputs || [];

      const hexProof =
        "0x" +
        Array.from(new Uint8Array(rawProof))
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");

      const formattedPublicInputs = Array.from(publicInputs).map(String);

      setProof({
        proof: hexProof,
        publicInputs: formattedPublicInputs,
      });

      setStatus("✅ REAL proof generated successfully!");
    } catch (error: any) {
      console.error("ZK ERROR:", error);
      setStatus(error?.message || "Proof generation failed");
    }
  };

  return (
    <main
      style={{
        padding: "3rem",
        fontFamily: "sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <h1>🌌 zk-identity-soroban</h1>

      <p>Prove you are over 18 using Zero-Knowledge proofs on Stellar.</p>

      <hr style={{ margin: "2rem 0" }} />

      <input
        type="number"
        value={secretInput}
        onChange={(e) => setSecretInput(e.target.value)}
        placeholder="e.g. 1994"
        style={{ padding: "0.5rem", width: "100%" }}
      />

      <button onClick={handleGenerateProof} style={{ marginTop: "1rem" }}>
        Generate REAL ZK Proof
      </button>

      {proof && (
        <pre
          style={{
            marginTop: "2rem",
            background: "#222",
            color: "#0f0",
            padding: "1rem",
          }}
        >
          {JSON.stringify(proof, null, 2)}
        </pre>
      )}

      <p style={{ marginTop: "2rem" }}>
        Status: <strong>{status}</strong>
      </p>
    </main>
  );
}