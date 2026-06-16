/* ============================================
   FitBody — Exercise Detail Page
   ============================================ */

const ExerciseDetailPage = {
  currentExercise: null,

  /**
   * Called when page becomes active
   */
  onEnter(params = {}) {
    const exercise = SearchUtils.getExerciseById(params.exerciseId);
    if (!exercise) {
      App.navigateBack();
      return;
    }

    this.currentExercise = exercise;
    App.setPageTitle(exercise.name);
    this.render(exercise);
    this.startAnimation();
  },

  /**
   * Render exercise detail
   */
  render(exercise) {
    const container = document.getElementById('exercise-detail-content');
    if (!container) return;

    const group = MUSCLE_GROUPS[exercise.muscleGroup];
    const difficulty = DIFFICULTY[exercise.difficulty];
    const equipmentName = EQUIPMENT[exercise.equipment] || 'N/A';
    const isFav = StorageManager.isFavorite(exercise.id);

    const secondaryMusclesHtml = exercise.secondaryMuscles
      .map(m => {
        const mg = MUSCLE_GROUPS[m];
        return mg ? `<span class="muscle-tag secondary">${mg.name}</span>` : '';
      })
      .filter(Boolean)
      .join('');

    const imagePath = getExerciseImage(exercise.id);
    let heroContent = '';
    if (imagePath) {
      if (Array.isArray(imagePath)) {
        heroContent = `
          <div class="exercise-animation-container">
            ${imagePath.map((path, idx) => `
              <img src="${path}" class="exercise-frame ${idx === 0 ? 'active' : ''}" alt="${exercise.name} - Frame ${idx + 1}">
            `).join('')}
          </div>
        `;
      } else {
        heroContent = `<img src="${imagePath}" alt="${exercise.name}" class="exercise-static-img">`;
      }
    } else {
      heroContent = `<div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;">
           <svg viewBox="0 0 100 90" xmlns="http://www.w3.org/2000/svg" style="width: 60%; height: 60%; opacity: 0.6;">
             <circle cx="50" cy="22" r="8" fill="${group?.color || '#E8944C'}" opacity="0.3"/>
             <line x1="50" y1="30" x2="50" y2="52" stroke="${group?.color || '#E8944C'}" stroke-width="2.5" opacity="0.5"/>
             <line x1="35" y1="38" x2="25" y2="50" stroke="${group?.color || '#E8944C'}" stroke-width="2.5" opacity="0.5"/>
             <line x1="65" y1="38" x2="75" y2="50" stroke="${group?.color || '#E8944C'}" stroke-width="2.5" opacity="0.5"/>
             <line x1="50" y1="52" x2="40" y2="75" stroke="${group?.color || '#E8944C'}" stroke-width="2.5" opacity="0.5"/>
             <line x1="50" y1="52" x2="60" y2="75" stroke="${group?.color || '#E8944C'}" stroke-width="2.5" opacity="0.5"/>
           </svg>
         </div>`;
    }

    container.innerHTML = `
      <!-- Hero Image -->
      <div class="exercise-detail-hero">
        ${heroContent}
      </div>

      <!-- Header -->
      <div class="exercise-detail-header">
        <h2 class="exercise-detail-title">${exercise.name}</h2>
        <p style="font-size: 0.8125rem; color: var(--text-secondary); margin-bottom: var(--space-xs);">
          Músculos primários: <strong style="color: var(--text-primary);">${group ? group.name : ''}${exercise.secondaryMuscles.length > 0 ? ', ' + exercise.secondaryMuscles.map(m => MUSCLE_GROUPS[m]?.name || '').filter(Boolean).join(', ') : ''}</strong>
        </p>
        <div class="exercise-detail-subtitle">
          <span class="badge ${difficulty.class}">${difficulty.label}</span>
          <span>·</span>
          <span>${equipmentName}</span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="exercise-detail-actions">
        <button class="btn-accent" onclick="ExerciseDetailPage.addToWorkout('${exercise.id}')" style="flex: 2;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Adicionar
        </button>
        <button class="btn-secondary" onclick="ExerciseDetailPage.logExecution('${exercise.id}', '${exercise.muscleGroup}')" style="flex: 2; gap: 4px;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          Treinado!
        </button>
        <button class="btn-secondary ${isFav ? 'active' : ''}" id="detail-fav-btn" onclick="ExerciseDetailPage.toggleFavorite('${exercise.id}')" style="flex: 1; min-width: 48px; padding: var(--space-md) 0; justify-content: center;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFav ? 'var(--accent-primary)' : 'none'}" stroke="${isFav ? 'var(--accent-primary)' : 'currentColor'}" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>

      <!-- Muscles Worked -->
      <div class="detail-section">
        <div class="detail-section-title">Músculos Trabalhados</div>
        <div class="muscle-tags">
          <span class="muscle-tag primary">${group ? group.name : ''} (Principal)</span>
          ${secondaryMusclesHtml}
        </div>
      </div>

      <!-- Instructions -->
      <div class="detail-section">
        <div class="detail-section-title">Como Executar</div>
        <div class="instruction-steps">
          ${exercise.instructions.map((step, i) => `
            <div class="instruction-step">
              <div class="step-number">${i + 1}</div>
              <div class="step-text">${step}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Tips -->
      ${exercise.tips ? `
      <div class="detail-section">
        <div class="detail-section-title">💡 Dicas</div>
        <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.7;">
          ${exercise.tips}
        </p>
      </div>
      ` : ''}

      <!-- Equipment -->
      <div class="detail-section">
        <div class="detail-section-title">Equipamento</div>
        <div style="display: flex; align-items: center; gap: var(--space-sm);">
          <span style="font-size: 1.5rem;">🏋️</span>
          <span style="font-size: 0.9375rem; font-weight: 600;">${equipmentName}</span>
        </div>
      </div>
    `;
  },

  /**
   * Toggle favorite from detail page
   */
  toggleFavorite(exerciseId) {
    const added = StorageManager.toggleFavorite(exerciseId);
    const btn = document.getElementById('detail-fav-btn');
    if (btn) {
      const svg = btn.querySelector('svg');
      svg.setAttribute('fill', added ? 'var(--accent-primary)' : 'none');
      svg.setAttribute('stroke', added ? 'var(--accent-primary)' : 'currentColor');
      btn.querySelector('svg + span, svg ~ *:last-child');
      // Update button text
      const textNodes = btn.childNodes;
      for (let node of textNodes) {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
          node.textContent = added ? ' Favoritado' : ' Favoritar';
        }
      }
    }
    App.showToast(added ? 'Adicionado aos favoritos ⭐' : 'Removido dos favoritos');
  },

  /**
   * Add exercise to a workout
   */
  addToWorkout(exerciseId) {
    const workouts = StorageManager.getWorkouts();
    
    if (workouts.length === 0) {
      // Show create workout modal
      this.showCreateWorkoutModal(exerciseId);
    } else {
      // Show workout picker modal
      this.showWorkoutPickerModal(exerciseId, workouts);
    }
  },

  /**
   * Show modal to pick a workout
   */
  showWorkoutPickerModal(exerciseId, workouts) {
    const modalOverlay = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-content');

    modalContent.innerHTML = `
      <div class="modal-handle"></div>
      <div class="modal-title">Adicionar ao Treino</div>
      <div style="display: flex; flex-direction: column; gap: var(--space-sm);">
        ${workouts.map(w => `
          <div class="workout-card" onclick="ExerciseDetailPage.addExerciseToWorkout('${exerciseId}', '${w.id}')">
            <div class="workout-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
                <rect x="9" y="3" width="6" height="4" rx="1"/>
              </svg>
            </div>
            <div class="workout-card-info">
              <div class="workout-card-title">${w.name}</div>
              <div class="workout-card-meta">${w.exercises ? w.exercises.length : 0} exercícios</div>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="modal-actions" style="margin-top: var(--space-lg);">
        <button class="btn-secondary" onclick="App.closeModal()" style="flex: 1; justify-content: center;">Cancelar</button>
        <button class="btn-accent" onclick="ExerciseDetailPage.showCreateWorkoutModal('${exerciseId}')" style="flex: 1; justify-content: center;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
          Novo Treino
        </button>
      </div>
    `;

    modalOverlay.classList.remove('hidden');
  },

  /**
   * Show modal to create a new workout
   */
  showCreateWorkoutModal(exerciseId) {
    const modalOverlay = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-content');

    modalContent.innerHTML = `
      <div class="modal-handle"></div>
      <div class="modal-title">Criar Novo Treino</div>
      <div class="modal-form-group">
        <label class="modal-form-label">Nome do Treino</label>
        <input type="text" class="modal-form-input" id="workout-name-input" placeholder="Ex: Treino A - Peito e Tríceps" autofocus>
      </div>
      <div class="modal-actions">
        <button class="btn-secondary" onclick="App.closeModal()">Cancelar</button>
        <button class="btn-accent" onclick="ExerciseDetailPage.createWorkoutAndAdd('${exerciseId}')">Criar e Adicionar</button>
      </div>
    `;

    modalOverlay.classList.remove('hidden');
    setTimeout(() => {
      document.getElementById('workout-name-input')?.focus();
    }, 300);
  },

  /**
   * Create workout and add exercise
   */
  createWorkoutAndAdd(exerciseId) {
    const nameInput = document.getElementById('workout-name-input');
    const name = nameInput ? nameInput.value.trim() : '';
    
    if (!name) {
      nameInput?.focus();
      App.showToast('Digite um nome para o treino', 'warning');
      return;
    }

    const workout = {
      id: 'workout_' + Date.now(),
      name: name,
      createdAt: new Date().toISOString(),
      exercises: [{ exerciseId: exerciseId, sets: 3, reps: 12 }]
    };

    StorageManager.saveWorkout(workout);
    App.closeModal();
    App.showToast(`Treino "${name}" criado com sucesso! 🎉`, 'success');
  },

  /**
   * Add exercise to existing workout
   */
  addExerciseToWorkout(exerciseId, workoutId) {
    const workout = StorageManager.getWorkout(workoutId);
    if (!workout) return;

    // Check if already in workout
    const alreadyExists = workout.exercises?.some(e => e.exerciseId === exerciseId);
    if (alreadyExists) {
      App.showToast('Exercício já está neste treino', 'warning');
      App.closeModal();
      return;
    }

    if (!workout.exercises) workout.exercises = [];
    workout.exercises.push({ exerciseId: exerciseId, sets: 3, reps: 12 });
    StorageManager.saveWorkout(workout);
    
    App.closeModal();
    App.showToast(`Adicionado ao treino "${workout.name}" ✅`, 'success');
  },

  /**
   * Registrar execução do exercício para o mapa de fadiga
   */
  logExecution(exerciseId, muscleGroup) {
    StorageManager.logMuscleTraining(muscleGroup);
    App.showToast(`Músculo ${MUSCLE_GROUPS[muscleGroup]?.name || muscleGroup} registrado como fadigado! 💥`, 'success');
  },

  /**
   * Animation Interval reference
   */
  animationInterval: null,

  /**
   * Start 2-frame loop animation
   */
  startAnimation() {
    this.stopAnimation();

    const frames = document.querySelectorAll('.exercise-frame');
    if (frames.length < 2) return;

    // Accessibility check
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let currentFrameIdx = 0;
    this.animationInterval = setInterval(() => {
      if (frames[currentFrameIdx]) {
        frames[currentFrameIdx].classList.remove('active');
        currentFrameIdx = (currentFrameIdx + 1) % frames.length;
        frames[currentFrameIdx].classList.add('active');
      }
    }, 900);
  },

  /**
   * Stop loop animation
   */
  stopAnimation() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
      this.animationInterval = null;
    }
  },

  /**
   * Called when leaving the page
   */
  onLeave() {
    this.stopAnimation();
    this.currentExercise = null;
  }
};
