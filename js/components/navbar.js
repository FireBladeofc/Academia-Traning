/* ============================================
   FitBody — Bottom Navigation Component
   ============================================ */

const Navbar = {
  currentPage: 'exercises',

  init() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const page = item.dataset.page;
        if (page) {
          App.navigateTo(page);
        }
      });
    });
    // Set initial active state
    this.setActive('exercises');
  },

  setActive(pageId) {
    this.currentPage = pageId;
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.classList.toggle('active', item.dataset.page === pageId);
    });
  },

  show() {
    const nav = document.getElementById('bottom-nav');
    if (nav) nav.classList.remove('hidden');
  },

  hide() {
    const nav = document.getElementById('bottom-nav');
    if (nav) nav.classList.add('hidden');
  }
};
