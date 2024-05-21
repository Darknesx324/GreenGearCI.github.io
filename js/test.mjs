import { Builder, By, until } from 'selenium-webdriver';
import { expect } from 'chai';
import { describe, it, before, after } from 'mocha';

describe('GreenGear Functional Tests', function() {
    this.timeout(30000);
    let driver;

    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://darknesx324.github.io/GreenGearCI.github.io/');  // Cambia esto por la URL de tu sitio web
    });

    after(async function() {
        await driver.quit();
    });

    it('should open and close the menu', async function() {
        await driver.findElement(By.id('open-menu')).click();
        await driver.wait(until.elementLocated(By.css('aside.aside-visible')), 2000);
        const asideVisible = await driver.findElement(By.css('aside')).getAttribute('class');
        expect(asideVisible).to.include('aside-visible');

        await driver.findElement(By.id('close-menu')).click();
        await driver.sleep(1000);
        const asideClass = await driver.findElement(By.css('aside')).getAttribute('class');
        expect(asideClass).to.not.include('aside-visible');
    });

    it('should load all products', async function() {
        await driver.findElement(By.id('todos')).click();
        await driver.sleep(1000);
        const productos = await driver.findElements(By.css('#contenedor-productos .producto'));
        expect(productos.length).to.be.greaterThan(0);
    });

    it('should load abrigos', async function() {
        await driver.findElement(By.id('abrigos')).click();
        await driver.sleep(1000);
        const titulo = await driver.findElement(By.id('titulo-principal')).getText();
        expect(titulo).to.equal('Abrigos');
    });

    it('should add a product to the cart', async function() {
        await driver.findElement(By.id('todos')).click();
        await driver.sleep(1000);
        const botonesAgregar = await driver.findElements(By.css('.producto-agregar'));
        await botonesAgregar[0].click();
        const numerito = await driver.findElement(By.id('numerito')).getText();
        expect(numerito).to.equal('1');
    });

    it('should show empty cart message', async function() {
        await driver.findElement(By.css('a.boton-carrito')).click();
        await driver.sleep(1000);
        const mensajeVacio = await driver.findElement(By.id('carrito-vacio')).isDisplayed();
        expect(mensajeVacio).to.be.true;
    });

    it('should fail to open and close the menu incorrectly', async function() {
        await driver.findElement(By.id('open-menu')).click();
        await driver.sleep(1000);
        const asideVisible = await driver.findElement(By.css('aside')).getAttribute('class');
        expect(asideVisible).to.not.include('aside-visible');  // Esto fallará porque sí debería incluirlo
    });

    it('should fail to load all products', async function() {
        await driver.findElement(By.id('todos')).click();
        await driver.sleep(1000);
        const productos = await driver.findElements(By.css('#contenedor-productos .producto'));
        expect(productos.length).to.equal(0);  // Esto fallará porque sí hay productos
    });

    it('should fail to load abrigos incorrectly', async function() {
        await driver.findElement(By.id('abrigos')).click();
        await driver.sleep(1000);
        const titulo = await driver.findElement(By.id('titulo-principal')).getText();
        expect(titulo).to.not.equal('Abrigos');  // Esto fallará porque sí debería ser "Abrigos"
    });

    it('should fail to add a product to the cart', async function() {
        await driver.findElement(By.id('todos')).click();
        await driver.sleep(1000);
        const botonesAgregar = await driver.findElements(By.css('.producto-agregar'));
        await botonesAgregar[0].click();
        const numerito = await driver.findElement(By.id('numerito')).getText();
        expect(numerito).to.equal('0');  // Esto fallará porque sí se añadió el producto
    });

    it('should fail to show empty cart message incorrectly', async function() {
        await driver.findElement(By.css('a.boton-carrito')).click();
        await driver.sleep(1000);
        const mensajeVacio = await driver.findElement(By.id('carrito-vacio')).isDisplayed();
        expect(mensajeVacio).to.be.false;  // Esto fallará porque el mensaje sí debería mostrarse
    });
});




