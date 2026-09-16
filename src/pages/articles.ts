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
          <a href="#" class="blog-card" data-id="${a.id}">
            <div class="card-inner">
              <div class="card-image-container">
                ${a.image ? `<img src="${a.image}" alt="${a.title}" class="card-image">` : ''}
              </div>
              <div class="card-content">
                <div class="card-meta">
                  <span class="card-tag">${a.category}</span>
                  <span class="card-date">${a.readTime} read</span>
                </div>
                <h3 class="card-title">${a.title}</h3>
                <div class="card-cta">
                  <span>Read article</span>
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
    const card = (e.target as HTMLElement).closest('.blog-card') as HTMLElement;
    if (card) {
      e.preventDefault();
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
