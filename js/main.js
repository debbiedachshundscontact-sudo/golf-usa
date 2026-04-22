const STORAGE_KEY = 'golfcart_listings';
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400';

const sampleListings = [
  {
    id: '1',
    title: '2024 EZGO TXT Freedom PDS',
    price: 8999,
    year: 2024,
    make: 'EZGO',
    model: 'TXT Freedom',
    condition: 'New',
    type: 'Electric',
    seats: '4',
    color: 'Pearl White',
    mileage: '0',
    location: 'FL',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800',
    description: 'Brand new 2024 EZGO TXT Freedom with Premium Digital Display. Features 48V AC drive, independent suspension, and ergonomic seat. Perfect for golf and community use.',
    features: ['LED Lights', 'USB Charger', 'Windshield', 'Rear Seat']
  },
  {
    id: '2',
    title: '2022 Club Car Onward 2Passenger',
    price: 7499,
    year: 2022,
    make: 'Club Car',
    model: 'Onward',
    condition: 'Used',
    type: 'Electric',
    seats: '2',
    color: 'Midnight Black',
    mileage: '450',
    location: 'AZ',
    image: 'https://images.unsplash.com/photo-1534234828563-0fa3b3d1d66b?w=800',
    description: 'Low mileage Club Car Onward in excellent condition. Single owner, always garaged. Great for golf courses and personal use.',
    features: ['Windshield', 'Chrome Wheels', 'Onboard Charger']
  },
  {
    id: '3',
    title: '2023 Yamaha Drive2 PTV',
    price: 9499,
    year: 2023,
    make: 'Yamaha',
    model: 'Drive2',
    condition: 'New',
    type: 'Lithium',
    seats: '4',
    color: 'Navy Blue',
    mileage: '0',
    location: 'TX',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800',
    description: 'Yamaha Drive2 with lithium battery technology. Longer range, faster charging, zero maintenance. The premium choice for discerning golfers.',
    features: ['LED Lights', 'Bluetooth', 'USB Charger', 'Lift Kit', 'All-Terrain Tires']
  },
  {
    id: '4',
    title: '2021 EZGO RXV Extended',
    price: 5999,
    year: 2021,
    make: 'EZGO',
    model: 'RXV',
    condition: 'Used',
    type: 'Electric',
    seats: '6',
    color: 'Forest Green',
    mileage: '1200',
    location: 'SC',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800',
    description: 'Extended body EZGO RXV perfect for large families or commercial use. Recently serviced, new batteries.',
    features: ['Rear Seat', 'Windshield', 'Onboard Charger']
  },
  {
    id: '5',
    title: 'Custom Star EV li5 4Seater',
    price: 12999,
    year: 2024,
    make: 'Star EV',
    model: 'li5',
    condition: 'New',
    type: 'Lithium',
    seats: '4',
    color: 'Champagne Gold',
    mileage: '0',
    location: 'NC',
    image: 'https://images.unsplash.com/photo-1534234828563-0fa3b3d1d66b?w=800',
    description: 'Stunning custom Star EV with premium upgrades. Lithium battery, extended range, luxury seating.',
    features: ['LED Lights', 'Bluetooth', 'USB Charger', 'Custom Paint', 'Chrome Wheels', 'All-Terrain Tires']
  },
  {
    id: '6',
    title: '2020 Club Car Villager 4',
    price: 4999,
    year: 2020,
    make: 'Club Car',
    model: 'Villager 4',
    condition: 'Used',
    type: 'Gas',
    seats: '4',
    color: 'Ocean Blue',
    mileage: '2300',
    location: 'GA',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800',
    description: 'Gas powered Club Car Villager. No range anxiety - just fill and go. Great for long courses.',
    features: ['Windshield', 'All-Terrain Tires']
  }
];

function getListings() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleListings));
  return sampleListings;
}

function saveListings(listings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(listings));
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function formatPrice(price) {
  return '$' + parseInt(price).toLocaleString();
}

