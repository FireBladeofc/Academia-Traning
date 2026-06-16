/* ============================================
   FitBody — Exercise Database
   ============================================
   Banco de dados completo com exercícios
   organizados por grupo muscular.
   ============================================ */

// ====================================
// EXERCISE IMAGE MAP
// Maps exercise IDs to their illustration image paths.
// Exercises without an entry here will show a styled SVG placeholder.
// ====================================
const EXERCISE_IMAGES = {
  // Ombros
  'ombros-001': [
    'assets/images/exercises/desenvolvimento_halteres_start.png',
    'assets/images/exercises/desenvolvimento_halteres_end.png'
  ],
  'ombros-002': [
    'assets/images/exercises/elevacao_lateral_start.png',
    'assets/images/exercises/elevacao_lateral_end.png'
  ],
  'ombros-003': 'assets/images/exercises/elevacao_frontal_halteres.png',
  'ombros-004': 'assets/images/exercises/arnold_press.png',
  'ombros-005': 'assets/images/exercises/desenvolvimento_militar.png',
  'ombros-006': 'assets/images/exercises/elevacao_lateral_polia.png',
  'ombros-007': 'assets/images/exercises/crucifixo_inverso.png',
  // Peitoral
  'peitoral-001': [
    'assets/images/exercises/supino_reto_start.png',
    'assets/images/exercises/supino_reto_end.png'
  ],
  'peitoral-002': 'assets/images/exercises/supino_inclinado_halteres.png',
  'peitoral-003': [
    'assets/images/exercises/crucifixo_halteres_start.png',
    'assets/images/exercises/crucifixo_halteres_end.png'
  ],
  'peitoral-004': [
    'assets/images/exercises/crossover_polia_start.png',
    'assets/images/exercises/crossover_polia_end.png'
  ],
  'peitoral-005': 'assets/images/exercises/flexao_de_braco.png',
  'peitoral-006': 'assets/images/exercises/pullover_halter.png',
  // Bíceps
  'biceps-001': [
    'assets/images/exercises/rosca_direta_barra_start.png',
    'assets/images/exercises/rosca_direta_barra_end.png'
  ],
  'biceps-002': 'assets/images/exercises/rosca_alternada.png',
  'biceps-003': 'assets/images/exercises/rosca_martelo.png',
  'biceps-004': 'assets/images/exercises/rosca_scott.png',
  'biceps-005': 'assets/images/exercises/rosca_direta_polia.png',
  'biceps-006': 'assets/images/exercises/rosca_concentrada.png',
  // Abdômen
  'abdomen-001': 'assets/images/exercises/crunch_abdominal.png',
  'abdomen-002': 'assets/images/exercises/prancha_plank.png',
  'abdomen-003': 'assets/images/exercises/elevacao_de_pernas.png',
  'abdomen-004': 'assets/images/exercises/abdominal_bicicleta.png',
  'abdomen-005': 'assets/images/exercises/abdominal_maquina.png',
  // Oblíquos
  'obliquos-001': 'assets/images/exercises/rotacao_russa.png',
  'obliquos-002': 'assets/images/exercises/prancha_lateral.png',
  'obliquos-003': 'assets/images/exercises/inclinacao_lateral_halter.png',
  'obliquos-004': 'assets/images/exercises/woodchop_polia.png',
  // Antebraços
  'antebracos-001': 'assets/images/exercises/rosca_punho.png',
  'antebracos-002': 'assets/images/exercises/rosca_inversa_punho.png',
  'antebracos-003': 'assets/images/exercises/farmers_walk.png',
  // Abdutores
  'abdutores-001': 'assets/images/exercises/abducao_maquina.png',
  'abdutores-002': 'assets/images/exercises/abducao_elastico.png',
  // Adutores
  'adutores-001': 'assets/images/exercises/aducao_maquina.png',
  'adutores-002': 'assets/images/exercises/agachamento_sumo.png',
  // Quadríceps
  'quadriceps-001': [
    'assets/images/exercises/agachamento_livre_start.png',
    'assets/images/exercises/agachamento_livre_end.png'
  ],
  'quadriceps-002': 'assets/images/exercises/leg_press_45.png',
  'quadriceps-003': 'assets/images/exercises/cadeira_extensora.png',
  'quadriceps-004': 'assets/images/exercises/agachamento_frontal.png',
  'quadriceps-005': 'assets/images/exercises/hack_squat.png',
  // Tríceps
  'triceps-001': 'assets/images/exercises/triceps_frances.png',
  'triceps-002': [
    'assets/images/exercises/triceps_corda_start.png',
    'assets/images/exercises/triceps_corda_end.png'
  ],
  'triceps-003': 'assets/images/exercises/mergulho_triceps.png',
  'triceps-004': [
    'assets/images/exercises/triceps_kickback_start.png',
    'assets/images/exercises/triceps_kickback_end.png'
  ],
  'triceps-005': 'assets/images/exercises/triceps_testa_halteres.png',
  'triceps-006': 'assets/images/exercises/triceps_pulley_barra.png',
  'triceps-007': 'assets/images/exercises/mergulho_banco.png',
  // Trapézio
  'trapezio-001': 'assets/images/exercises/encolhimento_halteres.png',
  'trapezio-002': 'assets/images/exercises/encolhimento_barra.png',
  'trapezio-003': 'assets/images/exercises/remada_alta.png',
  // Dorsais
  'dorsais-001': [
    'assets/images/exercises/puxada_frontal_start.png',
    'assets/images/exercises/puxada_frontal_end.png'
  ],
  'dorsais-002': 'assets/images/exercises/remada_curvada.png',
  'dorsais-003': 'assets/images/exercises/remada_unilateral_halter.png',
  'dorsais-004': 'assets/images/exercises/barra_fixa_pullup.png',
  'dorsais-005': 'assets/images/exercises/pulldown_pegada_fechada.png',
  'dorsais-006': 'assets/images/exercises/remada_baixa_polia.png',
  'dorsais-007': 'assets/images/exercises/pulldown_polia.png',
  // Lombares
  'lombares-001': 'assets/images/exercises/hiperextensao.png',
  'lombares-002': 'assets/images/exercises/good_morning.png',
  'lombares-003': 'assets/images/exercises/stiff_barra.png',
  // Glúteos
  'gluteos-001': 'assets/images/exercises/hip_thrust.png',
  'gluteos-002': 'assets/images/exercises/gluteo_maquina_coice.png',
  'gluteos-003': 'assets/images/exercises/ponte_gluteos.png',
  'gluteos-004': 'assets/images/exercises/agachamento_bulgaro.png',
  'gluteos-005': 'assets/images/exercises/avanco_lunge.png',
  // Isquiotibiais
  'isquiotibiais-001': 'assets/images/exercises/mesa_flexora.png',
  'isquiotibiais-002': 'assets/images/exercises/cadeira_flexora.png',
  'isquiotibiais-003': 'assets/images/exercises/stiff_halteres.png',
  // Panturrilhas
  'panturrilhas-001': 'assets/images/exercises/panturrilha_pe.png',
  'panturrilhas-003': 'assets/images/exercises/panturrilha_leg_press.png',
  // Cardio
  'cardio-001': 'assets/images/exercises/cardio_esteira.png',
  // === SMITH MACHINE & NOVOS ===
  'peitoral-007': 'assets/images/exercises/supino_smith_reto.png',
  'peitoral-008': 'assets/images/exercises/supino_smith_inclinado.png',
  'quadriceps-006': 'assets/images/exercises/agachamento_smith.png',
  'gluteos-006': 'assets/images/exercises/afundo_halteres.png',
  'ombros-008': 'assets/images/exercises/desenvolvimento_smith.png',
  'ombros-009': 'assets/images/exercises/crucifixo_inverso_polia.png',
  'dorsais-008': 'assets/images/exercises/remada_baixa_maquina.png',
  'dorsais-009': 'assets/images/exercises/puxada_alta_polia.png',
  'triceps-008': 'assets/images/exercises/triceps_frances_halter.png',
};

/**
 * Get the image path for an exercise, or null if none exists.
 */
function getExerciseImage(exerciseId) {
  return EXERCISE_IMAGES[exerciseId] || null;
}

