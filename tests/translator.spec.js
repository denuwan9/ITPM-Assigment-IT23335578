// @ts-check
import { test, expect } from '@playwright/test';

// Base URL for the Swift Translator
const BASE_URL = 'https://www.swifttranslator.com/';

// Helper function to perform translation and get output
async function translateAndGetOutput(page, input) {
  // Navigate to the page
  await page.goto(BASE_URL);

  // Wait for the page to load
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);

  // Find the input textbox by its placeholder
  const inputField = page.getByPlaceholder('Input Your Singlish Text Here.');
  await inputField.click();
  await inputField.fill(input);

  // Wait for real-time translation
  await page.waitForTimeout(3000);

  // Click elsewhere to close any suggestion dropdown
  await page.locator('body').click({ position: { x: 10, y: 10 } });
  await page.waitForTimeout(500);

  // Get the output from the Sinhala section
  let output = '';

  try {
    // Primary method: find the Sinhala label and get the next sibling div
    const sinhalaContainer = page.locator('div').filter({ hasText: /^Sinhala$/ }).first();
    const outputDiv = sinhalaContainer.locator('xpath=following-sibling::div[1]');
    output = await outputDiv.textContent({ timeout: 5000 });
  } catch (e) {
    // Fallback method 1: Look for the output area directly
    try {
      const outputArea = page.locator('[class*="output"]').first();
      output = await outputArea.textContent({ timeout: 3000 });
    } catch (e2) {
      // Fallback method 2: Get all text from right panel area
      try {
        const allDivs = page.locator('div').filter({ hasText: /[\u0D80-\u0DFF]/ }).last();
        output = await allDivs.textContent({ timeout: 3000 });
      } catch (e3) {
        output = 'ERROR: Could not capture output';
      }
    }
  }

  return output || '';
}


// POSITIVE FUNCTIONAL TEST CASES (24 tests) - Expected to PASS



