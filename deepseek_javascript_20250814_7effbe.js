// Sample medicine data
let medicines = [
    {
        id: 1,
        name: "Paracetamol 500mg",
        quantity: 15,
        productionDate: "2024-01-15",
        expirationDate: "2025-07-15",
        description: "Pain reliever and fever reducer",
        category: "pain",
        image: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect x='15' y='35' rx='15' ry='15' width='70' height='30' fill='%23FF6B6B'/%3E%3Ctext x='50' y='50' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dominant-baseline='middle'%3EParacetamol%3C/text%3E%3C/svg%3E"
    },
    {
        id: 2,
        name: "Amoxicillin 250mg",
        quantity: 8,
        productionDate: "2024-02-10",
        expirationDate: "2025-08-10",
        description: "Antibiotic for bacterial infections",
        category: "antibiotic",
        image: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect x='15' y='35' rx='15' ry='15' width='70' height='30' fill='%234ECDC4'/%3E%3Ctext x='50' y='50' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dominant-baseline='middle'%3EAmoxicillin%3C/text%3E%3C/svg%3E"
    },
    {
        id: 3,
        name: "Ibuprofen 400mg",
        quantity: 3,
        productionDate: "2024-03-05",
        expirationDate: "2025-09-05",
        description: "Nonsteroidal anti-inflammatory drug",
        category: "pain",
        image: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect x='15' y='35' rx='15' ry='15' width='70' height='30' fill='%23FF6B6B'/%3E%3Ctext x='50' y='50' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dominant-baseline='middle'%3EIbuprofen%3C/text%3E%3C/svg%3E"
    },
    {
        id: 4,
        name: "Lisinopril 10mg",
        quantity: 12,
        productionDate: "2023-12-20",
        expirationDate: "2024-12-20",
        description: "ACE inhibitor for hypertension",
        category: "chronic",
        image: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect x='15' y='35' rx='15' ry='15' width='70' height='30' fill='%23FFD166'/%3E%3Ctext x='50' y='50' font-family='Arial' font-size='14' fill='black' text-anchor='middle' dominant-baseline='middle'%3ELisinopril%3C/text%3E%3C/svg%3E"
    }
];

// Usage records
let usageRecords = [
    {
        id: 1,
        patientName: "Ahmed Hassan",
        patientAge: 45,
        medicineId: 1,
        medicineName: "Paracetamol 500mg",
        quantity: 2,
        date: "2023-10-15",
        doctor: "Dr. Fatima Al-Zahraa",
        condition: "Fever",
        notes: "Prescribed for 3 days"
    },
    {
        id: 2,
        patientName: "Mariam Khalid",
        patientAge: 32,
        medicineId: 2,
        medicineName: "Amoxicillin 250mg",
        quantity: 1,
        date: "2023-10-16",
        doctor: "Dr. Omar Saeed",
        condition: "Sinus infection",
        notes: "Full course prescribed"
    },
    {
        id: 3,
        patientName: "Youssef Mahmoud",
        patientAge: 67,
        medicineId: 4,
        medicineName: "Lisinopril 10mg",
        quantity: 1,
        date: "2023-10-17",
        doctor: "Dr. Fatima Al-Zahraa",
        condition: "Hypertension",
        notes: "Monthly refill"
    }
];

// DOM Elements
const tabs = document.querySelectorAll('.tab');
const contentSections = document.querySelectorAll('.content-section');
const medicinesGrid = document.getElementById('medicinesGrid');
const lowStockGrid = document.getElementById('low-stock-grid');
const recentRecords = document.getElementById('recent-records');
const recordsBody = document.getElementById('records-body');
const emptyRecordsMsg = document.getElementById('empty-records-message');
const notification = document.getElementById('notification');
const imageUploadArea = document.getElementById('image-upload-area');
const medImageInput = document.getElementById('med-image');
const imagePreview = document.getElementById('image-preview');
const addMedicineForm = document.getElementById('add-medicine-form');
const usageForm = document.getElementById('usage-form');
const medicineSelect = document.getElementById('medicine-select');
const exportRecordsBtn = document.getElementById('export-records');
const clearRecordsBtn = document.getElementById('clear-records');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

