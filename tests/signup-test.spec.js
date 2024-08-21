const {test, expect} = require('@playwright/test');

test.describe('Signup Flow', () => {
  let emailInput;
  let passwordInput;
  let submitButton;
  let label;
  let createAccountButton;
  let emailError;


  test.beforeEach(async ({ page }) => {
    // Navigate to the signup page
    await page.goto('https://app-moccona.letsweel.com/app/business-signup');
    
      // Define common locators
      emailInput = page.locator('[data-testid="registration-email"]');
      passwordInput = page.locator('[data-testid="registration-password"]');
      submitButton = page.locator('[data-testid="submit-button"]');
      label = page.locator('label').nth(2);
      createAccountButton = page.locator('[data-testid="email-sign-up"]');
      emailError = page.locator('[data-testid="form-input-wrapper-error-text"]')
    
  });

  
  // test('should navigate to personal info page on successful email signup', async ({ page }) => {
  //   // Enter a valid work email and click 'Sign up with email'
  //   await emailInput.fill('validemail@domain.com');
    
  //   // Click 'Sign up with email'
  //   await submitButton.click()
    
  //   // Enter a valid password
  //   await passwordInput.fill('P@ssw0rd2024');

  //   // Click 'I agree to terms'
  //   await label.click();

  //   // Click 'Create account'
  //   await createAccountButton.click()
  
  //   // Assert that it navigates to the personal info page
  //   await expect(page).toHaveURL('https://app-moccona.letsweel.com/app/personal-info');
  // });

  // test('should show error messages for empty fields', async ({ page }) => {
  //   // Attempt to submit without filling the email
  //   await submitButton.click();
    
  //   // Assert that the email field shows an error message
  //   await expect(emailError).toBeVisible();
  // });

  test('should show error messages for empty password field', async ({ page }) => {
    // Attempt to submit without filling the password
    await emailInput.fill('validemail@domain.com'); // Fill email for submission
    await page.pause()
    await passwordInput.fill(''); // Ensure password field is empty
    await submitButton.click();
    
    // Assert that the password field shows an error message
    const passwordError = await page.locator('[data-testid="form-input-wrapper-error-text"]').nth(1); // Adjust index if needed
    await expect(passwordError).toBeVisible();
  });
});