/* ============================================
   FitBody — Exercises Page (Body Model)
   ============================================ */

const ExercisesPage = {
  /**
   * Initialize the exercises page
   */
  init() {
    BodyModel.init();
    SearchBar.init();
  },

  /**
   * Called when page becomes active
   */
  onEnter() {
    SearchBar.clear();
    BodyModel.render();
    
    // Show rotate button
    const rotateBtn = document.getElementById('btn-rotate');
    if (rotateBtn) rotateBtn.classList.remove('hidden');
  },

  /**
   * Called when leaving the page
   */
  onLeave() {
    SearchBar.clear();
  }
};
