import { Builder, By, until } from 'selenium-webdriver';
import { ServiceBuilder, Options } from 'selenium-webdriver/edge';

async function signInTest() {
  // Create EdgeOptions and set any desired options
  const options = new Options();
  // Example: Run Edge in headless mode
  // options.headless();

  // Create a WebDriver instance with Edge
  const driver = await new Builder()
    .forBrowser('MicrosoftEdge')
    .setEdgeOptions(options)
    .build();

  try {
    // Navigate to the sign-in page
    await driver.get('http://localhost:3000/login');

    // Find email and password fields
    const emailField = await driver.findElement(By.id('email'));
    const passwordField = await driver.findElement(By.id('password'));

    // Enter email and password
    await emailField.sendKeys('zewdu@gmail.com');
    await passwordField.sendKeys('1234');

    // Click the submit button
    const submitButton = await driver.findElement(By.xpath("//button[contains(text(), 'Submit')]"));
    await submitButton.click();

    // Wait for the page to load after sign-in attempt
    await driver.wait(until.urlContains('dashboard'), 10000);

    // Verify the expected behavior (e.g., successful sign-in or error message)
    const currentUrl = await driver.getCurrentUrl();
    if (currentUrl.includes('dashboard')) {
      console.log('Sign-in successful!');
    } else {
      const errorMessage = await driver.findElement(By.css('.Toastify__toast-body')).getText();
      console.log(`Sign-in failed! Error message: ${errorMessage}`);
    }
  } catch (error) {
    console.error('Error occurred during sign-in:', error);
  } finally {
    // Quit the WebDriver session
    await driver.quit();
  }
}

// Execute the sign-in test function
signInTest();
