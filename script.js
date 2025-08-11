document.addEventListener('DOMContentLoaded', () => {
    let slideIndex = 0;
    const cards = document.querySelectorAll('.signup-card');
    const totalCards = cards.length;
    const container = document.querySelector('.signup-cards');
    
    showSlides();

    // Show slides function
    function showSlides() {
        for (let i = 0; i < totalCards; i++) {
            cards[i].style.display = "none"; // Hide all cards initially
        }

        slideIndex++;
        if (slideIndex > totalCards) slideIndex = 1;
        
        if (cards[slideIndex - 1]) {
            cards[slideIndex - 1].style.display = "block"; // Show the current card
        }

        // Auto-slide after 3 seconds (adjust as necessary)
        setTimeout(showSlides,0);
    }

    // Mobile view card slide functionality for full-width on small screens
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });
    
    // Active class for navigation items
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            navItems.forEach(el => el.classList.remove("active"));
            item.classList.add("active");
        });
    });

    // Function to toggle full width for sliding when the screen is small
    if (window.innerWidth < 480) {
        container.style.overflowX = 'scroll';
        container.style.display = 'flex';
        container.style.flexDirection = 'row';
        cards.forEach(card => {
            card.style.flex = '0 0 auto'; // Ensures cards don’t shrink when sliding
        });
    }
});

// Scroll left and right functions, accepting the scroll container ID
function slideLeft() {
    const container = document.getElementById('propertySlider');
    container.scrollBy({ left: -300, behavior: 'smooth' });
}

function slideRight() {
    const container = document.getElementById('propertySlider');
    container.scrollBy({ left: 300, behavior: 'smooth' });
}

// Auto-scroll for property slider
setInterval(() => {
    const container = document.getElementById('propertySlider');
    if (container) {
        container.scrollBy({ left: 300, behavior: 'smooth' });
    }
}, 3000);

// Voice input for search
function startVoiceInput() {
    const searchInput = document.getElementById('searchInput');

    if (!('webkitSpeechRecognition' in window)) {
        alert("Sorry, your browser doesn't support voice recognition.");
        return;
    }

    const recognition = new webkitSpeechRecognition(); // For Chrome
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onstart = () => {
        console.log('Voice recognition started. Speak into the mic...');
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        searchInput.value = transcript;
        searchProperty(); // Trigger your search function after voice input
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        alert('Voice input failed: ' + event.error);
    };

    recognition.onend = () => {
        console.log('Voice recognition ended.');
    };
}

// Search function to redirect based on the form inputs
function searchProperty() {
    const query = document.getElementById('searchInput').value.trim();
    const minPrice = document.getElementById('minPrice').value;
    const maxPrice = document.getElementById('maxPrice').value;
    const type = document.getElementById('typeSelect').value;

    const params = new URLSearchParams();
    if (query) params.append('query', query);
    if (minPrice) params.append('minPrice', minPrice);
    if (maxPrice) params.append('maxPrice', maxPrice);
    if (type) params.append('type', type);

    window.location.href = `/search?${params.toString()}`;
}
const textElement = document.getElementById('text');
const messages = [
  'आओ अपना घर देखें',
  'Come, let’s find your home.'
];
let currentMessageIndex = 0;

function typeText(message, callback) {
  let i = 0;
  textElement.textContent = ''; // Clear previous text
  const interval = setInterval(() => {
    textElement.textContent += message[i];
    i++;
    if (i === message.length) {
      clearInterval(interval);
      setTimeout(callback, 2000); // Wait for 2 seconds before callback
    }
  }, 100); // Type each letter with a delay of 100ms
}

function cycleMessages() {
  typeText(messages[currentMessageIndex], () => {
    currentMessageIndex = (currentMessageIndex + 1) % messages.length;
    cycleMessages(); // Repeat the process
  });
}

cycleMessages(); // Start the typing effect
 function handleWhatsAppClick() {
    if (!isLoggedIn) {
      alert("You need to login first. Redirecting to login page...");
      window.location.href = '/login';  // Redirect to login page
    } else {
      // Open WhatsApp if the user is logged in
      const message = document.getElementById("whatsapp-btn-not-logged-in").getAttribute("data-message");
      const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
    }
  }

document.addEventListener('DOMContentLoaded', function() {
  // Set up Intersection Observer
  const options = {
    root: null, // viewport
    rootMargin: '0px',
    threshold: 0.5 // Trigger when 50% of the card is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add the visible class to trigger the animation
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Stop observing once it's in view
      }
    });
  }, options);

  // Observe all the signup cards
  const cards = document.querySelectorAll('.signup-card');
  cards.forEach(card => {
    observer.observe(card);
  });
});
document.addEventListener("DOMContentLoaded", function() {
    const imgElement = document.getElementById('imageSlider');
    const images = ['images/back.png', 'images/download.png']; // Array of images
    let index = 0;

    // Change image every 2 seconds
    setInterval(() => {
        index = (index + 1) % images.length; // Loop through the images array
        imgElement.src = images[index]; // Change to the next image
    }, 2000); // 2000ms = 2 seconds
});

// Typing effect for Hindi and English text