function createListingCard(listing) {
  const card = document.createElement('div');
  card.className = 'listing-card';
  const paymentMethods = listing.payments ? listing.payments.slice(0, 3).join(', ') : 'Credit Card, Financing';
  card.innerHTML = `
    <div class="listing-image">
      <span class="listing-badge">${listing.condition}</span>
      <img src="${listing.image || DEFAULT_IMAGE}" alt="${listing.title}" loading="lazy">
    </div>
    <div class="listing-content">
      <div class="listing-price">${formatPrice(listing.price)}</div>
      <h3 class="listing-title">${listing.title}</h3>
      <div class="listing-details">
        <span>${listing.year}</span>
        <span>${listing.make}</span>
        <span>${listing.type}</span>
        <span>${listing.seats} seat</span>
      </div>
      <div class="listing-payments">
        <small>💳 ${paymentMethods}${listing.payments && listing.payments.length > 3 ? '...' : ''}</small>
      </div>
      <div class="listing-meta">
        <span class="listing-location">📍 ${listing.location}</span>
        <a href="listing.html?id=${listing.id}" class="btn btn-sm btn-outline">View</a>
      </div>
    </div>
  `;
  return card;
}

function renderListings(containerId, filterFn = null) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';

  let listings = getListings();

  if (filterFn) {
    listings = listings.filter(filterFn);
  }

  if (listings.length === 0) {
    container.innerHTML = '<div class="empty-state"><p>No listings found</p></div>';
    return;
  }

  listings.forEach(listing => {
    container.appendChild(createListingCard(listing));
  });
}

function showAllListings() {
  const grid = document.getElementById('listings-grid');
  if (grid) {
    renderListings('listings-grid');
  }
}

function filterByCategory(category) {
  const filterMap = {
    'new': l => l.condition === 'New',
    'used': l => l.condition === 'Used',
    'custom': l => l.features && l.features.length > 3,
    'commercial': l => l.seats === '6'
  };

  const filterFn = filterMap[category];
  if (filterFn) {
    renderListings('listings-grid', filterFn);
    document.getElementById('listings').scrollIntoView({ behavior: 'smooth' });
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  if (document.getElementById('listings-grid')) {
    renderListings('listings-grid');
  }

  initChatbot();

  // Initialize modals
  const calcModal = document.getElementById('calculator-modal');
  if (calcModal) {
    calculatePayment();
  }

  const tradeModal = document.getElementById('tradein-modal');
  if (tradeModal) {
    tradeModal.addEventListener('submit', function(e) {
      e.preventDefault();
    });
  }

  // Modal close on overlay click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        overlay.classList.remove('show');
      }
    });
  });

  const searchForm = document.getElementById('search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const make = document.getElementById('search-make').value.toLowerCase();
      const condition = document.getElementById('search-condition').value;
      const type = document.getElementById('search-type').value;
      const state = document.getElementById('search-state').value;

      renderListings('listings-grid', function(listing) {
        if (make && !listing.make.toLowerCase().includes(make) && !listing.title.toLowerCase().includes(make)) {
          return false;
        }
        if (condition && listing.condition !== condition) {
          return false;
        }
        if (type && listing.type !== type) {
          return false;
        }
        if (state && listing.location !== state) {
          return false;
        }
        return true;
      });

      document.getElementById('listings').scrollIntoView({ behavior: 'smooth' });
    });
  }

  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      item.classList.toggle('open');
    });
  });

  if (document.getElementById('listing-detail-content')) {
    loadListingDetail();
  }

  if (document.getElementById('admin-listings-body') || document.getElementById('listing-form')) {
    initAdmin();
  }

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your inquiry! We will contact you shortly.');
      contactForm.reset();
    });
  }

  window.toggleFaq = function(element) {
    const faqItem = element.parentElement;
    faqItem.classList.toggle('open');
  };

  window.filterByCategory = filterByCategory;
  window.showAllListings = showAllListings;
  window.changeImage = changeImage;
  window.exportData = exportData;
  window.importData = importData;
});

function loadListingDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    window.location.href = 'index.html';
    return;
  }

  const listings = getListings();
  const listing = listings.find(l => l.id === id);

  if (!listing) {
    window.location.href = 'index.html';
    return;
  }

  document.title = `${listing.title} | Smart Generation Golf Carts`;
  document.getElementById('page-title').textContent = `${listing.title} for Sale - ${listing.year} ${listing.make}`;
  document.getElementById('page-description').content = `${listing.year} ${listing.make} ${listing.model} ${listing.condition} golf cart for sale in ${listing.location}. ${formatPrice(listing.price)}. ${listing.features ? listing.features.slice(0,3).join(', ') : ''}`;

  document.getElementById('og-title').content = `${listing.title} - ${formatPrice(listing.price)}`;
  document.getElementById('og-description').content = listing.description || `${listing.year} ${listing.make} golf cart for sale`;
  document.getElementById('og-image').content = listing.image || DEFAULT_IMAGE;
  document.getElementById('twitter-title').content = `${listing.title} - ${formatPrice(listing.price)}`;

  const canonical = document.getElementById('page-canonical');
  if (canonical) {
    canonical.href = `https://golfcart-usa.com/listing.html?id=${id}`;
  }

  const schema = JSON.parse(document.getElementById('schema-product').textContent);
  schema.name = listing.title;
  schema.description = listing.description || listing.title;
  schema.image = [listing.image || DEFAULT_IMAGE];
  schema.offers.price = listing.price;
  document.getElementById('schema-product').textContent = JSON.stringify(schema);

  document.getElementById('listing-image').src = listing.image || DEFAULT_IMAGE;
  document.getElementById('listing-title').textContent = listing.title;
  document.getElementById('listing-price').textContent = formatPrice(listing.price);

  document.getElementById('spec-year').textContent = listing.year;
  document.getElementById('spec-make').textContent = listing.make;
  document.getElementById('spec-model').textContent = listing.model || '-';
  document.getElementById('spec-condition').textContent = listing.condition;
  document.getElementById('spec-type').textContent = listing.type;
  document.getElementById('spec-seats').textContent = listing.seats + ' Seater';
  document.getElementById('spec-color').textContent = listing.color || '-';
  document.getElementById('spec-mileage').textContent = listing.mileage ? listing.mileage + ' miles' : '-';
  document.getElementById('spec-location').textContent = listing.location;

  const featuresContainer = document.getElementById('listing-features');
  if (listing.features && listing.features.length > 0) {
    featuresContainer.innerHTML = listing.features.map(f => `<span>✓ ${f}</span>`).join('');
  } else {
    featuresContainer.innerHTML = '<span>Standard features included</span>';
  }

  const paymentsContainer = document.getElementById('listing-payments');
  if (listing.payments && listing.payments.length > 0) {
    paymentsContainer.innerHTML = listing.payments.map(p => `<span>${p}</span>`).join('');
  } else {
    paymentsContainer.innerHTML = '<span>Credit Card, Financing Available</span>';
  }

  const paymentDetailsContainer = document.getElementById('payment-details-container');
  if (listing.paymentDetails) {
    document.getElementById('payment-details').textContent = listing.paymentDetails;
    paymentDetailsContainer.style.display = 'block';
  } else {
    paymentDetailsContainer.style.display = 'none';
  }

  document.getElementById('listing-description').textContent = listing.description || 'No description available.';

  const relatedContainer = document.getElementById('related-listings');
  const related = listings.filter(l => l.id !== id && (l.make === listing.make || l.type === listing.type)).slice(0, 3);

  if (related.length > 0) {
    related.forEach(l => {
      relatedContainer.appendChild(createListingCard(l));
    });
  } else {
    relatedContainer.innerHTML = '<div class="empty-state"><p>No related listings found</p></div>';
  }
}

function changeImage(img) {
  document.getElementById('listing-image').src = img.src;
  document.querySelectorAll('.gallery-thumbs img').forEach(thumb => thumb.classList.remove('active'));
  img.classList.add('active');
}

function initAdmin() {
  updateStats();
  renderAdminTable();

  const form = document.getElementById('listing-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      saveListing();
    });
  }
}

