document.addEventListener('DOMContentLoaded', () => {
    let slideIndex = 0;
    showSlides();

    // Show slides function
    function showSlides() {
        const slides = document.getElementsByClassName("slide");
        for (let slide of slides) {
            slide.style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) slideIndex = 1;
        if (slides[slideIndex - 1]) slides[slideIndex - 1].style.display = "block";
        setTimeout(showSlides, 1000);
    }

    // Mobile menu toggle for responsive design
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
  function togglePropertyType() {
    const propertyType = document.querySelector("select[name='type']").value;
    const bhkDropdown = document.getElementById("bhk-options");
    const kathaDropdown = document.getElementById("katha-options");
    const otherTypeDropdown = document.getElementById("other-options");

    // Reset visibility of all dropdowns
    bhkDropdown.style.display = "none";    // Initially hide BHK
    kathaDropdown.style.display = "none";  // Initially hide Katha
    otherTypeDropdown.style.display = "none"; // Initially hide Other Type dropdown

    // Show the relevant dropdown based on property type selection
    if (propertyType === "plot") {
      // Show Katha dropdown when Plot is selected
      kathaDropdown.style.display = "block";
    } else if (propertyType === "other") {
      // Show Other Type dropdown when Other is selected
      otherTypeDropdown.style.display = "block";
    } else {
      // Show BHK dropdown for Rent/Buy types
      bhkDropdown.style.display = "block";
    }
  }

// Typing effect for Hindi and English text
