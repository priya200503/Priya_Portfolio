// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-bs-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = body.getAttribute('data-bs-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  body.setAttribute('data-bs-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  if (theme === 'dark') {
    icon.className = 'bi bi-sun-fill';
  } else {
    icon.className = 'bi bi-moon-fill';
  }
}

// Typing Effect
const typedText = document.getElementById('typed-text');
const textArray = [
  'Web Developer',
  'Data Analyst',
  'UI/UX Enthusiast',
  'Problem Solver'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
  const currentText = textArray[textIndex];
  
  if (isDeleting) {
    typedText.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typedText.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }
  
  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    typingSpeed = 2000; // Pause before deleting
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % textArray.length;
    typingSpeed = 500; // Pause before typing next word
  }
  
  setTimeout(typeText, typingSpeed);
}

// Start typing effect
typeText();

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Navbar Background on Scroll
window.addEventListener('scroll', function() {
  const navbar = document.getElementById('mainNav');
  if (window.scrollY > 50) {
    navbar.classList.add('navbar-scrolled');
  } else {
    navbar.classList.remove('navbar-scrolled');
  }
});

// Active Navigation Link
window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === current) {
      link.classList.add('active');
    }
  });
});

// Animate Progress Bars
function animateProgressBars() {
  const progressBars = document.querySelectorAll('.progress-bar');
  progressBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0%';
    setTimeout(() => {
      bar.style.width = width;
    }, 500);
  });
}

// Animate on Scroll
function animateOnScroll() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementTop < windowHeight - 100) {
      element.classList.add('animate');
    }
  });
}

// Add animate-on-scroll class to testimonials and blog cards
document.addEventListener('DOMContentLoaded', function() {
  const testimonialCards = document.querySelectorAll('#testimonials .testimonial-card');
  testimonialCards.forEach(card => card.classList.add('animate-on-scroll'));

  const blogCards = document.querySelectorAll('#blog .blog-card');
  blogCards.forEach(card => card.classList.add('animate-on-scroll'));

  // Fetch and render testimonials data
  fetch('data/testimonials.json')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('testimonials-container');
      container.innerHTML = '';
      data.forEach(item => {
        const col = document.createElement('div');
        col.className = 'col-lg-4 mb-4';
        col.innerHTML = `
          <div class="testimonial-card p-4 bg-white rounded shadow-sm animate-on-scroll">
            <p class="mb-3">"${item.quote}"</p>
            <div class="stars mb-2">
              ${'★'.repeat(item.rating)}${'☆'.repeat(5 - item.rating)}
            </div>
            <h5 class="mb-0">- ${item.author}</h5>
            <small>${item.position}</small>
          </div>
        `;
        container.appendChild(col);
      });
    })
    .catch(error => console.error('Error loading testimonials:', error));

  // Fetch and render blog data
  fetch('data/blog.json')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('blog-container');
      container.innerHTML = '';
      data.forEach(item => {
        const col = document.createElement('div');
        col.className = 'col-lg-4 mb-4';
        col.innerHTML = `
          <div class="blog-card p-4 bg-white rounded shadow-sm animate-on-scroll">
            <h4 class="mb-3">${item.title}</h4>
            <p>${item.description}</p>
            <button class="btn btn-primary btn-sm read-more-btn" data-fullcontent="${encodeURIComponent(item.fullContent)}">Read More</button>
          </div>
        `;
        container.appendChild(col);
      });

      // Add event listeners for Read More buttons
      const readMoreButtons = document.querySelectorAll('.read-more-btn');
      readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
          const fullContent = decodeURIComponent(this.getAttribute('data-fullcontent'));
          Swal.fire({
            title: 'Blog Post',
            html: `<p>${fullContent}</p>`,
            confirmButtonText: 'Close',
            width: '600px'
          });
        });
      });
    })
    .catch(error => console.error('Error loading blog posts:', error));
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      
      // Animate progress bars when skills section is visible
      if (entry.target.id === 'skills') {
        animateProgressBars();
      }
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});

// Contact Form Validation and Submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();

  // Validate form
  if (!validateForm()) {
    return;
  }

  // Save form data to localStorage as JSON
  const formData = {
    name: contactForm.name.value,
    email: contactForm.email.value,
    subject: contactForm.subject.value,
    message: contactForm.message.value
  };
  localStorage.setItem('contactFormData', JSON.stringify(formData));

  // Show success alert
  Swal.fire({
    icon: 'success',
    title: 'Success',
    text: 'data saved successfully'
  });

  contactForm.reset();
  contactForm.classList.remove('was-validated');
});

function validateForm() {
  const form = contactForm;
  let isValid = true;
  
  // Remove previous validation classes
  form.classList.remove('was-validated');
  
  // Check each required field
  const requiredFields = form.querySelectorAll('[required]');
  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      field.classList.add('is-invalid');
      isValid = false;
    } else {
      field.classList.remove('is-invalid');
      field.classList.add('is-valid');
    }
  });
  
  // Email validation
  const emailField = form.querySelector('#email');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailField.value && !emailRegex.test(emailField.value)) {
    emailField.classList.add('is-invalid');
    isValid = false;
  }
  
  if (!isValid) {
    form.classList.add('was-validated');
  }
  
  return isValid;
}

function showNotification(message, type) {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show position-fixed`;
  notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
  notification.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  
  // Add to body
  document.body.appendChild(notification);
  
  // Remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 5000);
}

// Lazy Loading for Images
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('loading');
      imageObserver.unobserve(img);
    }
  });
});

images.forEach(img => {
  imageObserver.observe(img);
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;
  const heroSection = document.getElementById('home');
  const shapes = document.querySelectorAll('.shape');
  
  if (heroSection) {
    shapes.forEach((shape, index) => {
      const speed = 0.5 + (index * 0.1);
      shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
  }
});

// Initialize AOS (Animate On Scroll) alternative
document.addEventListener('DOMContentLoaded', function() {
  // Add animate-on-scroll class to elements
  const elementsToAnimate = document.querySelectorAll('.project-card, .testimonial-card, .blog-card, .skill-category, .timeline-item');
  elementsToAnimate.forEach(element => {
    element.classList.add('animate-on-scroll');
  });
  
  // Initial animation check
  animateOnScroll();
});

// Mobile Menu Close on Link Click
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
const navbarCollapse = document.querySelector('.navbar-collapse');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (navbarCollapse.classList.contains('show')) {
      const bsCollapse = new bootstrap.Collapse(navbarCollapse);
      bsCollapse.hide();
    }
  });
});

// Preloader (if needed)
window.addEventListener('load', function() {
  document.body.classList.add('loaded');
});

// Add hover effects to cards
const cards = document.querySelectorAll('.project-card, .testimonial-card, .blog-card');
cards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Smooth reveal animation for sections
function revealOnScroll() {
  const reveals = document.querySelectorAll('.animate-on-scroll');
  
  reveals.forEach(reveal => {
    const windowHeight = window.innerHeight;
    const elementTop = reveal.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < windowHeight - elementVisible) {
      reveal.classList.add('animate');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);

function downloadResume() {
  const link = document.createElement('a');
  link.href = 'deepakResume1307.pdf';
  link.download = 'deepakResume1307.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

document.addEventListener('DOMContentLoaded', function() {
  const downloadBtn = document.querySelector('#downloadResumeBtn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function(e) {
      e.preventDefault();
      downloadResume();
    });
  } 

  // Initialize Bootstrap components
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
  
  // Initial reveal check
  revealOnScroll();
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Bootstrap components
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
  
  // Initial reveal check
  revealOnScroll();
});