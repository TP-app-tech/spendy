
let participants = [];
let expenses = [];

function addParticipant() {
  const nameInput = document.getElementById("participant-name");
  const name = nameInput.value.trim();
  if (name && !participants.includes(name)) {
    participants.push(name);
    updateParticipantsList();
    updatePartsInputs();
    updatePayerSelector();
  }
  nameInput.value = "";
}

function updateParticipantsList() {
  const list = document.getElementById("participants-list");
  list.innerHTML = participants.map(name => `<li>${name}</li>`).join("");
}

function updatePartsInputs() {
  const container = document.getElementById("parts-inputs");
  container.innerHTML = participants.map(p => 
    `<label>${p}: <input type='number' step='0.1' min='0' data-name='${p}' placeholder='Nombre de parts' /></label>`
  ).join("");
}

function updatePayerSelector() {
  const payerSelect = document.getElementById("payer-select");
  if (!payerSelect) return;

  payerSelect.innerHTML = participants.map(p => 
    `<option value='${p}'>${p}</option>`
  ).join("");
}

function addExpense() {
  const desc = document.getElementById("expense-desc").value;
  const amount = parseFloat(document.getElementById("expense-amount").value);
  const payer = document.getElementById("payer-select").value;
  const inputs = document.querySelectorAll("#parts-inputs input");
  let parts = {}, totalParts = 0;
  inputs.forEach(input => {
    const val = parseFloat(input.value) || 0;
    parts[input.dataset.name] = val;
    totalParts += val;
  });

  if (desc && !isNaN(amount) && totalParts > 0) {
    expenses.push({ desc, amount, payer, parts });
    updateSummary();
    document.getElementById("expense-desc").value = "";
    document.getElementById("expense-amount").value = "";
    inputs.forEach(i => i.value = "");
  }
}

function updateSummary() {
  const list = document.getElementById("summary-list");
  list.innerHTML = expenses.map(e => {
    return `<li>${e.desc} - ${e.amount.toFixed(2)} € (payé par ${e.payer})</li>`;
  }).join("");
}

function calculateBalances() {
  let balances = {};
  participants.forEach(p => balances[p] = 0);

  expenses.forEach(e => {
    const totalParts = Object.values(e.parts).reduce((a, b) => a + b, 0);
    participants.forEach(p => {
      const part = e.parts[p] || 0;
      const share = e.amount * part / totalParts;
      balances[p] -= share;
    });
    balances[e.payer] += e.amount;
  });

  const balanceList = document.getElementById("balances-list");
  balanceList.innerHTML = Object.entries(balances).map(([p, b]) =>
    `<li>${p} : ${b.toFixed(2)} €</li>`
  ).join("");
}

function downloadPDF() {
  alert("PDF export à venir...");
}
