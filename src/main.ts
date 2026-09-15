import './style.css';
import { renderDiscover } from './pages/discover';
import { renderRecords } from './pages/records';
import { renderAppointments } from './pages/appointments';
import { renderArticles } from './pages/articles';

declare global {
  interface Window {
    openPanel: (content: string) => void;
    closePanel: () => void;
  }
}

const app = document.getElementById('app') as HTMLElement;
const navItems = document.querySelectorAll('.nav-item');

window.openPanel = function(contentHtml: string) {
  const panel = document.getElementById('slide-panel');
  const backdrop = document.getElementById('backdrop');
  const content = document.getElementById('slide-content');
  if(panel && backdrop && content) {
    content.innerHTML = `<div class="slide-content-inner">${contentHtml}</div>`;
    panel.classList.add('active');
    backdrop.classList.add('active');
  }
};

window.closePanel = function() {
  const panel = document.getElementById('slide-panel');
  const backdrop = document.getElementById('backdrop');
  if(panel && backdrop) {
    panel.classList.remove('active');
    backdrop.classList.remove('active');
  }
};

document.getElementById('backdrop')?.addEventListener('click', window.closePanel);
document.getElementById('close-panel')?.addEventListener('click', window.closePanel);

function navigate(route: string) {
  // Update active state in nav
  navItems.forEach(item => {
    item.classList.toggle('active', (item as HTMLElement).dataset.route === route);
  });

  // Render appropriate content
  app.innerHTML = ''; // clear current content
  window.closePanel(); // close panel on navigation
  
  // Restart page enter animation
  app.classList.remove('page-enter');
  void app.offsetWidth; // force reflow
  app.classList.add('page-enter');
  
  switch(route) {
    case 'discover':
      renderDiscover(app);
      break;
    case 'records':
      renderRecords(app);
      break;
    case 'appointments':
      renderAppointments(app);
      break;
    case 'articles':
      renderArticles(app);
      break;
    default:
      renderDiscover(app);
  }
}

// Event Listeners for Navigation
document.querySelectorAll('a[data-route]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    const route = target.dataset.route || (target.closest('a') as HTMLElement).dataset.route;
    if (route) navigate(route);
  });
});

// Initial load
navigate('discover');
