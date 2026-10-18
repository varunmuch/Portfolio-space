/**
 * Projects data — add a new object here to add a project to the portfolio.
 *
 * Required fields:
 *   name        — project title
 *   tagline     — one-line description shown under the title
 *   description — paragraph shown in the card body
 *   tags        — array of technology strings
 *   stat        — { value: string, label: string } shown as the right-side badge
 *   href        — live URL (use '#' if not yet deployed)
 *   visual      — controls the abstract panel on the left:
 *     bg         — CSS background for the panel
 *     symbol     — large character shown in the centre
 *     accent     — colour of the symbol
 *     color      — base colour used for the pattern (grid/lines/dots/rings)
 *     grid?      — show a grid-line pattern
 *     lines?     — show horizontal document-lines pattern
 *     dots?      — show a dot-field pattern
 *     rings?     — show concentric rings pattern
 */
export const PROJECTS = [
  {
    name: 'KV Playground',
    tagline: 'See where every key and value lives inside an LLM',
    description:
      'An open-source lab that runs Qwen3.5-0.8B locally and follows your own prompt through the model, token by token. Includes a step-by-step lesson built on your real tokens, a live no-cache vs KV-cache race (up to 27× faster decoding), a memory simulator for four cache layouts, and a benchmarks page — all runnable with one Docker command.',
    tags: ['LLM Inference', 'KV Cache', 'Qwen3.5', 'Benchmarking', 'Docker'],
    stat: { value: '27×', label: 'Faster decode' },
    href: 'https://github.com/varunmuch/KV-Playground',
    visual: {
      bg: 'linear-gradient(135deg, #120a1a 0%, #1a0f24 100%)',
      grid: true,
      symbol: '⧉',
      color: 'rgba(196,140,255,0.07)',
      accent: 'rgba(196,140,255,0.70)',
    },
  },
  {
  name: 'Hurricane Simulator',
  tagline: 'AI-powered hurricane evacuation planning system',
  description:
    'A multi-agent AI system that simulates hurricane evacuation scenarios in real time. Autonomous agents coordinate zone management, civilian routing, and emergency response across an interactive Mapbox map — powered by a FastAPI backend and Claude AI.',
  tags: ['Python', 'FastAPI', 'React', 'Mapbox', 'Claude AI', 'Multi-Agent'],
  stat: { value: 'AI', label: 'Multi-Agent' },
  href: 'https://hurricane-simulator-fron-git-f68011-varunmuchanapallys-projects.vercel.app',
  visual: {
    bg: 'linear-gradient(135deg, #060d1a 0%, #0a1628 100%)',
    rings: true,
    symbol: '🌀',
    color: 'rgba(56,139,253,0.07)',
    accent: 'rgba(56,139,253,0.60)',
  },
},
  {
    name: 'RAG Quiz',
    tagline: 'AI-powered quiz generation from your documents',
    description:
      'Upload any document and the app generates contextual quiz questions using a retrieval-augmented generation pipeline. Chunks and embeds content, retrieves relevant passages, and uses an LLM to produce accurate, document-grounded questions and answers.',
    tags: ['Python', 'LangChain', 'FastAPI', 'React', 'Pinecone'],
    stat: { value: 'RAG', label: 'Powered' },
    href: 'https://quiz-v-v1.vercel.app/',
    visual: {
      bg: 'linear-gradient(135deg, #0a0d0f 0%, #0f1a14 100%)',
      dots: true,
      symbol: '◈',
      color: 'rgba(74,222,128,0.06)',
      accent: 'rgba(74,222,128,0.55)',
    },
  },

  {
    name: 'MERN Stack Blog Website',
    tagline: 'Full-stack developer journal — varun.log',
    description:
      'A personal blog built from scratch with a black and white editorial aesthetic. Features shape-morphing landing animation, markdown rendering with syntax highlighting, light/dark theme, tag filtering, and a password-protected admin system for creating and managing posts.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Vercel'],
    stat: { value: 'MERN', label: 'Full Stack' },
    href: 'https://blog-website-frontend-ecru.vercel.app/',
    visual: {
      bg: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)',
      lines: true,
      symbol: '∂',
      color: 'rgba(232,230,224,0.08)',
      accent: 'rgba(232,230,224,0.55)',
    },
  },
  {
    name: 'AlgoVis',
    tagline: 'Sorting & pathfinding algorithm visualiser',
    description:
      'Interactive visualiser for sorting algorithms — Bubble, Merge, Quick, Heap — and pathfinding algorithms including Dijkstra, A*, BFS and DFS. Watch every step execute in real time with adjustable speed and grid size. Built entirely in React with no external animation libraries.',
    tags: ['React', 'Algorithms', 'Data Structures', 'Vite'],
    stat: { value: 'Visualizer', label: 'Algorithms' },
    href: 'https://algorithm-visualizer-eta-ten.vercel.app/',
    visual: {
      bg: 'linear-gradient(135deg, #080e14 0%, #0d1a26 100%)',
      grid: true,
      symbol: '⬡',
      color: 'rgba(139,158,183,0.07)',
      accent: '#8B9EB7',
    },
  },

  // ── Add new projects below this line ──────────────────────────────────────
  // {
  //   name: 'My New Project',
  //   tagline: 'Short tagline here',
  //   description: 'Longer description...',
  //   tags: ['React', 'TypeScript'],
  //   stat: { value: 'v1.0', label: 'Released' },
  //   href: 'https://my-project.vercel.app/',
  //   visual: {
  //     bg: 'linear-gradient(135deg, #0a0a14 0%, #14101a 100%)',
  //     rings: true,
  //     symbol: '◎',
  //     color: 'rgba(180,100,255,0.07)',
  //     accent: 'rgba(180,100,255,0.60)',
  //   },
  // },
]
