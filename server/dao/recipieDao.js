const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

// Path to the folder where recipie files are located.
const recipieFolderPath = path.join(__dirname, "storage", "recipie");

/**
 * Function will compile recipie data and save them into the new created json file.
 * @param {Object} recipie Recipie object 
 * @returns {Object} Complete new recipie object
 */
function create(recipie) {
    try {
        // Adding ID and date of creation to the recipie object.
        recipie.id = crypto.randomBytes(16).toString("hex");
        recipie.date = new Date().toLocaleString("cs-CZ");
        // Preparing object to be placed into the new file.
        const categoryId = recipie.categoryId;
        const filePath = path.join(recipieFolderPath, categoryId, recipie.id+".json");
        const fileData = JSON.stringify(recipie);
        // Creating new file.
        fs.writeFileSync(filePath, fileData, "utf-8");
        // Once the new file is created, recipie object will be returned.
        return recipie;    
    } catch(error) {
        throw {code: "failedToCreateRecipie", message: error.message};
    }
}

/**
 * Function will return recipie object according to its ID and category.
 * @param {Object} id Identifiers recipie and its category 
 * @returns {Object} Recipie
 */
function get(id) {
    try {
        // Preparing path to category folder where recipe file is located.
        const filePath = path.join(recipieFolderPath, id.categoryId ,id.recipieId+".json");
        const fileData = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(fileData);
    } catch(error) {
        if(error.code === "ENOENT") return null;
        throw {code: "failedToReadCategory", message: error.message};
    }
}

/**
 * Function will return complete list of recipies from particular category.
 * @param {string} categoryId Id of category where recipies will be listed from
 * @returns {Object} List of recipies that belongs to selected category
 */
function getAll(categoryId) {
    try {
        // Preparing path to the category folder.
        const categoryPath = path.join(recipieFolderPath,categoryId);
        const files = fs.readdirSync(categoryPath);
        const recipieList = files.map((file) => {
            const fileData = fs.readFileSync(path.join(categoryPath, file), "utf-8");
            return JSON.parse(fileData);
        });
        return recipieList;
    } catch(error) {
        throw {code: "failedToListRecipies", message: error.message};
    }
}

/**
 * Function will update existing recipie with new data.
 * @param {Object} recipie New version of recipie that will replace the old one.
 * @returns {Object} New version of recipie
 */
function update(recipie) {
    try {
        // Getting old version of recipie from storage.
        const oldRecipie = get({recipieId: recipie.id, categoryId: recipie.categoryId});
        // Check if old version of recipie exists in the storage.
        if(!oldRecipie) {
            return null;
        }
        // Updating existing recipie and saving data back to the storage.
        const newRecipie = {...oldRecipie, ...recipie};
        // In case of category change, old entry will be removed from its location
        // and updated recipie will be saved into the new category.
        if (recipie.updatedCategoryId && recipie.updatedCategoryId != recipie.categoryId) {
            newRecipie.categoryId = newRecipie.updatedCategoryId;
            delete newRecipie.updatedCategoryId;
            remove({recipieId: oldRecipie.id, categoryId: oldRecipie.categoryId});
        }
        // Compiling the path for updated recipie.
        const filePath = path.join(recipieFolderPath, newRecipie.categoryId, newRecipie.id+".json");
        const fileData = JSON.stringify(newRecipie);
        fs.writeFileSync(filePath, fileData, "utf-8");
        // Returning object of new recipie version.
        return newRecipie;
    } catch(error) {
        throw {code: "failedToUpdateRecipie", message: error.message};
    }
}

/**
 * Function will remove particular file according to its Id.
 * @param {Object} id Object containing identifiers of category and recipie that will be removed
 * @returns {Object} Empty object
 */
function remove(id) {
    try {
        // Compiling path to recipie file. File will be romowed and empty object will be returned.
        const filePath = path.join(recipieFolderPath, id.categoryId, id.recipieId+".json");
        fs.unlinkSync(filePath);
        return {};
    } catch(error) {
        throw {code: "failedToRemoveRecipie", message: error.message};
    }
}

/**
 * Function will choose random recipie from selected category.
 * @param {string} categoryId Id of recipie category where recipie will be randomly choosed
 * @returns {Object} Random recipie
 */
function getTip(categoryId) {
    try {
        // Getting list of fieles in category
        const categoryPath = path.join(recipieFolderPath,categoryId);
        const files = fs.readdirSync(categoryPath);
        // Generating random number (index number) according to the length of files list.
        const randomIndex = crypto.randomInt(0, files.length-1);
        // Pick the file from generated random position and return its recipie.
        const randomFile = files[randomIndex];
        const recipieTip = fs.readFileSync(path.join(categoryPath, randomFile));
        return JSON.parse(recipieTip);
    } catch(error) {
        throw {code: "unableToGetRecipieTip", message: error.message};
    }
}

module.exports = {
    create,
    get,
    getAll,
    update,
    remove,
    getTip,
}