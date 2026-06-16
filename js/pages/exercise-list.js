/* ============================================
   FitBody — Exercise List Page
   ============================================ */

const ExerciseListPage = {
  currentMuscleGroup: null,
  currentSort: 'relevance',
  exercises: [],

  /**
   * Called when page becomes active
   */
  onEnter(params = {}) {
    this.currentMuscleGroup = params.muscleGroup || null;
    this.currentSort = 'relevance';
    FilterChips.reset();

    if (this.currentMuscleGroup) {
      const group = MUSCLE_GROUPS[this.currentMuscleGroup];
      App.setPageTitle(group ? group.name : 'Exercícios');
      
      // Render filter chips
      FilterChips.render(this.currentMuscleGroup);
      
      // Load exercises
      this.applyFilters(this.currentMuscleGroup);
    }

    // Bind sort button
    this.bindSortEvents();
  },

  /**
   * Apply current filters and render exercises
   */
  applyFilters(muscleGroupId) {
    muscleGroupId = muscleGroupId || this.currentMuscleGroup;
    let exercises = FilterChips.getFilteredExercises(muscleGroupId);
    exercises = SearchUtils.sortExercises(exercises, this.currentSort);
    this.exercises = exercises;
    this.renderExercises(exercises);
  },

  /**
   * Render exercise cards in the grid
   */
  renderExercises(exercises) {
    const grid = document.getElementById('exercise-grid');
    if (!grid) return;

    grid.innerHTML = ExerciseCard.renderGrid(exercises);
    grid.classList.add('stagger-children');
  },

  /**
   * Bind sort button events
   */
  bindSortEvents() {
    const sortBtn = document.getElementById('btn-sort');
    const sortDropdown = document.getElementById('sort-dropdown');

    if (sortBtn && sortDropdown) {
      sortBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const rect = sortBtn.getBoundingClientRect();
        sortDropdown.style.top = `${rect.bottom + 4}px`;
        sortDropdown.classList.toggle('hidden');
      });

      // Sort options
      sortDropdown.querySelectorAll('.sort-option').forEach(option => {
        option.addEventListener('click', () => {
          const sortType = option.dataset.sort;
          this.currentSort = sortType;
          
          // Update UI
          document.getElementById('sort-label').textContent = option.textContent.trim();
          sortDropdown.querySelectorAll('.sort-option').forEach(o => o.classList.remove('active'));
          option.classList.add('active');
          sortDropdown.classList.add('hidden');
          
          // Re-apply filters with new sort
          this.applyFilters();
        });
      });

      // Close dropdown on outside click
      document.addEventListener('click', () => {
        sortDropdown.classList.add('hidden');
      });
    }
  },

  /**
   * Called when leaving the page
   */
  onLeave() {
    FilterChips.reset();
    const sortDropdown = document.getElementById('sort-dropdown');
    if (sortDropdown) sortDropdown.classList.add('hidden');
  }
};
