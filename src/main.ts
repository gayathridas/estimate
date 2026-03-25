// ============================================================
// main.ts — App entry point; wires up form and renders results
// ============================================================

import { generateEstimate, formatUSD } from './estimator';
import type { ComplexityLevel, EstimateResult } from './estimator';

// ---------- DOM Element References ----------
const form = document.getElementById('estimateForm') as HTMLFormElement;
const ideaInput = document.getElementById('ideaInput') as HTMLTextAreaElement;
const complexitySelect = document.getElementById('complexitySelect') as HTMLSelectElement;
const resultsSection = document.getElementById('resultsSection') as HTMLElement;
const totalCostEl = document.getElementById('totalCost') as HTMLElement;
const breakdownCardsEl = document.getElementById('breakdownCards') as HTMLElement;

// ---------- Form Submit Handler ----------
form.addEventListener('submit', (e: SubmitEvent) => {
  e.preventDefault();

  const idea = ideaInput.value.trim();
  if (!idea) {
    ideaInput.classList.add('input-error');
    ideaInput.focus();
    return;
  }
  ideaInput.classList.remove('input-error');

  const complexity = complexitySelect.value as ComplexityLevel;
  const result = generateEstimate(idea, complexity);

  renderResults(result);
});

// Remove error state on input
ideaInput.addEventListener('input', () => {
  ideaInput.classList.remove('input-error');
});

// ---------- Render Functions ----------
function renderResults(result: EstimateResult): void {
  // Total cost banner
  totalCostEl.innerHTML = `
    <span class="total-label">Estimated Total</span>
    <span class="total-range">${formatUSD(result.totalMin)} — ${formatUSD(result.totalMax)}</span>
  `;

  // Breakdown cards
  breakdownCardsEl.innerHTML = result.categories
    .map((cat) => `
      <div class="breakdown-card">
        <div class="card-icon">${cat.icon}</div>
        <div class="card-body">
          <h3 class="card-name">${cat.name}</h3>
          <p class="card-desc">${cat.description}</p>
        </div>
        <div class="card-cost">
          <span class="cost-range">${formatUSD(cat.minCost)} – ${formatUSD(cat.maxCost)}</span>
        </div>
      </div>
    `)
    .join('');

  // Reveal results with animation
  resultsSection.classList.remove('hidden');
  setTimeout(() => {
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}
