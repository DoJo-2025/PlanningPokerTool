# Requirements – Planning Poker / Story Complexity Estimator

## 1. Overview

A web application that helps teams estimate the complexity of user stories and epics using predefined, levelled complexity criteria. Based on the selected levels per criterion, the app calculates and suggests an appropriate story point value (always rounding up) from a user-configurable scale. The suggestion is a proposal; the user retains final control.

---

## 2. Goals

- Enable structured story/epic complexity assessment via multiple weighted, levelled criteria
- Provide a data-driven story point suggestion (ceiling-rounded, not averaged down)
- Support individual use (MVP) with Multiplayer as a future extension
- Allow full customization of the story point scale and criteria level descriptions

---

## 3. Functional Requirements

### 3.1 Item Type: Epic vs. Story

| ID | Requirement |
|----|-------------|
| FR-01 | User can create one estimation item at a time with a title, optional description, and a **type**: Epic or Story |
| FR-02 | Epics and Stories use **separate criteria catalogues**, each independently configurable |
| FR-03 | The type selection determines which criteria catalogue is shown |

### 3.2 Complexity Criteria

| ID | Requirement |
|----|-------------|
| FR-04 | Each criterion has **6 levels** (1–6) with concrete, labelled descriptions per level |
| FR-05 | The user selects one level per criterion via a visual level-selector (e.g. segmented control or card group) |
| FR-06 | Each criterion has a configurable **weight** (all weights within a catalogue must sum to 100 %) |
| FR-07 | In Settings, the user can **add, remove, rename** criteria and adjust their weights |
| FR-08 | In Settings, the user can **edit the description text of each level** (1–6) for every criterion |
| FR-09 | Changes to criteria/weights are persisted in localStorage separately for Epics and Stories |

### 3.3 Story Point Suggestion Engine

| ID | Requirement |
|----|-------------|
| FR-10 | Each level maps to a fixed SP value: Level 1 → 1 SP, Level 2 → 2 SP, Level 3 → 3 SP, Level 4 → 5 SP, Level 5 → 8 SP, Level 6 → 13 SP |
| FR-11 | The weighted SP score is calculated as: `Σ (sp_value_i × weight_i)` |
| FR-12 | The score is mapped to the **next higher** value on the configured scale (ceiling, never rounded down) |
| FR-13 | The suggestion is displayed as a **large, prominent badge** showing only the suggested scale value (centered, text-5xl, no breakdown shown) |
| FR-14 | The suggestion panel has **fixed height matching the complexity criteria panel** for consistent visual balance |

### 3.4 Scale Configuration

| ID | Requirement |
|----|-------------|
| FR-15 | App ships with three preset scales: **Fibonacci** (1,2,3,5,8,13,21,34,55,89), **Modified Fibonacci** (0,0.5,1,2,3,5,8,13,20,40,100), **T-Shirt Sizes** (XS,S,M,L,XL,XXL) |
| FR-16 | For T-Shirt Sizes, the 6 SP levels map to: XS=1SP, S=2SP, M=3SP, L=5SP, XL=8SP, XXL=13SP; the ceiling maps the calculated score to the next higher size |
| FR-17 | User can define a **custom scale** as a comma-separated list of values |
| FR-18 | Scale configuration is persisted in localStorage |

### 3.5 Settings & Persistence

| ID | Requirement |
|----|-------------|
| FR-19 | All settings (scale, criteria catalogues for Epic & Story, level descriptions, weights) are persisted in localStorage |
| FR-20 | The current estimation item is held in app state only (not persisted between reloads) |

### 3.6 UI

