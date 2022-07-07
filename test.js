const { Builder, Capabilities, By, } = require('selenium-webdriver');
const chromeCapabilities = Capabilities.chrome();
const assert = require('assert');


async function TC_Login_001(){
    chromeCapabilities.set('chromeOptions', {args:['--headless']});
    let driver = await new Builder().withCapabilities(chromeCapabilities).build(); //instanciamos driver

    await driver.get('http://d275h292qzwkdh.cloudfront.net/');
    await driver.manage().window().maximize();

    await driver.sleep(3000); //esperamos 3 segundos

    await driver.findElement(By.linkText('Iniciar sesión')).click();
    await driver.findElement(By.id('email')).sendKeys('aye@gmail.com');
    await driver.findElement(By.id('password')).sendKeys('1234567');
    await driver.findElement(By.xpath("//button[@type='submit']")).click();

    await driver.sleep(2000);

    let textCompare = await driver.findElement(By.className("heading size-sm color-primary")).getText();
    //console.log(textCompare.split(" "));
    //console.log(textCompare);
    assert.equal(textCompare, "Hola,\nAye Garcia");
    console.log("Login exitoso");

    await driver.quit();
}

TC_Login_001()
.catch( () => {
    console.error("no se encuentra el elemento");
  });