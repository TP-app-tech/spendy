let participants = [];
let expenses = [];

function addParticipant() {
    const input = document.getElementById('newParticipant');
    const name = input.value.trim();
    if (name) {
        participants.push({name: name, totalPaid: 0, totalDue: 0});
        input.value = '';
        renderParticipants();
        renderBalances();
    }
}

function renderParticipants() {
    const container = document.getElementById('participants');
    container.innerHTML = '';
    participants.forEach((p) => {
        const div = document.createElement('div');
        div.textContent = p.name;
        container.appendChild(div);
    });
}

function addExpense() {
    const desc = document.getElementById('expenseDescription').value.trim();
    const amount = parseFloat(document.getElementById('expenseAmount').value);
    if (!desc || isNaN(amount) || amount <= 0 || participants.length === 0) return;

    const parts = participants.map(() => 1); // 1 part par défaut
    const totalParts = parts.reduce((a,b) => a+b, 0);

    participants.forEach((p, i) => {
        p.totalDue += amount * (parts[i]/totalParts);
    });

    expenses.push({desc, amount});
    document.getElementById('expenseDescription').value = '';
    document.getElementById('expenseAmount').value = '';
    renderBalances();
}

function renderBalances() {
    const container = document.getElementById('balances');
    container.innerHTML = '';
    const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
    const avgShare = totalSpent / participants.length;

    participants.forEach(p => {
        const paid = p.totalPaid;
        const balance = paid - avgShare;
        const div = document.createElement('div');
        div.textContent = `${p.name}: ${balance.toFixed(2)} €`;
        container.appendChild(div);
    });
}
