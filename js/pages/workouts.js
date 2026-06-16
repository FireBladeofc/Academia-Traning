/* ============================================
   FitBody — Workouts Page
   ============================================ */

const WorkoutsPage = {
  /**
   * Called when page becomes active
   */
  onEnter() {
    this.render();
  },

  /**
   * Render the workouts list
   */
  render() {
    const list = document.getElementById('workouts-list');
    if (!list) return;

    const workouts = StorageManager.getWorkouts();

    if (workouts.length === 0) {
      list.innerHTML = `
        <div class="empty-state">
          <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
            <rect x="9" y="3" width="6" height="4" rx="1"/>
            <path d="M12 12v4M10 14h4"/>
          </svg>
          <div class="empty-state-title">Nenhum treino criado</div>
          <div class="empty-state-text">Explore exercícios e adicione-os a um treino personalizado.</div>
          <button class="btn-accent" onclick="App.navigateTo('exercises')" style="margin-top: var(--space-md);">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="5" r="3"/>
              <path d="M12 8v4M8 20l2-8h4l2 8M6 14h12"/>
            </svg>
            Explorar Exercícios
          </button>
        </div>
      `;
      return;
    }

    list.innerHTML = workouts.map(workout => {
      const exerciseCount = workout.exercises ? workout.exercises.length : 0;
      const estimatedTime = exerciseCount * 5; // ~5 min per exercise
      
      return `
        <div class="workout-card" onclick="WorkoutsPage.openWorkout('${workout.id}')">
          <div class="workout-card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
              <rect x="9" y="3" width="6" height="4" rx="1"/>
              <path d="M9 14l2 2 4-4"/>
            </svg>
          </div>
          <div class="workout-card-info">
            <div class="workout-card-title">${workout.name}</div>
            <div class="workout-card-meta">${exerciseCount} exercício${exerciseCount !== 1 ? 's' : ''} · ~${estimatedTime} min</div>
          </div>
          <div class="workout-card-arrow">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </div>
        </div>
      `;
    }).join('');
  },

  /**
   * Open a workout detail
   */
  openWorkout(workoutId) {
    const workout = StorageManager.getWorkout(workoutId);
    if (!workout) return;

    this.renderWorkoutDetail(workout);
  },

  /**
   * Render workout detail view
   */
  renderWorkoutDetail(workout) {
    const modalOverlay = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-content');

    const exercisesHtml = (workout.exercises || []).map(item => {
      const exercise = SearchUtils.getExerciseById(item.exerciseId);
      if (!exercise) return '';
      return `
        <div class="workout-exercise-item" style="cursor: pointer;" onclick="App.closeModal(); App.navigateTo('exercise-detail', { exerciseId: '${item.exerciseId}' })">
          <div class="workout-exercise-thumb">${exercise.emoji || '🏋️'}</div>
          <div class="workout-exercise-info">
            <div class="workout-exercise-name">${exercise.name}</div>
            <div class="workout-exercise-sets">${item.sets} séries × ${item.reps} repetições</div>
          </div>
          <button style="color: var(--text-muted); padding: 8px;" 
                  onclick="event.stopPropagation(); WorkoutsPage.removeExerciseFromWorkout('${workout.id}', '${item.exerciseId}')" 
                  aria-label="Remover exercício">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
      `;
    }).join('');

    modalContent.innerHTML = `
      <div class="modal-handle"></div>
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-lg);">
        <h3 style="font-size: 1.25rem; font-weight: 700;">${workout.name}</h3>
        <button style="color: var(--error); font-size: 0.8125rem; font-weight: 600; padding: 8px;" 
                onclick="WorkoutsPage.deleteWorkout('${workout.id}')">
          Excluir
        </button>
      </div>
      
      ${exercisesHtml || '<div class="empty-state"><div class="empty-state-text">Nenhum exercício adicionado ainda.</div></div>'}
      
      <div class="modal-actions" style="margin-top: var(--space-lg); flex-wrap: wrap;">
        <button class="btn-accent" onclick="WorkoutsPage.startWorkout('${workout.id}')" style="width: 100%; justify-content: center; margin-bottom: 8px;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 3l14 9-14 9V3z"/></svg>
          Iniciar Treino
        </button>
        <button class="btn-secondary" onclick="App.closeModal()" style="flex: 1; justify-content: center;">Fechar</button>
        <button class="btn-secondary" onclick="App.closeModal(); App.navigateTo('exercises')" style="flex: 1; justify-content: center;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
          Exercícios
        </button>
      </div>
    `;

    modalOverlay.classList.remove('hidden');
  },

  activeTimer: null,
  startTime: null,

  startWorkout(workoutId) {
    const workout = StorageManager.getWorkout(workoutId);
    if (!workout || !workout.exercises || workout.exercises.length === 0) {
      App.showToast('Adicione exercícios para iniciar o treino', 'warning');
      return;
    }

    this.startTime = Date.now();
    const modalContent = document.getElementById('modal-content');

    if (this.activeTimer) clearInterval(this.activeTimer);
    this.activeTimer = setInterval(() => {
      const timerVal = document.getElementById('workout-timer-val');
      if (timerVal) {
        const diff = Date.now() - this.startTime;
        const mins = Math.floor(diff / 60000).toString().padStart(2, '0');
        const secs = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
        timerVal.textContent = `${mins}:${secs}`;
      }
    }, 1000);

    const exercisesHtml = workout.exercises.map((item, index) => {
      const exercise = SearchUtils.getExerciseById(item.exerciseId);
      if (!exercise) return '';

      const imagePath = getExerciseImage(exercise.id);
      let mediaHtml = '';
      if (imagePath) {
        if (Array.isArray(imagePath)) {
          mediaHtml = `
            <div style="display: flex; gap: var(--space-sm); justify-content: center; width: 100%; margin-bottom: var(--space-sm); background: rgba(0, 0, 0, 0.2); padding: var(--space-sm); border-radius: var(--radius-md);">
              ${imagePath.map((path, idx) => `<img src="${path}" style="width: 47%; max-height: 120px; object-fit: contain; border-radius: var(--radius-sm);" alt="${exercise.name} - Passo ${idx + 1}">`).join('')}
            </div>
          `;
        } else {
          mediaHtml = `
            <div style="display: flex; justify-content: center; width: 100%; margin-bottom: var(--space-sm); background: rgba(0, 0, 0, 0.2); padding: var(--space-sm); border-radius: var(--radius-md);">
              <img src="${imagePath}" style="max-width: 100%; max-height: 120px; object-fit: contain; border-radius: var(--radius-sm);" alt="${exercise.name}">
            </div>
          `;
        }
      }

      return `
        <div class="workout-exercise-item checkable" style="flex-direction: column; align-items: stretch; gap: 0;" onclick="if (!event.target.closest('.no-check')) this.classList.toggle('completed')">
          <div style="display: flex; align-items: center; width: 100%; gap: var(--space-md);">
            <div class="workout-exercise-checkbox">
              <svg class="check-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </div>
            <div class="workout-exercise-thumb">${exercise.emoji || '🏋️'}</div>
            <div class="workout-exercise-info" style="flex: 1;">
              <div class="workout-exercise-name">${exercise.name}</div>
              <div class="workout-exercise-sets">${item.sets} séries × ${item.reps} repetições</div>
            </div>
            <button class="no-check" style="color: var(--text-muted); padding: 8px;" 
                    onclick="event.stopPropagation(); WorkoutsPage.toggleInstruction(this)"
                    title="Ver execução">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="transition: transform 0.2s ease;" class="chevron-icon">
                <path d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
          </div>
          <div class="exercise-instruction-dropdown no-check" style="display: none; width: 100%; margin-top: var(--space-sm); border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: var(--space-sm);" onclick="event.stopPropagation();">
             ${mediaHtml}
             <strong style="font-size: 0.8125rem; color: var(--accent-primary); display: block; margin-bottom: 6px; text-align: left;">Como Executar:</strong>
             <ol style="font-size: 0.75rem; color: var(--text-secondary); padding-left: 14px; margin: 0; line-height: 1.4; text-align: left;">
                ${exercise.instructions.map(step => `<li>${step}</li>`).join('')}
             </ol>
             ${exercise.tips ? `<p style="font-size: 0.72rem; color: var(--text-muted); margin: 6px 0 0 0; text-align: left;">💡 <em>${exercise.tips}</em></p>` : ''}
          </div>
        </div>
      `;
    }).join('');

    modalContent.innerHTML = `
      <div class="modal-handle"></div>
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-lg);">
        <div>
          <h3 style="font-size: 1.25rem; font-weight: 700;">${workout.name}</h3>
          <span style="font-size: 0.8125rem; color: var(--text-muted);">Treino em andamento...</span>
        </div>
        <div id="workout-timer-val" style="font-family: monospace; font-size: 1.25rem; font-weight: 700; color: var(--accent-primary); background: rgba(232, 148, 76, 0.15); padding: 4px 8px; border-radius: 6px;">00:00</div>
      </div>
      
      <div style="max-height: 45vh; overflow-y: auto; display: flex; flex-direction: column; gap: var(--space-sm); margin-bottom: var(--space-lg);">
        ${exercisesHtml}
      </div>
      
      <div class="modal-actions">
        <button class="btn-secondary" onclick="WorkoutsPage.cancelWorkout()" style="flex: 1; justify-content: center;">Cancelar</button>
        <button class="btn-accent" onclick="WorkoutsPage.completeWorkout('${workout.id}')" style="flex: 1; justify-content: center;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
          Concluir Treino
        </button>
      </div>
    `;
  },

  toggleInstruction(btn) {
    const item = btn.closest('.workout-exercise-item');
    const dropdown = item.querySelector('.exercise-instruction-dropdown');
    const chevron = btn.querySelector('.chevron-icon');
    if (dropdown.style.display === 'none') {
      dropdown.style.display = 'block';
      chevron.style.transform = 'rotate(180deg)';
    } else {
      dropdown.style.display = 'none';
      chevron.style.transform = '';
    }
  },

  cancelWorkout() {
    if (this.activeTimer) {
      clearInterval(this.activeTimer);
      this.activeTimer = null;
    }
    App.closeModal();
    App.showToast('Treino cancelado', 'warning');
  },

  completeWorkout(workoutId) {
    if (this.activeTimer) {
      clearInterval(this.activeTimer);
      this.activeTimer = null;
    }

    const workout = StorageManager.getWorkout(workoutId);
    if (!workout) return;

    const musclesTrained = new Set();
    workout.exercises.forEach(item => {
      const exercise = SearchUtils.getExerciseById(item.exerciseId);
      if (exercise) {
        if (exercise.muscleGroup) {
          musclesTrained.add(exercise.muscleGroup);
        }
        if (exercise.secondaryMuscles) {
          exercise.secondaryMuscles.forEach(m => musclesTrained.add(m));
        }
      }
    });

    musclesTrained.forEach(muscle => {
      StorageManager.logMuscleTraining(muscle);
    });

    if (typeof BodyModel !== 'undefined' && typeof BodyModel.applyFatigueColors === 'function') {
      BodyModel.applyFatigueColors();
    }

    App.closeModal();
    
    const diff = Date.now() - this.startTime;
    const mins = Math.max(1, Math.round(diff / 60000));
    App.showToast(`Parabéns! Treino concluído em ${mins} min! 💪🔥`, 'success');
  },

  /**
   * Remove exercise from workout
   */
  removeExerciseFromWorkout(workoutId, exerciseId) {
    const workout = StorageManager.getWorkout(workoutId);
    if (!workout) return;

    workout.exercises = (workout.exercises || []).filter(e => e.exerciseId !== exerciseId);
    StorageManager.saveWorkout(workout);
    
    this.renderWorkoutDetail(workout);
    App.showToast('Exercício removido do treino');
  },

  /**
   * Delete a workout
   */
  deleteWorkout(workoutId) {
    StorageManager.deleteWorkout(workoutId);
    App.closeModal();
    this.render();
    App.showToast('Treino excluído', 'warning');
  },

  /**
   * Show create workout modal
   */
  showCreateModal() {
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
        <button class="btn-accent" onclick="WorkoutsPage.createWorkout()">Criar Treino</button>
      </div>
    `;

    modalOverlay.classList.remove('hidden');
    setTimeout(() => {
      document.getElementById('workout-name-input')?.focus();
    }, 300);
  },

  /**
   * Create a new workout
   */
  createWorkout() {
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
      exercises: []
    };

    StorageManager.saveWorkout(workout);
    App.closeModal();
    this.render();
    App.showToast(`Treino "${name}" criado! 🎉`, 'success');
  },

  onLeave() {}
};
