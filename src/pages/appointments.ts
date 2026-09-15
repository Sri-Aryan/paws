import { mockAppointments } from '../data/mock';

export function renderAppointments(container: HTMLElement) {
  const statusClass: Record<string, string> = {
    Confirmed: 'confirmed',
    Pending: 'pending',
    Completed: 'completed',
  };

  const content = `
    <div class="section flex justify-between items-center fade-in">
      <div>
        <h1>My appointments</h1>
        <p>Manage your upcoming and past consultations.</p>
      </div>
      <button class="btn icon-text">
        <svg class="icon icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
        Book appointment
      </button>
    </div>

    <div class="section">
      <div class="grid">
        ${mockAppointments.map(a => `
          <div class="card" data-id="${a.id}">
            <div class="flex justify-between items-center mb-8">
              <span class="badge primary">${a.type}</span>
              <span class="status-pill ${statusClass[a.status] || 'completed'}">${a.status}</span>
            </div>
            <div class="flex items-center gap-3">
              ${a.image ? `<img src="${a.image}" alt="${a.doctor}" class="avatar">` : ''}
              <h3 style="margin: 0;">${a.doctor}</h3>
            </div>
            <p class="meta mt-4 icon-text">
              <svg class="icon icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
              ${a.pet}
            </p>
            <p class="meta mt-4 icon-text">
              <svg class="icon icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              ${a.date} at ${a.time}
            </p>
            
            <div class="flex gap-4 mt-4">
              ${a.type === 'Video Consult'
                ? '<button class="btn w-full" style="pointer-events: none;">Join call</button>'
                : '<button class="btn w-full" style="pointer-events: none;">Directions</button>'}
              <button class="btn btn-secondary w-full" style="pointer-events: none;">Reschedule</button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <h2>Instant online consultation</h2>
      </div>
      <div class="consult-banner">
        <div>
          <h3>Talk to a vet now</h3>
          <p>Available 24/7 for urgent care advice over chat, audio, or video.</p>
          <button class="btn btn-accent mt-4 icon-text">
            <svg class="icon icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
            Start consultation
          </button>
        </div>
        <div class="consult-illustration"></div>
      </div>
    </div>
  `;
  
  const wrapper = document.createElement('div');
  wrapper.innerHTML = content;
  
  wrapper.addEventListener('click', (e) => {
    const card = (e.target as HTMLElement).closest('.card') as HTMLElement;
    if (card) {
      const id = card.dataset.id;
      const item = mockAppointments.find(a => a.id === id);
      if(item) {
        window.openPanel(`
          <div class="flex items-center gap-4 mb-4">
            ${item.image ? `<img src="${item.image}" alt="${item.doctor}" class="avatar-lg" style="margin-bottom:0">` : ''}
            <h2>Appointment with ${item.doctor}</h2>
          </div>
          <p><span class="badge primary">${item.type}</span> <span class="status-pill ${statusClass[item.status] || 'completed'}">${item.status}</span></p>
          <hr/>
          <h3>Patient</h3>
          <p>${item.pet}</p>
          <h3>Date & Time</h3>
          <p>${item.date} at ${item.time}</p>
          <h3>Reason for visit</h3>
          <p>${item.reason}</p>
          ${item.joinLink ? `<h3>Video Link</h3><p><a href="${item.joinLink}" target="_blank" style="color: var(--primary); text-decoration: underline;">${item.joinLink}</a></p>` : ''}
          ${item.clinicAddress ? `<h3>Clinic Address</h3><p>${item.clinicAddress}</p>` : ''}
          <div class="flex gap-4 mt-4">
             ${item.type === 'Video Consult'
               ? `<button class="btn w-full">Join call</button>`
               : `<button class="btn w-full">Get Directions</button>`}
             <button class="btn btn-secondary w-full">Reschedule</button>
          </div>
        `);
      }
    }
  });

  container.appendChild(wrapper);
}