test('Pos_Fun_0001: Basic greeting with exclamation', async ({ page }) => {
  const input = 'suba sandhYaavak!';
  const expectedOutput = 'සුබ සන්ද්‍යාවක්!';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0001`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0002: Compound sentence with conjunction', async ({ page }) => {
  const input = 'api kaeema kanna yanavaa saha passe gihin chithrapatayakuth balanavaa';
  const expectedOutput = 'අපි කෑම කන්න යනවා සහ පස්සෙ ගිහින් චිත්‍රපටයකුත් බලනවා';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0002`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0003: Negation pattern in statement', async ({ page }) => {
  const input = 'meeting eka 3.30 PM ta';
  const expectedOutput = 'meeting එක 3.30 PM ට';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0003`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0004: Work context with schedule details', async ({ page }) => {
  const input = 'adha mama office yanna oonee 9.00 AM ta patan gen 5.00 PM venakan vaeda karanna venavaa';
  const expectedOutput = 'අද මම office යන්න ඕනේ 9.00 AM ට පටන් ගෙන් 5.00 PM වෙනකන් වැඩ කරන්න වෙනවා';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0004`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0005: Future tense with time marker', async ({ page }) => {
  const input = 'api iiLaGa sathiyee yamu';
  const expectedOutput = 'අපි ඊළඟ සතියේ යමු';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0005`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0006: Travel planning with multiple destinations', async ({ page }) => {
  const input = 'api aluth aavurudhdhu valata kandy gihilla peeraadheNiya balanavaa passe Sigiriya yanna hithan innee';
  const expectedOutput = 'අපි අලුත් ආවුරුද්දු වලට kandy ගිහිල්ල පේරාදෙණිය බලනවා පස්සෙ Sigiriya යන්න හිතන් ඉන්නේ';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0006`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0007: Direct command imperative', async ({ page }) => {
  const input = 'issarahin paeththata venna';
  const expectedOutput = 'ඉස්සරහින් පැත්තට වෙන්න';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0007`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0008: Shopping context with price and items', async ({ page }) => {
  const input = 'mama poLata gihilla Rs. 250 ka thakkali th Rs. 450 ka ala th gaththaa';
  const expectedOutput = 'මම පොළට ගිහිල්ල Rs. 250 ක තක්කලි ත් Rs. 450 ක අල ත් ගත්තා';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0008`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0009: Past tense narrative sentence', async ({ page }) => {
  const input = 'api naetum panthi giyaa';
  const expectedOutput = 'අපි නැටුම් පන්ති ගියා';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0009`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0010: Convert repeated expression for emphasis', async ({ page }) => {
  const input = 'hari hari';
  const expectedOutput = 'හරි හරි';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0010`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0011: Convert compound sentence with reason', async ({ page }) => {
  const input = 'mama gedhara yanavaa, haebaeyi vahina nisaa dhaenma yannee naee.';
  const expectedOutput = 'මම ගෙදර යනවා, හැබැයි වහින නිසා දැන්ම යන්නේ නෑ.';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0011`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0012: Line breaks handling', async ({ page }) => {
  const input = 'api heta chithrapatiyak balanna yanavaa.\noyalath enavadha apith ekka yanna?';
  const expectedOutput = 'අපි හෙට චිත්‍රපටියක් බලන්න යනවා.\nඔයලත් එනවද අපිත් එක්ක යන්න?';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0012`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0013: Weather related sentence with plans', async ({ page }) => {
  const input = 'vahinava kiyala news vala kivva nisaa mama aluth schedule meeting plans cancel karalaa gedhara innee';
  const expectedOutput = 'වහිනව කියල news වල කිව්ව නිසා මම අලුත් schedule meeting plans cancel කරලා ගෙදර ඉන්නේ';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0013`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0014: Past tense narrative with sequential actions', async ({ page }) => {
  const input = 'mama iiyee panthi gihilla guruvarayaa ekka kathaa karalaa gedhara aavaa';
  const expectedOutput = 'මම ඊයේ පන්ති ගිහිල්ල ගුරුවරයා එක්ක කතා කරලා ගෙදර ආවා';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0014`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0015: Description with multiple adjectives', async ({ page }) => {
  const input = 'mama bath kanna kaeemathi haebaeyi adha bath visi kala nisaa bath hadhanna epaa';
  const expectedOutput = 'මම බත් කන්න කෑමති හැබැයි අද බත් විසි කල නිසා බත් හදන්න එපා';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0015`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0016: Negation pattern in statement v2', async ({ page }) => {
  const input = 'mata eeka epaa';
  const expectedOutput = 'මට ඒක එපා';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0016`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0017: Informal response with agreement', async ({ page }) => {
  const input = 'hari, mama karannam';
  const expectedOutput = 'හරි, මම කරන්නම්';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0017`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0018: Name with office and traffic context', async ({ page }) => {
  const input = 'kamal office enna late vennee traffic nisaa';
  const expectedOutput = 'කමල් office එන්න late වෙන්නේ traffic නිසා';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0018`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0019: English abbreviations in sentence', async ({ page }) => {
  const input = 'mata ID card eeka dhenna';
  const expectedOutput = 'මට ID card ඒක දෙන්න';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0019`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0020: Sentence with punctuation question', async ({ page }) => {
  const input = 'meeka hariyata vaedadha?';
  const expectedOutput = 'මේක හරියට වැඩද?';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0020`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0021: Long paragraph with mixed elements', async ({ page }) => {
  const input = 'mama dhaen Colombo yanna hadhannee office meeting ekak thiyena nisaa. Meeting eka 10.00 AM ta patan gannavaa. Api project eka gaena kathaa karanna oonee saha client laa ekka discuss karanna vennavaa. Presentation eeka ready karalaa USB eka gaththaa. Meeting ekata api oyaalaa okkoma aavith participate karanna oonee. passee lunch ekata api yanna hadhannee nilame restaurant ekata..';
  const expectedOutput = 'මම දැන් Colombo යන්න හදන්නේ office meeting එකක් තියෙන නිසා. Meeting එක 10.00 AM ට පටන් ගන්නවා. අපි project එක ගැන කතා කරන්න ඕනේ සහ client ලා එක්ක discuss කරන්න වෙන්නවා. Presentation ඒක ready කරලා USB එක ගත්තා. Meeting එකට අපි ඔයාලා ඔක්කොම ආවිත් participate කරන්න ඕනේ. පස්සේ lunch එකට අපි යන්න හදන්නේ නිලමෙ restaurant එකට..';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0021`);
  console.log(`Input length: ${input.length}`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(input.length).toBeGreaterThanOrEqual(300);
  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0022: Long professional email content translation', async ({ page }) => {
  const input = 'suBha udhaeesanak!  mata adha email ekak liyanna vunaa office eka gaena. Api aluth project ekak patan gannee iilaga maasayee. Meeting ekath thiyanava passe sathiye saha api oyaalaa okkoma ekka kathaa karanna oonee. Project plan eka ready karalaa thiyanavaa. Budget proposal eka saha timeline eka document eke thiyanavaa.  document eka balala comment eka dhenna. ';
  const expectedOutput = 'සුභ උදෑසනක්!  මට අද email එකක් ලියන්න වුනා office එක ගැන. අපි අලුත් project එකක් පටන් ගන්නේ ඊලග මාසයේ. Meeting එකත් තියනව පස්සෙ සතියෙ සහ අපි ඔයාලා ඔක්කොම එක්ක කතා කරන්න ඕනේ. Project plan එක ready කරලා තියනවා. Budget proposal එක සහ timeline එක document eke තියනවා.  document එක බලල comment එක දෙන්න. ';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0022`);
  console.log(`Input length: ${input.length}`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(input.length).toBeGreaterThanOrEqual(300);
  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0023: Units of measurement', async ({ page }) => {
  const input = 'eeka 5 kg k vitharayi';
  const expectedOutput = 'ඒක 5 kg ක් විතරයි';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0023`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0024: Convert formal sentence', async ({ page }) => {
  const input = 'ovuhu raajakaari saDHAhaa pitavagos sitiyooya.';
  const expectedOutput = 'ඔවුහු රාජකාරි සඳහා පිටවගොස් සිටියෝය.';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0024`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});




