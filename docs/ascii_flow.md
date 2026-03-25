# Architecture Flow — Estimate App (TypeScript SPA)

## 🏗️ High-Level Architecture

```
[ USER BROWSER ]
      │
      ▼
[ GITHUB PAGES (CDN) ]
      │
      │──> index.html
      │──> assets/index-[hash].js  (Compiled TS)
      └──> assets/index-[hash].css (Vanilla CSS)
```

---

## 🚦 Application Runtime Flow

```
1. USER INPUT                                2. PROCESSING (main.ts + estimator.ts)
   ┌───────────────────────────────────┐        ┌───────────────────────────────────┐
   │ Idea Textarea: "Voice AI for pets"│        │ eventListener('submit')           │
   │ Complexity: "Complex"             │ ───>   │ validateInput()                   │
   │ [ Generate Estimate → ]           │        │ generateEstimate(idea, "complex") │
   └───────────────────────────────────┘        └───────────────────────────────────┘
                                                          │
                                                          │
4. RENDERING (main.ts)                                    ▼
   ┌───────────────────────────────────┐        3. LOGIC (estimator.ts)
   │ renderResults(result)             │        ┌───────────────────────────────────┐
   │ toggleVisibility(.results-section)│ <───   │ calculateMultipliers()            │
   │ smoothScroll()                    │        │ buildCostCategories()             │
   └───────────────────────────────────┘        │ formatUSD()                       │
                                                └───────────────────────────────────┘
```

---

## 🧩 Module Breakdown

### 📂 client/src/
*   **`main.ts`**
    *   *Role:* Orchestrator.
    *   *Responsibilities:* DOM references, Event listeners, Form validation, Result rendering.
*   **`estimator.ts`**
    *   *Role:* Domain Logic.
    *   *Responsibilities:* USD formatting, Cost category definitions, Complexity multipliers.
*   **`style.css`**
    *   *Role:* Design System.
    *   *Responsibilities:* CSS Variables, Glassmorphism tokens, Responsive media queries.

---

## 🔁 Data Shape (TypeScript)

```typescript
interface EstimateResult {
  idea: string;                       // "A mobile app..."
  complexity: 'simple'|'medium'|'complex'; 
  categories: CostCategory[];         // [ {name: 'Frontend', min: 5000, max: 12000}, ... ]
  totalMin: number;                   // e.g. 17500
  totalMax: number;                   // e.g. 44000
}
```

---

## 🎨 Layout Structure (index.html)

```
┌───────────────────────────────────────┐
│ [💡 Estimate]         Turn idea into $│ NAVBAR (Blurred)
├───────────────────────────────────────┤
│                                       │
│   What is your idea?                  │ HERO / INPUT
│   [________________________________]  │
│   [ Complexity Level: Medium ▼ ]      │
│                                       │
│   ( GENERATE ESTIMATE → )             │
│                                       │
├───────────────────────────────────────┤
│                                       │
│   YOUR ESTIMATE                       │ RESULTS SECTION
│   $15,000 — $35,000                   │ (Hidden by default)
│                                       │
│   ┌───────────────────────────────┐   │
│   │ 🎨 UI/UX Design       $2,000  │   │ BREAKDOWN CARDS
│   └───────────────────────────────┘   │ (Smooth slide-in)
│                                       │
└───────────────────────────────────────┘
```