// Stats elements
const totalMedicinesEl = document.getElementById('total-medicines');
const lowStockEl = document.getElementById('low-stock');
const expiringSoonEl = document.getElementById('expiring-soon');
const totalUsageEl = document.getElementById('total-usage');

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    renderMedicines(medicines);
    renderLowStockMedicines();
    renderRecentRecords();
    renderAllRecords();
    populateMedicineSelect();
    updateStats();
    
    // Set default dates
    document.getElementById('production-date').valueAsDate = new Date();
    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
    document.getElementById('expiration-date').valueAsDate = oneYearFromNow;
    document.getElementById('usage-date').valueAsDate = new Date();
    
    // Load from localStorage if available
    const savedMedicines = localStorage.getItem('medicines');
    if (savedMedicines) {
        medicines = JSON.parse(savedMedicines);
        renderMedicines(medicines);
        renderLowStockMedicines();
        updateStats();
    }
    
    const savedRecords = localStorage.getItem('usageRecords');
    if (savedRecords) {
        usageRecords = JSON.parse(savedRecords);
        renderRecentRecords();
        renderAllRecords();
        updateStats();
    }
});

// Tab navigation
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-target');
        
        // Update active tab
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Show the selected section
        contentSections.forEach(section => section.classList.remove('active'));
        document.getElementById(target).classList.add('active');
    });
});

// Render medicines to the grid
function renderMedicines(meds) {
    medicinesGrid.innerHTML = '';
    
    meds.forEach(medicine => {
        const medicineCard = createMedicineCard(medicine);
        medicinesGrid.appendChild(medicineCard);
    });
}

// Create medicine card element
function createMedicineCard(medicine) {
    const card = document.createElement('div');
    card.className = 'medicine-card';
    
    // Check if medicine is low stock
    const lowStockClass = medicine.quantity <= 3 ? 'low-stock' : '';
    
    // Check expiration
    const today = new Date();
    const expDate = new Date(medicine.expirationDate);
    const diffTime = expDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    let expiringClass = '';
    
    if (diffDays < 0) {
        expiringClass = 'expired';
    } else if (diffDays <= 30) {
        expiringClass = 'expiring-soon';
    }
    
    card.innerHTML = `
        <button class="delete-btn" data-id="${medicine.id}">
            <i class="fas fa-trash"></i>
        </button>
        <div class="medicine-image">
            <img src="${medicine.image}" alt="${medicine.name}">
        </div>
        <div class="medicine-details">
            <div class="medicine-name">${medicine.name}</div>
            <div class="medicine-info">
                <div class="medicine-quantity">
                    <div class="quantity-value ${lowStockClass}">${medicine.quantity}</div>
                    <div class="quantity-label">in stock</div>
                </div>
                <div class="medicine-dates">
                    <div>Production: ${formatDate(medicine.productionDate)}</div>
                    <div class="${expiringClass}">Expires: ${formatDate(medicine.expirationDate)}</div>
                </div>
            </div>
            <div class="medicine-actions">
                <button class="action-btn" data-id="${medicine.id}" data-action="add">
                    <i class="fas fa-plus"></i> Stock
                </button>
                <button class="action-btn" data-id="${medicine.id}" data-action="remove">
                    <i class="fas fa-minus"></i> Use
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Render low stock medicines
function renderLowStockMedicines() {
    const lowStock = medicines.filter(med => med.quantity <= 3);
    lowStockGrid.innerHTML = '';
    
    lowStock.forEach(medicine => {
        const medicineCard = createMedicineCard(medicine);
        lowStockGrid.appendChild(medicineCard);
    });
}

// Format date as DD/MM/YYYY
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// Render recent records
function renderRecentRecords() {
    recentRecords.innerHTML = '';
    
    // Get last 3 records
    const recent = [...usageRecords].reverse().slice(0, 3);
    
    if (recent.length === 0) {
        recentRecords.innerHTML = `<tr><td colspan="4" style="text-align: center; padding: 20px; color: #666;">No recent usage records</td></tr>`;
    } else {
        recent.forEach(record => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${record.patientName}</td>
                <td>${record.medicineName}</td>
                <td>${record.quantity}</td>
                <td>${formatDate(record.date)}</td>
            `;
            recentRecords.appendChild(row);
        });
    }
}

