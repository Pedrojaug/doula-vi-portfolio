// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
  
  // Initialize Carousel Dots and Active Slide
  initCarousel();
  
  // Initialize Scroll Spy
  initScrollSpy();
});

// STICKY HEADER & SCROLL SPY
const header = document.getElementById('header');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  // Sticky header class toggle
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  // Scroll Spy active link highlight
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    // Offset standard: 150px
    if (window.scrollY >= (sectionTop - 150)) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

function initScrollSpy() {
  // Trigger scroll spy on page load
  window.dispatchEvent(new Event('scroll'));
}

// MOBILE MENU TOGGLE
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  const icon = menuToggle.querySelector('i');
  if (navMenu.classList.contains('active')) {
    icon.setAttribute('data-lucide', 'x');
  } else {
    icon.setAttribute('data-lucide', 'menu');
  }
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});

// Close mobile menu when a nav link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    const icon = menuToggle.querySelector('i');
    icon.setAttribute('data-lucide', 'menu');
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  });
});

// SERVICES TABS FUNCTIONALITY
const tabBtns = document.querySelectorAll('.tab-btn');
const servicesPanels = document.querySelectorAll('.services-panel');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active from buttons
    tabBtns.forEach(b => b.classList.remove('active'));
    // Add active to current button
    btn.classList.add('active');
    
    // Get target tab
    const tabName = btn.getAttribute('data-tab');
    
    // Toggle active on panels
    servicesPanels.forEach(panel => {
      if (panel.id === `tab-${tabName}`) {
        panel.classList.add('active');
      } else {
        panel.classList.remove('active');
      }
    });
  });
});

// COURSES CATEGORIES FILTER
const filterBtns = document.querySelectorAll('.filter-btn');
const courseCards = document.querySelectorAll('.course-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Toggle active button class
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const filterValue = btn.getAttribute('data-filter');
    
    courseCards.forEach(card => {
      if (filterValue === 'all') {
        card.style.display = 'flex';
      } else {
        const cardCategory = card.getAttribute('data-category');
        if (cardCategory === filterValue) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      }
    });
  });
});

// TESTIMONIALS CAROUSEL
const track = document.getElementById('testimonialsTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('carouselDots');
let slides = [];
let currentSlideIndex = 0;

function initCarousel() {
  slides = Array.from(track.children);
  if (slides.length === 0) return;
  
  // Clear any existing dots
  dotsContainer.innerHTML = '';
  
  // Create dot indicators
  slides.forEach((slide, index) => {
    const dot = document.createElement('button');
    dot.classList.add('carousel-dot');
    if (index === 0) dot.classList.add('active');
    dot.setAttribute('aria-label', `Ir para depoimento ${index + 1}`);
    dot.addEventListener('click', () => moveToSlide(index));
    dotsContainer.appendChild(dot);
  });
  
  // Next/Prev click handlers
  nextBtn.addEventListener('click', () => {
    let nextIndex = currentSlideIndex + 1;
    if (nextIndex >= slides.length) nextIndex = 0;
    moveToSlide(nextIndex);
  });
  
  prevBtn.addEventListener('click', () => {
    let prevIndex = currentSlideIndex - 1;
    if (prevIndex < 0) prevIndex = slides.length - 1;
    moveToSlide(prevIndex);
  });
  
  // Auto-play testimonial carousel every 8 seconds
  setInterval(() => {
    let nextIndex = currentSlideIndex + 1;
    if (nextIndex >= slides.length) nextIndex = 0;
    moveToSlide(nextIndex);
  }, 8000);
}

function moveToSlide(index) {
  track.style.transform = `translateX(-${index * 100}%)`;
  currentSlideIndex = index;
  
  // Update dots
  const dots = Array.from(dotsContainer.children);
  dots.forEach((dot, idx) => {
    if (idx === index) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

// FAQ ACCORDION
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
  question.addEventListener('click', () => {
    const item = question.parentElement;
    const isActive = item.classList.contains('active');
    
    // Close all items
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('active');
    });
    
    // If it wasn't active, open it
    if (!isActive) {
      item.classList.add('active');
    }
  });
});

