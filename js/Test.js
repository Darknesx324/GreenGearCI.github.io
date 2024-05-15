const { Builder, By, Key, until } = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('https://darknesx324.github.io/GreenGearCI.github.io/');

    
    await driver.wait(until.elementLocated(By.id('contenedor-productos')), 5000);

    
    const botonAgregar = await driver.findElement(By.className('producto-agregar'));
    await botonAgregar.click();

    
    await driver.wait(until.elementLocated(By.className('toastify')), 5000);

    
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



