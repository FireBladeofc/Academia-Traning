/* ============================================
   FitBody — Exercise Card Component
   ============================================ */

const ExerciseCard = {
  /**
   * Generate a styled SVG placeholder for exercises without images
   */
  getPlaceholderSVG(exercise) {
    const group = MUSCLE_GROUPS[exercise.muscleGroup];
    const color = group ? group.color : '#E8944C';
    
    // Simple exercise figure based on muscle group
    const figures = {
      ombros: `<circle cx="50" cy="25" r="8" fill="${color}" opacity="0.3"/>
               <line x1="50" y1="33" x2="50" y2="55" stroke="${color}" stroke-width="2.5" opacity="0.5"/>
               <line x1="35" y1="38" x2="50" y2="42" stroke="${color}" stroke-width="2.5" opacity="0.7"/>
               <line x1="65" y1="38" x2="50" y2="42" stroke="${color}" stroke-width="2.5" opacity="0.7"/>
               <line x1="35" y1="38" x2="30" y2="28" stroke="${color}" stroke-width="2" opacity="0.5"/>
               <line x1="65" y1="38" x2="70" y2="28" stroke="${color}" stroke-width="2" opacity="0.5"/>
               <line x1="50" y1="55" x2="40" y2="75" stroke="${color}" stroke-width="2.5" opacity="0.5"/>
               <line x1="50" y1="55" x2="60" y2="75" stroke="${color}" stroke-width="2.5" opacity="0.5"/>
               <circle cx="35" cy="36" r="5" fill="${color}" opacity="0.25"/>
               <circle cx="65" cy="36" r="5" fill="${color}" opacity="0.25"/>`,
      peitoral: `<circle cx="50" cy="22" r="8" fill="${color}" opacity="0.3"/>
                 <line x1="50" y1="30" x2="50" y2="52" stroke="${color}" stroke-width="2.5" opacity="0.5"/>
                 <rect x="37" y="32" width="26" height="14" rx="3" fill="${color}" opacity="0.2"/>
                 <line x1="35" y1="38" x2="25" y2="50" stroke="${color}" stroke-width="2.5" opacity="0.5"/>
                 <line x1="65" y1="38" x2="75" y2="50" stroke="${color}" stroke-width="2.5" opacity="0.5"/>
                 <line x1="50" y1="52" x2="40" y2="75" stroke="${color}" stroke-width="2.5" opacity="0.5"/>
                 <line x1="50" y1="52" x2="60" y2="75" stroke="${color}" stroke-width="2.5" opacity="0.5"/>`,
      biceps: `<circle cx="50" cy="22" r="8" fill="${color}" opacity="0.3"/>
               <line x1="50" y1="30" x2="50" y2="52" stroke="${color}" stroke-width="2.5" opacity="0.5"/>
               <line x1="35" y1="38" x2="32" y2="52" stroke="${color}" stroke-width="2.5" opacity="0.5"/>
               <line x1="32" y1="52" x2="35" y2="38" stroke="${color}" stroke-width="3" opacity="0.7"/>
               <circle cx="33" cy="45" r="4" fill="${color}" opacity="0.35"/>
               <line x1="65" y1="38" x2="68" y2="55" stroke="${color}" stroke-width="2.5" opacity="0.5"/>
               <line x1="50" y1="52" x2="40" y2="75" stroke="${color}" stroke-width="2.5" opacity="0.5"/>
               <line x1="50" y1="52" x2="60" y2="75" stroke="${color}" stroke-width="2.5" opacity="0.5"/>
               <rect x="28" y="50" width="8" height="4" rx="1" fill="${color}" opacity="0.4"/>`,
      default: `<circle cx="50" cy="22" r="8" fill="${color}" opacity="0.3"/>
                <line x1="50" y1="30" x2="50" y2="52" stroke="${color}" stroke-width="2.5" opacity="0.5"/>
                <line x1="35" y1="38" x2="25" y2="50" stroke="${color}" stroke-width="2.5" opacity="0.5"/>
                <line x1="65" y1="38" x2="75" y2="50" stroke="${color}" stroke-width="2.5" opacity="0.5"/>
                <line x1="50" y1="52" x2="40" y2="75" stroke="${color}" stroke-width="2.5" opacity="0.5"/>
                <line x1="50" y1="52" x2="60" y2="75" stroke="${color}" stroke-width="2.5" opacity="0.5"/>`
    };

    const figure = figures[exercise.muscleGroup] || figures.default;

    return `<svg viewBox="0 0 100 90" xmlns="http://www.w3.org/2000/svg" class="exercise-placeholder-svg">
      ${figure}
    </svg>`;
  },

  /**
   * Maps muscle group to the motion class for card thumbnails.
   * Mirrors ExerciseDetailPage.MUSCLE_MOTION_CLASS.
   */
  MUSCLE_MOTION_CLASS: {
    ombros: 'motion-raise', peitoral: 'motion-push', biceps: 'motion-curl',
    triceps: 'motion-push', abdomen: 'motion-crunch', obliquos: 'motion-crunch',
    antebracos: 'motion-curl', abdutores: 'motion-raise', adutores: 'motion-squat',
    quadriceps: 'motion-squat', trapezio: 'motion-pull', dorsais: 'motion-pull',
    lombares: 'motion-hinge', gluteos: 'motion-hinge', isquiotibiais: 'motion-hinge',
    panturrilhas: 'motion-calf', cardio: 'motion-cardio',
  },

  /**
   * Render a single exercise card
   */
  render(exercise) {
    const isFav = StorageManager.isFavorite(exercise.id);
    const equipmentName = EQUIPMENT[exercise.equipment] || '';
    let imagePath = getExerciseImage(exercise.id);
    const isAnimated = Array.isArray(imagePath);
    if (isAnimated) {
      imagePath = imagePath[0];
    }

    const motionClass = isAnimated ? '' : (this.MUSCLE_MOTION_CLASS[exercise.muscleGroup] || 'motion-push');

    const imageContent = imagePath
      ? `<img src="${imagePath}" alt="${exercise.name}" loading="lazy" class="card-img ${motionClass}" onerror="this.parentElement.innerHTML = ExerciseCard.getPlaceholderSVG(EXERCISES.find(e => e.id === '${exercise.id}'))">`
      : this.getPlaceholderSVG(exercise);

    return `
      <div class="exercise-card" data-exercise-id="${exercise.id}" onclick="App.navigateTo('exercise-detail', { exerciseId: '${exercise.id}' })">
        <div class="exercise-card-image">
          ${imageContent}
        </div>
        <button class="btn-favorite ${isFav ? 'active' : ''}" 
                onclick="event.stopPropagation(); ExerciseCard.toggleFavorite('${exercise.id}', this)" 
                aria-label="Favoritar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
        <div class="exercise-card-info">
          <div class="exercise-card-name">${exercise.name}</div>
          <div class="exercise-card-equipment">${equipmentName}</div>
        </div>
      </div>
    `;
  },

  /**
   * Render grid of exercise cards
   */
  renderGrid(exercises) {
    if (exercises.length === 0) {
      return `
        <div class="empty-state">
          <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
          <div class="empty-state-title">Nenhum exercício encontrado</div>
          <div class="empty-state-text">Tente ajustar os filtros ou buscar por outro termo.</div>
        </div>
      `;
    }
    return exercises.map(ex => this.render(ex)).join('');
  },

  /**
   * Toggle favorite on a card
   */
  toggleFavorite(exerciseId, btnElement) {
    const added = StorageManager.toggleFavorite(exerciseId);
    btnElement.classList.toggle('active', added);
    
    if (added) {
      btnElement.querySelector('svg').style.animation = 'heartBeat 0.4s ease';
      setTimeout(() => {
        btnElement.querySelector('svg').style.animation = '';
      }, 400);
    }
    
    App.showToast(added ? 'Adicionado aos favoritos ⭐' : 'Removido dos favoritos');
  }
};
