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
          <div class="reminder-card ${r.urgency}" data-id="${r.id}" data-type="reminder" style="cursor: pointer; transition: transform 0.15s ease;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='none'">
            <span class="badge">${r.type}</span>
            <h3 class="mt-4">${r.task}</h3>
            <p class="meta mt-4">${r.time}</p>
            <p class="status-line">${r.status}</p>
          </div>
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
          <div class="card flex flex-col justify-between" data-id="${r.id}" data-type="record">
            <div>
              <h3>${r.title}</h3>
              <p class="meta mt-4">${r.pet} · ${r.date}</p>
              <p class="meta mt-2">${r.type}, ${r.size}</p>
            </div>
            <button class="btn btn-secondary mt-4 w-full" style="pointer-events: none;">View document</button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  
  const wrapper = document.createElement('div');
  wrapper.innerHTML = content;
  
  wrapper.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const card = target.closest('.card') || target.closest('.reminder-card');
    if (card) {
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