function updateStats() {
  const listings = getListings();

  document.getElementById('stat-total').textContent = listings.length;

  const newCount = listings.filter(l => l.condition === 'New').length;
  document.getElementById('stat-new').textContent = newCount;

  const usedCount = listings.filter(l => l.condition === 'Used').length;
  document.getElementById('stat-used').textContent = usedCount;

  const avgPrice = listings.length > 0
    ? listings.reduce((sum, l) => sum + parseInt(l.price), 0) / listings.length
    : 0;
  document.getElementById('stat-avg-price').textContent = formatPrice(Math.round(avgPrice));
}

function renderAdminTable() {
  const tbody = document.getElementById('admin-listings-body');
  const emptyState = document.getElementById('empty-state');

  if (!tbody) return;

  const listings = getListings();

  if (listings.length === 0) {
    tbody.innerHTML = '';
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';

  tbody.innerHTML = listings.map(listing => `
    <tr>
      <td><img src="${listing.image || DEFAULT_IMAGE}" alt="" width="60" style="object-fit:cover; border-radius:4px;"></td>
      <td>${listing.title}</td>
      <td>${formatPrice(listing.price)}</td>
      <td>${listing.year}</td>
      <td>${listing.make}</td>
      <td>${listing.condition}</td>
      <td>${listing.location}</td>
      <td class="actions">
        <button class="btn btn-sm btn-outline" onclick="editListing('${listing.id}')">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteListing('${listing.id}')">Delete</button>
      </td>
    </tr>
  `).join('');
}

function saveListing() {
  const id = document.getElementById('listing-id').value;

  const features = [];
  document.querySelectorAll('input[name="features"]:checked').forEach(cb => {
    features.push(cb.value);
  });

  const payments = [];
  document.querySelectorAll('input[name="payments"]:checked').forEach(cb => {
    payments.push(cb.value);
  });

  const listing = {
    id: id || generateId(),
    title: document.getElementById('listing-title').value,
    price: parseInt(document.getElementById('listing-price').value),
    year: parseInt(document.getElementById('listing-year').value),
    make: document.getElementById('listing-make').value,
    model: document.getElementById('listing-model').value,
    condition: document.getElementById('listing-condition').value,
    type: document.getElementById('listing-type').value,
    seats: document.getElementById('listing-seats').value,
    color: document.getElementById('listing-color').value,
    mileage: document.getElementById('listing-mileage').value,
    location: document.getElementById('listing-state').value,
    image: document.getElementById('listing-image').value || DEFAULT_IMAGE,
    description: document.getElementById('listing-description').value,
    features: features,
    payments: payments,
    paymentDetails: document.getElementById('listing-payment-details').value
  };

  const listings = getListings();

  if (id) {
    const index = listings.findIndex(l => l.id === id);
    if (index !== -1) {
      listings[index] = listing;
    }
  } else {
    listings.push(listing);
  }

  saveListings(listings);
  resetForm();
  updateStats();
  renderAdminTable();

  alert(id ? 'Listing updated!' : 'Listing added!');
}

function editListing(id) {
  const listings = getListings();
  const listing = listings.find(l => l.id === id);

  if (!listing) return;

  document.getElementById('listing-id').value = listing.id;
  document.getElementById('listing-title').value = listing.title;
  document.getElementById('listing-price').value = listing.price;
  document.getElementById('listing-year').value = listing.year;
  document.getElementById('listing-make').value = listing.make;
  document.getElementById('listing-model').value = listing.model || '';
  document.getElementById('listing-condition').value = listing.condition;
  document.getElementById('listing-type').value = listing.type;
  document.getElementById('listing-seats').value = listing.seats;
  document.getElementById('listing-color').value = listing.color || '';
  document.getElementById('listing-mileage').value = listing.mileage || '';
  document.getElementById('listing-state').value = listing.location;
  document.getElementById('listing-image').value = listing.image || '';
  document.getElementById('listing-description').value = listing.description || '';

  document.querySelectorAll('input[name="features"]').forEach(cb => {
    cb.checked = listing.features && listing.features.includes(cb.value);
  });

  document.querySelectorAll('input[name="payments"]').forEach(cb => {
    cb.checked = listing.payments && listing.payments.includes(cb.value);
  });

  document.getElementById('listing-payment-details').value = listing.paymentDetails || '';

  document.getElementById('form-title').textContent = 'Edit Listing';
  document.getElementById('submit-btn').textContent = 'Update Listing';
  document.getElementById('cancel-btn').style.display = 'inline-flex';

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function deleteListing(id) {
  if (!confirm('Are you sure you want to delete this listing?')) return;

  let listings = getListings();
  listings = listings.filter(l => l.id !== id);
  saveListings(listings);

  updateStats();
  renderAdminTable();

  alert('Listing deleted!');
}

function resetForm() {
  document.getElementById('listing-form').reset();
  document.getElementById('listing-id').value = '';
  document.getElementById('form-title').textContent = 'Add New Listing';
  document.getElementById('submit-btn').textContent = 'Add Listing';
  document.getElementById('cancel-btn').style.display = 'none';

  document.querySelectorAll('input[name="features"]').forEach(cb => {
    cb.checked = false;
  });
}

function exportData() {
  const listings = getListings();
  const dataStr = JSON.stringify(listings, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'golfcart-listings.json';
  a.click();

  URL.revokeObjectURL(url);
}

function importData(input) {
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const listings = JSON.parse(e.target.result);
      if (Array.isArray(listings)) {
        saveListings(listings);
        updateStats();
        renderAdminTable();
        alert('Data imported successfully!');
      } else {
        alert('Invalid file format');
      }
    } catch (err) {
      alert('Error reading file');
    }
  };
  reader.readAsText(file);
}

// AI Chatbot
const chatbotResponses = {
  greeting: ["Hello! I'm your Smart Generation Golf Cart assistant. How can I help you today?", "Hi there! Ready to find your perfect golf cart. What are you looking for?", "Welcome! Let me help you find the right golf cart."],
  help: ["I can help you with:\n• Finding golf carts by make, year, or price\n• Comparing different models\n• Financing options\n• Scheduling a test drive\n• Any questions about our inventory", "I'm happy to help! You can ask me about new vs used carts, electric vs gas, financing, or schedule a viewing."],
  price: ["Our prices range from $4,999 to $12,999 depending on make, year, and condition. Would you like me to show you options in your budget?", "We have carts from under $5,000 to premium custom builds over $12,000. What's your budget range?"],
  financing: ["Yes! We offer flexible financing options including 0% APR for qualified buyers. Bad credit? No problem - we work with multiple lenders. Would you like a quick quote?", "We have great financing deals! Rates start at 3.9% APR. Let's get you pre-approved - what's your preferred monthly budget?"],
  warranty: ["All new carts come with 2-3 year manufacturer warranty. Used carts include 6-month limited warranty. Extended warranties available.", "Every purchase includes warranty coverage. New carts = full manufacturer warranty. Used = 6-month coverage. Extended plans available."],
  shipping: ["Free shipping to most US locations! Canada delivery available (5-10 business days). We handle all documentation.", "We deliver nationwide! Free shipping to 48 states. Canadian buyers welcome - we assist with import docs."],
  testdrive: ["Schedule a test drive at our Florida location, or we can provide a detailed video walkthrough for remote buyers.", "In-person test drives available in Florida. For remote buyers, we offer comprehensive video walk-arounds."],
  electric: ["Electric carts are quieter, lower maintenance, and perfect for most uses. Range of 30-50 miles. Gas carts offer unlimited range and faster refueling.", "Electric: quiet, eco-friendly, lower cost to run. Gas: longer range, quick fill-ups. Most customers go electric!"],
  tradein: ["Yes! We accept trade-ins. Get a fair market value quote. Fill out our trade-in form online.", "Trade-ins welcome! We'll make you an offer on your current cart. Bring it in or send photos."],
  default: ["That's a great question! For the best answer, let me connect you with a specialist. Or browse our inventory and click any cart to inquire.", "Interesting! I'd love to help you more. Would you like to see our inventory or speak with a sales specialist?"]
};

function getChatbotResponse(message) {
  const m = message.toLowerCase();
  if (m.includes('hello') || m.includes('hi') || m.includes('hey')) return chatbotResponses.greeting[Math.floor(Math.random() * chatbotResponses.greeting.length)];
  if (m.includes('help') || m.includes('what can you')) return chatbotResponses.help[0];
  if (m.includes('price') || m.includes('cost') || m.includes('cheap') || m.includes('afford')) return chatbotResponses.price[0];
  if (m.includes('finance') || m.includes('payment') || m.includes('monthly') || m.includes('credit')) return chatbotResponses.financing[0];
  if (m.includes('warranty') || m.includes('guarantee')) return chatbotResponses.warranty[0];
  if (m.includes('shipping') || m.includes('deliver') || m.includes('ship')) return chatbotResponses.shipping[0];
  if (m.includes('test') || m.includes('drive') || m.includes('view')) return chatbotResponses.testdrive[0];
  if (m.includes('electric') || m.includes('gas') || m.includes('type')) return chatbotResponses.electric[0];
  if (m.includes('trade') || m.includes('tradein')) return chatbotResponses.tradein[0];
  return chatbotResponses.default[Math.floor(Math.random() * chatbotResponses.default.length)];
}

function initChatbot() {
  const widget = document.createElement('div');
  widget.className = 'chatbot-widget';
  widget.innerHTML = `
    <button class="chatbot-toggle" id="chatbot-toggle">🛒</button>
    <div class="chatbot-window" id="chatbot-window">
      <div class="chatbot-header">
        <h4>Smart Gen Assistant <span>Online</span></h4>
        <button class="chatbot-close" id="chatbot-close">✕</button>
      </div>
      <div class="chatbot-messages" id="chatbot-messages">
        <div class="chatbot-message bot">👋 Hi! I'm your Smart Generation Golf Cart assistant. Ask me about our inventory, financing, or anything else!</div>
      </div>
      <div class="chatbot-quick">
        <button onclick="quickChat('Show me electric carts under $8000')">Electric under $8k</button>
        <button onclick="quickChat('What financing options do you offer?')">Financing</button>
        <button onclick="quickChat('Schedule a test drive')">Test Drive</button>
      </div>
      <div class="chatbot-input">
        <input type="text" id="chatbot-input" placeholder="Type your question...">
        <button onclick="sendChat()">➤</button>
      </div>
    </div>
  `;
  document.body.appendChild(widget);

  document.getElementById('chatbot-toggle').addEventListener('click', () => {
    document.getElementById('chatbot-window').classList.add('show');
    document.getElementById('chatbot-toggle').classList.add('open');
  });

  document.getElementById('chatbot-close').addEventListener('click', () => {
    document.getElementById('chatbot-window').classList.remove('show');
    document.getElementById('chatbot-toggle').classList.remove('open');
  });

  document.getElementById('chatbot-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendChat();
  });
}

