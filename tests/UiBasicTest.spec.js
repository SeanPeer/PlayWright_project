import {login_screen} from "../Mapping/login_page_map"
import {login} from "../utils/function_utils"


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
  
    await login(page,'sean','1234')
    // const actual_error = await page.locator(login_screen.error_message).textContent()

    await expect(page.locator(login_screen.error_message)).toContainText(expected_error)


});


test("True Positive Test - Correct credtials - excpected to login correctly" , async({browser, page}) => {

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    await login(page,'rahulshettyacademy', 'learning')

    await expect(page.locator(login_screen.iphone)).toBeVisible()




})


test("Test validation of items - title & price" , async({browser, page}) => {

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    await login(page,'rahulshettyacademy', 'learning')

    const expected_titles = [ 'iphone X', 'Samsung Note 8', 'Nokia Edge', 'Blackberry' ]
    const expected_prices = [ '$24.99', '$24.99', '$24.99', '$24.99' ] 
    await page.locator(login_screen.items_title).first().waitFor();  
    const actual_titles = await page.locator(login_screen.items_title).allTextContents()
    const actual_prices = await page.locator(login_screen.items_price).allTextContents()
    console.log(await page.locator(login_screen.items_title).first().textContent())
    console.log(actual_prices)

    expect(actual_titles).toEqual(expected_titles)  
    expect(actual_prices).toEqual(expected_prices)
   
    

})



/*
To Do - Test items page:
1. price 
2. visibility 
*/

    
