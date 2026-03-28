# 🪪 Extract DOB from Sri Lankan NIC

A lightweight, zero-dependency web tool that extracts **Date of Birth** and **Gender** from Sri Lankan National Identity Card (NIC) numbers — supporting both old and new NIC formats.

---

## 🌐 Live Demo

🔗 [your-username.github.io/nic-extractor](https://your-username.github.io/nic-extractor)

---

## 📸 Preview

![NIC Extractor Preview](preview.png)

---

## ✨ Features

- ✅ Supports **old NIC format** (9 digits + V/X)
- ✅ Supports **new NIC format** (12 digits)
- ✅ Extracts **Date of Birth** (Day, Month, Year)
- ✅ Detects **Gender** (Male / Female)
- ✅ Real-time extraction as you type
- ✅ Input validation with error handling
- ✅ No libraries or frameworks required

---

## 🧠 How It Works

Sri Lankan NICs encode DOB and gender directly inside the number.

### Old Format — `9 digits + V or X`
```
Example: 901230567V

Digits 0–1  → Birth year  → 90 + 1900 = 1990
Digits 2–4  → Day of year → 123 = May 3rd
Last char   → V or X (check digit)
```

### New Format — `12 digits`
```
Example: 199012305678

Digits 0–3  → Birth year  → 1990
Digits 4–6  → Day of year → 123 = May 3rd
```

### Gender Rule
```
Day of year > 500 → Female (subtract 500 to get actual day)
Day of year ≤ 500 → Male
```

---

## 📁 Project Structure

```
nic-extractor/
│
├── index.html       # Main HTML file (Tailwind CSS via CDN)
├── script.js        # NIC extraction logic
└── README.md        # Project documentation
```

---

## 🚀 Getting Started

### Run locally

```bash
# Clone the repository
git clone https://github.com/your-username/nic-extractor.git

# Open in browser
cd nic-extractor
open index.html
```

No build steps, no installs — just open `index.html` in any browser.

---

## 🎨 Styling

This project uses **Tailwind CSS via CDN** — no installation or build process needed.

```html
<!-- Added in <head> of index.html -->
<script src="https://cdn.tailwindcss.com"></script>
```

---

## 💻 Core JavaScript Logic

```javascript
// Regex patterns
const oldFormat = /^(\d{9})[VX]$/;
const newFormat = /^(\d{12})$/;

// Extract gender and actual day count
function extractDetails(dayCount) {
    const gender    = dayCount > 500 ? "Female" : "Male";
    const actualDay = dayCount > 500 ? dayCount - 500 : dayCount;
    return { gender, actualDay };
}

// Format DOB to readable string
function formatDOB(year, dayCount) {
    const dob   = new Date(year, 0, dayCount);
    const date  = dob.getDate();
    const month = dob.getMonth();
    return `${months[month]} ${date}, ${year}`;
}
```

---

## 🧪 Example Outputs

| NIC | Format | DOB | Gender |
|---|---|---|---|
| `199012305678` | New | May 3, 1990 | Male |
| `199056305678` | New | May 3, 1990 | Female |
| `901230567V` | Old | May 3, 1990 | Male |
| `905730567V` | Old | May 3, 1990 | Female |

---

## ⚠️ Input Validation

| Input | Result |
|---|---|
| Valid 12-digit NIC | ✅ Extracts DOB and gender |
| Valid 9+V/X NIC | ✅ Extracts DOB and gender |
| Wrong length or format | ❌ Shows error message |
| Lowercase v/x | ✅ Auto-converted to uppercase |

---

## 🛠️ Built With

- HTML5
- [Tailwind CSS](https://tailwindcss.com) (via CDN)
- Vanilla JavaScript (ES6+)

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙌 Author

Made with ❤️ in Sri Lanka

> Feel free to fork, star ⭐, and contribute!