function quickChat(message) {
  document.getElementById('chatbot-input').value = message;
  sendChat();
}

function sendChat() {
  const input = document.getElementById('chatbot-input');
  const message = input.value.trim();
  if (!message) return;

  const messages = document.getElementById('chatbot-messages');
  messages.innerHTML += `<div class="chatbot-message user">${message}</div>`;
  input.value = '';

  messages.innerHTML += `<div class="chatbot-typing" id="typing"><span></span><span></span><span></span></div>`;
  messages.scrollTop = messages.scrollHeight;

  setTimeout(() => {
    document.getElementById('typing')?.remove();
    messages.innerHTML += `<div class="chatbot-message bot">${getChatbotResponse(message)}</div>`;
    messages.scrollTop = messages.scrollHeight;
  }, 1000 + Math.random() * 1000);
}

window.quickChat = quickChat;
window.sendChat = sendChat;
window.editListing = editListing;
window.deleteListing = deleteListing;
window.resetForm = resetForm;
window.exportData = exportData;
window.importData = importData;

// Financing Calculator
function calculatePayment() {
  const price = parseFloat(document.getElementById('calc-price').value) || 0;
  const down = parseFloat(document.getElementById('calc-down').value) || 0;
  const term = parseInt(document.getElementById('calc-term').value);
  const rate = parseFloat(document.getElementById('calc-rate').value) || 0;

  const principal = price - down;
  const monthlyRate = rate / 100 / 12;

  let monthly;
  if (monthlyRate === 0) {
    monthly = principal / term;
  } else {
    monthly = principal * monthlyRate * Math.pow(1 + monthlyRate, term) / (Math.pow(1 + monthlyRate, term) - 1);
  }

  const total = monthly * term + down;
  const interest = total - price;

  document.getElementById('calc-result').textContent = '$' + Math.round(monthly).toLocaleString();
  document.getElementById('calc-interest').textContent = '$' + Math.round(interest).toLocaleString();
  document.getElementById('calc-total').textContent = '$' + Math.round(total).toLocaleString();
}

