const { test, expect, chromium } = require("@playwright/test");

const { email, password, invalidEmail, invalidPassword } = require("../user");

test("Right authorization", async ({ page }) => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 5000,
    devtools: true,
  });

  await page.goto("https://netology.ru/");
  await page.getByRole("link", { name: "Войти" }).click();
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill(email);
  await page.getByPlaceholder("Пароль").click();
  await page.getByPlaceholder("Пароль").fill(password);
  await page.getByTestId("login-submit-btn").click();
  await expect(page.locator("h2")).toHaveText("Мои курсы и профессии");
  await browser.close();
});

test("Wrong authorization", async ({ page }) => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 5000,
    devtools: true,
  });

  await page.goto("https://netology.ru/");
  await page.getByRole("link", { name: "Войти" }).click();
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill(invalidEmail);
  await page.getByPlaceholder("Пароль").click();
  await page.getByPlaceholder("Пароль").fill(invalidPassword);
  await page.getByTestId("login-submit-btn").click();
  const error = await page.locator('[data-testid="login-error-hint"]');
  await expect(error).toHaveText("Вы ввели неправильно логин или пароль");

  await browser.close();
});
