const { Builder, By, Key, until } = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('https://darknesx324.github.io/GreenGearCI.github.io/');

    // Esperar a que la página cargue completamente
    await driver.wait(until.elementLocated(By.id('contenedor-productos')), 5000);

    // Encontrar el primer botón de "Agregar" y hacer clic en él
    const botonAgregar = await driver.findElement(By.className('producto-agregar'));
    await botonAgregar.click();

    // Esperar a que aparezca el mensaje de producto agregado
    await driver.wait(until.elementLocated(By.className('toastify')), 5000);

    // Verificar si el número en el carrito se ha actualizado correctamente
    const numerito = await driver.findElement(By.id('numerito'));
    const numeritoTexto = await numerito.getText();
    if (parseInt(numeritoTexto) === 1) {
      console.log('El número en el carrito se ha actualizado correctamente.');
    } else {
      console.error('ERROR: El número en el carrito no se ha actualizado correctamente.');
    }

    console.log('Test completado con éxito.');
  } finally {
    await driver.quit();
  }
})();



