/* ============================================
   FitBody — Filter Chips Component
   ============================================ */

const FilterChips = {
  activeFilter: 'all',
  activeEquipment: null,

  /**
   * Render filter chips for a muscle group
   */
  render(muscleGroupId) {
    const container = document.getElementById('filter-chips');
    if (!container) return;

    const equipmentList = SearchUtils.getEquipmentForMuscleGroup(muscleGroupId);
    const group = MUSCLE_GROUPS[muscleGroupId];
    const totalCount = SearchUtils.getCountByMuscleGroup(muscleGroupId);

    let html = `
      <button class="chip ${this.activeFilter === 'all' ? 'active' : ''}" data-filter="all" onclick="FilterChips.setFilter('all', '${muscleGroupId}')">
        Todos <span class="chip-count">${totalCount}</span>
      </button>
      <button class="chip ${this.activeFilter === 'muscle' ? 'active' : ''}" data-filter="muscle" onclick="FilterChips.setFilter('muscle', '${muscleGroupId}')">
        ${group ? group.name : 'Grupo'} <span class="chip-count">${totalCount}</span>
      </button>
    `;

    equipmentList.forEach(eq => {
      const isActive = this.activeFilter === 'equipment' && this.activeEquipment === eq.id;
      html += `
        <button class="chip ${isActive ? 'active' : ''}" data-filter="equipment" data-equipment="${eq.id}" 
                onclick="FilterChips.setEquipmentFilter('${eq.id}', '${muscleGroupId}')">
          ${eq.name}
        </button>
      `;
    });

    container.innerHTML = html;
  },

  /**
   * Set active filter
   */
  setFilter(filter, muscleGroupId) {
    this.activeFilter = filter;
    this.activeEquipment = null;
    this.render(muscleGroupId);
    ExerciseListPage.applyFilters(muscleGroupId);
  },

  /**
   * Set equipment filter
   */
  setEquipmentFilter(equipmentId, muscleGroupId) {
    this.activeFilter = 'equipment';
    this.activeEquipment = equipmentId;
    this.render(muscleGroupId);
    ExerciseListPage.applyFilters(muscleGroupId);
  },

  /**
   * Get filtered exercises
   */
  getFilteredExercises(muscleGroupId) {
    let exercises = SearchUtils.filterByMuscleGroup(muscleGroupId);

    if (this.activeFilter === 'equipment' && this.activeEquipment) {
      exercises = exercises.filter(ex => ex.equipment === this.activeEquipment);
    }

    return exercises;
  },

  /**
   * Reset filters
   */
  reset() {
    this.activeFilter = 'all';
    this.activeEquipment = null;
  }
};
