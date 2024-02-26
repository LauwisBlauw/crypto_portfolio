document.addEventListener('DOMContentLoaded', function() {
    const rowsContainer = document.getElementById('rowsContainer');
    document.getElementById('addRow').addEventListener('click', addRow);
    rowsContainer.addEventListener('click', handleRowActions);
    rowsContainer.addEventListener('input', handleInputChange);

    function addRow() {
        const newRow = document.createElement('div');
        newRow.classList.add('cryptoRow');
        newRow.innerHTML = `
            <input list="coinsList" class="coinInput" placeholder="Type to search...">
            <input type="number" class="unitsInput" placeholder="Units" step="any">
            <button class="deleteRow">Delete</button>
        `;
        rowsContainer.appendChild(newRow);
    }

    function handleRowActions(e) {
        if (e.target.classList.contains('deleteRow')) {
            e.target.parentElement.remove();
        }
    }

    async function handleInputChange(e) {
        if (e.target.classList.contains('unitsInput')) {
            const units = parseFloat(e.target.value);
            if (isNaN(units) || units <= 0) {
                document.getElementById('totalValue').textContent = '0';
                return;
            }

            const coinInput = e.target.parentElement.querySelector('.coinInput').value;
            if (coinInput) {
                // Fetch price and calculate total value as shown previously
            }
        }
    }
});
