/* ============================================
   FitBody — Search & Filter Utilities
   ============================================ */

const SearchUtils = {
  /**
   * Normalize string for search (remove accents, lowercase)
   */
  normalize(str) {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  },

  /**
   * Search exercises by query string
   */
  searchExercises(query, exercises = EXERCISES) {
    if (!query || query.trim().length === 0) return exercises;

    const normalizedQuery = this.normalize(query);
    const terms = normalizedQuery.split(/\s+/);

    return exercises.filter(exercise => {
      const searchableText = this.normalize(
        `${exercise.name} ${MUSCLE_GROUPS[exercise.muscleGroup]?.name || ''} ${EQUIPMENT[exercise.equipment] || ''}`
      );
      return terms.every(term => searchableText.includes(term));
    }).sort((a, b) => {
      // Prioritize name matches
      const aNameMatch = this.normalize(a.name).includes(normalizedQuery);
      const bNameMatch = this.normalize(b.name).includes(normalizedQuery);
      if (aNameMatch && !bNameMatch) return -1;
      if (!aNameMatch && bNameMatch) return 1;
      return 0;
    });
  },

  /**
   * Filter exercises by muscle group
   */
  filterByMuscleGroup(muscleGroupId, exercises = EXERCISES) {
    return exercises.filter(ex =>
      ex.muscleGroup === muscleGroupId ||
      (ex.secondaryMuscles && ex.secondaryMuscles.includes(muscleGroupId))
    );
  },

  /**
   * Filter exercises by equipment
   */
  filterByEquipment(equipmentId, exercises = EXERCISES) {
    return exercises.filter(ex => ex.equipment === equipmentId);
  },

  /**
   * Sort exercises
   */
  sortExercises(exercises, sortBy = 'relevance') {
    const sorted = [...exercises];
    switch (sortBy) {
      case 'az':
        sorted.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
        break;
      case 'za':
        sorted.sort((a, b) => b.name.localeCompare(a.name, 'pt-BR'));
        break;
      case 'relevance':
      default:
        // Keep original order (by muscle group primary first)
        break;
    }
    return sorted;
  },

  /**
   * Get exercise by ID
   */
  getExerciseById(id) {
    return EXERCISES.find(ex => ex.id === id) || null;
  },

  /**
   * Get exercises count per muscle group
   */
  getCountByMuscleGroup(muscleGroupId) {
    return EXERCISES.filter(ex => ex.muscleGroup === muscleGroupId).length;
  },

  /**
   * Get all unique equipment types used in a muscle group
   */
  getEquipmentForMuscleGroup(muscleGroupId) {
    const exercises = this.filterByMuscleGroup(muscleGroupId);
    const equipmentIds = [...new Set(exercises.map(ex => ex.equipment))];
    return equipmentIds.map(id => ({ id, name: EQUIPMENT[id] }));
  }
};