function openCalculator() {
  document.getElementById('calculator-modal').classList.add('show');
  calculatePayment();
}

function closeCalculator() {
  document.getElementById('calculator-modal').classList.remove('show');
}

window.openCalculator = openCalculator;
window.closeCalculator = closeCalculator;

// Trade-In Valuation
function openTradeIn() {
  document.getElementById('tradein-modal').classList.add('show');
}

function closeTradeIn() {
  document.getElementById('tradein-modal').classList.remove('show');
}

function calculateTradeValue(year, make, condition, type, mileage) {
  let basePrice = 4000;
  if (make === 'EZGO') basePrice = 5000;
  if (make === 'Club Car') basePrice = 4800;
  if (make === 'Yamaha') basePrice = 5500;
  if (make === 'Star EV') basePrice = 6000;

  const currentYear = 2026;
  const age = currentYear - parseInt(year);
  let depreciation = 0.15 * age;
  if (depreciation > 0.7) depreciation = 0.7;

  let conditionMultiplier = 1;
  if (condition === 'excellent') conditionMultiplier = 1.1;
  if (condition === 'good') conditionMultiplier = 1;
  if (condition === 'fair') conditionMultiplier = 0.75;
  if (condition === 'poor') conditionMultiplier = 0.5;

  if (type === 'lithium') conditionMultiplier += 0.1;
  if (type === 'gas') conditionMultiplier -= 0.05;

  let value = basePrice * (1 - depreciation) * conditionMultiplier;
  if (mileage > 500) value -= (mileage - 500) * 0.5;

  return Math.max(500, Math.round(value));
}

