import {login_screen} from "../Mapping/login_page_map"

const {test, expect} = require('@playwright/test');
const { assert, time } = require('console');

function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}


test('Browser context initialization', async ({browser}) => {

    const context = await browser.newContext(); //inside the braces i can inject cookies
    const page = await context.newPage();
    
    await page.goto("https://google.com/")
    const expected_name = 'Google'
    const actual_name = await page.title()
    
    await expect(page).toHaveTitle(expected_name)

} ); 

test('False Positive Test - Insering wrong credtials - Expecting error message', async ({browser, page}) => {


    const expected_error = 'Incorrect username/password.'
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    await page.locator(login_screen.username).fill("Sean")
    await page.locator(login_screen.password).fill("123456")
    await page.locator(login_screen.user_checlbox).click()
    await page.locator(login_screen.agree_checkbox).click()
    await page.locator(login_screen.sign_button).click()
  
    // const actual_error = await page.locator(login_screen.error_message).textContent()

    await expect(page.locator(login_screen.error_message)).toContainText(expected_error)


});


test("True Positive Test - Correct credtials - excpected to login correctly" , async({browser, page}) => {

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    await page.locator(login_screen.username).fill("rahulshettyacademy")
    await page.locator(login_screen.password).fill("learning")
    await page.locator(login_screen.user_checlbox).click()
    await page.locator(login_screen.agree_checkbox).click()
    await page.locator(login_screen.sign_button).click()

    await expect(page.locator(login_screen.iphone)).toBeVisible()

})


/*
To Do - Test items page:
1. price 
2. visibility 
*/

    