// NEGATIVE FUNCTIONAL TEST CASES (10 tests) - Expected to FAIL


test('Neg_Fun_0001: Joined words without spaces', async ({ page }) => {
  const input = 'apisadhudhatagedharayanavaa.';
  
  const expectedOutput = 'අපි සදුදට ගෙදර යනවා.';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Neg_Fun_0001`);
  console.log(`Input: ${input}`);
  console.log(`Expected (ideal): ${expectedOutput}`);
  console.log(`Actual (system limitation): ${actualOutput}`);

  
  expect(actualOutput).toBe(expectedOutput);
});

test('Neg_Fun_0002: Special symbols in text', async ({ page }) => {
  const input = 'mama @#$ gedhara yanavaa';
  
  const expectedOutput = 'මම ගෙදර යනවා';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Neg_Fun_0002`);
  console.log(`Input: ${input}`);
  console.log(`Expected (symbols removed): ${expectedOutput}`);
  console.log(`Actual (system limitation): ${actualOutput}`);

  
  expect(actualOutput).toBe(expectedOutput);
});

test('Neg_Fun_0003: Misspelled Singlish words', async ({ page }) => {
  const input = 'mema gamee ynavvaa kiyala hithan hitiye';
  
  const expectedOutput = 'මම ගමේ යනවා කියල හිතන් හිටියෙ';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Neg_Fun_0003`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Neg_Fun_0004: Multiple punctuation marks consecutively', async ({ page }) => {
  const input = 'mama malagedhara yanavaa!!!??? oyaa enavadha???!!! api yamu!!!';
  
  const expectedOutput = 'මම මලගෙදර යනවා! ඔයා එනවද? අපි යමු!!';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Neg_Fun_0004`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Neg_Fun_0005: Excessive repeated characters', async ({ page }) => {
  const input = 'mamaaaaaaaaaaaaa kolaBA yanavaaaaaaa raathriyeeeeeee';
  
  const expectedOutput = 'මම කොලඹ යනවා රාත්‍රියේ';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Neg_Fun_0005`);
  console.log(`Input: ${input}`);
  console.log(`Expected (normalized): ${expectedOutput}`);
  console.log(`Actual (system limitation): ${actualOutput}`);

  
  expect(actualOutput).toBe(expectedOutput);
});

test('Neg_Fun_0006: Line break interrupting sentence', async ({ page }) => {
  const input = 'mama oheeta\nennam vaahanaya\nbalanna';
  
  const expectedOutput = 'මම ඔහේට එන්නම් වාහනය බලන්න';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Neg_Fun_0006`);
  console.log(`Input: ${input}`);
  console.log(`Expected (normalized): ${expectedOutput}`);
  console.log(`Actual (system limitation): ${actualOutput}`);

  
  expect(actualOutput).toBe(expectedOutput);
});

