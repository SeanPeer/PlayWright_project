import {login_screen} from "../Mapping/login_page_map"

async function login(page, username, password) {
    await page.locator(login_screen.username).fill(username)
    await page.locator(login_screen.password).fill(password)
    await page.locator(login_screen.user_checlbox).click()
    await page.locator(login_screen.agree_checkbox).click()
    await page.locator(login_screen.sign_button).click()
}

module.exports = {login}