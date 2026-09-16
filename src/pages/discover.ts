import { mockHospitals, mockDoctors } from '../data/mock';

let currentHospitalFilter = 'All';
let currentDoctorFilter = 'All specialists';

const hospitalChips = ['All', 'Closest to me', 'Open 24/7', 'Emergency', 'Top rated'];
const doctorChips = ['All specialists', 'Surgery', 'Dermatology', 'Internal Med', 'Nearest'];

function renderHospitalGrid() {
  const filteredHospitals = currentHospitalFilter === 'All'
    ? mockHospitals
    : mockHospitals.filter(h => {
      if (currentHospitalFilter === 'Closest to me') return parseFloat(h.distance) < 2.5;
      if (currentHospitalFilter === 'Open 24/7') return h.timings.includes('24/7');
      if (currentHospitalFilter === 'Emergency') return h.services.includes('Emergency');
      if (currentHospitalFilter === 'Top rated') return h.rating >= 4.8;
      return true;
    });

  if (filteredHospitals.length === 0) {
    return '<p style="color: var(--ink-soft); grid-column: 1/-1;">No clinics found matching this filter.</p>';
  }

  return filteredHospitals.map(h => `
    <a href="#" class="blog-card" data-id="${h.id}" data-type="hospital">
      <div class="card-inner">
        ${h.image ? `
        <div class="card-image-container">
          <img src="${h.image}" alt="${h.name}" class="card-image">
        </div>
        ` : ''}
        <div class="card-content">
          <div class="card-meta">
            <span class="card-tag">Clinic</span>
            <span class="card-date">★ ${h.rating}</span>
          </div>
          <h3 class="card-title">${h.name}</h3>
          <p class="meta mt-2 icon-text">
            <svg class="icon icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            ${h.location}, ${h.distance} away
          </p>
          <div class="mt-4">
            ${h.services.map(s => `<span class="badge">${s}</span> `).join('')}
          </div>
          <div class="card-cta" style="margin-top: 16px;">
            <span>View Details</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="card-cta-icon">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </a>
  `).join('');
}

function renderHospitalFilters() {
  return hospitalChips.map(chip => `
    <span class="filter-chip ${chip === currentHospitalFilter ? 'active' : ''}" data-filter="${chip}">${chip}</span>
  `).join('');
}

function renderDoctorGrid() {
  const filteredDoctors = currentDoctorFilter === 'All specialists'
    ? mockDoctors
    : mockDoctors.filter(d => {
      if (currentDoctorFilter === 'Surgery') return d.specialty.includes('Surgery');
      if (currentDoctorFilter === 'Dermatology') return d.specialty.includes('Dermatology');
      if (currentDoctorFilter === 'Internal Med') return d.specialty.includes('Internal');
      if (currentDoctorFilter === 'Nearest') return true;
      return true;
    });

  if (filteredDoctors.length === 0) {
    return '<p style="color: var(--ink-soft); grid-column: 1/-1;">No specialists found matching this filter.</p>';
  }

  return filteredDoctors.map(d => `
    <a href="#" class="blog-card" data-id="${d.id}" data-type="doctor">
      <div class="card-inner">
        <div class="card-content">
          <div class="card-meta">
            <span class="card-tag">${d.specialty}</span>
            <span class="card-date">★ ${d.rating} (${d.reviews})</span>
          </div>
          
          <div class="flex items-center gap-3 mb-4">
            ${d.image ? `<img src="${d.image}" alt="${d.name}" class="avatar">` : ''}
            <h3 class="card-title" style="margin: 0;">${d.name}</h3>
          </div>
          
          <p class="meta mt-2 icon-text">
            <svg class="icon icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            ${d.experience}
          </p>
          
          <div class="card-cta" style="margin-top: auto; padding-top: 16px;">
            <span>View profile</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="card-cta-icon">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </a>
  `).join('');
}

function renderDoctorFilters() {
  return doctorChips.map(chip => `
    <span class="filter-chip ${chip === currentDoctorFilter ? 'active' : ''}" data-filter="${chip}">${chip}</span>
  `).join('');
}

