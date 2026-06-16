/* ============================================
   FitBody — App Controller & SPA Router
   ============================================ */

const App = {
  currentPage: 'exercises',
  previousPage: null,
  pageParams: {},
  history: [],

  /**
   * Initialize the application
   */
  init() {
    // Migrate plan if needed (updates default workouts on version bump)
    StorageManager.checkAndMigratePlan();

    // Initialize components
    Navbar.init();
    ExercisesPage.init();

    // Bind back button
    const backBtn = document.getElementById('btn-back');
    if (backBtn) {
      backBtn.addEventListener('click', () => this.navigateBack());
    }

    // Bind new workout button
    const newWorkoutBtn = document.getElementById('btn-new-workout');
    if (newWorkoutBtn) {
      newWorkoutBtn.addEventListener('click', () => this.showCreateModal ? this.showCreateModal() : WorkoutsPage.showCreateModal());
    }

    // Bind reset workouts button
    const resetWorkoutsBtn = document.getElementById('btn-reset-workouts');
    if (resetWorkoutsBtn) {
      resetWorkoutsBtn.addEventListener('click', () => {
        if (confirm('Deseja mesmo restaurar os treinos padrão da sua rotina? Isso substituirá seus treinos atuais.')) {
          StorageManager.resetToDefaultWorkouts();
          if (this.currentPage === 'workouts') {
            WorkoutsPage.render();
          }
          this.showToast('Rotina padrão restaurada com sucesso!', 'success');
        }
      });
    }

    // Bind modal overlay close
    const modalOverlay = document.getElementById('modal-overlay');
    if (modalOverlay) {
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
          this.closeModal();
        }
      });
    }

    // Navigate to initial page
    this.navigateTo('exercises');

    console.log('💪 FitBody initialized successfully!');
    console.log(`📊 Loaded ${EXERCISES.length} exercises in ${Object.keys(MUSCLE_GROUPS).length} muscle groups`);
  },

  /**
   * Navigate to a page
   */
  navigateTo(pageId, params = {}) {
    // Leave current page
    this.callPageMethod(this.currentPage, 'onLeave');

    // Update history
    if (this.currentPage !== pageId) {
      this.history.push({ page: this.currentPage, params: this.pageParams });
    }

    // Keep only last 20 history entries
    if (this.history.length > 20) {
      this.history = this.history.slice(-20);
    }

    this.previousPage = this.currentPage;
    this.currentPage = pageId;
    this.pageParams = params;

    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
      page.classList.remove('active');
    });

    // Show target page
    const targetPage = document.getElementById(`page-${pageId}`);
    if (targetPage) {
      targetPage.classList.add('active');
    }

    // Update header
    this.updateHeader(pageId);

    // Update navbar
    const navPages = ['exercises', 'workouts', 'body'];
    if (navPages.includes(pageId)) {
      Navbar.setActive(pageId);
      Navbar.show();
    }

    // Enter new page
    this.callPageMethod(pageId, 'onEnter', params);

    // Scroll to top
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.scrollTop = 0;
    }
  },

  /**
   * Navigate back
   */
  navigateBack() {
    if (this.history.length > 0) {
      const prev = this.history.pop();
      this.callPageMethod(this.currentPage, 'onLeave');
      this.currentPage = prev.page;
      this.pageParams = prev.params;

      // Hide all pages and show previous
      document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
      const targetPage = document.getElementById(`page-${prev.page}`);
      if (targetPage) targetPage.classList.add('active');

      this.updateHeader(prev.page);
      
      const navPages = ['exercises', 'workouts', 'body'];
      if (navPages.includes(prev.page)) {
        Navbar.setActive(prev.page);
      }

      this.callPageMethod(prev.page, 'onEnter', prev.params);
    } else {
      this.navigateTo('exercises');
    }
  },

  /**
   * Call a method on a page controller
   */
  callPageMethod(pageId, method, params) {
    const pageControllers = {
      'exercises': ExercisesPage,
      'exercise-list': ExerciseListPage,
      'exercise-detail': ExerciseDetailPage,
      'workouts': WorkoutsPage,
      'body': BodyOverviewPage
    };

    const controller = pageControllers[pageId];
    if (controller && typeof controller[method] === 'function') {
      controller[method](params);
    }
  },

  /**
   * Update header based on current page
   */
  updateHeader(pageId) {
    const title = document.getElementById('page-title');
    const backBtn = document.getElementById('btn-back');
    const rotateBtn = document.getElementById('btn-rotate');

    // Pages with back button (sub-pages)
    const subPages = ['exercise-list', 'exercise-detail'];
    const isSubPage = subPages.includes(pageId);

    if (backBtn) {
      backBtn.classList.toggle('hidden', !isSubPage);
    }

    // Default titles
    const titles = {
      'exercises': 'Exercícios',
      'exercise-list': 'Exercícios',
      'exercise-detail': 'Detalhes',
      'workouts': 'Meus Treinos',
      'body': 'Corpo'
    };

    if (title) {
      title.textContent = titles[pageId] || 'FitBody';
    }

    // Show/hide rotate button
    if (rotateBtn) {
      rotateBtn.classList.toggle('hidden', pageId !== 'exercises');
    }
  },

  /**
   * Set the page title
   */
  setPageTitle(newTitle) {
    const title = document.getElementById('page-title');
    if (title) title.textContent = newTitle;
  },

  /**
   * Close modal
   */
  closeModal() {
    const modalOverlay = document.getElementById('modal-overlay');
    if (modalOverlay) {
      const content = document.getElementById('modal-content');
      if (content) {
        content.style.animation = 'slideDown 0.2s ease-in forwards';
        setTimeout(() => {
          modalOverlay.classList.add('hidden');
          content.style.animation = '';
        }, 200);
      } else {
        modalOverlay.classList.add('hidden');
      }
    }
  },

  /**
   * Show toast notification
   */
  showToast(message, type = '') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    // Auto-remove after 2.5 seconds
    setTimeout(() => {
      toast.style.animation = 'toastOut 0.25s ease-in forwards';
      setTimeout(() => {
        toast.remove();
      }, 250);
    }, 2500);
  }
};

// ============================================
// BOOT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