const tradeForm = document.getElementById('tradein-form');
if (tradeForm) {
  tradeForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const year = document.getElementById('trade-year').value;
    const make = document.getElementById('trade-make').value;
    const condition = document.getElementById('trade-condition').value;
    const type = document.getElementById('trade-type').value;
    const mileage = parseInt(document.getElementById('trade-mileage').value) || 0;

    if (!year || !make || !condition || !type) {
      alert('Please fill in all fields');
      return;
    }

    const value = calculateTradeValue(year, make, condition, type, mileage);
    document.getElementById('trade-value').textContent = '$' + value.toLocaleString();
    document.getElementById('trade-result').style.display = 'block';
    tradeForm.style.display = 'none';
  });
}

window.openTradeIn = openTradeIn;
window.closeTradeIn = closeTradeIn;

// Compare Carts
function openCompare() {
  document.getElementById('compare-modal').classList.add('show');
  renderCompareGrid();
}

function closeCompare() {
  document.getElementById('compare-modal').classList.remove('show');
}

function renderCompareGrid() {
  const container = document.getElementById('compare-grid');
  const listings = getListings();

  container.innerHTML = listings.map(listing => `
    <div class="compare-card" data-id="${listing.id}">
      <div class="compare-card-header">
        <input type="checkbox" class="compare-select" data-id="${listing.id}" onchange="toggleCompare(this)">
        <span>${listing.title}</span>
      </div>
      <div class="compare-card-image">
        <img src="${listing.image || DEFAULT_IMAGE}" alt="${listing.title}">
      </div>
      <div class="compare-card-content">
        <div class="compare-specs">
          <div class="compare-spec"><span class="label">Price</span><span class="value">${formatPrice(listing.price)}</span></div>
          <div class="compare-spec"><span class="label">Year</span><span class="value">${listing.year}</span></div>
          <div class="compare-spec"><span class="label">Make</span><span class="value">${listing.make}</span></div>
          <div class="compare-spec"><span class="label">Condition</span><span class="value">${listing.condition}</span></div>
          <div class="compare-spec"><span class="label">Type</span><span class="value">${listing.type}</span></div>
          <div class="compare-spec"><span class="label">Seats</span><span class="value">${listing.seats}</span></div>
          <div class="compare-spec"><span class="label">Color</span><span class="value">${listing.color || '-'}</span></div>
          <div class="compare-spec"><span class="label">Location</span><span class="value">${listing.location}</span></div>
        </div>
      </div>
    </div>
  `).join('');
}

