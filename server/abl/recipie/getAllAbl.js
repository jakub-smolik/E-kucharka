const Ajv = require("ajv");
const ajv = new Ajv();

const recipieDao = require("../../dao/recipieDao.js");

// Object schema for validation of input
const schema = {
    type: "object",
    properties: {
        categoryId: {type: "string", minLength: 2, maxLength: 2},
    },
    required: ["categoryId"],
    additionalProperties: false
};

/**
 * Function will manage process that return recipie list according to selected category.
 * @param {Object} req HTTP request 
 * @param {Object} res HTTP response
 * @returns 
 */
async function getAll(req, res) {
    try {
        // Getting object from HTTP request. This object contains id of category of whitch recipies will be returned.
        let idetifier = req.body;
        // Validation of received object.
        const valid = ajv.validate(schema, idetifier);
        if (!valid) {
            res.status(400).json({
                code: "invalidInputData",
                message: "Neplatné Id kategorie",
                validationError: ajv.errors,
            });
            return
        }
        // Calling DAO method to return recipie list from the storage.
        recipies = recipieDao.getAll(idetifier.categoryId);
        res.json(recipies);
    } catch(e) {
        res.set(500).json({message: e.message});
    }
}

module.exports = getAll;