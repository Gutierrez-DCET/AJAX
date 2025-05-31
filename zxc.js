// Global variables
let timeRecords = JSON.parse(localStorage.getItem('timeRecords')) || [];
let currentTimeIn = null;
let currentTimeOut = null;

// DOM Elements
const employeeIdInput = document.getElementById('employeeId');
const employeeNameInput = document.getElementById('employeeName');
const timeInBtn = document.getElementById('timeInBtn');
const timeOutBtn = document.getElementById('timeOutBtn');
const timeInDisplay = document.getElementById('timeInDisplay');
const timeOutDisplay = document.getElementById('timeOutDisplay');
const recordsBody = document.getElementById('recordsBody');

// Time In button event listener
timeInBtn.addEventListener('click', () => {
    if (!employeeIdInput.value || !employeeNameInput.value) {
        alert('Please fill in employee information');
        return;
    }

    const now = new Date();
    currentTimeIn = now;
    timeInDisplay.textContent = now.toLocaleTimeString();
    console.log(currentTimeIn);
});

// Time Out button event listener
timeOutBtn.addEventListener('click', () => {
    if (currentTimeIn == null) {
        alert('Please time in first');
        return;
    }

    const now = new Date();
    currentTimeOut = now;

    // Bug 4: Check if time-out is earlier than time-in
    if (currentTimeOut < currentTimeIn) {
        alert('Time-out cannot be earlier than time-in');
        return;
    }

    timeOutDisplay.textContent = now.toLocaleTimeString();
    console.log(currentTimeIn);

    // Bug 4: Calculate hours worked
    const hoursWorked = (currentTimeOut - currentTimeIn) / (1000 * 60 * 60);
    console.log(hoursWorked);

    if (hoursWorked > 8) {
        alert('You cannot Time out more than 8hrs');
        return;
    }

    // Bug 5: Create record and push to timeRecords
    const record = {
        date: now.toLocaleDateString(),
        timeIn: currentTimeIn.toLocaleTimeString(),
        timeOut: now.toLocaleTimeString(),
        hoursWorked: hoursWorked.toFixed(2)
    };

    timeRecords.push(record);
    localStorage.setItem('timeRecords', JSON.stringify(timeRecords)); // Save to localStorage
    updateRecordsTable();
});

function updateRecordsTable() {
    // Clear any previous table content
    recordsBody.innerHTML = '';

    // Check if there are any records
    if (timeRecords.length === 1) {
        // Add a row with "No Records Found" text
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.colSpan = 4;  // Make it span all columns
        cell.textContent = 'No Records Found'; // Set the text
        cell.style.textAlign = 'center';  // Center the text
        row.appendChild(cell);
        recordsBody.appendChild(row);
        return; // Exit the function after displaying the message
    }

    // If records exist, display them in the table
    timeRecords.forEach(record => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${record.date}</td>
            <td>${record.timeIn}</td>
            <td>${record.timeOut}</td>
            <td>${record.hoursWorked}</td>
        `;
        recordsBody.appendChild(row);
    });
}

// Bug 7: Employee ID validation - only allows numeric input
employeeIdInput.addEventListener('input', (e) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    employeeIdInput.value = numericValue;
});

// Bug 9: Data persistence using localStorage
if (timeRecords.length > 0) {
    updateRecordsTable();
}

// Optional: Handling errors if there's an issue with date/time operations
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.message);
});
