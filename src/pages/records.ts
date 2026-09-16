import { mockRecords, mockReminders } from '../data/mock';

export function renderRecords(container: HTMLElement) {
  const content = `
    <div class="section fade-in">
      <h1>Health dashboard</h1>
      <p>Everything about your pets' care, in one place.</p>
    </div>

    <div class="section">
      <div class="section-header">
        <h2>Active reminders</h2>
      </div>
      <div class="grid">
        ${mockReminders.map(r => `
          <a href="#" class="blog-card" data-id="${r.id}" data-type="reminder">
            <div class="card-inner" style="border-left: 3px solid ${r.urgency === 'due-soon' ? 'var(--accent)' : r.urgency === 'overdue' ? '#B4432A' : 'var(--primary)'}">
              <div class="card-content">
                <div class="card-meta">
                  <span class="card-tag">${r.type}</span>
                  <span class="card-date" style="color: ${r.urgency === 'due-soon' ? 'var(--accent)' : r.urgency === 'overdue' ? '#B4432A' : 'var(--primary)'}">${r.status}</span>
                </div>
                <h3 class="card-title">${r.task}</h3>
                <p class="meta mt-2 icon-text">
                  <svg class="icon icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  ${r.time}
                </p>
                <div class="card-cta" style="margin-top: auto; padding-top: 16px;">
                  <span>Manage</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="card-cta-icon">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </a>
        `).join('')}
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <h2>Medical records</h2>
        <button class="btn btn-accent icon-text" style="padding: 8px 16px;">
          <svg class="icon icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"></path></svg>
          Upload record
        </button>
      </div>
      <div class="grid">
        ${mockRecords.map(r => `
          <a href="#" class="blog-card" data-id="${r.id}" data-type="record">
            <div class="card-inner">
              <div class="card-content">
                <div class="card-meta">
                  <span class="card-tag">Record</span>
                  <span class="card-date">${r.date}</span>
                </div>
                <h3 class="card-title">${r.title}</h3>
                <p class="meta mt-2 icon-text">
                  <svg class="icon icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  ${r.pet}
                </p>
                <p class="meta mt-2 icon-text">
                  <svg class="icon icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                  ${r.type}, ${r.size}
                </p>
                <div class="card-cta" style="margin-top: auto; padding-top: 16px;">
                  <span>View document</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="card-cta-icon">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </a>
        `).join('')}
      </div>
    </div>
  `;
  
  const wrapper = document.createElement('div');
  wrapper.innerHTML = content;
  
  wrapper.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const card = target.closest('.blog-card');
    if (card) {
      e.preventDefault();
      const type = (card as HTMLElement).dataset.type;
      const id = (card as HTMLElement).dataset.id;
      if (type === 'reminder') {
        const item = mockReminders.find(r => r.id === id);
        if(item) {
          window.openPanel(`
            <h2>${item.task}</h2>
            <p><span class="badge">${item.type}</span> <span class="badge accent">${item.status}</span></p>
            <hr/>
            <h3>Time</h3>
            <p>${item.time}</p>
            <h3>Notes</h3>
            <p>${item.notes}</p>
            <button class="btn w-full mt-4">Mark as completed</button>
          `);
        }
      } else if (type === 'record') {
        const item = mockRecords.find(r => r.id === id);
        if(item) {
          window.openPanel(`
            <h2>${item.title}</h2>
            <p>${item.pet} · ${item.date}</p>
            <hr/>
            <h3>File details</h3>
            <p>${item.type} (${item.size})</p>
            <h3>Doctor Notes</h3>
            <p>${item.doctorNotes}</p>
            <div class="flex gap-4 mt-4">
               <button class="btn w-full">Download File</button>
               <button class="btn btn-secondary w-full">Share</button>
            </div>
          `);
        }
      }
    }
  });

  container.appendChild(wrapper);
}
