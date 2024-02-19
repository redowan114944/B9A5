function ticket(event) {
    event.preventDefault();
    
    // Hide the banner section
    const bannerSection = document.getElementById('banner-screen');
    bannerSection.classList.add('hidden');

    // Hide the offer section
    const offerSection = document.getElementById('offer-section');
    offerSection.classList.add('hidden');

    // Show the ticket section
    const ticketSection = document.getElementById('ticket-Section');
    ticketSection.classList.remove('hidden');
}

// Add an event listener to the "Buy Tickets" button
document.getElementById('buyTicketsButton').addEventListener('click', ticket);








// ticket price section
// script.js

// script.js

const selectedButtons = new Set();
let totalPrice = 0;

document.querySelectorAll('.kbd').forEach((kbd, index) => {
    if (index !== 0) { // Excluding the first kbd element (svg kbd)
        kbd.addEventListener('click', () => {
            if (selectedButtons.has(kbd)) {
                selectedButtons.delete(kbd);
                kbd.style.backgroundColor = '';
                updateSelectedSeat();
                calculateTotalPrice();
            } else {
                if (selectedButtons.size < 4) {
                    selectedButtons.add(kbd);
                    kbd.style.backgroundColor = 'lime';
                    updateSelectedSeat();
                    calculateTotalPrice();
                } else {
                    if (selectedButtons.has(kbd)) {
                        selectedButtons.delete(kbd);
                        kbd.style.backgroundColor = '';
                        updateSelectedSeat();
                        calculateTotalPrice();
                    } else {
                        alert('Maximum selection limit reached!');
                    }
                }
            }
        });
    }
});




function updateSelectedSeat() {
    const selectedSeat1 = document.getElementById('selectedSeat1');
    const selectedClass1 = document.getElementById('selectedClass1');
    const selectedPrice1 = document.getElementById('selectedPrice1');

    // Assuming the class is always 'Economy' and the price is always 550
    const className = 'Economy';
    const price = 550;

    const selectedSeats = Array.from(selectedButtons).map(kbd => kbd.textContent);

    // Generate HTML for each selected seat, class, and price
    const seatInfoHTML = selectedSeats.map(seatName => `${seatName}<br>`);
    const classInfoHTML = selectedSeats.map(() => `${className}<br>`);
    const priceInfoHTML = selectedSeats.map(() => `${price}<br>`);

    // Update the seat, class, and price info elements
    selectedSeat1.innerHTML = seatInfoHTML.join('');
    selectedClass1.innerHTML = classInfoHTML.join('');
    selectedPrice1.innerHTML = priceInfoHTML.join('');
}









function calculateTotalPrice() {
    totalPrice = selectedButtons.size * 550; // Assuming seat price is 550
    const totalPriceElement = document.getElementById('totalPrice');
    totalPriceElement.innerHTML = `<span>BDT ${totalPrice}</span>`;
    const grandTotalElement = document.getElementById('grandTotal');
    grandTotalElement.innerHTML = `<span>BDT ${totalPrice}</span>`;
}







let seatsLeft = 40;
let selectedSeats = new Set();

function updateSeatCount() {
    const seatsLeftCounter = document.getElementById('seatsLeftCounter');
    seatsLeftCounter.textContent = seatsLeft + ' Seats left';
}

function selectSeat(event) {
    const selectedSeat = event.target.textContent;
    
    // Check if the seat is already selected
    if (selectedSeats.has(selectedSeat)) {
        // Deselect the seat
        selectedSeats.delete(selectedSeat);
        seatsLeft++;
    } else {
        // Check if the maximum number of seats is already selected
        if (selectedSeats.size >= 4) {
        
            return;
        }
        
        // Select the seat
        selectedSeats.add(selectedSeat);
        seatsLeft--;
    }
    
    updateSeatCount();
    
    // Enable or disable the modal button based on the number of selected seats
    const modalButton = document.getElementById('modalButton');
    modalButton.disabled = selectedSeats.size === 0;
}

// Add an event listener to the seat selection buttons
document.querySelectorAll('.kbd').forEach(kbd => {
    kbd.addEventListener('click', selectSeat);
});








// Function to calculate total price without discount
function calculateTotalPrice() {
    const seatPrice = 550; // Assuming seat price is 550
    const totalPrice = selectedButtons.size * seatPrice;
    return totalPrice;
}

// Function to update the total price display
function updateTotalPrice() {
    const totalPriceElement = document.getElementById('totalPrice');
    const totalPrice = calculateTotalPrice();
    totalPriceElement.textContent = `BDT ${totalPrice}`;
}

// Function to apply discount based on coupon code
function applyDiscount() {
    var couponCode = document.getElementById('couponCodeInput').value.trim(); // Remove leading and trailing whitespace
    var grandTotalElement = document.getElementById('grandTotal');
    var grandTotalValue = 0;

    // Calculate total price without discount
    var totalPrice = calculateTotalPrice();

    // Check if coupon code is NEW15
    if (couponCode.toUpperCase() === 'NEW15') {
        // Apply 15% discount to the total price
        grandTotalValue = totalPrice - (totalPrice * 15) / 100;
    }
    // Check if coupon code is COUPLE20
    else if (couponCode.toUpperCase() === 'COUPLE 20') {
        // Apply 20% discount to the total price
        grandTotalValue = totalPrice - (totalPrice * 20) / 100;
    }
    // Handle invalid coupon code
    else {
        alert('Invalid coupon code!');
        grandTotalValue = totalPrice; // Set grand total to total price without discount
    }

    // Update grand total
    grandTotalElement.textContent = 'BDT ' + grandTotalValue;
}

// Function to enable or disable the coupon code input field and Apply button based on selected seats
function toggleCouponCodeInput() {
    const couponCodeInput = document.getElementById('couponCodeInput');
    const applyButton = document.getElementById('applyButton');
    couponCodeInput.disabled = selectedButtons.size === 0;
    applyButton.disabled = selectedButtons.size === 0;
}

// Add an event listener to the Apply button for applying discounts
document.getElementById('applyButton').addEventListener('click', applyDiscount);

// Add an event listener to update the coupon code input field and Apply button based on selected seats
document.querySelectorAll('.kbd').forEach(kbd => {
    kbd.addEventListener('click', () => {
        toggleCouponCodeInput();
        updateTotalPrice(); // Update total price when a seat is selected or deselected
    });
});

// Call updateTotalPrice() to display the initial total price when the page loads
window.addEventListener('load', updateTotalPrice);

