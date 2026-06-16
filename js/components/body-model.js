/* ============================================
   FitBody — Interactive Anatomical Body Model
   ============================================ */

const BodyModel = {
  currentView: 'front', // 'front' or 'back'
  isAnimating: false,

  selectedMuscleId: null,

  /**
   * Initialize the body model
   */
  init() {
    this.bindRotateButton();
    this.render();
  },

  /**
   * Render the body model SVG and HUD
   */
  render() {
    const container = document.getElementById('body-model-container');
    if (!container) return;

    const svgContent = this.currentView === 'front'
      ? this.getFrontSVG()
      : this.getBackSVG();

    container.innerHTML = `
      <div class="body-model-hud" id="body-model-hud">
        <span class="hud-muscle-emoji">🏋️</span>
        <div class="hud-muscle-info">
          <span class="hud-muscle-name" id="hud-muscle-name">Selecione um músculo</span>
          <span class="hud-muscle-tip" id="hud-muscle-tip">Passe o mouse ou toque para explorar</span>
        </div>
      </div>
      <div class="body-model-wrapper" id="body-model-wrapper">
        ${svgContent}
      </div>
    `;

    // Bind interaction events
    this.bindSVGInteractionEvents();
    this.applyFatigueColors();
  },

  /**
   * Bind rotation button
   */
  bindRotateButton() {
    const btn = document.getElementById('btn-rotate');
    if (btn) {
      // Clean up potential old listeners by cloning or just re-adding (since init is called once)
      btn.onclick = () => this.rotate();
    }
  },

  /**
   * Rotate between front and back views
   */
  rotate() {
    if (this.isAnimating) return;
    this.isAnimating = true;

    const container = document.getElementById('body-model-container');
    const btn = document.getElementById('btn-rotate');

    // Add animation class to button
    btn.classList.add('rotating');

    // Animate out
    container.style.animation = 'flipOut 0.25s ease-in forwards';

    setTimeout(() => {
      this.currentView = this.currentView === 'front' ? 'back' : 'front';
      this.selectedMuscleId = null; // Reset selection on rotate
      this.render();
      container.style.animation = 'flipIn 0.25s ease-out forwards';

      setTimeout(() => {
        container.style.animation = '';
        btn.classList.remove('rotating');
        this.isAnimating = false;
      }, 250);
    }, 250);
  },

  /**
   * Bind hover and click/touch events to SVG muscle paths
   */
  bindSVGInteractionEvents() {
    const paths = document.querySelectorAll('.body-model-svg [data-muscle]');
    const hudName = document.getElementById('hud-muscle-name');
    const hudTip = document.getElementById('hud-muscle-tip');
    const hudEmoji = document.querySelector('.hud-muscle-emoji');

    const updateHUD = (muscleId, isSelection = false) => {
      const muscle = MUSCLE_GROUPS[muscleId];
      if (muscle) {
        if (hudName) hudName.textContent = muscle.name;
        if (hudEmoji) hudEmoji.textContent = muscle.emoji || '💪';
        if (hudTip) {
          if (isSelection) {
            hudTip.innerHTML = `Toque novamente para ver exercícios <span class="tip-arrow">→</span>`;
            hudTip.classList.add('confirm-mode');
          } else {
            hudTip.textContent = 'Clique para ver os exercícios';
            hudTip.classList.remove('confirm-mode');
          }
        }
      }
    };

    const resetHUD = () => {
      if (this.selectedMuscleId) {
        updateHUD(this.selectedMuscleId, true);
        return;
      }
      if (hudName) hudName.textContent = 'Selecione um músculo';
      if (hudEmoji) hudEmoji.textContent = '🏋️';
      if (hudTip) {
        hudTip.textContent = 'Passe o mouse ou toque para explorar';
        hudTip.classList.remove('confirm-mode');
      }
    };

    paths.forEach(path => {
      path.style.cursor = 'pointer';

      // HOVER (Desktop)
      path.addEventListener('mouseenter', () => {
        const muscleId = path.dataset.muscle;
        if (!this.selectedMuscleId) {
          updateHUD(muscleId, false);
        }
        path.classList.add('hovered');
      });

      path.addEventListener('mouseleave', () => {
        path.classList.remove('hovered');
        resetHUD();
      });

      // CLICK / TOUCH
      path.addEventListener('click', (e) => {
        e.stopPropagation();
        const muscleId = path.dataset.muscle;
        if (!muscleId) return;

        // Check if device supports hover
        const hasHover = window.matchMedia('(hover: hover)').matches;

        if (hasHover) {
          // Desktop flow: click once to navigate
          App.navigateTo('exercise-list', { muscleGroup: muscleId });
        } else {
          // Mobile/Touch flow: double tap to confirm
          if (this.selectedMuscleId === muscleId) {
            // Second tap: navigate
            App.navigateTo('exercise-list', { muscleGroup: muscleId });
            this.selectedMuscleId = null;
          } else {
            // First tap: select and show confirmation hint
            // Deselect other paths
            paths.forEach(p => p.classList.remove('selected'));
            path.classList.add('selected');
            this.selectedMuscleId = muscleId;
            updateHUD(muscleId, true);
            App.showToast(`Músculo selecionado: ${MUSCLE_GROUPS[muscleId]?.name || muscleId}`, 'success');
          }
        }
      });
    });

    // Reset selection if clicking background
    document.addEventListener('click', (e) => {
      if (!e.target.closest('[data-muscle]') && !e.target.closest('#btn-rotate')) {
        this.selectedMuscleId = null;
        paths.forEach(p => p.classList.remove('selected'));
        resetHUD();
      }
    });
  },


  /**
   * Calculate and apply colors dynamically based on training log
   */
  applyFatigueColors() {
    const history = StorageManager.getTrainingHistory();
    const now = Date.now();

    // Select all elements with data-muscle (both labels and SVG paths)
    const elements = document.querySelectorAll('[data-muscle]');
    elements.forEach(el => {
      const muscleId = el.dataset.muscle;
      if (!muscleId) return;

      const lastTrained = history[muscleId];
      let fatigueClass = 'fatigue-none';
      let fatigueColor = 'var(--body-fill)';
      let borderShadow = '';

      if (lastTrained) {
        const hoursSince = (now - lastTrained) / (60 * 60 * 1000);
        if (hoursSince < 24) {
          fatigueClass = 'fatigue-high';
          fatigueColor = 'rgba(239, 68, 68, 0.75)'; // Red
          borderShadow = 'rgba(239, 68, 68, 0.6)';
        } else if (hoursSince < 48) {
          fatigueClass = 'fatigue-medium';
          fatigueColor = 'rgba(234, 179, 8, 0.65)';  // Yellow
          borderShadow = 'rgba(234, 179, 8, 0.6)';
        } else {
          fatigueClass = 'fatigue-low';
          fatigueColor = 'rgba(34, 197, 94, 0.45)';  // Green
          borderShadow = 'rgba(34, 197, 94, 0.6)';
        }
      }

      // If it is an SVG element
      if (el.tagName.toLowerCase() !== 'div') {
        el.style.fill = fatigueColor;
        el.style.transition = 'fill 0.4s ease';
        el.setAttribute('class', `muscle-path ${fatigueClass}`);
      } else {
        // If it's a text label, color the dot
        const dot = el.querySelector('.muscle-label-dot');
        if (dot) {
          dot.className = `muscle-label-dot ${fatigueClass}`;
          if (fatigueClass !== 'fatigue-none') {
            const displayColor = fatigueColor.replace('0.75', '1').replace('0.65', '1').replace('0.45', '1');
            dot.style.background = displayColor;
            dot.style.borderColor = displayColor;
            dot.style.boxShadow = `0 0 8px ${borderShadow}`;
          } else {
            dot.style.background = '';
            dot.style.borderColor = '';
            dot.style.boxShadow = '';
          }
        }
      }
    });
  },

  /**
   * Get front labels HTML
   */
  getFrontLabels() {
    const labels = [
      { id: 'ombros', text: 'Ombros', side: 'left', top: '14%', left: '-2%' },
      { id: 'peitoral', text: 'Peitoral', side: 'right', top: '20%', right: '-4%' },
      { id: 'biceps', text: 'Bíceps', side: 'left', top: '28%', left: '-4%' },
      { id: 'abdomen', text: 'Abdômen', side: 'right', top: '33%', right: '-4%' },
      { id: 'obliquos', text: 'Oblíquos', side: 'left', top: '38%', left: '-4%' },
      { id: 'antebracos', text: 'Antebraços', side: 'right', top: '42%', right: '-8%' },
      { id: 'abdutores', text: 'Abdutores', side: 'left', top: '52%', left: '-6%' },
      { id: 'adutores', text: 'Adutores', side: 'right', top: '55%', right: '-4%' },
      { id: 'quadriceps', text: 'Quadríceps', side: 'left', top: '62%', left: '-6%' },
      { id: 'cardio', text: 'Cardio', side: 'right', top: '67%', right: '-2%' }
    ];

    return labels.map(l => {
      const posStyle = l.side === 'left'
        ? `top: ${l.top}; left: ${l.left}`
        : `top: ${l.top}; right: ${l.right}`;
      return `
        <div class="muscle-label ${l.side}" data-muscle="${l.id}" style="${posStyle}">
          <span class="muscle-label-text">${l.text}</span>
          <span class="muscle-label-dot"></span>
        </div>
      `;
    }).join('');
  },

  /**
   * Get back labels HTML
   */
  getBackLabels() {
    const labels = [
      { id: 'trapezio', text: 'Trapézio', side: 'right', top: '14%', right: '-4%' },
      { id: 'triceps', text: 'Tríceps', side: 'left', top: '26%', left: '-2%' },
      { id: 'dorsais', text: 'Dorsais', side: 'right', top: '28%', right: '-2%' },
      { id: 'lombares', text: 'Lombares', side: 'left', top: '37%', left: '-4%' },
      { id: 'gluteos', text: 'Glúteos', side: 'right', top: '46%', right: '-2%' },
      { id: 'isquiotibiais', text: 'Isquiotibiais', side: 'left', top: '58%', left: '-8%' },
      { id: 'cardio', text: 'Cardio', side: 'right', top: '60%', right: '-2%' },
      { id: 'panturrilhas', text: 'Panturrilhas', side: 'left', top: '74%', left: '-8%' }
    ];

    return labels.map(l => {
      const posStyle = l.side === 'left'
        ? `top: ${l.top}; left: ${l.left}`
        : `top: ${l.top}; right: ${l.right}`;
      return `
        <div class="muscle-label ${l.side}" data-muscle="${l.id}" style="${posStyle}">
          <span class="muscle-label-text">${l.text}</span>
          <span class="muscle-label-dot"></span>
        </div>
      `;
    }).join('');
  },

  /**
   * Front body SVG — Highly Detailed Humanized Anatomical Definition
   */
  getFrontSVG() {
    return `
    <svg class="body-model-svg" viewBox="0 0 300 520" xmlns="http://www.w3.org/2000/svg">
      <!-- Background Human Silhouette -->
      <path d="M150 15 C132 15 128 25 128 38 C128 50 135 60 138 68 C138 68 122 72 114 76 C95 81 88 92 82 102 C74 114 73 126 73 141 C73 154 71 176 72 188 C74 204 62 226 52 250 C48 264 47 274 47 280 C48 284 52 284 58 280 C66 272 72 256 76 236 L82 206 Q84 194 88 214 L92 256 L94 296 Q92 336 90 381 Q88 396 98 398 L98 406 C86 426 85 446 85 466 C86 481 90 498 90 501 C90 504 80 506 75 508 C72 510 72 514 78 514 H115 V504 C115 484 118 456 118 431 L118 406 C122 406 125 398 128 388 L132 356 C135 316 150 296 150 296 C150 296 165 316 168 356 L172 388 C175 398 178 406 182 406 L182 431 C182 456 185 484 185 504 V514 H222 C228 514 228 510 225 508 C220 506 210 504 210 501 C210 498 214 481 215 466 C215 446 214 426 202 406 L202 398 C212 396 212 381 210 381 Q208 336 206 296 L208 256 L212 214 Q216 194 218 206 L224 236 C228 256 234 272 242 280 C248 284 252 284 253 280 C253 274 252 264 248 250 C238 226 226 204 228 188 C229 176 227 154 227 141 C227 126 226 114 218 102 C212 92 205 81 186 76 C178 72 162 68 162 68 C162 68 165 54 172 38 C172 25 168 15 150 15 Z" 
            fill="#131317" stroke="#2c2c35" stroke-width="2.5"/>

      <!-- Head & Neck (Organic curves) -->
      <path d="M128 38 C128 25, 136 18, 150 18 C164 18, 172 25, 172 38 C172 50, 164 58, 150 58 C136 58, 128 50, 128 38 Z" fill="var(--body-fill)" stroke="var(--body-stroke)" stroke-width="1.2"/>
      <path d="M139 56 C139 56, 142 68, 150 68 C158 68, 161 56, 161 56 Z" fill="var(--body-fill)" stroke="var(--body-stroke)" stroke-width="1"/>

      <!-- Clavicle curves -->
      <path d="M115 76 C130 81, 142 81, 150 79 C158 79, 170 81, 185 76" fill="none" stroke="var(--body-stroke)" stroke-width="1.2" opacity="0.6"/>

      <!-- Chest / Pectorals (Realistic organic plates) -->
      <path data-muscle="peitoral" d="M108 80 C122 80, 136 82, 148 85 C148 98, 147 114, 148 126 C134 127, 118 124, 105 118 C102 106, 104 92, 108 80 Z" fill="var(--body-fill)" stroke="var(--body-stroke)" stroke-width="1.2"/>
      <path data-muscle="peitoral" d="M192 80 C178 80, 164 82, 152 85 C152 98, 153 114, 152 126 C166 127, 182 124, 195 118 C198 106, 196 92, 192 80 Z" fill="var(--body-fill)" stroke="var(--body-stroke)" stroke-width="1.2"/>

      <!-- Deltoids / Ombros (Humanized rounded shoulders) -->
      <path data-muscle="ombros" d="M108 80 C95 82, 84 90, 78 100 C73 108, 73 118, 76 124 C82 124, 88 121, 95 116 C101 106, 105 92, 108 80 Z" fill="var(--body-fill)" stroke="var(--body-stroke)" stroke-width="1.2"/>
      <path data-muscle="ombros" d="M192 80 C205 82, 216 90, 222 100 C227 108, 227 118, 224 124 C218 124, 212 121, 205 116 C199 106, 195 92, 192 80 Z" fill="var(--body-fill)" stroke="var(--body-stroke)" stroke-width="1.2"/>

      <!-- Upper Arms / Biceps (Curved natural bulge) -->
      <path data-muscle="biceps" d="M76 124 C72 135, 68 148, 67 158 C66 166, 68 174, 75 174 C80 172, 85 160, 92 142 C92 134, 86 128, 76 124 Z" fill="var(--body-fill)" stroke="var(--body-stroke)" stroke-width="1.2"/>
      <path data-muscle="biceps" d="M224 124 C228 135, 232 148, 233 158 C234 166, 232 174, 225 174 C220 172, 215 160, 208 142 C208 134, 214 128, 224 124 Z" fill="var(--body-fill)" stroke="var(--body-stroke)" stroke-width="1.2"/>

      <!-- Forearms / Antebraços (Humanized wrist taper) -->
      <path data-muscle="antebracos" d="M75 174 C66 195, 58 215, 52 235 C50 242, 50 250, 53 254 C58 254, 64 248, 71 235 C75 220, 80 195, 82 172 C80 172, 77 173, 75 174 Z" fill="var(--body-fill)" stroke="var(--body-stroke)" stroke-width="1.2"/>
      <path data-muscle="antebracos" d="M225 174 C234 195, 242 215, 248 235 C250 242, 250 250, 247 254 C242 254, 236 248, 229 235 C225 220, 220 195, 218 172 C220 172, 223 173, 225 174 Z" fill="var(--body-fill)" stroke="var(--body-stroke)" stroke-width="1.2"/>

      <!-- Hands -->
      <path d="M53 254 C48 262, 47 270, 48 274 C50 276, 54 274, 58 268 L66 250 Z" fill="var(--body-fill)" stroke="var(--body-stroke)" stroke-width="0.8"/>
      <path d="M247 254 C252 262, 253 270, 252 274 C250 276, 246 274, 242 268 L234 250 Z" fill="var(--body-fill)" stroke="var(--body-stroke)" stroke-width="0.8"/>

      <!-- Abdomen (Symmetrical 6-Pack grid, contoured) -->
      <g data-muscle="abdomen">
        <path d="M118 126 C130 128, 140 128, 150 128 C160 128, 170 128, 182 126 C184 150, 185 180, 186 208 C174 212, 160 214, 150 214 C140 214, 126 212, 114 208 C115 180, 116 150, 118 126 Z" fill="var(--body-fill)" stroke="var(--body-stroke)" stroke-width="1"/>
        <!-- Abdominal lines (6 pack cuts) -->
        <path d="M125 148 C140 150, 160 150, 175 148" fill="none" stroke="var(--body-stroke)" stroke-width="1" opacity="0.4"/>
        <path d="M121 170 C140 172, 160 172, 179 170" fill="none" stroke="var(--body-stroke)" stroke-width="1" opacity="0.4"/>
        <path d="M117 190 C140 192, 160 192, 183 190" fill="none" stroke="var(--body-stroke)" stroke-width="1" opacity="0.4"/>
        <!-- Linea Alba -->
        <line x1="150" y1="128" x2="150" y2="214" stroke="var(--body-stroke)" stroke-width="1" opacity="0.5"/>
      </g>

      <!-- Obliques / Oblíquos (Curved waist) -->
      <path data-muscle="obliquos" d="M105 118 C112 145, 114 180, 114 208 C108 214, 102 220, 98 226 C92 195, 95 150, 105 118 Z" fill="var(--body-fill)" stroke="var(--body-stroke)" stroke-width="1"/>
      <path data-muscle="obliquos" d="M195 118 C188 145, 186 180, 186 208 C192 214, 198 220, 202 226 C208 195, 205 150, 195 118 Z" fill="var(--body-fill)" stroke="var(--body-stroke)" stroke-width="1"/>

      <!-- Pelvis / Cintura -->
      <path d="M98 226 C120 236, 140 238, 150 238 C160 238, 180 236, 202 226 C205 240, 206 250, 206 256 C180 262, 160 264, 150 264 C140 264, 120 262, 94 256 C94 250, 95 240, 98 226 Z" fill="var(--body-fill)" stroke="var(--body-stroke)" stroke-width="1.2"/>

      <!-- Thighs / Quadriceps (Defined human quad sweep) -->
      <g data-muscle="quadriceps">
        <!-- Left Quad -->
        <path d="M94 256 C110 262, 120 270, 125 292 C122 320, 120 348, 122 366 C112 370, 102 371, 95 368 C88 332, 90 292, 94 256 Z" fill="var(--body-fill)" stroke="var(--body-stroke)" stroke-width="1.2"/>
        <!-- Right Quad -->
        <path d="M206 256 C190 262, 180 270, 175 292 C178 320, 180 348, 178 366 C188 370, 198 371, 205 368 C212 332, 210 292, 206 256 Z" fill="var(--body-fill)" stroke="var(--body-stroke)" stroke-width="1.2"/>
      </g>

      <!-- Outer Thighs / Abdutores -->
      <path data-muscle="abdutores" d="M94 256 C90 292, 88 332, 95 368 C90 368, 86 360, 84 350 C80 320, 85 285, 94 256 Z" fill="var(--body-fill)" stroke="var(--body-stroke)" stroke-width="1"/>
      <path data-muscle="abdutores" d="M206 256 C210 292, 212 332, 205 368 C210 368, 214 360, 216 350 C220 320, 215 285, 206 256 Z" fill="var(--body-fill)" stroke="var(--body-stroke)" stroke-width="1"/>

      <!-- Inner Thighs / Adutores -->
      <path data-muscle="adutores" d="M125 292 L131 350 C128 358, 124 362, 122 366 L125 292 Z" fill="var(--body-fill)" stroke="var(--body-stroke)" stroke-width="1"/>
      <path data-muscle="adutores" d="M175 292 L169 350 C172 358, 176 362, 178 366 L175 292 Z" fill="var(--body-fill)" stroke="var(--body-stroke)" stroke-width="1"/>

      <!-- Knees -->
      <path d="M95 368 C102 370, 115 370, 122 368 C122 374, 115 378, 108 378 C101 378, 95 374, 95 368 Z" fill="var(--body-fill)" stroke="var(--body-stroke)" stroke-width="0.8"/>
      <path d="M178 368 C185 370, 198 370, 205 368 C205 374, 198 378, 192 378 C185 378, 178 374, 178 368 Z" fill="var(--body-fill)" stroke="var(--body-stroke)" stroke-width="0.8"/>

      <!-- Lower Legs (Calves / Tibialis) -->
      <path d="M95 378 C88 400, 84 430, 88 456 C91 474, 96 488, 98 494 L114 491 Q116 440 122 378 Z" fill="var(--body-fill)" stroke="var(--body-stroke)" stroke-width="1.2"/>
      <path d="M205 378 C212 400, 216 430, 212 456 C209 474, 204 488, 202 494 L186 491 Q184 440 178 378 Z" fill="var(--body-fill)" stroke="var(--body-stroke)" stroke-width="1.2"/>

      <!-- Cardio Icon -->
      <path data-muscle="cardio" d="M150 102 C148 97, 140 97, 140 104 C140 110, 150 118, 150 118 C150 118, 160 110, 160 104 C160 97, 152 97, 150 102 Z" 
            fill="#E8944C" stroke="#FFF" stroke-width="0.8" opacity="0.85"/>

      <!-- Feet -->
      <path d="M98 494 L80 500 C75 504, 75 508, 78 508 H114 Z" fill="var(--body-fill)" stroke="var(--body-stroke)" stroke-width="0.8"/>
      <path d="M202 494 L220 500 C225 504, 225 508, 222 508 H186 Z" fill="var(--body-fill)" stroke="var(--body-stroke)" stroke-width="0.8"/>
    </svg>`;
  },

  /**
   * Back body SVG — Highly Detailed Humanized Anatomical Definition (Posterior View)
   */
  getBackSVG() {
    return `
    <svg class="body-model-svg" viewBox="0 0 300 520" xmlns="http://www.w3.org/2000/svg">
      <!-- Background Human Silhouette -->
      <path d="M150 15 C132 15 128 25 128 38 C128 50 135 60 138 68 C138 68 122 72 114 76 C95 81 88 92 82 102 C74 114 73 126 73 141 C73 154 71 176 72 188 C74 204 62 226 52 250 C48 264 47 274 47 280 C48 284 52 284 58 280 C66 272 72 256 76 236 L82 206 Q84 194 88 214 L92 256 L94 296 Q92 336 90 381 Q88 396 98 398 L98 406 C86 426 85 446 85 466 C86 481 90 498 90 501 C90 504 80 506 75 508 C72 510 72 514 78 514 H115 V504 C115 484 118 456 118 431 L118 406 C122 406 125 398 128 388 L132 356 C135 316 150 296 150 296 C150 296 165 316 168 356 L172 388 C175 398 178 406 182 406 L182 431 C182 456 185 484 185 504 V514 H222 C228 514 228 510 225 508 C220 506 210 504 210 501 C210 498 214 481 215 466 C215 446 214 426 202 406 L202 398 C212 396 212 381 210 381 Q208 336 206 296 L208 256 L212 214 Q216 194 218 206 L224 236 C228 256 234 272 242 280 C248 284 252 284 253 280 C253 274 252 264 248 250 C238 226 226 204 228 188 C229 176 227 154 227 141 C227 126 226 114 218 102 C212 92 205 81 186 76 C178 72 162 68 162 68 C162 68 165 54 172 38 C172 25 168 15 150 15 Z" 
            fill="#131317" stroke="#2c2c35" stroke-width="2.5"/>

      <!-- Head & Neck -->
      <path d="M128 38 C128 25, 136 18, 150 18 C164 18, 172 25, 172 38 C172 50, 164 58, 150 58 C136 58, 128 50, 128 38 Z" fill="var(--body-fill)" stroke="var(--body-stroke)" stroke-width="1.2"/>
      <path d="M139 56 C139 56, 142 68, 150 68 C158 68, 161 56, 161 56 Z" fill="var(--body-fill)" stroke="var(--body-stroke)" stroke-width="1"/>

      <!-- Trapezius / Trapézio (Humanized neck connection) -->
      <path data-muscle="trapezio" d="M150 68 C142 68, 134 72, 126 78 C115 82, 108 90, 108 90 C122 100, 138 106, 150 106 C162 106, 178 100, 192 90 C192 90, 185 82, 174 78 C166 72, 158 68, 150 68 Z" fill="var(--body-fill)" stroke="var(--body-stroke)" stroke-width="1"/>

      <!-- Deltoids / Ombros (Posterior sweep) -->
      <path data-muscle="ombros" d="M108 90 C95 95, 84 102, 78 112 C73 120, 73 130, 76 136 C82 136, 88 133, 95 128 C101 118, 105 104, 108 90 Z" fill="var(--body-fill)" stroke="var(--body-stroke)" stroke-width="1.2"/>
      <path data-muscle="ombros" d="M192 90 C205 95, 216 102, 222 112 C227 120, 227 130, 224 136 C218 136, 212 133, 205 128 C199 118, 195 104, 192 90 Z" fill="var(--body-fill)" stroke="var(--body-stroke)" stroke-width="1.2"/>

      <!-- Upper Arms / Triceps (Highly defined posterior arm) -->
      <path data-muscle="triceps" d="M76 136 C72 147, 68 160, 67 170 C66 178, 68 186, 75 186 C80 184, 85 172, 92 154 C92 146, 86 140, 76 136 Z" fill="var(--body-fill)" stroke="var(--body-stroke)" stroke-width="1.2"/>
      <path data-muscle="triceps" d="M224 136 C228 147, 232 160, 233 170 C234 178, 232 186, 225 186 C220 184, 215 172, 208 154 C208 146, 214 140, 224 136 Z" fill="var(--body-fill)" stroke="var(--body-stroke)" stroke-width="1.2"/>

      <!-- Forearms -->
      <path d="M75 186 C66 207, 58 227, 52 247 C50 254, 50 262, 53 266 C58 266, 64 260, 71 247 C75 232, 80 207, 82 184 Z" fill="var(--body-fill)" stroke="var(--body-stroke)" stroke-width="1.2"/>
      <path d="M225 186 C234 207, 242 227, 248 247 C250 254, 250 262, 247 266 C242 266, 236 260, 229 247 C225 232, 220 207, 218 184 Z" fill="var(--body-fill)" stroke="var(--body-stroke)" stroke-width="1.2"/>

      <!-- Hands -->
      <path d="M53 266 C48 274, 47 282, 48 286 C50 288, 54 286, 58 280 L66 262 Z" fill="var(--body-fill)" stroke="var(--body-stroke)" stroke-width="0.8"/>
      <path d="M247 266 C252 274, 253 282, 252 286 C250 288, 246 286, 242 280 L234 262 Z" fill="var(--body-fill)" stroke="var(--body-stroke)" stroke-width="0.8"/>

      <!-- Back / Dorsais (Broad V-Taper back) -->
      <path data-muscle="dorsais" d="M108 90 C122 100, 138 106, 150 106 C162 106, 178 100, 192 90 C186 120, 185 150, 186 182 C174 186, 160 188, 150 188 C140 188, 126 186, 114 182 C115 150, 114 120, 108 90 Z" fill="var(--body-fill)" stroke="var(--body-stroke)" stroke-width="1.2"/>

      <!-- Lower Back / Lombares -->
      <path data-muscle="lombares" d="M114 182 C126 186, 140 188, 150 188 C160 188, 174 186, 186 182 C188 200, 188 215, 188 226 C160 232, 140 234, 150 234 C160 234, 140 232, 112 226 C112 215, 112 200, 114 182 Z" fill="var(--body-fill)" stroke="var(--body-stroke)" stroke-width="1.2"/>

      <!-- Spine line -->
      <line x1="150" y1="106" x2="150" y2="230" stroke="var(--body-stroke)" stroke-width="0.8" opacity="0.4"/>

      <!-- Glutes / Glúteos (Athletic curved shapes) -->
      <path data-muscle="gluteos" d="M112 226 C140 232, 160 234, 150 234 C160 234, 180 232, 188 226 C200 240, 202 250, 200 262 C190 286, 150 290, 150 290 C150 290, 110 286, 100 262 Q100 240 112 226 Z" fill="var(--body-fill)" stroke="var(--body-stroke)" stroke-width="1.2"/>

      <!-- Hamstrings / Isquiotibiais (Back of thighs) -->
      <path data-muscle="isquiotibiais" d="M100 290 C120 293, 125 315, 125 330 C122 348, 120 358, 122 366 C112 370, 102 371, 95 368 C88 332, 90 292, 100 290 Z" fill="var(--body-fill)" stroke="var(--body-stroke)" stroke-width="1.2"/>
      <path data-muscle="isquiotibiais" d="M200 290 C180 293, 175 315, 175 330 C178 348, 180 358, 178 366 C188 370, 198 371, 205 368 C212 332, 210 292, 200 290 Z" fill="var(--body-fill)" stroke="var(--body-stroke)" stroke-width="1.2"/>

      <!-- Knees -->
      <path d="M95 368 C102 370, 115 370, 122 368 C122 374, 115 378, 108 378 C101 378, 95 374, 95 368 Z" fill="var(--body-fill)" stroke="var(--body-stroke)" stroke-width="0.8"/>
      <path d="M178 368 C185 370, 198 370, 205 368 C205 374, 198 378, 192 378 C185 378, 178 374, 178 368 Z" fill="var(--body-fill)" stroke="var(--body-stroke)" stroke-width="0.8"/>

      <!-- Calves / Panturrilhas (Tapered hamstring transition) -->
      <path data-muscle="panturrilhas" d="M95 378 C88 400, 84 425, 88 445 L114 445 C115 420, 122 400, 122 378 Z" fill="var(--body-fill)" stroke="var(--body-stroke)" stroke-width="1.2"/>
      <path data-muscle="panturrilhas" d="M178 378 C185 400, 185 420, 186 445 L212 445 C212 425, 208 400, 205 378 Z" fill="var(--body-fill)" stroke="var(--body-stroke)" stroke-width="1.2"/>

      <!-- Achille tendons (Lower calves) -->
      <path d="M88 445 C90 465, 96 488, 98 494 L114 491 L114 445 Z" fill="var(--body-fill)" stroke="var(--body-stroke)" stroke-width="1" opacity="0.8"/>
      <path d="M212 445 C210 465, 204 488, 202 494 L186 491 L186 445 Z" fill="var(--body-fill)" stroke="var(--body-stroke)" stroke-width="1" opacity="0.8"/>

      <!-- Feet -->
      <path d="M98 494 L80 500 C75 504, 75 508, 78 508 H114 Z" fill="var(--body-fill)" stroke="var(--body-stroke)" stroke-width="0.8"/>
      <path d="M202 494 L220 500 C225 504, 225 508, 222 508 H186 Z" fill="var(--body-fill)" stroke="var(--body-stroke)" stroke-width="0.8"/>
    </svg>`;
  }
};
