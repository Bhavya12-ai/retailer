# Retailer Rewards Dashboard

A small React application that simulates a retailer rewards dashboard using a local JSON mock instead of a backend API. The app demonstrates async data loading, error handling, search, sort, pagination, and PropTypes validation.

## Project Summary

The application loads transaction data from a local mock file (`public/data/transactions.json`) and treats it as if it came from an external API. It calculates reward points, groups results by customer and month, and displays:

- Dashboard summary and leaderboard
- Monthly customer breakdown
- Detailed transaction view
- Search and sort support in transaction tables
- Loading state and API error handling

## Solution Overview

Key features implemented:

- Local JSON mock API simulation via `src/api/fetchTransactions.js`
- Async data load with `loading` and `error` state in `src/hooks/useRewardsData.js`
- No separate backend repository required
- Dynamic data flow via props and state
- All static UI text and labels centralized in `src/constants/uiConstants.js`
- Component-level CSS files for clean styling
- Strong PropTypes validation via `src/constants/propTypes.js`

## Project Setup

### Requirements

- Node.js installed
- npm available in your terminal

### Install

```bash
npm install
```

### Run locally

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Run tests

```bash
npm test
```

To run tests once without watch mode:

```bash
npm test -- --watchAll=false
```

### Build for production

```bash
npm run build
```

## Folder Structure

```
public/
  data/
    transactions.json       # Local mock transaction dataset
src/
  api/
    fetchTransactions.js    # Simulated async API loader
  components/
    MonthlyBreakdown.jsx    # Monthly customer points table
    MonthlyBreakdown.css
    SummaryCards.jsx        # Leaderboard-style summary cards table
    SummaryCards.css
    TransactionTable.jsx    # Searchable, sortable transaction detail table
    TransactionTable.css
    RewardsDashboard.jsx    # Main dashboard wrapper
    RewardsDashboard.css
  constants/
    uiConstants.js         # All static labels, table headers, and rules
    propTypes.js           # Shared PropTypes shapes
  hooks/
    useRewardsData.js      # Data fetch, enrichment, loading/error state
    useSelectedCustomer.js  # Selected customer state and derived data
  pages/
    DashboardPage.jsx       # App landing page with customer selector
    DashboardPage.css
    MonthlyViewPage.jsx     # Monthly customer view page
    MonthlyViewPage.css
    DetailedViewPage.jsx    # Detailed transaction report page
    DetailedViewPage.css
  utils/
    calculatePoints.js      # Reward point calculation logic
    calculatePoints.test.js # Unit tests for calculatePoints
  App.js
  App.css
  index.js
```

## Component Details

### `App.js`

The app shell loads reward data and controls page navigation between:

- `DashboardPage`
- `MonthlyViewPage`
- `DetailedViewPage`

### `src/hooks/useRewardsData.js`

Handles:

- fetching the mock JSON data asynchronously
- loading and error state
- enriching transactions with `points`, `monthKey`, and `monthLabel`
- computing monthly breakdowns and customer totals

### `src/api/fetchTransactions.js`

Simulates a network call using `fetch()` on the local mock file and a delay. It returns a Promise and rejects on failure.

### `DashboardPage.jsx`

Displays the top-level dashboard experience and includes:

- customer selector dropdown
- leaderboard cards
- pagination support
- fallback message for no data
- retry button on load failure

### `MonthlyViewPage.jsx`

Shows monthly reward totals for one selected customer.

### `DetailedViewPage.jsx`

Shows the most recent transactions for the selected customer.

### `TransactionTable.jsx`

Supports:

- full-text search across customer name, transaction ID, date, and month
- sortable column headers with visual arrows
- client-side pagination

## Rewards Calculation Logic

Points are calculated using the rules:

- `0 points` for amount up to `$50`
- `1 point` per whole dollar between `$50` and `$100`
- `2 points` per whole dollar above `$100`

The logic is implemented in `src/utils/calculatePoints.js`.

## Tests

The repository includes unit tests for reward calculation logic in:

- `src/utils/calculatePoints.test.js`

Test coverage includes:

- positive reward scenarios
- negative amount handling
- fractional amount rounding to whole dollars
- edge cases around `$50` and `$100`

## Screenshots

Add actual screenshots to the repository under `screenshots/` and update these links if needed.

```md
![Dashboard screenshot](screenshots/dashboard.png)
![Search and sort screenshot](screenshots/search-sort.png)
![Test results screenshot](screenshots/test-results.png)
```

## Notes

- All page and component styling is separated into CSS files.
- Static labels and table headers are centralized in `src/constants/uiConstants.js`.
- Components receive all data through props or derived state; no inline hard-coded datasets are used.
- The mock API remains inside the project, so there is no separate backend repository.