const MUSCLE_GROUPS = {
  // === VISTA FRONTAL ===
  ombros: {
    id: 'ombros',
    name: 'Ombros',
    nameEn: 'Shoulders',
    emoji: '🏋️',
    view: 'front',
    color: '#E8944C'
  },
  peitoral: {
    id: 'peitoral',
    name: 'Peitoral',
    nameEn: 'Chest',
    emoji: '💪',
    view: 'front',
    color: '#F0A865'
  },
  biceps: {
    id: 'biceps',
    name: 'Bíceps',
    nameEn: 'Biceps',
    emoji: '💪',
    view: 'front',
    color: '#D4793A'
  },
  abdomen: {
    id: 'abdomen',
    name: 'Abdômen',
    nameEn: 'Abs',
    emoji: '🔥',
    view: 'front',
    color: '#E8944C'
  },
  obliquos: {
    id: 'obliquos',
    name: 'Oblíquos',
    nameEn: 'Obliques',
    emoji: '🔥',
    view: 'front',
    color: '#D4793A'
  },
  antebracos: {
    id: 'antebracos',
    name: 'Antebraços',
    nameEn: 'Forearms',
    emoji: '✊',
    view: 'front',
    color: '#F0A865'
  },
  abdutores: {
    id: 'abdutores',
    name: 'Abdutores',
    nameEn: 'Abductors',
    emoji: '🦵',
    view: 'front',
    color: '#E8944C'
  },
  adutores: {
    id: 'adutores',
    name: 'Adutores',
    nameEn: 'Adductors',
    emoji: '🦵',
    view: 'front',
    color: '#D4793A'
  },
  quadriceps: {
    id: 'quadriceps',
    name: 'Quadríceps',
    nameEn: 'Quadriceps',
    emoji: '🦵',
    view: 'front',
    color: '#F0A865'
  },

  // === VISTA POSTERIOR ===
  trapezio: {
    id: 'trapezio',
    name: 'Trapézio',
    nameEn: 'Trapezius',
    emoji: '🏋️',
    view: 'back',
    color: '#E8944C'
  },
  triceps: {
    id: 'triceps',
    name: 'Tríceps',
    nameEn: 'Triceps',
    emoji: '💪',
    view: 'back',
    color: '#D4793A'
  },
  dorsais: {
    id: 'dorsais',
    name: 'Dorsais',
    nameEn: 'Lats',
    emoji: '🦅',
    view: 'back',
    color: '#F0A865'
  },
  lombares: {
    id: 'lombares',
    name: 'Lombares',
    nameEn: 'Lower Back',
    emoji: '🔙',
    view: 'back',
    color: '#E8944C'
  },
  gluteos: {
    id: 'gluteos',
    name: 'Glúteos',
    nameEn: 'Glutes',
    emoji: '🍑',
    view: 'back',
    color: '#D4793A'
  },
  isquiotibiais: {
    id: 'isquiotibiais',
    name: 'Isquiotibiais',
    nameEn: 'Hamstrings',
    emoji: '🦵',
    view: 'back',
    color: '#F0A865'
  },
  panturrilhas: {
    id: 'panturrilhas',
    name: 'Panturrilhas',
    nameEn: 'Calves',
    emoji: '🦶',
    view: 'back',
    color: '#E8944C'
  },

  // === GERAL ===
  cardio: {
    id: 'cardio',
    name: 'Cardio',
    nameEn: 'Cardio',
    emoji: '❤️',
    view: 'both',
    color: '#F87171'
  }
};

// Equipment types
const EQUIPMENT = {
  halteres: 'Halteres',
  barra: 'Barra',
  maquina: 'Máquina',
  polia: 'Polia/Cabo',
  peso_corporal: 'Peso Corporal',
  elastico: 'Elástico',
  kettlebell: 'Kettlebell',
  banco: 'Banco',
  bola: 'Bola',
  nenhum: 'Nenhum'
};

// Difficulty levels
const DIFFICULTY = {
  beginner: { label: 'Iniciante', class: 'badge-beginner' },
  intermediate: { label: 'Intermediário', class: 'badge-intermediate' },
  advanced: { label: 'Avançado', class: 'badge-advanced' }
};

