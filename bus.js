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







let seatsLeft = 8;
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
            alert('Maximum selection limit reached!');
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








// Function to calculate total price with discount
function calculateTotalPrice(discountPercentage) {
    const seatPrice = 550; // Assuming seat price is 550
    const discountedPrice = seatPrice - (seatPrice * discountPercentage) / 100;
    const totalPrice = selectedButtons.size * discountedPrice;
    return totalPrice;
}

// Function to apply discount based on coupon code
function applyDiscount() {
    var couponCode = document.getElementById('couponCodeInput').value.trim(); // Remove leading and trailing whitespace
    var grandTotalElement = document.getElementById('grandTotal');
    var totalPriceElement = document.getElementById('totalPrice');
    var grandTotalValue = 0;

    // Check if coupon code is NEW15
    if (couponCode.toUpperCase() === 'NEW15') {
        // Calculate total price with 15% discount
        var totalPrice = calculateTotalPrice(15);
        totalPriceElement.textContent = 'BDT ' + totalPrice;
        grandTotalValue = totalPrice;
    }
    // Check if coupon code is COUPLE20
    else if (couponCode.toUpperCase() === 'COUPLE 20') {
        // Calculate total price with 20% discount
        var totalPrice = calculateTotalPrice(20);
        totalPriceElement.textContent = 'BDT ' + totalPrice;
        grandTotalValue = totalPrice;
    }
    // Handle invalid coupon code
    else {
        alert('Invalid coupon code!');
        totalPriceElement.textContent = 'BDT 550'; // Reset total price to default
        grandTotalValue = 550; // Set grand total to default
    }

    // Update grand total
    grandTotalElement.textContent = 'BDT ' + grandTotalValue;
}

// Add an event listener to the Apply button for applying discounts
document.getElementById('applyButton').addEventListener('click', applyDiscount);