function toggleCompare(checkbox) {
  const cards = document.querySelectorAll('.compare-card.selected');
  if (checkbox.checked && cards.length >= 3) {
    checkbox.checked = false;
    alert('You can compare up to 3 carts only');
    return;
  }
  const card = checkbox.closest('.compare-card');
  if (checkbox.checked) {
    card.classList.add('selected');
  } else {
    card.classList.remove('selected');
  }
}

function autoSelectCompare() {
  const listings = getListings().slice(0, 3);
  document.querySelectorAll('.compare-select').forEach(cb => cb.checked = false);
  document.querySelectorAll('.compare-card').forEach(c => c.classList.remove('selected'));
  listings.forEach(listing => {
    const cb = document.querySelector(`.compare-select[data-id="${listing.id}"]`);
    if (cb) {
      cb.checked = true;
      cb.closest('.compare-card').classList.add('selected');
    }
  });
}

window.openCompare = openCompare;
window.closeCompare = closeCompare;
window.toggleCompare = toggleCompare;
window.autoSelectCompare = autoSelectCompare;

// Saved Searches
const SAVED_SEARCHES_KEY = 'saved_searches';

function getSavedSearches() {
  return JSON.parse(localStorage.getItem(SAVED_SEARCHES_KEY) || [];
}

function saveSearch(criteria, name) {
  const searches = getSavedSearches();
  searches.push({
    id: Date.now(),
    name: name,
    criteria: criteria,
    date: new Date().toLocaleDateString()
  });
  localStorage.setItem(SAVED_SEARCHES_KEY, JSON.stringify(searches));
  renderSavedSearches();
}

function deleteSavedSearch(id) {
  let searches = getSavedSearches();
  searches = searches.filter(s => s.id !== id);
  localStorage.setItem(SAVED_SEARCHES_KEY, JSON.stringify(searches));
  renderSavedSearches();
}

function renderSavedSearches() {
  const container = document.getElementById('saved-list');
  if (!container) return;

  const searches = getSavedSearches();
  if (searches.length === 0) {
    container.innerHTML = '<p style="text-align: center; color: var(--text-light);">No saved searches yet.</p>';
    return;
  }

  container.innerHTML = searches.map(s => `
    <div class="search-item">
      <div class="search-item-info">
        <h4>${s.name}</h4>
        <p>Created: ${s.date}</p>
      </div>
      <button class="btn btn-sm btn-danger" onclick="deleteSavedSearch(${s.id})">Delete</button>
    </div>
  `).join('');
}

function openSaved() {
  document.getElementById('saved-modal').classList.add('show');
  renderSavedSearches();
}

function closeSaved() {
  document.getElementById('saved-modal').classList.remove('show');
}

window.openSaved = openSaved;
window.closeSaved = closeSaved;
window.deleteSavedSearch = deleteSavedSearch;