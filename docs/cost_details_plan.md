# Feature Plan: Cost Details Capture

## Goal
Enhance "Estimate" app to capture Resource Country, Data Hosting Country, and AI Usage (SDLC).

## Proposed Changes

### [HTML] [index.html](file:///c:/Users/GayathriDas/OneDrive%20-%20Temus%20Pte.%20Ltd/Documents/Estimate/index.html)
- Add new fields: `Resource Country`, `Hosting Country` (inputs), and `SDLC AI Usage` (select: none, medium, full).

### [CSS] [style.css](file:///c:/Users/GayathriDas/OneDrive%20-%20Temus%20Pte.%20Ltd/Documents/Estimate/src/style.css)
- Style the new rows for better visual spacing.

### [TS] [estimator.ts](file:///c:/Users/GayathriDas/OneDrive%20-%20Temus%20Pte.%20Ltd/Documents/Estimate/src/estimator.ts) / [main.ts](file:///c:/Users/GayathriDas/OneDrive%20-%20Temus%20Pte.%20Ltd/Documents/Estimate/src/main.ts)
- Update interfaces.
- Add cost reduction for AI usage (-15% for medium, -30% for full).
