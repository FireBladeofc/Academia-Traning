/* ============================================
   FitBody — Search Bar Component
   ============================================ */

const SearchBar = {
  debounceTimer: null,
  isSearching: false,

  /**
   * Initialize search bar
   */
  init() {
    const input = document.getElementById('search-input');
    if (!input) return;

    input.addEventListener('input', (e) => {
      this.onInput(e.target.value);
    });

    input.addEventListener('focus', () => {
      this.isSearching = true;
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.clear();
        input.blur();
      }
    });
  },

  /**
   * Handle input with debounce
   */
  onInput(query) {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.search(query);
    }, 250);
  },

  /**
   * Execute search
   */
  search(query) {
    if (!query || query.trim().length === 0) {
      this.clearResults();
      return;
    }

    const results = SearchUtils.searchExercises(query);
    this.showResults(results, query);
  },

  /**
   * Show search results in a dropdown/overlay
   */
  showResults(results, query) {
    let container = document.getElementById('search-results-container');
    
    if (!container) {
      container = document.createElement('div');
      container.id = 'search-results-container';
      container.className = 'search-results';
      const bodyModel = document.getElementById('body-model-container');
      if (bodyModel) {
        bodyModel.style.display = 'none';
      }
      const rotateBtn = document.getElementById('btn-rotate');
      if (rotateBtn) {
        rotateBtn.style.display = 'none';
      }
      const page = document.getElementById('page-exercises');
      page.appendChild(container);
    }

    if (results.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
          <div class="empty-state-title">Nenhum resultado</div>
          <div class="empty-state-text">Nenhum exercício encontrado para "${query}"</div>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="search-results-title">${results.length} resultado${results.length > 1 ? 's' : ''} para "${query}"</div>
      ${results.map(ex => {
        const group = MUSCLE_GROUPS[ex.muscleGroup];
        return `
          <div class="search-result-item" onclick="App.navigateTo('exercise-detail', { exerciseId: '${ex.id}' })">
            <div class="search-result-thumb">${ex.emoji || '🏋️'}</div>
            <div>
              <div class="search-result-name">${ex.name}</div>
              <div class="search-result-group">${group ? group.name : ''} · ${EQUIPMENT[ex.equipment] || ''}</div>
            </div>
          </div>
        `;
      }).join('')}
    `;
  },

  /**
   * Clear search results
   */
  clearResults() {
    const container = document.getElementById('search-results-container');
    if (container) {
      container.remove();
    }
    const bodyModel = document.getElementById('body-model-container');
    if (bodyModel) {
      bodyModel.style.display = '';
    }
    const rotateBtn = document.getElementById('btn-rotate');
    if (rotateBtn) {
      rotateBtn.style.display = '';
    }
  },

  /**
   * Clear search input and results
   */
  clear() {
    const input = document.getElementById('search-input');
    if (input) {
      input.value = '';
    }
    this.clearResults();
    this.isSearching = false;
  }
};
