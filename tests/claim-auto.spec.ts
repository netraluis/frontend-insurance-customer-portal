import { test, expect } from "@playwright/test";

test.describe("Auto Claim Form - Step 1", () => {
  test.beforeEach(async ({ page }) => {
    // Go to the claim-auto page (replace 'es' with your locale if needed)
    await page.goto("http://localhost:3000/es/claim-auto");
  });

  test('test', async ({ page }) => {
    await page.goto('http://localhost:3000/es/claim-auto');
    await page.getByRole('textbox', { name: 'Nombre' }).click();
    await page.getByRole('textbox', { name: 'Nombre' }).fill('netra');
    await page.getByRole('textbox', { name: 'Apellido' }).click();
    await page.getByRole('textbox', { name: 'Apellido' }).fill('castells');
    await page.getByRole('textbox', { name: 'Correo electrónico' }).click();
    await page.getByRole('textbox', { name: 'Correo electrónico' }).fill('netraluis');
    await page.getByRole('textbox', { name: 'Correo electrónico' }).click();
    await page.getByRole('textbox', { name: 'Correo electrónico' }).fill('netraluis@gmail.com');
    await page.getByRole('textbox', { name: 'Correo electrónico' }).press('Tab');
    await page.getByRole('combobox').press('Tab');
    await page.getByRole('combobox').click();
    await page.getByText('Andorra').click();
    await page.getByRole('textbox', { name: 'Teléfono *' }).fill('644253');
    await page.locator('div').filter({ hasText: /^Conductor diferente¿El conductor es diferente al titular de la póliza\?$/ }).nth(1).click();
    await page.locator('#hasDifferentDriver').click();
    await page.getByRole('textbox', { name: 'Nombre del conductor *' }).click();
    await page.getByRole('textbox', { name: 'Nombre del conductor *' }).fill('Anton');
    await page.getByRole('textbox', { name: 'Nombre del conductor *' }).press('Tab');
    await page.getByRole('textbox', { name: 'Apellido del conductor *' }).fill('Odena');
    await page.getByRole('textbox', { name: 'Apellido del conductor *' }).press('Tab');
    await page.getByPlaceholder(' ', { exact: true }).fill('2025-06-02');
    await page.getByRole('textbox', { name: 'DNI del conductor' }).click();
    await page.getByRole('textbox', { name: 'DNI del conductor' }).fill('455623');
    await page.getByRole('textbox', { name: 'Email del conductor' }).click();
    await page.getByRole('textbox', { name: 'Email del conductor' }).fill('antonodena@gmail.com');
    await page.getByRole('textbox', { name: 'Teléfono del conductor' }).click();
    await page.getByRole('textbox', { name: 'Teléfono del conductor' }).fill('655312');
    await page.getByRole('button', { name: 'Siguiente' }).click();
    await page.getByRole('combobox').click();
    await page.getByRole('option', { name: 'Barco' }).click();
    await page.getByRole('textbox', { name: 'Marca del Vehículo' }).click();
    await page.getByRole('textbox', { name: 'Marca del Vehículo' }).fill('Toyota');
    await page.getByRole('textbox', { name: 'Modelo del Vehículo' }).click();
    await page.getByRole('textbox', { name: 'Modelo del Vehículo' }).fill('X4');
    await page.getByRole('textbox', { name: 'Matrícula' }).click();
    await page.getByRole('textbox', { name: 'Matrícula' }).fill('PN556');
    await page.getByRole('button', { name: 'Siguiente' }).click();
    await page.getByRole('textbox', { name: 'Lugar del accidente' }).dblclick();
    await page.getByRole('textbox', { name: 'Lugar del accidente' }).fill('Ramer 23');
    await page.getByPlaceholder(' ', { exact: true }).fill('2025-05-27');
    await page.getByRole('textbox', { name: 'Descripción detallada del' }).click();
    await page.getByRole('textbox', { name: 'Descripción detallada del' }).fill('choque y pum');
    await page.getByRole('textbox', { name: 'Descripción de los daños *' }).click();
    await page.getByRole('textbox', { name: 'Descripción de los daños *' }).fill('golpe en el faro derecho');
    // await page.getByRole('button', { name: 'Seleccionar fotos' }).click();
    // await page.pause();
    // await page.getByRole('button', { name: 'Seleccionar fotos' }).setInputFiles('20250530_1400_Gato Tomando el Sol_remix_01jwgqsp87e3g8jfrnbbkk9805.png');
    await page.setInputFiles('input[type="file"]', ['tests/uploads/fotodano.png', 'tests/uploads/AA2Rectangle.png']);
    await page.locator('#policeInvolved').click();
    await page.locator('#trafficServiceInvolved').click();
    await page.locator('#friendlyReport').click();
    await page.locator('#bodilyInjuries').click();
    await page.getByRole('textbox', { name: 'Lesiones corporales Descripci' }).click();
    await page.getByRole('textbox', { name: 'Lesiones corporales Descripci' }).fill('me he roto la clavicula derecha');
    // await page.getByRole('button', { name: 'Seleccionar archivo' }).click();
    // await page.getByRole('button', { name: 'Seleccionar archivo' }).setInputFiles('Claim_Summary_5U4IM400.pdf');
    await page.setInputFiles('input[type="file"][accept="image/*,.jpeg,.jpg,.png,application/pdf,.pdf"]', 'tests/uploads/Claim_Summary_5U4IM400.pdf');
    // await page.setInputFiles('input[type="file"]', 'tests/uploads/Claim_Summary_5U4IM400.pdf');
    // await page.pause();
    await page.getByRole('button', { name: 'Siguiente' }).click();
    await page.getByRole('switch', { name: 'Alternar conductores' }).click();
    await page.getByRole('button', { name: 'Añadir conductor' }).click();
    await page.getByRole('textbox', { name: 'Nombre *' }).fill('juan ');
    await page.getByRole('textbox', { name: 'Apellido *' }).click();
    await page.getByRole('textbox', { name: 'Apellido *' }).fill('implicado ');
    await page.getByText('Nombre *Apellido *Correo').click();
    await page.getByRole('textbox', { name: 'Correo electrónico' }).click();
    await page.getByRole('textbox', { name: 'Correo electrónico' }).fill('juanimplicado@gmail.com');
    await page.getByRole('textbox', { name: 'Teléfono' }).click();
    await page.getByRole('textbox', { name: 'Teléfono' }).fill('644532');
    await page.getByRole('textbox', { name: 'Marca del vehículo *' }).click();
    await page.getByRole('textbox', { name: 'Marca del vehículo *' }).fill('honda');
    await page.getByRole('textbox', { name: 'Marca del vehículo *' }).press('Tab');
    await page.getByRole('textbox', { name: 'Modelo del vehículo *' }).fill('Civic');
    await page.getByRole('textbox', { name: 'Modelo del vehículo *' }).press('Tab');
    await page.getByRole('textbox', { name: 'Matrícula *' }).fill('PR556');
    await page.getByRole('textbox', { name: 'Matrícula *' }).press('Tab');
    await page.getByRole('textbox', { name: 'Compañía aseguradora' }).fill('Asseguras');
    await page.getByRole('button', { name: 'Añadir conductor' }).click();
    await page.locator('.p-0 > div:nth-child(3) > div').click();
    await page.getByRole('switch', { name: 'Alternar testigos presentes' }).click();
    await page.getByRole('button', { name: 'Añadir testigo' }).click();
    await page.getByRole('textbox', { name: 'Nombre *' }).fill('Perez');
    await page.getByRole('textbox', { name: 'Nombre *' }).press('Tab');
    await page.getByRole('textbox', { name: 'Apellido *' }).fill('PrimoTestigo');
    await page.getByRole('textbox', { name: 'Apellido *' }).press('Tab');
    await page.getByRole('textbox', { name: 'Correo electrónico' }).fill('primotestigo@gmail.com');
    await page.getByRole('textbox', { name: 'Correo electrónico' }).press('Tab');
    await page.getByRole('textbox', { name: 'Teléfono' }).fill('677435');
    await page.getByRole('textbox', { name: 'Teléfono' }).press('Tab');
    await page.getByRole('textbox', { name: 'Declaración *' }).fill('vi como chocaba ');
    await page.getByRole('button', { name: 'Añadir testigo' }).click();
    await page.getByRole('button', { name: 'Siguiente' }).click();
    // await page.getByRole('button', { name: 'Seleccionar archivos' }).click();
    // await page.getByRole('button', { name: 'Seleccionar archivos' }).setInputFiles('Claim_Summary_UVPWK1BX.pdf');
    await page.setInputFiles('input[type="file"]', 'tests/uploads/Claim_Summary_UVPWK1BX.pdf');
    // await page.pause();
    await page.getByRole('button', { name: 'Siguiente' }).click();
    await page.locator('#review-form div').filter({ hasText: 'Confirmo que toda la' }).click();
    await page.getByRole('button', { name: 'Enviar parte' }).click();
    await page.getByRole('button', { name: 'Open issues overlay' }).click();
    await page.getByRole('button', { name: 'Collapse issues badge' }).click();


    // Retrieve and log the form state and current step from the window object
    const formState = await page.evaluate(() => (window as any).__CLAIM_FORM_STATE__);
    const currentStep = await page.evaluate(() => (window as any).__CLAIM_FORM_STEP__);
    console.log('Form State:', formState);
    console.log('Current Step:', currentStep);

    await page.pause();
  });

  // test("Fill personal information and verify fields", async ({ page }) => {
  //   await page.goto('http://localhost:3000/es/claim-auto');
  //   await page.getByRole('textbox', { name: 'Nombre' }).click();
  //   await page.getByRole('textbox', { name: 'Nombre' }).fill('Netra Luis');
  //   await page.getByRole('textbox', { name: 'Apellido' }).click();
  //   await page.getByRole('textbox', { name: 'Apellido' }).fill('Castells');
  //   await page.getByRole('textbox', { name: 'Correo electrónico' }).click();
  //   await page.getByRole('textbox', { name: 'Correo electrónico' }).fill('netraluis');
  //   await page.getByRole('textbox', { name: 'Correo electrónico' }).press('Alt+@');
  //   await page.getByRole('textbox', { name: 'Correo electrónico' }).click();
  //   await page.getByRole('textbox', { name: 'Correo electrónico' }).fill('netraluis@gmail.com');
  //   await page.getByText('Teléfono *🇦🇩+').click();
  //   await page.getByRole('textbox', { name: 'Teléfono *' }).fill('6');
  //   await page.getByRole('combobox').click();
  //   await page.getByPlaceholder('Search country...').fill('sp');
  //   await page.getByText('Spain').click();
  //   await page.getByRole('textbox', { name: 'Teléfono *' }).click();
  //   await page.getByRole('textbox', { name: 'Teléfono *' }).fill('660060376');
  //   await page.locator('#hasDifferentDriver').click();
  //   await page.getByRole('textbox', { name: 'Nombre del conductor *' }).click();
  //   await page.getByRole('textbox', { name: 'Nombre del conductor *' }).fill('Ton');
  //   await page.getByRole('textbox', { name: 'Apellido del conductor *' }).click();
  //   await page.getByRole('textbox', { name: 'Apellido del conductor *' }).fill('Odena');
  //   await page.getByPlaceholder(' ', { exact: true }).fill('1992-06-17');
  //   await page.getByRole('textbox', { name: 'DNI del conductor' }).click();
  //   await page.getByRole('textbox', { name: 'DNI del conductor' }).fill('456345');
  //   await page.getByRole('textbox', { name: 'Email del conductor' }).click();
  //   await page.getByRole('textbox', { name: 'Email del conductor' }).fill('tonodena@gmail.com');
  //   await page.getByRole('textbox', { name: 'Teléfono del conductor' }).dblclick();
  //   await page.getByRole('textbox', { name: 'Teléfono del conductor' }).fill('633122');
    
  //   await page.getByRole('button', { name: 'Siguiente' }).click();

  //   // Retrieve and log the form state and current step from the window object
  //   const formState = await page.evaluate(() => (window as any).__CLAIM_FORM_STATE__);
  //   const currentStep = await page.evaluate(() => (window as any).__CLAIM_FORM_STEP__);
  //   console.log('Form State:', formState);
  //   console.log('Current Step:', currentStep);

  //   // Optionally, assert that the current step is 2 after clicking 'Siguiente'
  //   await expect(currentStep).toBe(2);

  //   await page.pause();
  // });

  test("Show and fill different driver fields", async ({ page }) => {});
});
