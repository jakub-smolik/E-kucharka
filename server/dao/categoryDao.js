const fs = require("fs");
const path = require("path");

const categoryFolderPath = path.join(__dirname, "storage", "category");

/**
 * Function will create new category
 * @param {Object} category 
 * @returns 
 */
function create(category) {
    try {
        const filePath = path.join(categoryFolderPath, category.id+".json");
        const fileData = JSON.stringify(category);
        fs.writeFileSync(filePath, fileData, "utf-8");
        return category;    
    } catch(error) {
        throw {code: "failedToCreateCategory", message: error.message};
    }
}

/**
 * Function will return one selected category.
 * @param {string} id Id of category
 * @returns {Object} Particular category.
 */
function get(id) {
    try {
        const filePath = path.join(categoryFolderPath, id+".json");
        const fileData = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(fileData);
    } catch(error) {
        if(error.code === "ENOENT") return null;
        throw {code: "failedToReadCategory", message: error.message};
    }
}

/**
 * Function will return list of all existing categories.
 * @returns {Object} List of all existing categories
 */
function getAll () {
    try {
        const files = fs.readdirSync(categoryFolderPath);
        const categoryList = files.map((file) => {
            const fileData = fs.readFileSync(path.join(categoryFolderPath, file), "utf-8");
            return JSON.parse(fileData);
        });
        return categoryList;
    } catch(error) {
        throw {code: "failedToListCategories", message: error.message};
    }
}

module.exports = {
    create,
    get,
    getAll,
}