export function renderDiscover(container: HTMLElement) {
  const content = `
    <div class="hero-section fade-in">
      <div class="hero-bg"></div>
      <div class="hero-content">
        <h1>Find the right care for your pet</h1>
        <p>Browse top-rated vets, clinics, and specialists near you, and book in a few taps.</p>
        <div class="search-bar">
          <div class="input icon-text w-full">
            <svg class="icon icon-sm" style="color: var(--ink-soft)" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <input type="text" placeholder="Search hospitals, specialists..." style="border:none; outline:none; width:100%; background:transparent;" />
          </div>
          <button id="search-btn" class="btn" style="transition: background 0.3s, transform 0.3s; transform-origin: center;">Search</button>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <h2>Top hospitals &amp; clinics</h2>
        <button class="btn-ghost btn">View all</button>
      </div>
      <div class="filter-row" data-filter-group="hospital">
        ${renderHospitalFilters()}
      </div>
      <div class="grid" id="hospitals-grid">
        ${renderHospitalGrid()}
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <h2>Discover specialists</h2>
      </div>
      <div class="filter-row" data-filter-group="doctor">
        ${renderDoctorFilters()}
      </div>
      <div class="grid" id="doctors-grid">
        ${renderDoctorGrid()}
      </div>
    </div>
  `;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = content;

  wrapper.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;

    // Handle filter clicks
    if (target.classList.contains('filter-chip')) {
      const filterValue = target.dataset.filter;
      const group = (target.closest('.filter-row') as HTMLElement)?.dataset.filterGroup;

      if (filterValue && group) {
        if (group === 'hospital') {
          currentHospitalFilter = filterValue;
          const filterRow = wrapper.querySelector('[data-filter-group="hospital"]');
          const grid = wrapper.querySelector('#hospitals-grid');
          if (filterRow && grid) {
            filterRow.innerHTML = renderHospitalFilters();
            grid.innerHTML = renderHospitalGrid();
          }
        } else if (group === 'doctor') {
          currentDoctorFilter = filterValue;
          const filterRow = wrapper.querySelector('[data-filter-group="doctor"]');
          const grid = wrapper.querySelector('#doctors-grid');
          if (filterRow && grid) {
            filterRow.innerHTML = renderDoctorFilters();
            grid.innerHTML = renderDoctorGrid();
          }
        }
        return;
      }
    }

    // Handle card clicks
    const card = target.closest('.blog-card') as HTMLElement;
    if (card) {
      e.preventDefault();
      const type = card.dataset.type;
      const id = card.dataset.id;
      if (type === 'hospital') {
        const item = mockHospitals.find(h => h.id === id);
        if (item) {
          window.openPanel(`
            ${item.image ? `<img src="${item.image}" alt="${item.name}" class="panel-image">` : ''}
            <h2>${item.name}</h2>
            <p><svg class="icon icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg> ${item.address}</p>
            <p><svg class="icon icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> ${item.timings}</p>
            <p><svg class="icon icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg> ${item.phone}</p>
            <hr/>
            <h3>About</h3>
            <p>${item.about}</p>
            <h3>Services</h3>
            <div class="mt-4">${item.services.map(s => `<span class="badge">${s}</span> `).join('')}</div>
            <button class="btn btn-accent w-full mt-4">Book Appointment</button>
          `);
        }
      } else if (type === 'doctor') {
        const item = mockDoctors.find(d => d.id === id);
        if (item) {
          window.openPanel(`
            <div class="flex items-center gap-4 mb-4">
              ${item.image ? `<img src="${item.image}" alt="${item.name}" class="avatar-lg" style="margin-bottom:0">` : ''}
              <h2>${item.name}</h2>
            </div>
            <p><span class="badge primary">${item.specialty}</span></p>
            <p class="mt-4 rating-row"><span class="rating">★ ${item.rating}</span> (${item.reviews} reviews)</p>
            <hr/>
            <h3>Biography</h3>
            <p>${item.bio}</p>
            <h3>Education</h3>
            <p>${item.education}</p>
            <h3>Languages</h3>
            <div class="mt-2">${item.languages.map(l => `<span class="badge">${l}</span> `).join('')}</div>
            <button class="btn w-full mt-4">Consult Now</button>
          `);
        }
      }
    }
  });

  const searchBtn = wrapper.querySelector('#search-btn') as HTMLElement;
  if (searchBtn) {
    // Hover scale 1.05
    searchBtn.addEventListener('mouseenter', () => {
      searchBtn.style.transform = 'scale(1.05)';
    });
    
    searchBtn.addEventListener('mouseleave', () => {
      searchBtn.style.transform = 'scale(1)';
    });
  }

  // Only append wrapper if we haven't already rendered it, though router wipes container anyway
  container.appendChild(wrapper);
}
