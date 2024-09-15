

const generator = async(page, info) => {

    return page.locator(info)
} 

module.exports = {generator}