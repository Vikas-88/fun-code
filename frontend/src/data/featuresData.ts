export interface FeatureItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  previewSnippet: string;
  interactiveDemo: {
    title: string;
    description: string;
    panels?: {
      caption: string;
      dialogue: string;
      visualEmoji: string;
      role: string;
    }[];
    breakdown?: {
      line: number;
      code: string;
      explanation: string;
      analogy: string;
    }[];
    errorCase?: {
      buggyCode: string;
      errorPrompt: string;
      rootCause: string;
      fixedCode: string;
      steps: string[];
    };
    logicSteps?: {
      step: number;
      title: string;
      thoughtProcess: string;
      template: string;
    }[];
  };
}

export const FEATURES_DATA: FeatureItem[] = [
  {
    id: 'comic-explainer',
    title: 'Comic Code Explainer',
    tagline: 'Visual Narrative Translation',
    description: 'Converts complex, intimidating code into entertaining comic stories and animated narrative adventures.',
    iconName: 'Sparkles',
    previewSnippet: `// Transforming Recursion into an Epic Dungeon Crawl\nfunction explore(room) {\n  if (room.isExit) return "ESCAPED!";\n  return explore(room.nextDoor);\n}`,
    interactiveDemo: {
      title: 'Comic Story: The Infinite Staircase of Recursion',
      description: 'See how FUN CODE interprets a recursive function into an illustrated 4-panel adventure.',
      panels: [
        {
          caption: 'PANEL 1: THE DISPATCH',
          visualEmoji: '🧙‍♂️',
          role: 'Wizard CallStack',
          dialogue: '"Take this enchanted scroll, Sir Function! Enter Room 1 and do not return until you find the Exit Crystal!"',
        },
        {
          caption: 'PANEL 2: THE MIRROR CLONE',
          visualEmoji: '🚪',
          role: 'Sir Function',
          dialogue: '"This room has another doorway! Instead of walking back, I will conjure an identical clone of myself to enter it!"',
        },
        {
          caption: 'PANEL 3: THE BASE CASE TREASURE',
          visualEmoji: '💎',
          role: 'Clone #4',
          dialogue: '"Aha! room.isExit === true! The crystal glows green! No more clones needed. Returning the victory token!"',
        },
        {
          caption: 'PANEL 4: THE DOMINO RETURN',
          visualEmoji: '⚡',
          role: 'Entire Stack',
          dialogue: 'Clone #4 passes to #3, #3 to #2, #2 to #1... The stack unwinds! Execution completed in 1.4 milliseconds.',
        },
      ],
    },
  },
  {
    id: 'ai-code-explainer',
    title: 'AI Code Explainer',
    tagline: 'Precision Logic Deconstruction',
    description: 'Explains programming logic line by line with crystal-clear human language and zero confusing jargon.',
    iconName: 'Terminal',
    previewSnippet: `const debounce = (fn, delay) => {\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), delay);\n  };\n};`,
    interactiveDemo: {
      title: 'Line-by-Line Logic Inspection',
      description: 'Every statement is deconstructed into mental models, memory impact, and practical use cases.',
      breakdown: [
        {
          line: 1,
          code: 'const debounce = (fn, delay) => {',
          explanation: 'Declares a higher-order wrapper function accepting your core logic `fn` and a cooldown wait time in milliseconds.',
          analogy: 'Imagine an elevator door holding open while people keep walking in.',
        },
        {
          line: 2,
          code: '  let timer;',
          explanation: 'Creates a private memory variable scoped within closure to store the active countdown clock reference.',
          analogy: 'The elevator attendant holds the reset button clock in their hand.',
        },
        {
          line: 3,
          code: '  return (...args) => {',
          explanation: 'Returns a replacement function that intercepts every frantic user click or rapid keystroke.',
          analogy: 'The front door receptionist who politely intercepts incoming knocks.',
        },
        {
          line: 4,
          code: '    clearTimeout(timer);',
          explanation: 'Cancels the previous scheduled execution before it could fire, resetting the countdown back to zero.',
          analogy: 'Every time another passenger approaches, the door timer restarts from 5 seconds.',
        },
        {
          line: 5,
          code: '    timer = setTimeout(() => fn(...args), delay);',
          explanation: 'Schedules a fresh execution of your actual function only when the user goes completely silent for `delay` ms.',
          analogy: 'When no one has walked in for 5 seconds, the doors finally close and the elevator ascends!',
        },
      ],
    },
  },
  {
    id: 'smart-error-solver',
    title: 'Smart Error Solver',
    tagline: 'Automated Root Cause Diagnosis',
    description: 'Detects elusive bugs, explains why the compiler rebelled, and prescribes step-by-step verified fixes.',
    iconName: 'ShieldAlert',
    previewSnippet: `TypeError: Cannot read properties of null (reading 'map')\nat UserList.render (/src/UserList.tsx:42:18)`,
    interactiveDemo: {
      title: 'Live Bug Diagnosis & Instant Remedy',
      description: 'Raw cryptic compiler trace transformed into human diagnostic reasoning.',
      errorCase: {
        buggyCode: `// ❌ BUGGY COMPONENT\nfunction UserList({ users }) {\n  return (\n    <ul>\n      {users.map(u => (\n        <li key={u.id}>{u.name}</li>\n      ))}\n    </ul>\n  );\n}`,
        errorPrompt: "TypeError: Cannot read properties of null (reading 'map')",
        rootCause: "The parent component passes `users=null` while an asynchronous network fetch is pending. In JavaScript, calling `.map()` on `null` throws an uncaught fatal exception.",
        fixedCode: `// ✅ VERIFIED MATRIX SOLUTION\nfunction UserList({ users }) {\n  // 1. Guard against null or pending state\n  if (!users) {\n    return <div className="text-zinc-500">Decrypting user stream...</div>;\n  }\n\n  // 2. Safe mapping with fallback\n  return (\n    <ul>\n      {users.map(u => (\n        <li key={u.id}>{u.name}</li>\n      ))}\n    </ul>\n  );\n}`,
        steps: [
          'Add a defensive loading / null check before the return statement.',
          'Alternatively use optional chaining: `users?.map(...) ?? null`.',
          'Ensure default prop value: `users = []` in parameter signature.',
        ],
      },
    },
  },
  {
    id: 'logic-builder',
    title: 'Logic Builder',
    tagline: 'Algorithmic Mental Models',
    description: 'Helps users formulate algorithmic thinking, pattern templates, and construct similar software independently.',
    iconName: 'Cpu',
    previewSnippet: `// Pattern: Two-Pointer Sliding Window\nfunction maxSubarray(arr, k) {\n  let windowSum = 0, maxSum = -Infinity;\n  // Learn how to recognize and adapt this pattern\n}`,
    interactiveDemo: {
      title: 'Algorithmic Thinking Blueprint',
      description: 'Learn how to solve coding problems before writing a single line of syntax.',
      logicSteps: [
        {
          step: 1,
          title: 'Frame the Mental State',
          thoughtProcess: 'Identify what values change over time (pointers, counters, accumulators) and write them as physical objects in a ledger.',
          template: 'State = { left: 0, right: 0, currentSum: 0 }',
        },
        {
          step: 2,
          title: 'Define Boundary & Base Invariants',
          thoughtProcess: 'What happens when input array is empty, has 1 element, or contains negative integers? Write guards first.',
          template: 'if (!arr || arr.length === 0) return 0;',
        },
        {
          step: 3,
          title: 'Establish the Expansion Rule',
          thoughtProcess: 'Expand right pointer until your constraint condition is satisfied, gathering elements into current state.',
          template: 'while (right < arr.length) { accumulate(); right++; }',
        },
        {
          step: 4,
          title: 'Contract & Optimize',
          thoughtProcess: 'When constraint breaks, slide the left pointer forward to restore equilibrium in O(N) linear time.',
          template: 'while (violatesConstraint()) { removeLeft(); left++; }',
        },
      ],
    },
  },
];
