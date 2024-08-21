const {test, expect} = require('@playwright/test');

test.describe('Signup Flow', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to the signup page
    await page.goto('https://app-moccona.letsweel.com/app/business-signup');
    
  });
  
  test('should navigate to personal info page on successful email signup', async ({ page }) => {
    // Enter a valid work email and click 'Sign up with email'
    const emailInput = await page.locator('[data-testid="registration-email"]');
    await emailInput.fill('validemail@domain.com');
    
    // Click 'Sign up with email'
    const submitButton = page.locator('[data-testid="submit-button"]');
    await submitButton.click()
    
    // Enter a valid password
    const passwordInput = await page.locator('[data-testid="registration-password"]');
    await passwordInput.fill('P@ssw0rd2024');

    // Click 'I agree to terms'
    const label = page.locator('label').nth(2);
    await label.click();

    // Click 'Create account'
    const createAccountButton = await page.locator('[data-testid="email-sign-up"]');
    createAccountButton.click()


    
    // Assert that it navigates to the personal info page
    await expect(page).toHaveURL('https://app-moccona.letsweel.com/app/personal-info');
  });

  
});