// Render all records
function renderAllRecords() {
    recordsBody.innerHTML = '';
    
    if (usageRecords.length === 0) {
        emptyRecordsMsg.style.display = 'block';
        return;
    }
    
    emptyRecordsMsg.style.display = 'none';
    
    // Sort records by date (newest first)
    const sortedRecords = [...usageRecords].sort((a, b) => 
        new Date(b.date) - new Date(a.date)
    );
    
    sortedRecords.forEach(record => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${formatDate(record.date)}</td>
            <td>${record.patientName} (${record.patientAge})</td>
            <td>${record.medicineName}</td>
            <td>${record.quantity}</td>
            <td>${record.condition}</td>
            <td>${record.doctor}</td>
        `;
        recordsBody.appendChild(row);
    });
}

// Populate medicine select dropdown
function populateMedicineSelect() {
    medicineSelect.innerHTML = '<option value="">Select a medicine</option>';
    
    medicines.forEach(medicine => {
        const option = document.createElement('option');
        option.value = medicine.id;
        option.textContent = medicine.name;
        medicineSelect.appendChild(option);
    });
}

// Update statistics
function updateStats() {
    totalMedicinesEl.textContent = medicines.length;
    
    const lowStockCount = medicines.filter(med => med.quantity <= 3).length;
    lowStockEl.textContent = lowStockCount;
    
    const today = new Date();
    const expiringSoonCount = medicines.filter(med => {
        const expDate = new Date(med.expirationDate);
        const diffTime = expDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 && diffDays <= 30;
    }).length;
    
    expiringSoonEl.textContent = expiringSoonCount;
    totalUsageEl.textContent = usageRecords.length;
}

// Image upload
medImageInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        
        // Check file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            showNotification('Image size exceeds 2MB limit', 'warning');
            return;
        }
        
        const reader = new FileReader();
        
        reader.onload = (event) => {
            imagePreview.src = event.target.result;
            imagePreview.style.display = 'block';
        };
        
        reader.readAsDataURL(file);
    }
});

// Add medicine form
addMedicineForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newMedicine = {
        id: Date.now(),
        name: document.getElementById('med-name').value,
        quantity: parseInt(document.getElementById('med-quantity').value),
        productionDate: document.getElementById('production-date').value,
        expirationDate: document.getElementById('expiration-date').value,
        category: document.getElementById('med-category').value,
        description: document.getElementById('med-description').value,
        image: imagePreview.style.display === 'block' ? imagePreview.src : ''
    };
    
    // If no image uploaded, use a placeholder
    if (!newMedicine.image) {
        newMedicine.image = generateDefaultPillImage(
            newMedicine.name, 
            newMedicine.category
        );
    }
    
    medicines.push(newMedicine);
    
    // Save to localStorage
    localStorage.setItem('medicines', JSON.stringify(medicines));
    
    // Update UI
    renderMedicines(medicines);
    renderLowStockMedicines();
    updateStats();
    populateMedicineSelect();
    
    // Show notification
    showNotification('Medicine added successfully!');
    
    // Reset form
    addMedicineForm.reset();
    imagePreview.style.display = 'none';
    
    // Set default dates again
    document.getElementById('production-date').valueAsDate = new Date();
    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
    document.getElementById('expiration-date').valueAsDate = oneYearFromNow;
});

// Generate default pill image
function generateDefaultPillImage(name, category) {
    const colors = {
        'pain': '#FF6B6B',
        'antibiotic': '#4ECDC4',
        'chronic': '#FFD166',
        'vitamin': '#06D6A0',
        'other': '#118AB2'
    };
    
    const color = colors[category] || '#468faf';
    const textColor = category === 'chronic' ? 'black' : 'white';
    
    return `data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect x="15" y="35" rx="15" ry="15" width="70" height="30" fill="${encodeURIComponent(color)}"/><text x="50" y="50" font-family="Arial" font-size="14" fill="${encodeURIComponent(textColor)}" text-anchor="middle" dominant-baseline="middle">${encodeURIComponent(name.substring(0, 12))}</text></svg>`;
}

// Record usage form
usageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const medicineId = parseInt(medicineSelect.value);
    const medicine = medicines.find(m => m.id === medicineId);
    
    if (!medicine) {
        showNotification('Please select a valid medicine', 'warning');
        return;
    }
    
    const quantity = parseInt(document.getElementById('usage-quantity').value);
    
    if (quantity > medicine.quantity) {
        showNotification('Not enough stock available', 'danger');
        return;
    }
    
    // Update medicine quantity
    medicine.quantity -= quantity;
    
    // Create usage record
    const newRecord = {
        id: Date.now(),
        patientName: document.getElementById('patient-name').value,
        patientAge: parseInt(document.getElementById('patient-age').value),
        medicineId: medicine.id,
        medicineName: medicine.name,
        quantity: quantity,
        date: document.getElementById('usage-date').value,
        doctor: document.getElementById('doctor-name').value,
        condition: document.getElementById('condition').value,
        notes: document.getElementById('notes').value
    };
    
    usageRecords.push(newRecord);
    
    // Save to localStorage
    localStorage.setItem('medicines', JSON.stringify(medicines));
    localStorage.setItem('usageRecords', JSON.stringify(usageRecords));
    
    // Update UI
    renderMedicines(medicines);
    renderLowStockMedicines();
    renderRecentRecords();
    renderAllRecords();
    updateStats();
    
    // Show notification
    showNotification('Medicine usage recorded successfully!');
    
    // Reset form
    usageForm.reset();
    document.getElementById('usage-date').valueAsDate = new Date();
});

// Export records
exportRecordsBtn.addEventListener('click', () => {
    if (usageRecords.length === 0) {
        showNotification('No records to export', 'warning');
        return;
    }
    
    // Create CSV content
    let csvContent = "Date,Patient,Age,Medicine,Quantity,Condition,Doctor,Notes\n";
    
    usageRecords.forEach(record => {
        csvContent += `"${formatDate(record.date)}","${record.patientName}",${record.patientAge},"${record.medicineName}",${record.quantity},"${record.condition}","${record.doctor}","${record.notes || ''}"\n`;
    });
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'medicine-usage-records.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification('Records exported successfully!');
});

// Clear records functionality
clearRecordsBtn.addEventListener('click', () => {
    if (usageRecords.length === 0) {
        showNotification('No records to clear', 'warning');
        return;
    }
    
    if (confirm('Are you sure you want to clear ALL usage records? This action cannot be undone.')) {
        // Clear all usage records
        usageRecords = [];
        
        // Update localStorage
        localStorage.setItem('usageRecords', JSON.stringify(usageRecords));
        
        // Update UI
        renderRecentRecords();
        renderAllRecords();
        updateStats();
        
        showNotification('All usage records cleared successfully!');
    }
});

// Search medicines
searchBtn.addEventListener('click', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filtered = medicines.filter(med => 
        med.name.toLowerCase().includes(searchTerm) || 
        (med.description && med.description.toLowerCase().includes(searchTerm))
    );
    renderMedicines(filtered);
});

searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});

// Medicine actions (add/remove stock)
medicinesGrid.addEventListener('click', (e) => {
    if (e.target.closest('.action-btn')) {
        const btn = e.target.closest('.action-btn');
        const medicineId = parseInt(btn.getAttribute('data-id'));
        const action = btn.getAttribute('data-action');
        const medicine = medicines.find(m => m.id === medicineId);
        
        if (action === 'add') {
            const quantity = prompt(`How many units of ${medicine.name} to add?`, "10");
            if (quantity && !isNaN(quantity) && parseInt(quantity) > 0) {
                medicine.quantity += parseInt(quantity);
                localStorage.setItem('medicines', JSON.stringify(medicines));
                renderMedicines(medicines);
                renderLowStockMedicines();
                updateStats();
                showNotification(`Added ${quantity} units to ${medicine.name}`);
            }
        } else if (action === 'remove') {
            const quantity = prompt(`How many units of ${medicine.name} were used?`, "1");
            if (quantity && !isNaN(quantity) && parseInt(quantity) > 0) {
                if (parseInt(quantity) > medicine.quantity) {
                    showNotification('Not enough stock available', 'danger');
                    return;
                }
                medicine.quantity -= parseInt(quantity);
                localStorage.setItem('medicines', JSON.stringify(medicines));
                renderMedicines(medicines);
                renderLowStockMedicines();
                updateStats();
                showNotification(`Removed ${quantity} units from ${medicine.name}`);
            }
        }
    }
});

// Delete medicine functionality
document.addEventListener('click', (e) => {
    if (e.target.closest('.delete-btn')) {
        const btn = e.target.closest('.delete-btn');
        const medicineId = parseInt(btn.getAttribute('data-id'));
        
        if (confirm('Are you sure you want to delete this medicine? This action cannot be undone.')) {
            // Remove medicine from array
            const index = medicines.findIndex(m => m.id === medicineId);
            if (index !== -1) {
                medicines.splice(index, 1);
                
                // Update localStorage
                localStorage.setItem('medicines', JSON.stringify(medicines));
                
                // Update UI
                renderMedicines(medicines);
                renderLowStockMedicines();
                updateStats();
                populateMedicineSelect();
                
                showNotification('Medicine deleted successfully!');
            }
        }
    }
});

// Show notification
function showNotification(message, type = 'success') {
    const icon = type === 'success' ? 'fa-check-circle' : 
                type === 'warning' ? 'fa-exclamation-triangle' : 'fa-exclamation-circle';
    
    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <div>${message}</div>
    `;
    
    notification.className = 'notification show';
    if (type !== 'success') {
        notification.classList.add(type);
    }
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}