test('Neg_Fun_0007: HTML/XML tags in input', async ({ page }) => {
  const input = '<div>mama pansal yanavaa</div> <span>oyaa enavadha</span>';
  
  const expectedOutput = 'මම පන්සල් යනවා ඔයා එනවද';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Neg_Fun_0007`);
  console.log(`Input: ${input}`);
  console.log(`Expected (expanded): ${expectedOutput}`);
  console.log(`Actual (system limitation): ${actualOutput}`);

  
  expect(actualOutput).toBe(expectedOutput);
});

test('Neg_Fun_0008: Tab characters between words', async ({ page }) => {
  const input = 'mama\tkadeeta\tgihin\tennam.';
  
  const expectedOutput = 'මම කඩේට ගිහින් එන්නම්.';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Neg_Fun_0008`);
  console.log(`Input: ${input}`);
  console.log(`Expected (normalized): ${expectedOutput}`);
  console.log(`Actual (system limitation): ${actualOutput}`);

  
  expect(actualOutput).toBe(expectedOutput);
});

test('Neg_Fun_0009: Multiple consecutive spaces in input', async ({ page }) => {
  const input = 'mama          gedhara';
  
  const expectedOutput = 'මම ගෙදර';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Neg_Fun_0009`);
  console.log(`Input: ${input}`);
  console.log(`Expected (normalized): ${expectedOutput}`);
  console.log(`Actual (system limitation): ${actualOutput}`);

  // This test SHOULD FAIL - system preserves tab characters
  expect(actualOutput).toBe(expectedOutput);
});

test('Neg_Fun_0010: Long paragraph with mixed abbreviations and special characters', async ({ page }) => {
  const input = 'hi guys!!! mama today morning 8AM ta office enna late vnaa bcoz traffic eka ganan gdk nisaa. Meeting eka 10.30AM ta start vnva CEO ekka & managers laa ekka. Presentation eka ready krlaa USB eke tynva plz check krnna. Budget proposal Rs. 500000/= approx evnna CEO sir laa aprove krnna. Aftr meeting psse documents tkaa email krnna oyaalth ekka saha WhatsApp message ekk daanna FOR YOR INFORMATION. Clients laa 3PM ta call krnna appointment eka confirm krnna. Thanks ';
  // IDEAL expected output (abbreviations expanded, proper translation)
  const expectedOutput = 'හායි යාලුවන්නෙනි!!! මම අද උදෑසන 8AM ට office එන්න ප්‍රමාද වුනා මොකද traffic එක ගණන් ගොඩක් නිසා. Meeting එක 10.30AM ට ආරම්භ වෙනව CEO එක්ක සහ managers ලා එක්ක. Presentation එක සූදානම් කරලා USB එකේ තියෙනව කරුණාකර පරීක්ෂා කරන්න. Budget proposal රුපියල් 500000/= ආසන්න වශයෙන් එවන්න CEO sir ලා අනුමත කරන්න.  පසුව meeting පස්සේ documents ටික email කරන්න ඔයාලත් එක්ක සහ WhatsApp message එකක් දාන්න ඔබේ තොරතුරු සඳහා. Clients ලා 3PM ට call කරන්න appointment එක තහවුරු කරන්න,ස්තුතියි.';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Neg_Fun_0010`);
  console.log(`Input length: ${input.length}`);
  console.log(`Input: ${input}`);
  console.log(`Expected (ideal): ${expectedOutput}`);
  console.log(`Actual (system limitation): ${actualOutput}`);

  expect(input.length).toBeGreaterThanOrEqual(300);
  // This test SHOULD FAIL - system cannot handle mixed abbreviations
  expect(actualOutput).toBe(expectedOutput);
});

