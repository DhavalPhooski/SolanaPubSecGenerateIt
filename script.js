//cursor
const blob = document.getElementById("blob");

document.body.onpointermove = event => {
  const x = event.clientX + window.scrollX;
  const y = event.clientY + window.scrollY;

  blob.animate({
    left: `${x}px`,
    top: `${y}px`
  }, {
    duration: 2500,
    fill: "forwards"
  });
};



// ✅ Generate Keypair
document.getElementById("generateBtn").addEventListener("click", () => {
  const keypair = solanaWeb3.Keypair.generate();

  const publicKey = keypair.publicKey.toBase58();
  const secretKeyArray = Array.from(keypair.secretKey);
  const secretKeyString = JSON.stringify(secretKeyArray);

  document.getElementById("keypairDetails").style.display = "block";
  document.getElementById("pubKeyValue").textContent = publicKey;
  document.getElementById("secKeyValue").textContent = secretKeyString;
});

// ✅ Inspect/Restore from Secret Key
document.getElementById("inspectBtn").addEventListener("click", () => {
  const input = document.getElementById("secretKeyInput").value.trim();

  try {
    const array = JSON.parse(input);
    if (!Array.isArray(array) || array.length !== 64) {
      throw new Error("Invalid array");
    }

    const keypair = solanaWeb3.Keypair.fromSecretKey(Uint8Array.from(array));

    document.getElementById("inspectOutput").style.display = "block";
    document.getElementById("restoredPubKey").textContent = keypair.publicKey.toBase58();
    document.getElementById("restoredSecKey").textContent = `[${array.join(', ')}]`;

  } catch (err) {
    alert("❌ Invalid secret key input. Make sure it's a valid 64-number array.");
  }
});
