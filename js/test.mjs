import { Builder, By, until } from 'selenium-webdriver';
import { expect } from 'chai';
import { describe, it, before, after } from 'mocha';

describe('GreenGear Functional Tests', function() {
    this.timeout(30000);
    let driver;

    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://darknesx324.github.io/GreenGearCI.github.io/');  
    });

    after(async function() {
        await driver.quit();
    });

    it('should verify the navigation menu is present', async function() {
        const navMenu = await driver.findElement(By.css('nav ul.menu'));
        expect(navMenu).to.not.be.null;

        const menuItems = await driver.findElements(By.css('nav ul.menu li'));
        expect(menuItems.length).to.be.greaterThan(0);
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

    // Pruebas fallidas intencionalmente para verificar los resultados negativos

    it('should fail to open and close the menu incorrectly', async function() {
        await driver.findElement(By.id('open-menu')).click();
        await driver.sleep(1000);
        const asideVisible = await driver.findElement(By.css('aside')).getAttribute('class');
        expect(asideVisible).to.not.include('aside-visible');  
    });

    it('should fail to load all products', async function() {
        await driver.findElement(By.id('todos')).click();
        await driver.sleep(1000);
        const productos = await driver.findElements(By.css('#contenedor-productos .producto'));
        expect(productos.length).to.equal(0);  
    });

    it('should fail to load abrigos incorrectly', async function() {
        await driver.findElement(By.id('abrigos')).click();
        await driver.sleep(1000);
        const titulo = await driver.findElement(By.id('titulo-principal')).getText();
        expect(titulo).to.not.equal('Abrigos'); 
    });

    it('should fail to add a product to the cart', async function() {
        await driver.findElement(By.id('todos')).click();
        await driver.sleep(1000);
        const botonesAgregar = await driver.findElements(By.css('.producto-agregar'));
        await botonesAgregar[0].click();
        const numerito = await driver.findElement(By.id('numerito')).getText();
        expect(numerito).to.equal('0');  
    });

    it('should fail to show empty cart message incorrectly', async function() {
        await driver.findElement(By.css('a.boton-carrito')).click();
        await driver.sleep(1000);
        const mensajeVacio = await driver.findElement(By.id('carrito-vacio')).isDisplayed();
        expect(mensajeVacio).to.be.false;  
    });
});





