function createMatrixInput() {
    const order = document.getElementById('order').value;
    if (order < 2 || order > 5) {
        alert("Please enter a valid order between 2 and 5");
        return;
    }

    const matrixSection = document.getElementById('matrix-input-section');
    matrixSection.innerHTML = '';

    const table = document.createElement('table');

    for (let i = 0; i < order; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < order; j++) {
            const cell = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'number';
            input.classList.add('matrix-value');
            cell.appendChild(input);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    matrixSection.appendChild(table);
    const button = document.createElement('button');
    button.innerText = 'Calculate Determinant';
    button.onclick = calculateDeterminant;
    matrixSection.appendChild(button);
}

function getMatrixValues(order) {
    const inputs = document.querySelectorAll('.matrix-value');
    const matrix = [];
    let index = 0;

    for (let i = 0; i < order; i++) {
        const row = [];
        for (let j = 0; j < order; j++) {
            row.push(parseFloat(inputs[index++].value));
        }
        matrix.push(row);
    }

    return matrix;
}

function calculateDeterminant() {
    const order = document.getElementById('order').value;
    const matrix = getMatrixValues(order);
    const determinant = computeDeterminant(matrix);

    const resultSection = document.getElementById('result-section');
    resultSection.innerHTML = `<p>Determinant: ${determinant}</p>`;
    if (determinant === 0) {
        resultSection.innerHTML += '<p>The matrix is singular.</p>';
    } else {
        resultSection.innerHTML += '<p>The matrix is not singular.</p>';
    }
}

function computeDeterminant(matrix) {
    const n = matrix.length;

    if (n === 1) {
        return matrix[0][0];
    } else if (n === 2) {
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    } else {
        let determinant = 0;
        for (let i = 0; i < n; i++) {
            const subMatrix = matrix.slice(1).map(row => row.filter((_, index) => index !== i));
            determinant += ((i % 2 === 0 ? 1 : -1) * matrix[0][i] * computeDeterminant(subMatrix));
        }
        return determinant;
    }
}