// POSITIVE UI TEST CASES (2 tests) - Expected to PASS


test('Pos_UI_0001: Multiple rapid edits handled smoothly', async ({ page }) => {
  const expectedOutput = 'මම යනවා';

  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);

  const inputField = page.getByPlaceholder('Input Your Singlish Text Here.');

  // Simulate rapid typing
  await inputField.fill('ma');
  await page.waitForTimeout(200);
  await inputField.fill('mama');
  await page.waitForTimeout(200);
  await inputField.fill('mama ya');
  await page.waitForTimeout(200);
  await inputField.fill('mama yanavaa');

  // Wait for final translation
  await page.waitForTimeout(3000);

  // Click elsewhere to close suggestions
  await page.locator('body').click({ position: { x: 10, y: 10 } });
  await page.waitForTimeout(500);

  // Get output
  const sinhalaContainer = page.locator('div').filter({ hasText: /^Sinhala$/ }).first();
  const outputDiv = sinhalaContainer.locator('xpath=following-sibling::div[1]');
  const finalOutput = await outputDiv.textContent() || '';

  console.log(`TC ID: Pos_UI_0001`);
  console.log(`Final Input: mama yanavaa`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Final Output: ${finalOutput}`);

  expect(finalOutput).toBe(expectedOutput);
});

test('Pos_UI_0002: Extremely rapid repeated clearing and typing', async ({ page }) => {
  const expectedOutput = 'උබ පලයන්';

  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);

  const inputField = page.getByPlaceholder('Input Your Singlish Text Here.');

  // Stress test with rapid clear/type cycles
  for (let i = 0; i < 5; i++) {
    await inputField.fill('u');
    await page.waitForTimeout(100);
    await inputField.fill('uba');
    await page.waitForTimeout(100);
    await inputField.fill('uba pa');
    await page.waitForTimeout(100);
    await inputField.fill('uba pala');
    await page.waitForTimeout(100);
    await inputField.fill('uba palayan');
    await page.waitForTimeout(100);
  }

  // Final input
  await inputField.fill('uba palayan');
  await page.waitForTimeout(3000);

  
  await page.locator('body').click({ position: { x: 10, y: 10 } });
  await page.waitForTimeout(500);

  // Get output
  const sinhalaContainer = page.locator('div').filter({ hasText: /^Sinhala$/ }).first();
  const outputDiv = sinhalaContainer.locator('xpath=following-sibling::div[1]');
  const finalOutput = await outputDiv.textContent() || '';

  console.log(`TC ID: Pos_UI_0002`);
  console.log(`Final Input: uba palayan`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Final Output: ${finalOutput}`);

  expect(finalOutput).toBe(expectedOutput);
});