// CONTACT FORM SUBMISSION TO WHATSAPP
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const interest = document.getElementById('interest').value;
  const message = document.getElementById('message').value.trim();
  
  // Message formatting for WhatsApp
  let text = `Olá Vitória! Meu nome é *${name}*.\n\n`;
  text += `Tenho interesse em: *${interest}*\n`;
  text += `Meus contatos:\n`;
  text += `- E-mail: ${email}\n`;
  text += `- WhatsApp: ${phone}\n\n`;
  
  if (message) {
    text += `*Minha Mensagem:*\n"${message}"`;
  } else {
    text += `Gostaria de solicitar um orçamento e saber mais informações.`;
  }
  
  // URL encoding
  const encodedText = encodeURIComponent(text);
  const whatsappUrl = `https://wa.me/5583998564705?text=${encodedText}`;
  
  // Open WhatsApp in new tab
  window.open(whatsappUrl, '_blank');
});

// INTEGRATED CHECKOUT FLOW SYSTEM
const checkoutModal = document.getElementById('checkoutModal');
const closeCheckout = document.getElementById('closeCheckout');
const buyBtns = document.querySelectorAll('.course-buy-btn');

// Summary variables
const summaryCourseName = document.getElementById('summaryCourseName');
const summaryCoursePrice = document.getElementById('summaryCoursePrice');
const summaryCourseName2 = document.getElementById('summaryCourseName-2');
const summaryCoursePrice2 = document.getElementById('summaryCoursePrice-2');

// Panels & Step tabs
const stepTabs = [
  document.getElementById('stepTab-1'),
  document.getElementById('stepTab-2'),
  document.getElementById('stepTab-3')
];
const panels = [
  document.getElementById('checkoutPanel-1'),
  document.getElementById('checkoutPanel-2'),
  document.getElementById('checkoutPanel-3')
];

// Current checkout details
let activeCourse = {
  id: '',
  name: '',
  price: ''
};
let clientData = {
  name: '',
  email: '',
  phone: ''
};
let paymentMethod = 'pix';
let pixTimer = null;

// Open Checkout Modal
buyBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.course-card');
    activeCourse.id = card.getAttribute('data-id');
    activeCourse.name = card.getAttribute('data-name');
    activeCourse.price = card.getAttribute('data-price');
    
    // Set summary texts
    summaryCourseName.textContent = activeCourse.name;
    summaryCoursePrice.textContent = `R$ ${activeCourse.price}`;
    summaryCourseName2.textContent = activeCourse.name;
    summaryCoursePrice2.textContent = `R$ ${activeCourse.price}`;
    
    // Set up installments options for Credit Card
    const installmentsSelect = document.getElementById('cardInstallments');
    installmentsSelect.innerHTML = '';
    
    const parsedPrice = parseFloat(activeCourse.price.replace('.', '').replace(',', '.'));
    
    // Generate up to 12 installments
    for (let i = 1; i <= 12; i++) {
      const option = document.createElement('option');
      option.value = i;
      if (i === 1) {
        option.textContent = `1x de R$ ${activeCourse.price} sem juros`;
      } else {
        const valuePerInstallment = (parsedPrice / i).toFixed(2).replace('.', ',');
        option.textContent = `${i}x de R$ ${valuePerInstallment} sem juros`;
      }
      installmentsSelect.appendChild(option);
    }
    
    // Reset modal states
    changeStep(0);
    checkoutModal.classList.add('active');
  });
});

// Close Checkout Modal
closeCheckout.addEventListener('click', () => {
  checkoutModal.classList.remove('active');
  clearInterval(pixTimer);
});

// Step Navigation
function changeStep(stepIndex) {
  panels.forEach((panel, index) => {
    if (index === stepIndex) {
      panel.classList.add('active');
      stepTabs[index].classList.add('active');
    } else {
      panel.classList.remove('active');
      stepTabs[index].classList.remove('active');
    }
  });
}

// Form 1: Client Details Submission
const checkoutForm1 = document.getElementById('checkoutForm-1');
checkoutForm1.addEventListener('submit', (e) => {
  e.preventDefault();
  
  clientData.name = document.getElementById('chkName').value.trim();
  clientData.email = document.getElementById('chkEmail').value.trim();
  clientData.phone = document.getElementById('chkPhone').value.trim();
  
  // Go to step 2: Payment
  changeStep(1);
  startPixTimer();
});

// Payment Method Toggle
const payMethodPix = document.getElementById('payMethod-pix');
const payMethodCard = document.getElementById('payMethod-card');
const pixPaymentDetails = document.getElementById('pixPaymentDetails');
const cardPaymentDetails = document.getElementById('cardPaymentDetails');

