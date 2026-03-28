// DOM elements
const idNumber = document.getElementById("nic");
const result = document.getElementById("showResult");
const dobResult = document.getElementById("showDOB");

// Month names array
const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
];

// NIC format patterns
const oldFormat = /^(\d{9})[VX]$/;
const newFormat = /^(\d{12})$/;

// Extract DOB and gender from day count
function extractDetails(dayCount) {
    const gender = dayCount > 500 ? "Female" : "Male";
    const actualDay = dayCount > 500 ? dayCount - 500 : dayCount;
    return { gender, actualDay };
}

// Format date to readable string
function formatDOB(year, dayCount) {
    const dob = new Date(year, 0, dayCount);
    const date = dob.getDate();
    const month = dob.getMonth();
    return `MONTH: ${months[month]} | DAY: ${date} | YEAR: ${year}`;
}

// Main input listener
idNumber.addEventListener('input', (e) => {
    const pureNIC = e.target.value.trim().toUpperCase();

    const resultLabel = document.getElementById('resultLabel');
    const noteText = document.getElementById('noteText');

    if (pureNIC.length === 0) {
        result.innerHTML = "";
        dobResult.innerHTML = "";
        noteText.classList.add('hidden');
        result.classList.add('hidden');
        dobResult.classList.add('hidden');
        resultLabel.classList.add('hidden');
        return;
    }

    result.classList.remove('hidden');
    dobResult.classList.remove('hidden');
    resultLabel.classList.remove('hidden');
    noteText.classList.remove('hidden');

    if (newFormat.test(pureNIC)) {
        // --- New format: 12 digits ---
        const year    = parseInt(pureNIC.substring(0, 4));
        const dayCount = parseInt(pureNIC.substring(4, 7));

        if (dayCount < 1 || dayCount > 866) {
            result.innerHTML = "Error: NIC day count out of range";
            dobResult.innerHTML = "";
            return;
        }

        const { gender, actualDay } = extractDetails(dayCount);

        if (actualDay < 1 || actualDay > 366) {
            result.innerHTML = "Error: Invalid DOB day from NIC";
            dobResult.innerHTML = "";
            return;
        }

        if (isNaN(year) || year < 1900 || year > 9999) {
            result.innerHTML = "Error: Invalid year in NIC";
            dobResult.innerHTML = "";
            return;
        }

        result.innerHTML   = `NEW GEN NIC | GENDER: ${gender}`;
        dobResult.innerHTML = formatDOB(year, actualDay);

    } else if (oldFormat.test(pureNIC)) {
        // --- Old format: 9 digits + V/X ---
        const year     = 1900 + parseInt(pureNIC.substring(0, 2));
        const dayCount = parseInt(pureNIC.substring(2, 5));

        if (dayCount < 1 || dayCount > 866) {
            result.innerHTML = "Error: NIC day count out of range";
            dobResult.innerHTML = "";
            return;
        }

        const { gender, actualDay } = extractDetails(dayCount);

        if (actualDay < 1 || actualDay > 366) {
            result.innerHTML = "Error: Invalid DOB day from NIC";
            dobResult.innerHTML = "";
            return;
        }

        result.innerHTML    = `OLD NIC | GENDER: ${gender}`;
        dobResult.innerHTML = formatDOB(year, actualDay);

    } else {
        // --- Invalid NIC ---
        result.innerHTML    = "Error: WRONG NIC INPUT";
        dobResult.innerHTML = "";
    }
});