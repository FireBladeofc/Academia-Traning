/* ============================================
   FitBody — Body Overview Page
   ============================================ */

const BodyOverviewPage = {
  /**
   * Called when page becomes active
   */
  onEnter() {
    this.render();
  },

  /**
   * Render body overview
   */
  render() {
    const container = document.getElementById('body-overview-content');
    if (!container) return;

    const totalExercises = EXERCISES.length;
    const totalGroups = Object.keys(MUSCLE_GROUPS).length;
    const favorites = StorageManager.getFavorites();
    const workouts = StorageManager.getWorkouts();

    // Get muscle groups sorted by exercise count
    const groupList = Object.values(MUSCLE_GROUPS)
      .map(group => ({
        ...group,
        count: SearchUtils.getCountByMuscleGroup(group.id)
      }))
      .sort((a, b) => b.count - a.count);

    container.innerHTML = `
      <!-- Stats Grid -->
      <div class="body-overview-stats">
        <div class="stat-card">
          <div class="stat-card-value">${totalExercises}</div>
          <div class="stat-card-label">Exercícios</div>
        </div>
        <div class="stat-card">
          <div class="stat-card-value">${totalGroups}</div>
          <div class="stat-card-label">Grupos Musculares</div>
        </div>
        <div class="stat-card">
          <div class="stat-card-value">${favorites.length}</div>
          <div class="stat-card-label">Favoritos</div>
        </div>
        <div class="stat-card">
          <div class="stat-card-value">${workouts.length}</div>
          <div class="stat-card-label">Treinos</div>
        </div>
      </div>

      <!-- Section Title -->
      <h3 style="font-size: 1rem; font-weight: 700; margin-bottom: var(--space-md); color: var(--text-primary);">
        Grupos Musculares
      </h3>

      <!-- Muscle Groups List -->
      <div class="muscle-group-list">
        ${groupList.map(group => `
          <div class="muscle-group-item" onclick="App.navigateTo('exercise-list', { muscleGroup: '${group.id}' })">
            <div class="muscle-group-emoji">${group.emoji}</div>
            <div class="muscle-group-info">
              <div class="muscle-group-name">${group.name}</div>
              <div class="muscle-group-count">${group.count} exercício${group.count !== 1 ? 's' : ''}</div>
            </div>
            <div class="muscle-group-arrow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </div>
          </div>
        `).join('')}
      </div>

      ${favorites.length > 0 ? `
        <!-- Favorites Section -->
        <h3 style="font-size: 1rem; font-weight: 700; margin: var(--space-lg) 0 var(--space-md); color: var(--text-primary);">
          ⭐ Meus Favoritos
        </h3>
        <div class="muscle-group-list">
          ${favorites.slice(0, 5).map(favId => {
            const ex = SearchUtils.getExerciseById(favId);
            if (!ex) return '';
            const group = MUSCLE_GROUPS[ex.muscleGroup];
            return `
              <div class="muscle-group-item" onclick="App.navigateTo('exercise-detail', { exerciseId: '${ex.id}' })">
                <div class="muscle-group-emoji">${ex.emoji || '🏋️'}</div>
                <div class="muscle-group-info">
                  <div class="muscle-group-name">${ex.name}</div>
                  <div class="muscle-group-count">${group ? group.name : ''}</div>
                </div>
                <div class="muscle-group-arrow">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      ` : ''}
    `;
  },

  onLeave() {}
};