| ID | Requirement |
|----|-------------|
| FR-21 | App has two pages: **Estimation Page** and **Settings Page** |
| FR-22 | Estimation Page layout: Type selector (Epic/Story) buttons at the top, complexity criteria (left column) and SP suggestion card (right column) on desktop, stacked on mobile |
| FR-22a | Type selector (Epic/Story buttons) is the primary control at the top of Estimation Page |
| FR-22b | Title and description input fields are **removed** from Estimation Page (no longer needed) |
| FR-22c | Complexity criteria matrix is displayed below type selector (left column on desktop) |
| FR-22d | SP Suggestion card appears in the right column next to criteria (desktop) or below (mobile) with **fixed height matching criteria panel height** |
| FR-22e | **Suggestion displays only the large suggested value badge** (no breakdown or override buttons) for clean, focused UI |
| FR-22f | **Complexity criteria column headers display dynamic scale values** (e.g., "XS", "S", "M" for T-Shirt; "1 SP", "2 SP" for Fibonacci) matching the selected scale |
| FR-22g | Unit label ("SP") appears only for Fibonacci-based scales; omitted for T-Shirt and custom scales |
| FR-22h | **For Stories**: Complexity criteria headers show "⚠ Should be split" (Level 4/5 SP) and "⚠ Must be split" (Level 6/13 SP) warnings for high complexity |
| FR-22i | **For Epics**: Complexity criteria headers do NOT show "should be split" or "must be split" warnings (Epics are expected to be large) |
| FR-23 | Settings Page: scale config, and per-type criteria management (add/remove/rename criteria, adjust weights, edit level descriptions) |
| FR-24 | Dark / Light mode toggle |

### 3.7 Future – Multiplayer (out of scope for MVP)

| ID | Requirement |
|----|-------------|
| FR-25 | Users can create or join a named room/session |
| FR-26 | All participants see the same item and submit their level selections |
| FR-27 | Selections are hidden until all participants have submitted |
| FR-28 | A consensus suggestion is calculated from all submitted weighted scores |

---

## 4. Non-Functional Requirements

| ID | Requirement |
|----|-------------|
| NFR-01 | Responsive design – usable on desktop and tablet |
| NFR-02 | No backend required for MVP (fully client-side) |
| NFR-03 | Accessible (WCAG AA contrast, keyboard navigable) |
| NFR-04 | Fast initial load (Vite bundle, lazy-loaded routes) |

---

## 5. Default Criteria Catalogues

### 5.1 Stories

| Criterion | Default Weight |
|-----------|---------------|
| Technical Complexity | 30 % |
| Uncertainty / Risk | 30 % |
| Effort / Size | 30 % |
| Dependencies | 10 % |

### 5.2 Epics

| Criterion | Default Weight |
|-----------|---------------|
| Business Value / Impact | 25 % |
| Technical Complexity | 25 % |
| Uncertainty / Risk | 20 % |
| Number of Sub-Stories | 15 % |
| External Dependencies | 15 % |

---

## 6. Level-to-SP Mapping (fixed)

| Level | Story Points |
|-------|-------------|
| 1 | 1 |
| 2 | 2 |
| 3 | 3 |
| 4 | 5 |
| 5 | 8 |
| 6 | 13 |

---

## 7. Default Level Descriptions (Story – Technical Complexity example)

| Level | Description |
|-------|-------------|
| 1 | Standard CRUD, no special requirements |
| 2 | Minor adjustment to existing logic |
| 3 | New component, clear requirements |
| 4 | Complex logic, multiple systems affected |
| 5 | High complexity, unfamiliar technology |
| 6 | Architectural decision, fully unknown territory |

*(All level descriptions are editable in Settings)*

---

## 8. User Stories (MVP)

- **As a user**, I want to select Epic or Story so the right criteria are shown.
- **As a user**, I want to enter a title and description to document what I am estimating.
- **As a user**, I want to select a level for each criterion so I have a structured complexity basis.
- **As a user**, I want to receive a suggested story point value (ceiling-rounded) with a per-criterion breakdown.
- **As a user**, I want to override the suggestion with my own value so I retain final control.
- **As a user**, I want to configure the story point scale so it fits my team's process.
- **As a user**, I want to edit criterion names, weights, and level descriptions so the tool matches my team's language.
- **As a user**, I want my settings saved automatically so I don't reconfigure on every visit.