// ====================================
// EXERCISE DATABASE
// ====================================
const EXERCISES = [

  // ========== OMBROS ==========
  {
    id: 'ombros-001',
    name: 'Desenvolvimento com Halteres',
    muscleGroup: 'ombros',
    secondaryMuscles: ['triceps'],
    equipment: 'halteres',
    difficulty: 'beginner',
    emoji: '🏋️',
    image: 'assets/images/exercises/desenvolvimento_halteres.png',
    instructions: [
      'Sente-se em um banco com encosto a 90 graus, segurando um halter em cada mão na altura dos ombros.',
      'Com as palmas viradas para frente, empurre os halteres para cima até estender completamente os braços.',
      'Faça uma breve pausa no topo e desça controladamente até a posição inicial.',
      'Mantenha o core ativado durante todo o movimento.'
    ],
    tips: 'Não trave os cotovelos completamente no topo. Mantenha os punhos alinhados com os ombros.'
  },
  {
    id: 'ombros-002',
    name: 'Elevação Lateral',
    muscleGroup: 'ombros',
    secondaryMuscles: ['trapezio'],
    equipment: 'halteres',
    difficulty: 'beginner',
    emoji: '🏋️',
    image: 'assets/images/exercises/elevacao_lateral.png',
    instructions: [
      'Em pé, segure um halter em cada mão ao lado do corpo com as palmas voltadas para dentro.',
      'Mantendo uma leve flexão nos cotovelos, eleve os braços lateralmente até a altura dos ombros.',
      'Faça uma breve pausa no topo, sentindo a contração do deltóide lateral.',
      'Desça lentamente até a posição inicial.'
    ],
    tips: 'Não balance o corpo. Use um peso que permita controle total do movimento.'
  },
  {
    id: 'ombros-003',
    name: 'Elevação Frontal',
    muscleGroup: 'ombros',
    secondaryMuscles: ['peitoral'],
    equipment: 'halteres',
    difficulty: 'beginner',
    emoji: '🏋️',
    instructions: [
      'Em pé, segure os halteres à frente das coxas com as palmas viradas para trás.',
      'Eleve os braços à frente do corpo até a altura dos ombros.',
      'Mantenha os cotovelos levemente flexionados durante o movimento.',
      'Retorne lentamente à posição inicial.'
    ],
    tips: 'Alterne os braços ou faça bilateral. Evite usar impulso do corpo.'
  },
  {
    id: 'ombros-004',
    name: 'Arnold Press',
    muscleGroup: 'ombros',
    secondaryMuscles: ['triceps'],
    equipment: 'halteres',
    difficulty: 'intermediate',
    emoji: '🏋️',
    instructions: [
      'Sente-se em um banco com encosto, segurando os halteres na frente do peito com as palmas viradas para você.',
      'Gire os halteres para fora enquanto empurra para cima, terminando com as palmas viradas para frente.',
      'Estenda os braços completamente no topo.',
      'Reverta o movimento ao descer, girando as palmas de volta para você.'
    ],
    tips: 'Movimento criado por Arnold Schwarzenegger. Foque na rotação suave e controlada.'
  },
  {
    id: 'ombros-005',
    name: 'Desenvolvimento Militar (Barra)',
    muscleGroup: 'ombros',
    secondaryMuscles: ['triceps', 'trapezio'],
    equipment: 'barra',
    difficulty: 'intermediate',
    emoji: '🏋️',
    instructions: [
      'Em pé, segure a barra na largura dos ombros, apoiada na parte frontal dos deltóides.',
      'Empurre a barra para cima, passando próximo ao rosto, até estender os braços.',
      'Faça uma pausa no topo e desça a barra controladamente até os ombros.',
      'Mantenha o core contraído e os pés firmes no chão.'
    ],
    tips: 'Excelente exercício composto. Mantenha o corpo estável, evitando inclinar para trás.'
  },
  {
    id: 'ombros-006',
    name: 'Elevação Lateral na Polia',
    muscleGroup: 'ombros',
    secondaryMuscles: ['trapezio'],
    equipment: 'polia',
    difficulty: 'intermediate',
    emoji: '🏋️',
    instructions: [
      'Posicione-se ao lado da polia baixa, segurando o cabo com a mão mais distante.',
      'Com uma leve flexão no cotovelo, eleve o braço lateralmente até a altura do ombro.',
      'Segure por um segundo na posição mais alta.',
      'Retorne lentamente e repita. Troque de lado ao finalizar a série.'
    ],
    tips: 'A polia oferece tensão constante durante todo o arco de movimento.'
  },
  {
    id: 'ombros-007',
    name: 'Crucifixo Inverso',
    muscleGroup: 'ombros',
    secondaryMuscles: ['trapezio', 'dorsais'],
    equipment: 'halteres',
    difficulty: 'intermediate',
    emoji: '🏋️',
    instructions: [
      'Incline o tronco para a frente a partir dos quadris, mantendo as costas retas e o peito aberto.',
      'Segure os halteres abaixo do peito com os braços apontando para baixo e cotovelos levemente flexionados.',
      'Eleve os halteres para os lados até que os braços fiquem paralelos ao chão, contraindo a parte traseira dos ombros.',
      'Desça os pesos de volta à posição inicial com controle.'
    ],
    tips: 'Foque em juntar as escápulas no topo e evite usar impulso para levantar os pesos.'
  },


  // ========== PEITORAL ==========
  {
    id: 'peitoral-001',
    name: 'Supino Reto com Barra',
    muscleGroup: 'peitoral',
    secondaryMuscles: ['triceps', 'ombros'],
    equipment: 'barra',
    difficulty: 'beginner',
    emoji: '🏋️',
    instructions: [
      'Deite-se no banco reto com os pés firmes no chão. Agarre a barra na largura um pouco maior que os ombros.',
      'Retire a barra do suporte com os braços estendidos acima do peito.',
      'Desça a barra controladamente até tocar levemente o meio do peito.',
      'Empurre a barra de volta à posição inicial, contraindo o peitoral.'
    ],
    tips: 'Mantenha as escápulas retraídas e o peito aberto. Não rebata a barra no peito.'
  },
  {
    id: 'peitoral-002',
    name: 'Supino Inclinado com Halteres',
    muscleGroup: 'peitoral',
    secondaryMuscles: ['ombros', 'triceps'],
    equipment: 'halteres',
    difficulty: 'beginner',
    emoji: '🏋️',
    instructions: [
      'Ajuste o banco a 30-45 graus. Deite-se segurando um halter em cada mão na altura do peito.',
      'Empurre os halteres para cima, estendendo os braços sem travar os cotovelos.',
      'Desça os halteres até sentir um alongamento no peito superior.',
      'Repita o movimento mantendo o controle.'
    ],
    tips: 'Foca na parte superior (clavicular) do peitoral. Não exagere no ângulo do banco.'
  },
  {
    id: 'peitoral-003',
    name: 'Crucifixo com Halteres',
    muscleGroup: 'peitoral',
    secondaryMuscles: ['ombros'],
    equipment: 'halteres',
    difficulty: 'intermediate',
    emoji: '🏋️',
    instructions: [
      'Deite-se no banco reto segurando halteres com os braços estendidos acima do peito.',
      'Com uma leve flexão nos cotovelos, abra os braços lateralmente em arco.',
      'Desça até sentir o alongamento no peitoral (braços paralelos ao chão).',
      'Traga os halteres de volta à posição inicial, apertando o peitoral.'
    ],
    tips: 'Movimento de isolamento. Use peso moderado e foque na contração.'
  },
  {
    id: 'peitoral-004',
    name: 'Crossover (Polia Alta)',
    muscleGroup: 'peitoral',
    secondaryMuscles: ['ombros'],
    equipment: 'polia',
    difficulty: 'intermediate',
    emoji: '🏋️',
    instructions: [
      'Posicione-se entre duas polias altas, segurando um cabo em cada mão.',
      'Dê um passo à frente e incline levemente o tronco.',
      'Traga as mãos para baixo e para frente, cruzando-as à frente do corpo.',
      'Retorne lentamente à posição inicial com os braços abertos.'
    ],
    tips: 'Excelente para definição. Varie a altura das polias para diferentes ângulos.'
  },
  {
    id: 'peitoral-005',
    name: 'Flexão de Braço',
    muscleGroup: 'peitoral',
    secondaryMuscles: ['triceps', 'ombros', 'abdomen'],
    equipment: 'peso_corporal',
    difficulty: 'beginner',
    emoji: '💪',
    instructions: [
      'Posicione-se em prancha com as mãos um pouco mais afastadas que os ombros.',
      'Desça o corpo flexionando os cotovelos até o peito quase tocar o chão.',
      'Empurre o corpo de volta à posição inicial, estendendo os braços.',
      'Mantenha o corpo reto como uma tábua durante todo o movimento.'
    ],
    tips: 'Exercício fundamental. Varie a posição das mãos para enfatizar diferentes partes do peito.'
  },
  {
    id: 'peitoral-006',
    name: 'Pullover com Halter',
    muscleGroup: 'peitoral',
    secondaryMuscles: ['dorsais', 'triceps'],
    equipment: 'halteres',
    difficulty: 'intermediate',
    emoji: '🏋️',
    instructions: [
      'Deite-se transversalmente no banco, apoiando apenas a parte superior das costas.',
      'Segure um halter com ambas as mãos acima do peito, braços levemente flexionados.',
      'Leve o halter para trás da cabeça em arco, sentindo o alongamento.',
      'Retorne à posição inicial contraindo o peitoral.'
    ],
    tips: 'Trabalha peitoral e dorsal simultaneamente. Não desça demais para evitar lesões.'
  },

  // ========== BÍCEPS ==========
  {
    id: 'biceps-001',
    name: 'Rosca Direta (Barra)',
    muscleGroup: 'biceps',
    secondaryMuscles: ['antebracos'],
    equipment: 'barra',
    difficulty: 'beginner',
    emoji: '💪',
    instructions: [
      'Em pé, segure a barra com as palmas viradas para cima, mãos na largura dos ombros.',
      'Mantendo os cotovelos junto ao corpo, flexione os braços levantando a barra.',
      'Contraia o bíceps no topo do movimento.',
      'Desça a barra controladamente até a extensão completa.'
    ],
    tips: 'Evite balançar o corpo. Mantenha os cotovelos fixos.'
  },
  {
    id: 'biceps-002',
    name: 'Rosca Alternada (Halteres)',
    muscleGroup: 'biceps',
    secondaryMuscles: ['antebracos'],
    equipment: 'halteres',
    difficulty: 'beginner',
    emoji: '💪',
    instructions: [
      'Em pé, segure um halter em cada mão com os braços ao lado do corpo.',
      'Flexione um braço de cada vez, girando o punho para cima (supinação).',
      'Contraia o bíceps no topo e desça controladamente.',
      'Alterne os braços a cada repetição.'
    ],
    tips: 'A supinação (giro do punho) ativa mais fibras do bíceps.'
  },
  {
    id: 'biceps-003',
    name: 'Rosca Martelo (Halteres)',
    muscleGroup: 'biceps',
    secondaryMuscles: ['antebracos'],
    equipment: 'halteres',
    difficulty: 'beginner',
    emoji: '💪',
    instructions: [
      'Em pé, segure os halteres com as palmas voltadas uma para a outra (pegada neutra).',
      'Flexione os braços mantendo as palmas na mesma posição o tempo todo.',
      'Contraia no topo e desça lentamente.',
      'Pode fazer simultâneo ou alternado.'
    ],
    tips: 'Trabalha o braquial e braquiorradial além do bíceps. Ótimo para volume do braço.'
  },
  {
    id: 'biceps-004',
    name: 'Rosca Scott (Máquina)',
    muscleGroup: 'biceps',
    secondaryMuscles: ['antebracos'],
    equipment: 'maquina',
    difficulty: 'beginner',
    emoji: '💪',
    instructions: [
      'Sente-se na máquina Scott com os braços apoiados no pad inclinado.',
      'Segure a barra ou as alças com as palmas para cima.',
      'Flexione os braços trazendo o peso em direção aos ombros.',
      'Desça lentamente até a extensão quase completa (não trave).'
    ],
    tips: 'Isola muito bem o bíceps. Não estenda completamente para proteger os cotovelos.'
  },
  {
    id: 'biceps-005',
    name: 'Rosca Direta na Polia',
    muscleGroup: 'biceps',
    secondaryMuscles: ['antebracos'],
    equipment: 'polia',
    difficulty: 'beginner',
    emoji: '💪',
    instructions: [
      'Em pé diante da polia baixa, segure a barra reta com pegada supinada.',
      'Flexione os braços trazendo a barra em direção aos ombros.',
      'Mantenha os cotovelos fixos ao lado do corpo.',
      'Desça controladamente aproveitando a tensão constante.'
    ],
    tips: 'A polia mantém tensão constante, diferente dos halteres.'
  },
  {
    id: 'biceps-006',
    name: 'Rosca Concentrada',
    muscleGroup: 'biceps',
    secondaryMuscles: [],
    equipment: 'halteres',
    difficulty: 'intermediate',
    emoji: '💪',
    instructions: [
      'Sente-se em um banco com as pernas afastadas. Apoie o cotovelo na parte interna da coxa.',
      'Segure um halter com a palma virada para cima.',
      'Flexione o braço trazendo o halter em direção ao ombro.',
      'Desça lentamente sentindo o alongamento completo do bíceps.'
    ],
    tips: 'Máximo isolamento do bíceps. Foque na contração e controle.'
  },

  // ========== ABDÔMEN ==========
  {
    id: 'abdomen-001',
    name: 'Crunch Abdominal',
    muscleGroup: 'abdomen',
    secondaryMuscles: [],
    equipment: 'peso_corporal',
    difficulty: 'beginner',
    emoji: '🔥',
    instructions: [
      'Deite-se de costas com os joelhos flexionados e os pés apoiados no chão.',
      'Coloque as mãos atrás da cabeça (sem puxar o pescoço).',
      'Eleve os ombros do chão contraindo o abdômen.',
      'Desça controladamente sem encostar completamente os ombros.'
    ],
    tips: 'Foque em contrair o abdômen, não em levantar o tronco. Qualidade > quantidade.'
  },
  {
    id: 'abdomen-002',
    name: 'Prancha (Plank)',
    muscleGroup: 'abdomen',
    secondaryMuscles: ['obliquos', 'lombares'],
    equipment: 'peso_corporal',
    difficulty: 'beginner',
    emoji: '🔥',
    instructions: [
      'Apoie-se nos antebraços e pontas dos pés, mantendo o corpo reto.',
      'Contraia o abdômen e os glúteos para manter o alinhamento.',
      'Mantenha a posição pelo tempo desejado (30s a 2min).',
      'Respire normalmente, não prenda a respiração.'
    ],
    tips: 'Exercício isométrico fundamental. Não deixe o quadril subir ou descer.'
  },
  {
    id: 'abdomen-003',
    name: 'Elevação de Pernas',
    muscleGroup: 'abdomen',
    secondaryMuscles: [],
    equipment: 'peso_corporal',
    difficulty: 'intermediate',
    emoji: '🔥',
    instructions: [
      'Deite-se de costas com as mãos sob os glúteos ou ao lado do corpo.',
      'Com as pernas estendidas, eleve-as até formar 90 graus com o tronco.',
      'Desça as pernas lentamente sem tocar o chão.',
      'Repita mantendo a lombar pressionada contra o chão.'
    ],
    tips: 'Foca no abdômen inferior. Flexione os joelhos se for muito difícil.'
  },
  {
    id: 'abdomen-004',
    name: 'Bicicleta (Bicycle Crunch)',
    muscleGroup: 'abdomen',
    secondaryMuscles: ['obliquos'],
    equipment: 'peso_corporal',
    difficulty: 'intermediate',
    emoji: '🔥',
    instructions: [
      'Deite-se de costas, mãos atrás da cabeça, pernas elevadas.',
      'Traga o joelho direito em direção ao peito enquanto gira o tronco levando o cotovelo esquerdo ao joelho.',
      'Alterne os lados em movimento de pedalada.',
      'Mantenha os ombros elevados durante todo o exercício.'
    ],
    tips: 'Considerado um dos melhores exercícios para abdômen e oblíquos combinados.'
  },
  {
    id: 'abdomen-005',
    name: 'Abdominal na Máquina',
    muscleGroup: 'abdomen',
    secondaryMuscles: [],
    equipment: 'maquina',
    difficulty: 'beginner',
    emoji: '🔥',
    instructions: [
      'Sente-se na máquina abdominal, ajustando a altura do apoio.',
      'Segure as alças ou posicione os ombros sob as almofadas.',
      'Contraia o abdômen flexionando o tronco para frente.',
      'Retorne lentamente à posição inicial.'
    ],
    tips: 'Bom para iniciantes. A máquina guia o movimento e permite progressão de carga.'
  },

  // ========== OBLÍQUOS ==========
  {
    id: 'obliquos-001',
    name: 'Rotação Russa (Russian Twist)',
    muscleGroup: 'obliquos',
    secondaryMuscles: ['abdomen'],
    equipment: 'peso_corporal',
    difficulty: 'intermediate',
    emoji: '🔥',
    instructions: [
      'Sente-se no chão com os joelhos flexionados e pés elevados.',
      'Incline o tronco levemente para trás mantendo a coluna reta.',
      'Gire o tronco para a direita tocando o chão ao lado do quadril.',
      'Gire para a esquerda. Uma rotação completa (direita + esquerda) = 1 repetição.'
    ],
    tips: 'Pode usar uma anilha ou medicine ball para aumentar a dificuldade.'
  },
  {
    id: 'obliquos-002',
    name: 'Prancha Lateral',
    muscleGroup: 'obliquos',
    secondaryMuscles: ['abdomen', 'ombros'],
    equipment: 'peso_corporal',
    difficulty: 'intermediate',
    emoji: '🔥',
    instructions: [
      'Deite-se de lado, apoiando-se no antebraço com o cotovelo alinhado ao ombro.',
      'Eleve o quadril do chão, formando uma linha reta dos pés à cabeça.',
      'Mantenha a posição pelo tempo desejado.',
      'Troque de lado e repita.'
    ],
    tips: 'Ative os oblíquos e o core lateral. Pode elevar a perna de cima para mais desafio.'
  },
  {
    id: 'obliquos-003',
    name: 'Inclinação Lateral com Halter',
    muscleGroup: 'obliquos',
    secondaryMuscles: [],
    equipment: 'halteres',
    difficulty: 'beginner',
    emoji: '🔥',
    instructions: [
      'Em pé, segure um halter em uma mão ao lado do corpo.',
      'Incline o tronco lateralmente para o lado do halter.',
      'Retorne à posição ereta contraindo o oblíquo oposto.',
      'Complete as repetições de um lado antes de trocar.'
    ],
    tips: 'Segure o halter apenas de um lado. Não use dois halteres simultâneos.'
  },
  {
    id: 'obliquos-004',
    name: 'Woodchop (Polia)',
    muscleGroup: 'obliquos',
    secondaryMuscles: ['abdomen', 'ombros'],
    equipment: 'polia',
    difficulty: 'intermediate',
    emoji: '🔥',
    instructions: [
      'Posicione a polia na posição alta. Fique de lado para a máquina.',
      'Segure a alça com ambas as mãos acima do ombro mais próximo.',
      'Puxe a alça diagonalmente para baixo, girando o tronco.',
      'Retorne controladamente. Complete as repetições e troque de lado.'
    ],
    tips: 'Imita o movimento de cortar lenha. Excelente para rotação do core.'
  },

  // ========== ANTEBRAÇOS ==========
  {
    id: 'antebracos-001',
    name: 'Rosca de Punho',
    muscleGroup: 'antebracos',
    secondaryMuscles: [],
    equipment: 'barra',
    difficulty: 'beginner',
    emoji: '✊',
    instructions: [
      'Sente-se em um banco com os antebraços apoiados nas coxas, punhos para fora.',
      'Segure a barra com pegada supinada (palmas para cima).',
      'Flexione os punhos levantando a barra o mais alto possível.',
      'Desça lentamente até a extensão completa do punho.'
    ],
    tips: 'Use peso leve e foque na contração. Trabalha os flexores do antebraço.'
  },
  {
    id: 'antebracos-002',
    name: 'Rosca Inversa de Punho',
    muscleGroup: 'antebracos',
    secondaryMuscles: [],
    equipment: 'barra',
    difficulty: 'beginner',
    emoji: '✊',
    instructions: [
      'Mesma posição da rosca de punho, mas com pegada pronada (palmas para baixo).',
      'Estenda os punhos levantando a barra.',
      'Desça controladamente.',
      'Repita por 12-15 repetições.'
    ],
    tips: 'Trabalha os extensores do antebraço. Importante para equilíbrio muscular.'
  },
  {
    id: 'antebracos-003',
    name: "Farmer's Walk",
    muscleGroup: 'antebracos',
    secondaryMuscles: ['trapezio', 'abdomen'],
    equipment: 'halteres',
    difficulty: 'beginner',
    emoji: '✊',
    instructions: [
      'Segure um halter pesado em cada mão ao lado do corpo.',
      'Mantenha a postura ereta, ombros para trás.',
      'Caminhe em linha reta por uma distância ou tempo determinado.',
      'Mantenha a pegada firme durante todo o percurso.'
    ],
    tips: 'Excelente para força de pegada, core e estabilidade geral.'
  },

  // ========== ABDUTORES ==========
  {
    id: 'abdutores-001',
    name: 'Abdução na Máquina',
    muscleGroup: 'abdutores',
    secondaryMuscles: ['gluteos'],
    equipment: 'maquina',
    difficulty: 'beginner',
    emoji: '🦵',
    instructions: [
      'Sente-se na máquina de abdução com as pernas nos apoios.',
      'Ajuste o peso desejado.',
      'Abra as pernas empurrando contra as almofadas.',
      'Retorne controladamente à posição inicial.'
    ],
    tips: 'Foque na contração do glúteo médio. Não use impulso.'
  },
  {
    id: 'abdutores-002',
    name: 'Abdução com Elástico',
    muscleGroup: 'abdutores',
    secondaryMuscles: ['gluteos'],
    equipment: 'elastico',
    difficulty: 'beginner',
    emoji: '🦵',
    instructions: [
      'Coloque a minibanda elástica acima dos joelhos.',
      'Em pé ou deitado de lado, afaste a perna contra a resistência.',
      'Mantenha o controle durante todo o movimento.',
      'Retorne lentamente e repita.'
    ],
    tips: 'Ótimo para aquecimento e ativação glútea antes de agachamentos.'
  },

  // ========== ADUTORES ==========
  {
    id: 'adutores-001',
    name: 'Adução na Máquina',
    muscleGroup: 'adutores',
    secondaryMuscles: [],
    equipment: 'maquina',
    difficulty: 'beginner',
    emoji: '🦵',
    instructions: [
      'Sente-se na máquina de adução com as pernas nos apoios.',
      'Ajuste o peso desejado.',
      'Feche as pernas apertando contra as almofadas.',
      'Retorne controladamente à posição inicial.'
    ],
    tips: 'Importante para estabilidade do joelho e equilíbrio muscular das coxas.'
  },
  {
    id: 'adutores-002',
    name: 'Agachamento Sumô',
    muscleGroup: 'adutores',
    secondaryMuscles: ['quadriceps', 'gluteos'],
    equipment: 'halteres',
    difficulty: 'beginner',
    emoji: '🦵',
    instructions: [
      'Fique em pé com os pés bem afastados e pontas dos pés apontando para fora.',
      'Segure um halter ou kettlebell com ambas as mãos à frente do corpo.',
      'Agache flexionando os joelhos para fora, mantendo o tronco ereto.',
      'Desça até as coxas ficarem paralelas ao chão e suba contraindo os adutores.'
    ],
    tips: 'A abertura ampla enfatiza adutores e glúteos.'
  },

  // ========== QUADRÍCEPS ==========
  {
    id: 'quadriceps-001',
    name: 'Agachamento Livre',
    muscleGroup: 'quadriceps',
    secondaryMuscles: ['gluteos', 'lombares', 'abdomen'],
    equipment: 'barra',
    difficulty: 'intermediate',
    emoji: '🦵',
    instructions: [
      'Posicione a barra sobre os trapézios (parte alta das costas).',
      'Pés na largura dos ombros, pontas levemente viradas para fora.',
      'Agache flexionando os joelhos e quadris até as coxas ficarem paralelas ao chão.',
      'Empurre o chão com os pés para retornar à posição em pé.'
    ],
    tips: 'Rei dos exercícios. Mantenha o peito aberto e joelhos alinhados com os pés.'
  },
  {
    id: 'quadriceps-002',
    name: 'Leg Press 45°',
    muscleGroup: 'quadriceps',
    secondaryMuscles: ['gluteos'],
    equipment: 'maquina',
    difficulty: 'beginner',
    emoji: '🦵',
    instructions: [
      'Sente-se na máquina com as costas apoiadas e pés na plataforma.',
      'Destrave a plataforma e flexione os joelhos, descendo controladamente.',
      'Desça até os joelhos formarem aproximadamente 90 graus.',
      'Empurre a plataforma de volta estendendo as pernas (sem travar).'
    ],
    tips: 'Posição dos pés altera o foco: mais alto = mais glúteo, mais baixo = mais quadríceps.'
  },
  {
    id: 'quadriceps-003',
    name: 'Cadeira Extensora',
    muscleGroup: 'quadriceps',
    secondaryMuscles: [],
    equipment: 'maquina',
    difficulty: 'beginner',
    emoji: '🦵',
    instructions: [
      'Sente-se na máquina com as costas apoiadas e a almofada sobre os tornozelos.',
      'Estenda as pernas completamente contraindo o quadríceps.',
      'Faça uma pausa no topo sentindo a contração.',
      'Desça lentamente à posição inicial.'
    ],
    tips: 'Exercício de isolamento do quadríceps. Ótimo para finalização do treino de pernas.'
  },
  {
    id: 'quadriceps-004',
    name: 'Agachamento Frontal',
    muscleGroup: 'quadriceps',
    secondaryMuscles: ['gluteos', 'abdomen'],
    equipment: 'barra',
    difficulty: 'advanced',
    emoji: '🦵',
    instructions: [
      'Posicione a barra na parte frontal dos deltóides, cruzando os braços ou em pegada de arranco.',
      'Mantenha os cotovelos altos e o tronco o mais vertical possível.',
      'Agache profundamente, mantendo os joelhos à frente.',
      'Suba de volta mantendo o core contraído.'
    ],
    tips: 'Mais foco no quadríceps que o agachamento tradicional. Exige boa mobilidade.'
  },
  {
    id: 'quadriceps-005',
    name: 'Hack Squat',
    muscleGroup: 'quadriceps',
    secondaryMuscles: ['gluteos'],
    equipment: 'maquina',
    difficulty: 'intermediate',
    emoji: '🦵',
    instructions: [
      'Posicione-se na máquina de hack com os ombros nos apoios.',
      'Pés na largura dos ombros, levemente à frente do corpo.',
      'Destrave e desça flexionando os joelhos até 90 graus.',
      'Empurre para cima e repita.'
    ],
    tips: 'Simula o agachamento com mais segurança e isolamento do quadríceps.'
  },

  // ========== TRAPÉZIO ==========
  {
    id: 'trapezio-001',
    name: 'Encolhimento com Halteres',
    muscleGroup: 'trapezio',
    secondaryMuscles: [],
    equipment: 'halteres',
    difficulty: 'beginner',
    emoji: '🏋️',
    instructions: [
      'Em pé, segure um halter pesado em cada mão ao lado do corpo.',
      'Eleve os ombros em direção às orelhas (movimento de "encolher").',
      'Segure a contração por 1-2 segundos no topo.',
      'Desça os ombros lentamente à posição natural.'
    ],
    tips: 'Não gire os ombros. Movimento é reto para cima e para baixo.'
  },
  {
    id: 'trapezio-002',
    name: 'Encolhimento na Barra',
    muscleGroup: 'trapezio',
    secondaryMuscles: [],
    equipment: 'barra',
    difficulty: 'beginner',
    emoji: '🏋️',
    instructions: [
      'Em pé, segure a barra à frente do corpo com pegada pronada, braços estendidos.',
      'Eleve os ombros o mais alto possível.',
      'Segure a contração no topo.',
      'Desça controladamente.'
    ],
    tips: 'Permite usar mais carga que halteres. Mantenha os braços estendidos.'
  },
  {
    id: 'trapezio-003',
    name: 'Remada Alta',
    muscleGroup: 'trapezio',
    secondaryMuscles: ['ombros'],
    equipment: 'barra',
    difficulty: 'intermediate',
    emoji: '🏋️',
    instructions: [
      'Em pé, segure a barra com pegada fechada (mãos próximas) à frente do corpo.',
      'Puxe a barra para cima ao longo do corpo até a altura do queixo.',
      'Os cotovelos devem ficar acima dos punhos no topo.',
      'Desça a barra lentamente.'
    ],
    tips: 'Cuidado com peso excessivo. Pode ser feito com halteres também.'
  },

  // ========== TRÍCEPS ==========
  {
    id: 'triceps-001',
    name: 'Tríceps Francês (Testa)',
    muscleGroup: 'triceps',
    secondaryMuscles: [],
    equipment: 'barra',
    difficulty: 'intermediate',
    emoji: '💪',
    instructions: [
      'Deite-se no banco reto segurando a barra W com os braços estendidos.',
      'Flexione os cotovelos, descendo a barra em direção à testa.',
      'Mantenha os braços superiores perpendiculares ao chão.',
      'Estenda os cotovelos retornando à posição inicial.'
    ],
    tips: 'Use barra W para menos estresse nos punhos. Mantenha os cotovelos apontando para cima.'
  },
  {
    id: 'triceps-002',
    name: 'Tríceps Corda (Polia)',
    muscleGroup: 'triceps',
    secondaryMuscles: [],
    equipment: 'polia',
    difficulty: 'beginner',
    emoji: '💪',
    instructions: [
      'Em pé diante da polia alta, segure a corda com ambas as mãos.',
      'Mantendo os cotovelos junto ao corpo, estenda os braços para baixo.',
      'No final do movimento, abra as mãos para fora para máxima contração.',
      'Retorne lentamente à posição inicial.'
    ],
    tips: 'Abrir a corda nas pontas (spread) aumenta a ativação do tríceps.'
  },
  {
    id: 'triceps-003',
    name: 'Mergulho (Dips)',
    muscleGroup: 'triceps',
    secondaryMuscles: ['peitoral', 'ombros'],
    equipment: 'peso_corporal',
    difficulty: 'intermediate',
    emoji: '💪',
    instructions: [
      'Apoie-se nas barras paralelas com os braços estendidos.',
      'Flexione os cotovelos, descendo o corpo controladamente.',
      'Desça até os braços formarem 90 graus.',
      'Empurre para cima retornando à posição inicial.'
    ],
    tips: 'Tronco mais reto = mais tríceps. Inclinado para frente = mais peitoral.'
  },
  {
    id: 'triceps-004',
    name: 'Kickback com Halter',
    muscleGroup: 'triceps',
    secondaryMuscles: [],
    equipment: 'halteres',
    difficulty: 'beginner',
    emoji: '💪',
    instructions: [
      'Apoie o joelho e a mão em um banco, inclinando o tronco à frente.',
      'Segure o halter com o braço do lado livre, cotovelo a 90 graus.',
      'Estenda o braço para trás até ficar paralelo ao chão.',
      'Retorne à posição de 90 graus e repita.'
    ],
    tips: 'Mantenha o braço superior fixo. Apenas o antebraço deve se mover.'
  },
  {
    id: 'triceps-005',
    name: 'Tríceps Testa com Halteres',
    muscleGroup: 'triceps',
    secondaryMuscles: [],
    equipment: 'halteres',
    difficulty: 'intermediate',
    emoji: '💪',
    instructions: [
      'Deite-se no banco segurando um halter em cada mão, braços estendidos.',
      'Flexione os cotovelos, descendo os halteres ao lado da cabeça.',
      'Mantenha os braços superiores fixos e perpendiculares.',
      'Estenda os cotovelos retornando ao topo.'
    ],
    tips: 'Variação com halteres permite maior amplitude que com barra.'
  },
  {
    id: 'triceps-006',
    name: 'Tríceps Pulley (Barra)',
    muscleGroup: 'triceps',
    secondaryMuscles: [],
    equipment: 'polia',
    difficulty: 'beginner',
    emoji: '💪',
    instructions: [
      'Fique em pé de frente para a polia alta, segurando a barra reta ou W com pegada pronada.',
      'Mantenha os cotovelos fixos ao lado do corpo, flexionados em aproximadamente 90 graus.',
      'Estenda completamente os braços empurrando a barra para baixo.',
      'Retorne lentamente à posição inicial mantendo os cotovelos firmes.'
    ],
    tips: 'Mantenha os ombros relaxados e evite inclinar o corpo sobre a barra.'
  },
  {
    id: 'triceps-007',
    name: 'Mergulho no Banco',
    muscleGroup: 'triceps',
    secondaryMuscles: ['ombros', 'peitoral'],
    equipment: 'peso_corporal',
    difficulty: 'beginner',
    emoji: '💪',
    instructions: [
      'Posicione as mãos na borda de um banco firme, na largura dos ombros.',
      'Estenda as pernas para a frente e apoie os calcanhares no chão.',
      'Flexione os cotovelos para descer o corpo até que os braços formem 90 graus.',
      'Empurre o corpo de volta para cima estendendo totalmente os braços.'
    ],
    tips: 'Mantenha as costas próximas ao banco durante todo o movimento para proteger os ombros.'
  },


  // ========== DORSAIS ==========
  {
    id: 'dorsais-001',
    name: 'Puxada Frontal',
    muscleGroup: 'dorsais',
    secondaryMuscles: ['biceps'],
    equipment: 'maquina',
    difficulty: 'beginner',
    emoji: '🦅',
    instructions: [
      'Sente-se na máquina de puxada com as coxas sob os apoios.',
      'Segure a barra larga com pegada pronada, mais aberta que os ombros.',
      'Puxe a barra em direção ao peito, retraindo as escápulas.',
      'Retorne lentamente à posição com os braços estendidos.'
    ],
    tips: 'Puxe com os cotovelos, não com as mãos. Imagine "guardar as escápulas no bolso".'
  },
  {
    id: 'dorsais-002',
    name: 'Remada Curvada (Barra)',
    muscleGroup: 'dorsais',
    secondaryMuscles: ['biceps', 'lombares'],
    equipment: 'barra',
    difficulty: 'intermediate',
    emoji: '🦅',
    instructions: [
      'Em pé, segure a barra com pegada pronada. Incline o tronco a ~45 graus.',
      'Puxe a barra em direção ao abdômen, contraindo as costas.',
      'Aperte as escápulas no topo do movimento.',
      'Desça a barra controladamente estendendo os braços.'
    ],
    tips: 'Mantenha a lombar neutra. Um dos melhores exercícios para espessura das costas.'
  },
  {
    id: 'dorsais-003',
    name: 'Remada Unilateral (Halter)',
    muscleGroup: 'dorsais',
    secondaryMuscles: ['biceps'],
    equipment: 'halteres',
    difficulty: 'beginner',
    emoji: '🦅',
    instructions: [
      'Apoie o joelho e a mão de um lado no banco, tronco paralelo ao chão.',
      'Segure o halter com a mão livre, braço estendido.',
      'Puxe o halter em direção ao quadril, cotovelo junto ao corpo.',
      'Desça controladamente e repita. Troque de lado.'
    ],
    tips: 'Permite corrigir desbalanços entre os lados. Foque na contração das costas.'
  },
  {
    id: 'dorsais-004',
    name: 'Barra Fixa (Pull-up)',
    muscleGroup: 'dorsais',
    secondaryMuscles: ['biceps', 'antebracos'],
    equipment: 'peso_corporal',
    difficulty: 'advanced',
    emoji: '🦅',
    instructions: [
      'Segure a barra com pegada pronada, mais larga que os ombros.',
      'Partindo dos braços estendidos, puxe o corpo para cima.',
      'Continue até o queixo passar acima da barra.',
      'Desça controladamente até a extensão completa.'
    ],
    tips: 'Exercício rei para as costas. Se não conseguir, use elástico para auxiliar.'
  },
  {
    id: 'dorsais-005',
    name: 'Pulldown (Pegada Fechada)',
    muscleGroup: 'dorsais',
    secondaryMuscles: ['biceps'],
    equipment: 'maquina',
    difficulty: 'beginner',
    emoji: '🦅',
    instructions: [
      'Sente-se na máquina e segure a barra triângulo ou a pegada V.',
      'Puxe a barra em direção ao peito, mantendo os cotovelos junto ao corpo.',
      'Contraia as costas e segure por um segundo.',
      'Retorne à posição estendida lentamente.'
    ],
    tips: 'Pegada fechada enfatiza a parte interna das costas e o bíceps.'
  },
  {
    id: 'dorsais-006',
    name: 'Remada Baixa na Polia',
    muscleGroup: 'dorsais',
    secondaryMuscles: ['biceps'],
    equipment: 'polia',
    difficulty: 'beginner',
    emoji: '🦅',
    instructions: [
      'Sente-se na máquina de remada baixa com os pés apoiados na plataforma e joelhos levemente flexionados.',
      'Segure o puxador estribo ou barra triângulo com os braços totalmente estendidos.',
      'Puxe o peso em direção ao abdômen inferior, mantendo a coluna reta e cotovelos rentes ao corpo.',
      'Retorne lentamente à posição inicial, alongando bem as costas.'
    ],
    tips: 'Evite inclinar excessivamente o tronco para a frente ou para trás durante o exercício.'
  },
  {
    id: 'dorsais-007',
    name: 'Pulldown na Polia (Braços Estendidos)',
    muscleGroup: 'dorsais',
    secondaryMuscles: ['triceps', 'ombros'],
    equipment: 'polia',
    difficulty: 'intermediate',
    emoji: '🦅',
    instructions: [
      'Fique em pé de frente para a polia alta, segurando a barra com os braços estendidos à frente.',
      'Incline ligeiramente o tronco para a frente a partir dos quadris.',
      'Puxe a barra para baixo em direção às coxas mantendo os braços estendidos.',
      'Retorne lentamente à posição inicial sentindo o alongamento do músculo dorsal.'
    ],
    tips: 'Mantenha os cotovelos fixos em uma leve flexão e ative o core.'
  },


  // ========== LOMBARES ==========
  {
    id: 'lombares-001',
    name: 'Hiperextensão',
    muscleGroup: 'lombares',
    secondaryMuscles: ['gluteos', 'isquiotibiais'],
    equipment: 'maquina',
    difficulty: 'beginner',
    emoji: '🔙',
    instructions: [
      'Posicione-se no aparelho de hiperextensão com os quadris apoiados.',
      'Cruze os braços no peito ou coloque as mãos atrás da cabeça.',
      'Incline o tronco para baixo de forma controlada.',
      'Eleve o tronco até formar uma linha reta com as pernas.'
    ],
    tips: 'Não hiperextenda além da linha reta. Foco na lombar e glúteos.'
  },
  {
    id: 'lombares-002',
    name: 'Good Morning',
    muscleGroup: 'lombares',
    secondaryMuscles: ['isquiotibiais', 'gluteos'],
    equipment: 'barra',
    difficulty: 'intermediate',
    emoji: '🔙',
    instructions: [
      'Posicione a barra sobre os trapézios como no agachamento.',
      'Com os joelhos levemente flexionados, incline o tronco à frente.',
      'Desça até sentir o alongamento nos isquiotibiais.',
      'Retorne à posição ereta contraindo lombar e glúteos.'
    ],
    tips: 'Use peso leve. Foque na execução perfeita. Excelente para cadeia posterior.'
  },
  {
    id: 'lombares-003',
    name: 'Stiff (Pernas Rígidas)',
    muscleGroup: 'lombares',
    secondaryMuscles: ['isquiotibiais', 'gluteos'],
    equipment: 'barra',
    difficulty: 'intermediate',
    emoji: '🔙',
    instructions: [
      'Em pé, segure a barra com pegada pronada à frente do corpo.',
      'Com as pernas quase estendidas, incline o tronco à frente.',
      'Deslize a barra pelas coxas até sentir o alongamento.',
      'Retorne à posição ereta empurrando os quadris para frente.'
    ],
    tips: 'Diferente do levantamento terra, as pernas ficam quase estendidas.'
  },
  {
    id: 'lombares-004',
    name: 'Superman',
    muscleGroup: 'lombares',
    secondaryMuscles: ['gluteos'],
    equipment: 'peso_corporal',
    difficulty: 'beginner',
    emoji: '🔙',
    instructions: [
      'Deite-se de bruços com braços e pernas estendidos.',
      'Eleve simultaneamente os braços e pernas do chão.',
      'Mantenha a posição por 2-3 segundos.',
      'Desça controladamente e repita.'
    ],
    tips: 'Exercício simples e eficaz para fortalecimento lombar. Sem equipamento.'
  },

  // ========== GLÚTEOS ==========
  {
    id: 'gluteos-001',
    name: 'Hip Thrust (Elevação de Quadril)',
    muscleGroup: 'gluteos',
    secondaryMuscles: ['isquiotibiais', 'quadriceps'],
    equipment: 'barra',
    difficulty: 'intermediate',
    emoji: '🍑',
    instructions: [
      'Sente-se no chão com as costas apoiadas em um banco, barra sobre o quadril.',
      'Pés firmes no chão, na largura dos ombros.',
      'Empurre o quadril para cima até o corpo formar uma linha reta.',
      'Contraia fortemente os glúteos no topo e desça controladamente.'
    ],
    tips: 'Melhor exercício para glúteos segundo a ciência. Use apoio/almofada na barra.'
  },
  {
    id: 'gluteos-002',
    name: 'Glúteo na Máquina (Coice)',
    muscleGroup: 'gluteos',
    secondaryMuscles: ['isquiotibiais'],
    equipment: 'maquina',
    difficulty: 'beginner',
    emoji: '🍑',
    instructions: [
      'Posicione-se na máquina de glúteo com apoio nos antebraços.',
      'Coloque a sola do pé na plataforma.',
      'Empurre a plataforma para trás e para cima com o pé.',
      'Retorne controladamente sem deixar o peso bater.'
    ],
    tips: 'Foque em empurrar com o calcanhar para máxima ativação glútea.'
  },
  {
    id: 'gluteos-003',
    name: 'Ponte de Glúteos',
    muscleGroup: 'gluteos',
    secondaryMuscles: ['isquiotibiais', 'abdomen'],
    equipment: 'peso_corporal',
    difficulty: 'beginner',
    emoji: '🍑',
    instructions: [
      'Deite-se de costas com os joelhos flexionados e pés no chão.',
      'Empurre o quadril para cima, contraindo os glúteos.',
      'Mantenha por 2 segundos no topo.',
      'Desça lentamente sem encostar completamente o quadril no chão.'
    ],
    tips: 'Versão básica do hip thrust. Ótimo para iniciantes.'
  },
  {
    id: 'gluteos-004',
    name: 'Agachamento Búlgaro',
    muscleGroup: 'gluteos',
    secondaryMuscles: ['quadriceps'],
    equipment: 'halteres',
    difficulty: 'intermediate',
    emoji: '🍑',
    instructions: [
      'Fique de costas para um banco, apoiando o peito do pé de trás no banco.',
      'Segure um halter em cada mão.',
      'Agache com a perna da frente até a coxa ficar paralela ao chão.',
      'Suba empurrando com a perna da frente. Complete as reps e troque de lado.'
    ],
    tips: 'Excelente para unilateral. Melhora equilíbrio e corrige desbalanços.'
  },
  {
    id: 'gluteos-005',
    name: 'Avanço (Lunge)',
    muscleGroup: 'gluteos',
    secondaryMuscles: ['quadriceps'],
    equipment: 'halteres',
    difficulty: 'beginner',
    emoji: '🍑',
    instructions: [
      'Em pé, segure um halter em cada mão ao lado do corpo.',
      'Dê um passo à frente e flexione ambos os joelhos a 90 graus.',
      'O joelho de trás quase toca o chão.',
      'Empurre com a perna da frente para voltar à posição inicial.'
    ],
    tips: 'Pode ser feito caminhando (walking lunges) para mais desafio.'
  },

  // ========== ISQUIOTIBIAIS ==========
  {
    id: 'isquiotibiais-001',
    name: 'Mesa Flexora',
    muscleGroup: 'isquiotibiais',
    secondaryMuscles: [],
    equipment: 'maquina',
    difficulty: 'beginner',
    emoji: '🦵',
    instructions: [
      'Deite-se de bruços na mesa flexora com os tornozelos sob a almofada.',
      'Flexione os joelhos trazendo os calcanhares em direção aos glúteos.',
      'Contraia no topo do movimento.',
      'Desça lentamente resistindo ao peso.'
    ],
    tips: 'Não levante o quadril do banco. Mantenha o movimento controlado.'
  },
  {
    id: 'isquiotibiais-002',
    name: 'Cadeira Flexora',
    muscleGroup: 'isquiotibiais',
    secondaryMuscles: [],
    equipment: 'maquina',
    difficulty: 'beginner',
    emoji: '🦵',
    instructions: [
      'Sente-se na cadeira flexora com os tornozelos sobre a almofada.',
      'Flexione os joelhos puxando a almofada para baixo.',
      'Contraia no ponto máximo de flexão.',
      'Retorne à posição estendida controladamente.'
    ],
    tips: 'Variação sentada trabalha os isquiotibiais em outro ângulo.'
  },
  {
    id: 'isquiotibiais-003',
    name: 'Stiff com Halteres',
    muscleGroup: 'isquiotibiais',
    secondaryMuscles: ['lombares', 'gluteos'],
    equipment: 'halteres',
    difficulty: 'intermediate',
    emoji: '🦵',
    instructions: [
      'Em pé, segure um halter em cada mão à frente do corpo.',
      'Com as pernas quase estendidas, incline o tronco à frente.',
      'Deslize os halteres pelas coxas até sentir o alongamento.',
      'Retorne à posição ereta empurrando os quadris para frente.'
    ],
    tips: 'Foque no alongamento dos isquiotibiais. Não arredonde as costas.'
  },

  // ========== PANTURRILHAS ==========
  {
    id: 'panturrilhas-001',
    name: 'Panturrilha em Pé (Máquina)',
    muscleGroup: 'panturrilhas',
    secondaryMuscles: [],
    equipment: 'maquina',
    difficulty: 'beginner',
    emoji: '🦶',
    instructions: [
      'Posicione-se na máquina de panturrilha em pé com os ombros sob os apoios.',
      'Apoie as pontas dos pés na plataforma com os calcanhares livres.',
      'Eleve os calcanhares o mais alto possível (plantarflexão).',
      'Desça lentamente abaixo da plataforma para alongar.'
    ],
    tips: 'Amplitude completa é essencial. Suba alto e desça bem para máximo estímulo.'
  },
  {
    id: 'panturrilhas-002',
    name: 'Panturrilha Sentado',
    muscleGroup: 'panturrilhas',
    secondaryMuscles: [],
    equipment: 'maquina',
    difficulty: 'beginner',
    emoji: '🦶',
    instructions: [
      'Sente-se na máquina de panturrilha sentado com os joelhos sob os apoios.',
      'Apoie as pontas dos pés na plataforma.',
      'Eleve os calcanhares contraindo as panturrilhas.',
      'Desça lentamente permitindo o alongamento completo.'
    ],
    tips: 'Sentado trabalha mais o músculo sóleo (parte interna da panturrilha).'
  },
  {
    id: 'panturrilhas-003',
    name: 'Panturrilha no Leg Press',
    muscleGroup: 'panturrilhas',
    secondaryMuscles: [],
    equipment: 'maquina',
    difficulty: 'beginner',
    emoji: '🦶',
    instructions: [
      'No leg press, posicione apenas as pontas dos pés na borda inferior da plataforma.',
      'Estenda as pernas quase completamente.',
      'Empurre a plataforma com as pontas dos pés (plantarflexão).',
      'Permita que os calcanhares desçam para alongar e repita.'
    ],
    tips: 'Boa alternativa quando não há máquina específica. Use peso moderado.'
  },

  // ========== CARDIO ==========
  {
    id: 'cardio-001',
    name: 'Esteira (Caminhada/Corrida)',
    muscleGroup: 'cardio',
    secondaryMuscles: ['quadriceps', 'panturrilhas', 'gluteos'],
    equipment: 'maquina',
    difficulty: 'beginner',
    emoji: '🏃',
    instructions: [
      'Ajuste a velocidade e inclinação de acordo com seu nível.',
      'Comece com aquecimento de 5 minutos em ritmo leve.',
      'Aumente a intensidade gradualmente.',
      'Finalize com 5 minutos de desaquecimento em ritmo leve.'
    ],
    tips: 'Inclinação aumenta o trabalho de glúteos. Alterne velocidades para HIIT.'
  },
  {
    id: 'cardio-002',
    name: 'Bicicleta Ergométrica',
    muscleGroup: 'cardio',
    secondaryMuscles: ['quadriceps', 'panturrilhas'],
    equipment: 'maquina',
    difficulty: 'beginner',
    emoji: '🚴',
    instructions: [
      'Ajuste a altura do selim (joelho levemente flexionado na extensão).',
      'Comece pedalando em ritmo moderado para aquecimento.',
      'Ajuste a resistência conforme a intensidade desejada.',
      'Mantenha uma cadência constante (60-90 RPM).'
    ],
    tips: 'Baixo impacto, ideal para quem tem problemas nas articulações.'
  },
  {
    id: 'cardio-003',
    name: 'Elíptico (Transport)',
    muscleGroup: 'cardio',
    secondaryMuscles: ['quadriceps', 'gluteos', 'ombros'],
    equipment: 'maquina',
    difficulty: 'beginner',
    emoji: '🏃',
    instructions: [
      'Suba no aparelho e segure nas alças móveis.',
      'Comece a pedalar em movimento elíptico, coordenando braços e pernas.',
      'Ajuste a resistência e a inclinação.',
      'Mantenha o core ativado durante o exercício.'
    ],
    tips: 'Trabalha corpo superior e inferior simultaneamente. Zero impacto nas articulações.'
  },
  {
    id: 'cardio-004',
    name: 'Pular Corda',
    muscleGroup: 'cardio',
    secondaryMuscles: ['panturrilhas', 'ombros', 'antebracos'],
    equipment: 'nenhum',
    difficulty: 'intermediate',
    emoji: '🏃',
    instructions: [
      'Segure a corda com as mãos na altura do quadril.',
      'Gire a corda usando os punhos (não os braços inteiros).',
      'Salte com os dois pés, apenas o suficiente para a corda passar.',
      'Mantenha o ritmo constante, aterrissando nas pontas dos pés.'
    ],
    tips: 'Queima alta de calorias. Comece com intervalos curtos (30s salto / 30s descanso).'
  },
  {
    id: 'cardio-005',
    name: 'Burpees',
    muscleGroup: 'cardio',
    secondaryMuscles: ['peitoral', 'quadriceps', 'ombros', 'abdomen'],
    equipment: 'peso_corporal',
    difficulty: 'advanced',
    emoji: '🔥',
    instructions: [
      'Em pé, agache e coloque as mãos no chão.',
      'Jogue os pés para trás, ficando em posição de prancha.',
      'Faça uma flexão de braço.',
      'Traga os pés de volta para perto das mãos e salte explosivamente.'
    ],
    tips: 'Exercício completo e intenso. Excelente para condicionamento. Foque na técnica.'
  },

  // ========== SMITH MACHINE ==========
  {
    id: 'peitoral-007',
    name: 'Supino Reto no Smith',
    muscleGroup: 'peitoral',
    secondaryMuscles: ['triceps', 'ombros'],
    equipment: 'maquina',
    difficulty: 'beginner',
    emoji: '🏋️',
    instructions: [
      'Posicione o banco reto sob a barra do Smith. Deite-se com os olhos abaixo da barra.',
      'Segure a barra com pegada um pouco mais larga que os ombros. Gire os pulsos para destravar.',
      'Desça a barra de forma controlada até tocar levemente o meio do peito.',
      'Empurre a barra de volta à posição inicial, contraindo o peitoral no topo.'
    ],
    tips: 'O Smith oferece segurança extra sem precisar de spotter. Mantenha as escápulas retraídas e o peito aberto.'
  },
  {
    id: 'peitoral-008',
    name: 'Supino Inclinado no Smith',
    muscleGroup: 'peitoral',
    secondaryMuscles: ['ombros', 'triceps'],
    equipment: 'maquina',
    difficulty: 'beginner',
    emoji: '🏋️',
    instructions: [
      'Ajuste o banco a 30-45 graus e posicione-o sob a barra do Smith.',
      'Deite-se e segure a barra com pegada na largura dos ombros.',
      'Destrave e desça a barra controladamente até a parte superior do peito.',
      'Empurre de volta estendendo os braços, sem travar os cotovelos.'
    ],
    tips: 'Foca a cabeça clavicular (superior) do peitoral. Excelente para criar volume na parte de cima do peito.'
  },
  {
    id: 'quadriceps-006',
    name: 'Agachamento no Smith',
    muscleGroup: 'quadriceps',
    secondaryMuscles: ['gluteos', 'lombares', 'abdomen'],
    equipment: 'maquina',
    difficulty: 'beginner',
    emoji: '🦵',
    instructions: [
      'Posicione a barra do Smith sobre os trapézios. Pés levemente à frente do corpo.',
      'Afaste os pés na largura dos ombros com as pontas levemente para fora.',
      'Destrave a barra e agache até as coxas ficarem paralelas ao chão.',
      'Empurre os pés contra o chão para subir, mantendo o core ativado.'
    ],
    tips: 'O Smith guia o movimento vertical e oferece mais segurança. Posicione os pés à frente para proteger os joelhos.'
  },
  {
    id: 'gluteos-006',
    name: 'Afundo com Halteres',
    muscleGroup: 'gluteos',
    secondaryMuscles: ['quadriceps', 'isquiotibiais'],
    equipment: 'halteres',
    difficulty: 'intermediate',
    emoji: '🏋️',
    instructions: [
      'Em pé, segure um halter em cada mão ao lado do corpo.',
      'Dê um passo à frente com uma perna até a coxa ficar paralela ao chão.',
      'O joelho de trás deve quase tocar o chão. Mantenha o tronco ereto.',
      'Empurre com a perna da frente para retornar. Alterne os lados a cada repetição.'
    ],
    tips: 'Excelente para desenvolver glúteos e quadríceps. Mantenha o joelho da frente alinhado com o pé.'
  },
  {
    id: 'ombros-008',
    name: 'Desenvolvimento no Smith',
    muscleGroup: 'ombros',
    secondaryMuscles: ['triceps', 'trapezio'],
    equipment: 'maquina',
    difficulty: 'beginner',
    emoji: '🏋️',
    instructions: [
      'Sente-se num banco com encosto sob a barra do Smith. Ajuste a barra na altura dos ombros.',
      'Segure a barra com as palmas viradas para frente, um pouco mais larga que os ombros.',
      'Destrave e empurre a barra para cima até os braços quase estendidos.',
      'Desça de forma controlada até a altura dos ombros e repita.'
    ],
    tips: 'O Smith guia o movimento vertical, ótimo para focar nos deltóides sem se preocupar com equilíbrio.'
  },
  {
    id: 'ombros-009',
    name: 'Crucifixo Inverso na Polia',
    muscleGroup: 'ombros',
    secondaryMuscles: ['trapezio', 'dorsais'],
    equipment: 'polia',
    difficulty: 'intermediate',
    emoji: '🏋️',
    instructions: [
      'Posicione as duas polias na posição alta. Fique no centro cruzando as mãos para pegar o cabo oposto.',
      'Incline levemente o tronco para frente a partir dos quadris.',
      'Abra os braços para os lados em arco, mantendo leve flexão nos cotovelos.',
      'Contraia a parte traseira dos ombros no topo. Retorne lentamente com controle.'
    ],
    tips: 'Isola o deltóide posterior com tensão constante da polia. Excelente para formato do ombro e equilíbrio muscular.'
  },
  {
    id: 'dorsais-008',
    name: 'Remada Baixa na Máquina',
    muscleGroup: 'dorsais',
    secondaryMuscles: ['biceps', 'lombares'],
    equipment: 'maquina',
    difficulty: 'beginner',
    emoji: '🦅',
    instructions: [
      'Sente-se na máquina de remada com os pés na plataforma e joelhos levemente flexionados.',
      'Segure a alça (estribo ou triângulo) com os braços totalmente estendidos à frente.',
      'Puxe a alça em direção ao abdômen, mantendo as costas retas e cotovelos junto ao corpo.',
      'Contraia bem as escápulas no ponto final. Retorne lentamente alongando as costas.'
    ],
    tips: 'Mantém tensão constante no dorsal. Evite usar o impulso do corpo para puxar o peso.'
  },
  {
    id: 'dorsais-009',
    name: 'Puxada Alta na Polia',
    muscleGroup: 'dorsais',
    secondaryMuscles: ['biceps', 'ombros'],
    equipment: 'polia',
    difficulty: 'beginner',
    emoji: '🦅',
    instructions: [
      'Sente-se na máquina com as coxas sob os apoios. Segure a barra longa com pegada pronada e larga.',
      'Incline levemente o tronco para trás e puxe a barra em direção à parte superior do peito.',
      'Pense em puxar com os cotovelos, não com as mãos. Contraia as costas no final.',
      'Retorne lentamente à posição inicial com os braços estendidos.'
    ],
    tips: 'Excelente para ampliar o dorsal e criar o formato em V. Pegada larga = ênfase no lat dorsal.'
  },
  {
    id: 'triceps-008',
    name: 'Tríceps Francês com Halter',
    muscleGroup: 'triceps',
    secondaryMuscles: [],
    equipment: 'halteres',
    difficulty: 'intermediate',
    emoji: '💪',
    instructions: [
      'Deite-se no banco segurando um halter com ambas as mãos, braços estendidos acima do peito.',
      'Flexione apenas os cotovelos, descendo o halter em direção à testa. Braços superiores fixos.',
      'Desça até os antebraços ficarem próximos da vertical (abaixo da cabeça).',
      'Estenda os cotovelos retornando ao topo, contraindo o tríceps.'
    ],
    tips: 'Cabeça longa do tríceps trabalha em alta amplitude. Mantenha os cotovelos apontados para cima durante todo o movimento.'
  }
];
