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
      emailError = page.locator('[data-testid="form-input-wrapper-error-text"]');
      
    
  });

  
  // test('should navigate to personal info page on successful email signup', async ({ page }) => {
  //   // Enter a valid work email and click 'Sign up with email'
  //   await emailInput.fill('ross@example.com');
    
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


  // // Test case: Verify error message for empty email field
  // test('should show error messages for empty email field', async ({ page }) => {
  //   // Attempt to submit without filling the email
  //   await submitButton.click();
    
  //   // Assert that the email field shows an error message
  //   await expect(emailError).toBeVisible();
  // });


  // // Test case: Verify error message for empty password field
  // test('should show error messages for empty password field', async ({ page }) => {
  //   // Attempt to submit without filling the password
  //   await emailInput.fill('ross@example.com'); // Fill email for submission
  //   await submitButton.click();
    
  //   await passwordInput.fill(''); // Ensure password field is empty
  //   await label.click();
    
  //   // Assert that the password field shows an error message
    
  //   // Locate the parent element by data-testid
  //   const parentElement = page.locator('[data-testid="ds-minimum-length-feedback"]');

  //   // Locate the 'circle' element within the parent element
  //   const circleElement = parentElement.locator('circle');
  //   await expect(circleElement).toBeVisible();

  // });


  // // Test case: Verify error message for invalid email format
  // test('should only accept valid work emails', async ({ page }) => {
  //   // Enter an invalid email and click submit
  //   await emailInput.fill('invalid@gmail.com')
  //   await submitButton.click();

  //   // Need to input valid password and agree to terms
  //   await passwordInput.fill('P@ssw0rd2024');
  //   await label.click();
  //   await createAccountButton.click()
    
  //   // Assert that an error message is shown
    
  //   await expect(emailError).toBeVisible();
  // });


  // // Test case: Verify error message for already registered email
  // test('Verify error message for already registered email', async ({ page }) => {
  //   // Enter an login details for email that has already been registered and submit
  //   await emailInput.fill('ross@example.com');
  //   await submitButton.click();
  //   await passwordInput.fill('P@ssw0rd2024');
  //   await label.click();
  //   await createAccountButton.click()

  //   // Locate the error message by text
  //   const errorMessage = page.locator('text=This account already exists.');

  //   // Assert that the error message is visible
  //   await expect(errorMessage).toBeVisible();
  // });

  // Helper function to check for a password validation error based on text color
  async function checkPasswordError(page, password, errorText) {
    await passwordInput.fill(password);
    await label.click();

    // Locate the specific error text element
    const errorLabel = page.locator(`[data-testid="ds-icon-label"] >> text=${errorText}`);

    // Get the computed color style
    const color = await errorLabel.evaluate((element) => {
      return window.getComputedStyle(element).color;
    });

    // Assert that the color is red (in this case #D13B15)
    await expect(color).toBe('rgb(209, 59, 21)');
  }

  // Test case: Verify error message for invalid password (all requirements)
  test('Verify error messages for invalid password requirements', async ({ page }) => {
    // Enter a registered email and submit
    await emailInput.fill('ross@example.com');
    await submitButton.click();
    
    // Test missing number
  await checkPasswordError(page, 'Password@', 'a number');
  
  // Test missing special character
  await checkPasswordError(page, 'Password1', 'a special character');
  
  // Test missing uppercase letter
  await checkPasswordError(page, 'password1@', 'upper and lower case');
  
    // Test password too short (assuming minimum length is 8)
  await checkPasswordError(page, 'P@1a', 'at least 8 characters');
  });


});