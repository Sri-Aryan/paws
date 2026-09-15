import { mockArticles } from '../data/mock';

export function renderArticles(container: HTMLElement) {
  const content = `
    <div class="section fade-in">
      <h1>Health content</h1>
      <p>Practical advice and health tips from our veterinarians.</p>
    </div>

    <div class="section">
      <div class="grid">
        ${mockArticles.map(a => `
          <div class="card flex flex-col justify-between" data-id="${a.id}" style="padding: 0; overflow: hidden;">
            ${a.image ? `<img src="${a.image}" alt="${a.title}" style="width: 100%; height: 160px; object-fit: cover;">` : ''}
            <div style="padding: var(--sp-5);">
              <span class="badge primary">${a.category}</span>
              <h3 class="mt-4">${a.title}</h3>
              <p class="meta mt-4">By ${a.author} · ${a.readTime} read</p>
              <button class="btn btn-secondary mt-4 w-full" style="pointer-events: none;">Read article</button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  
  const wrapper = document.createElement('div');
  wrapper.innerHTML = content;
  
  wrapper.addEventListener('click', (e) => {
    const card = (e.target as HTMLElement).closest('.card') as HTMLElement;
    if (card) {
      const id = card.dataset.id;
      const item = mockArticles.find(a => a.id === id);
      if(item) {
        window.openPanel(`
          ${item.image ? `<img src="${item.image}" alt="${item.title}" class="panel-image">` : ''}
          <p><span class="badge primary">${item.category}</span></p>
          <h2>${item.title}</h2>
          <p>By ${item.author} · ${item.readTime} read</p>
          <hr/>
          <div style="color: var(--ink); line-height: 1.7; font-size: 1.05rem;">
            ${item.content}
          </div>
        `);
      }
    }
  });

  container.appendChild(wrapper);
}
