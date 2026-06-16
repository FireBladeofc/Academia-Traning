/* ============================================
   FitBody — LocalStorage Utilities
   ============================================ */

const StorageManager = {
  KEYS: {
    FAVORITES: 'fitbody_favorites',
    WORKOUTS: 'fitbody_workouts',
    SETTINGS: 'fitbody_settings',
    TRAINING_LOG: 'fitbody_training_log',
    PLAN_VERSION: 'fitbody_plan_version'
  },

  // Incremente este número toda vez que o plano padrão mudar
  CURRENT_PLAN_VERSION: 3,

  /**
   * Verifica se o plano de treino está na versão atual.
   * Se não estiver, reseta para o padrão atualizado.
   */
  checkAndMigratePlan() {
    const savedVersion = this.get(this.KEYS.PLAN_VERSION, 0);
    if (savedVersion < this.CURRENT_PLAN_VERSION) {
      this.resetToDefaultWorkouts();
      this.set(this.KEYS.PLAN_VERSION, this.CURRENT_PLAN_VERSION);
      console.log(`🔄 FitBody: Plano atualizado para versão ${this.CURRENT_PLAN_VERSION}`);
    }
  },

  /**
   * Get data from localStorage
   */
  get(key, defaultValue = null) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      console.warn(`StorageManager: Error reading key "${key}"`, e);
      return defaultValue;
    }
  },

  /**
   * Save data to localStorage
   */
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.warn(`StorageManager: Error writing key "${key}"`, e);
      return false;
    }
  },

  /**
   * Remove data from localStorage
   */
  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      return false;
    }
  },

  // === FAVORITES ===
  getFavorites() {
    return this.get(this.KEYS.FAVORITES, []);
  },

  isFavorite(exerciseId) {
    const favorites = this.getFavorites();
    return favorites.includes(exerciseId);
  },

  toggleFavorite(exerciseId) {
    const favorites = this.getFavorites();
    const index = favorites.indexOf(exerciseId);
    if (index === -1) {
      favorites.push(exerciseId);
    } else {
      favorites.splice(index, 1);
    }
    this.set(this.KEYS.FAVORITES, favorites);
    return index === -1; // returns true if added, false if removed
  },

  // === WORKOUTS ===
  getWorkouts() {
    let workouts = this.get(this.KEYS.WORKOUTS, null);
    if (!workouts || workouts.length === 0) {
      workouts = this.getDefaultWorkouts();
      this.set(this.KEYS.WORKOUTS, workouts);
    }
    return workouts;
  },

  getDefaultWorkouts() {
    return [
      // ======= SEGUNDA-FEIRA: PEITO + TRÍCEPS =======
      {
        id: 'workout_monday',
        name: '💪 Segunda — Peito + Tríceps',
        createdAt: new Date().toISOString(),
        exercises: [
          { exerciseId: 'peitoral-007', sets: 4, reps: '8-10' },  // Supino reto no Smith
          { exerciseId: 'peitoral-008', sets: 4, reps: '8-10' },  // Supino inclinado no Smith
          { exerciseId: 'peitoral-003', sets: 3, reps: '12' },    // Crucifixo com halteres
          { exerciseId: 'peitoral-004', sets: 3, reps: '12' },    // Crossover na polia
          { exerciseId: 'triceps-002', sets: 4, reps: '12' },     // Tríceps corda na polia
          { exerciseId: 'triceps-008', sets: 3, reps: '12' }      // Tríceps francês com halter
        ]
      },

      // ======= TERÇA-FEIRA: COSTAS + BÍCEPS =======
      {
        id: 'workout_tuesday',
        name: '🦅 Terça — Costas + Bíceps',
        createdAt: new Date().toISOString(),
        exercises: [
          { exerciseId: 'dorsais-008', sets: 4, reps: '10' },     // Remada baixa na máquina
          { exerciseId: 'dorsais-009', sets: 4, reps: '10' },     // Puxada alta na polia (barra longa)
          { exerciseId: 'dorsais-003', sets: 3, reps: '12' },     // Remada unilateral com halter
          { exerciseId: 'dorsais-007', sets: 3, reps: '12' },     // Pulldown na polia
          { exerciseId: 'biceps-001', sets: 4, reps: '10' },      // Rosca direta na barra
          { exerciseId: 'biceps-003', sets: 3, reps: '12' },      // Rosca martelo com halteres
          { exerciseId: 'biceps-002', sets: 3, reps: '12' }       // Rosca alternada
        ]
      },

      // ======= QUARTA-FEIRA: PERNAS =======
      {
        id: 'workout_wednesday',
        name: '🦵 Quarta — Pernas',
        createdAt: new Date().toISOString(),
        exercises: [
          { exerciseId: 'quadriceps-006', sets: 4, reps: '8' },    // Agachamento no Smith
          { exerciseId: 'quadriceps-002', sets: 4, reps: '12' },   // Leg Press
          { exerciseId: 'gluteos-006',    sets: 3, reps: '10' },   // Afundo com halteres
          { exerciseId: 'isquiotibiais-003', sets: 4, reps: '10' }, // Stiff com halteres
          { exerciseId: 'panturrilhas-003', sets: 5, reps: '15' }  // Panturrilha no Leg Press
        ]
      },

      // ======= QUINTA-FEIRA: OMBROS + ABDÔMEN =======
      {
        id: 'workout_thursday',
        name: '🏋️ Quinta — Ombros + Abdômen',
        createdAt: new Date().toISOString(),
        exercises: [
          { exerciseId: 'ombros-008', sets: 4, reps: '10' },      // Desenvolvimento no Smith
          { exerciseId: 'ombros-002', sets: 4, reps: '12' },      // Elevação lateral com halteres
          { exerciseId: 'ombros-003', sets: 3, reps: '12' },      // Elevação frontal
          { exerciseId: 'ombros-009', sets: 4, reps: '12' },      // Crucifixo inverso na polia
          { exerciseId: 'abdomen-002', sets: 3, reps: '45s' },    // Prancha
          { exerciseId: 'abdomen-003', sets: 3, reps: '15' },     // Elevação de pernas
          { exerciseId: 'abdomen-001', sets: 3, reps: '20' }      // Abdominal (infra/crunch)
        ]
      },

      // ======= SEXTA-FEIRA: COSTAS + OMBROS (Especialização Formato V) =======
      {
        id: 'workout_friday',
        name: '🔥 Sexta — Costas + Ombros (Formato V)',
        createdAt: new Date().toISOString(),
        exercises: [
          { exerciseId: 'dorsais-008', sets: 4, reps: '10' },     // Remada baixa
          { exerciseId: 'dorsais-009', sets: 4, reps: '12' },     // Pulldown
          { exerciseId: 'ombros-002',  sets: 4, reps: '15' },     // Elevação lateral
          { exerciseId: 'ombros-008',  sets: 3, reps: '10' },     // Desenvolvimento no Smith
          { exerciseId: 'biceps-001',  sets: 3, reps: '12' },     // Rosca direta
          { exerciseId: 'triceps-006', sets: 3, reps: '12' }      // Tríceps pulley
        ]
      },

      // ======= SÁBADO — OPÇÃO A: CAMINHADA =======
      {
        id: 'workout_saturday_a',
        name: '🚶 Sábado — Opção A (Caminhada)',
        createdAt: new Date().toISOString(),
        exercises: [
          { exerciseId: 'cardio-001', sets: 1, reps: '45-60 min' }
        ]
      },

      // ======= SÁBADO — OPÇÃO B: MOBILIDADE + ABDÔMEN =======
      {
        id: 'workout_saturday_b',
        name: '🧘 Sábado — Opção B (Mobilidade + Abdômen)',
        createdAt: new Date().toISOString(),
        exercises: [
          { exerciseId: 'cardio-001',   sets: 1, reps: '20 min (leve)' },
          { exerciseId: 'abdomen-002',  sets: 3, reps: '1 min' },
          { exerciseId: 'abdomen-003',  sets: 3, reps: '15' },
          { exerciseId: 'lombares-004', sets: 3, reps: '15' }       // Superman (mobilidade)
        ]
      },

      // ======= DOMINGO: DESCANSO =======
      {
        id: 'workout_sunday',
        name: '😴 Domingo — Descanso Total',
        createdAt: new Date().toISOString(),
        exercises: []
      }
    ];
  },

  resetToDefaultWorkouts() {
    const defaultWorkouts = this.getDefaultWorkouts();
    this.set(this.KEYS.WORKOUTS, defaultWorkouts);
    return defaultWorkouts;
  },


  saveWorkout(workout) {
    const workouts = this.getWorkouts();
    const existingIndex = workouts.findIndex(w => w.id === workout.id);
    if (existingIndex >= 0) {
      workouts[existingIndex] = workout;
    } else {
      workouts.push(workout);
    }
    this.set(this.KEYS.WORKOUTS, workouts);
  },

  deleteWorkout(workoutId) {
    const workouts = this.getWorkouts();
    const filtered = workouts.filter(w => w.id !== workoutId);
    this.set(this.KEYS.WORKOUTS, filtered);
  },

  getWorkout(workoutId) {
    const workouts = this.getWorkouts();
    return workouts.find(w => w.id === workoutId) || null;
  },

  // === SETTINGS ===
  getSettings() {
    return this.get(this.KEYS.SETTINGS, {
      bodyView: 'front'
    });
  },

  updateSettings(updates) {
    const settings = this.getSettings();
    Object.assign(settings, updates);
    this.set(this.KEYS.SETTINGS, settings);
  },

  // === TRAINING LOG / FATIGUE ===
  getTrainingHistory() {
    return this.get(this.KEYS.TRAINING_LOG, {});
  },

  logMuscleTraining(muscleGroup) {
    const history = this.getTrainingHistory();
    history[muscleGroup] = Date.now();
    this.set(this.KEYS.TRAINING_LOG, history);
  }
};
