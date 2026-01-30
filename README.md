# Swift Translator - Automated Testing Suite

A comprehensive Playwright-based automated testing project for validating the [Swift Translator](https://www.swifttranslator.com/) web application, which translates Singlish (romanized Sinhala) text to Sinhala script.

## Project Overview

This project contains automated end-to-end tests for the Swift Translator application. The test suite verifies the accuracy and reliability of Singlish-to-Sinhala transliteration across various scenarios including:

- Basic word and sentence translations
- Complex sentences with conjunctions and multiple clauses
- Handling of punctuation, numbers, and special characters
- UI responsiveness during rapid user interactions
- Edge cases and system limitations

## Test Categories

| Category | Test Count | Description |
|----------|------------|-------------|
| Positive Functional Tests | 24 | Core translation functionality tests - expected to **PASS** |
| Positive UI Tests | 2 | User interface behavior tests - expected to **PASS** |
| Negative Functional Tests | 10 | Edge cases testing system limitations - expected to **FAIL** |

### Positive Test Cases (26 tests)
These tests validate that the translator correctly handles:
- Basic greetings and common phrases
- Compound sentences with conjunctions
- Negation patterns
- Work/office context with schedules
- Future and past tense constructions
- Travel planning scenarios
- Shopping contexts with prices
- Formal and informal expressions
- English abbreviations mixed with Singlish
- Long paragraphs (300+ characters)
- Rapid typing and clearing behaviors

### Negative Test Cases (10 tests)
These tests document known system limitations:
- Joined words without spaces
- Special symbols in text
- Misspelled Singlish words
- Multiple consecutive punctuation marks
- Excessive repeated characters
- Line breaks interrupting sentences
- HTML/XML tags in input
- Tab characters between words
- Complex mixed abbreviations

## Prerequisites

- **Node.js**: Version 18.x or higher
- **npm**: Version 8.x or higher
- **Operating System**: Windows, macOS, or Linux

## Installation

1. **Clone or download the project**

2. **Navigate to the project directory**
   ```bash
   cd "ITPM Assigment IT23335578"
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```
   This downloads Chromium, Firefox, and WebKit browsers required for testing.

## Running Tests

### Run all tests (headless mode)
```bash
npm test
```
or
```bash
npx playwright test
```

### Run tests with browser visible
```bash
npm run test:headed
```

### Run tests with Playwright UI
```bash
npm run test:ui
```

### Run tests in debug mode
```bash
npm run test:debug
```

### Run a specific test file
```bash
npx playwright test tests/swifttranslator.spec.js
```

### Run tests matching a pattern
```bash
npx playwright test -g "Pos_Fun"
```

### Run only positive tests
```bash
npx playwright test -g "Pos_"
```

### Run only negative tests
```bash
npx playwright test -g "Neg_"
```

## Project Structure

```
ITPM Assigment IT23335578/
├── tests/
│   └── swifttranslator.spec.js    # Main test file with all test cases
├── playwright-report/              # HTML test reports (generated after test run)
├── test-results/                   # Test artifacts and screenshots
├── node_modules/                   # Dependencies
├── package.json                    # Project configuration and scripts
├── package-lock.json               # Dependency lock file
├── playwright.config.js            # Playwright configuration
└── README.md                       # This file
```

## Configuration

The Playwright configuration (`playwright.config.js`) includes:

- **Test Directory**: `./tests`
- **Parallel Execution**: Enabled for faster test runs
- **Browser**: Chromium (Desktop Chrome)
- **Reporter**: HTML (generates visual reports)
- **Trace**: Captured on first retry for debugging
- **Retries**: 2 retries on CI, 0 locally

## Viewing Test Reports

After running tests, view the HTML report:
```bash
npx playwright show-report
```

This opens an interactive report in your browser showing:
- Test results (passed/failed)
- Test duration
- Console logs
- Screenshots on failure
- Trace viewer for debugging

## Test Case ID Convention

| Prefix | Category |
|--------|----------|
| `Pos_Fun_XXXX` | Positive Functional Tests |
| `Pos_UI_XXXX` | Positive UI Tests |
| `Neg_Fun_XXXX` | Negative Functional Tests |

## Understanding Test Results

- **Positive Tests**: Should all pass. Any failure indicates a regression or bug in the translator.
- **Negative Tests**: Expected to fail. These document known limitations. If they start passing, it means the translator has improved.

## Troubleshooting

### Tests timing out
Increase the timeout in `playwright.config.js`:
```javascript
use: {
  actionTimeout: 10000,
  navigationTimeout: 30000,
}
```

### Browser not launching
Reinstall Playwright browsers:
```bash
npx playwright install --force
```

### Network issues
Ensure you have internet access as tests connect to `https://www.swifttranslator.com/`

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `@playwright/test` | ^1.58.0 | Test framework and assertions |
| `@types/node` | ^25.1.0 | TypeScript definitions for Node.js |

## Author

**Student ID**: IT23335578
**Course**: ITPM - Year 3 Semester 2
**Institution**: SLIIT

## License

ISC
