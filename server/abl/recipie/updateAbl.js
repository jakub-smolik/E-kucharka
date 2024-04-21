const Ajv = require("ajv");
const ajv = new Ajv();

const recipieDao = require("../../dao/recipieDao.js");

// Object schema for validation of input
const schema = {
    type: "object",
    properties: {
        id: {type: "string", minLength: 32, maxLength: 32},
        title: {type: "string", maxLength: 50},
        categoryId: {type: "string", minLength: 2, maxLength: 2},
        updatedCategoryId: {type: "string"},
        ingredients: {type: "string", maxLength: 200},
        process: {type: "string", maxLength: 500},
        date: {type: "string"},
    },
    required: ["id","title", "categoryId", "ingredients", "process", "date"],
    additionalProperties: false
};

/**
 * Function will manage process of recipie updating.
 * @param {Object} req HTTP request
 * @param {Object} res HTTP response
 * @returns 
 */
async function update(req, res) {
    try {
        // Getting recipie object from HTTP request
        let newVersion = req.body;
        // Validating of received object.
        const valid = ajv.validate(schema, newVersion);
        if (!valid) {
            res.status(400).json({
                code: "invalidInputData",
                message: "Vstupní data nejsou v požadovaném formátu nebo chybí",
                validationError: ajv.errors,
            });
            return
        }
        // Calling DAO method to update existing entry in the storage.
        const updatedRecipie = recipieDao.update(newVersion);
        if (!updatedRecipie) {
            res.status(404).json({
                code: "recipeNotFound",
                message: "Recept pro aktualizaci nebyl nalezen.",
            });
        }
        res.json(updatedRecipie);
    } catch(e) {
        res.set(500).json({message: e.message});
    }
}

module.exports = update;