payMethodPix.addEventListener('click', () => {
  paymentMethod = 'pix';
  payMethodPix.classList.add('active');
  payMethodCard.classList.remove('active');
  pixPaymentDetails.style.display = 'flex';
  cardPaymentDetails.style.display = 'none';
  startPixTimer();
});

payMethodCard.addEventListener('click', () => {
  paymentMethod = 'card';
  payMethodCard.classList.add('active');
  payMethodPix.classList.remove('active');
  cardPaymentDetails.style.display = 'block';
  pixPaymentDetails.style.display = 'none';
  clearInterval(pixTimer);
});

// Copy PIX Code to Clipboard
const copyPixBtn = document.getElementById('copyPixBtn');
const pixCodeText = document.getElementById('pixCodeText');

copyPixBtn.addEventListener('click', () => {
  // Use clipboard API
  navigator.clipboard.writeText(pixCodeText.textContent).then(() => {
    copyPixBtn.textContent = 'Copiado!';
    copyPixBtn.style.backgroundColor = '#25D366';
    setTimeout(() => {
      copyPixBtn.textContent = 'Copiar';
      copyPixBtn.style.backgroundColor = 'var(--primary)';
    }, 2000);
  }).catch(err => {
    console.error('Falha ao copiar Pix: ', err);
  });
});

// PIX Countdown Timer Simulation
function startPixTimer() {
  clearInterval(pixTimer);
  let duration = 600; // 10 minutes
  const display = document.getElementById('pixTimerCount');
  
  pixTimer = setInterval(() => {
    let minutes = Math.floor(duration / 60);
    let seconds = duration % 60;
    
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    
    display.textContent = `${minutes}:${seconds}`;
    
    if (--duration < 0) {
      clearInterval(pixTimer);
      display.textContent = 'Expirado';
    }
  }, 1000);
}

// PIX Payment Confirmation Button
const confirmPixBtn = document.getElementById('confirmPixBtn');
confirmPixBtn.addEventListener('click', () => {
  completeCheckout('PIX');
});

// Form 2: Card Payment Submission
const cardPaymentForm = document.getElementById('cardPaymentDetails');
cardPaymentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Simple validation for mock credit card
  const cardNumber = document.getElementById('cardNumber').value.replace(/\s+/g, '');
  const cardName = document.getElementById('cardName').value;
  const expiry = document.getElementById('cardExpiry').value;
  const cvv = document.getElementById('cardCvv').value;
  
  if (cardNumber.length < 13 || cvv.length < 3 || !expiry.includes('/')) {
    alert('Por favor, preencha os dados do cartão de crédito corretamente.');
    return;
  }
  
  completeCheckout('Cartão de Crédito');
});

// Credit Card Input formatting details
const cardNumInput = document.getElementById('cardNumber');
cardNumInput.addEventListener('input', (e) => {
  let val = e.target.value.replace(/\D/g, '');
  let formatted = '';
  for (let i = 0; i < val.length; i++) {
    if (i > 0 && i % 4 === 0) formatted += ' ';
    formatted += val[i];
  }
  e.target.value = formatted;
});

const cardExpiryInput = document.getElementById('cardExpiry');
cardExpiryInput.addEventListener('input', (e) => {
  let val = e.target.value.replace(/\D/g, '');
  if (val.length >= 2) {
    e.target.value = val.substring(0, 2) + '/' + val.substring(2, 4);
  } else {
    e.target.value = val;
  }
});

// Finish Checkout & Form Success Page Setup
function completeCheckout(method) {
  clearInterval(pixTimer);
  changeStep(2);
  
  // Set up WhatsApp success message button
  const whatsappBtn = document.getElementById('whatsappSuccessBtn');
  
  let msg = `Olá Vitória! Acabei de me inscrever no curso *${activeCourse.name}* pelo site.\n\n`;
  msg += `*Meus Dados:*\n`;
  msg += `- Nome: ${clientData.name}\n`;
  msg += `- E-mail de acesso: ${clientData.email}\n`;
  msg += `- WhatsApp: ${clientData.phone}\n\n`;
  msg += `*Pagamento:* Realizado via ${method} (R$ ${activeCourse.price})\n\n`;
  msg += `Segue anexo o comprovante de pagamento para liberação imediata da minha conta.`;
  
  const encodedMsg = encodeURIComponent(msg);
  whatsappBtn.setAttribute('href', `https://wa.me/5583998564705?text=${encodedMsg}`);
}
