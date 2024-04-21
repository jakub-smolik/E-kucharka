const Ajv = require("ajv");
const ajv = new Ajv();

const recipieDao = require("../../dao/recipieDao.js");

// Object schema for validation of input
const schema = {
    type: "object",
    properties: {
        recipieId: {type: "string", minLength: 32, maxLength: 32},
        categoryId: {type: "string", minLength: 2, maxLength: 2},
    },
    required: ["recipieId", "categoryId"],
    additionalProperties: false
};

/**
 * Function will manage process that return one recipie from the storage.
 * @param {Object} req HTTP request
 * @param {Object} res HTTP response
 * @returns 
 */
async function get(req, res) {
    try {
        // Getting object of recipie identifiers from HTTP request
        let recipieIdentifiers = req.body;
        // Validation of received object.
        const valid = ajv.validate(schema, recipieIdentifiers);
        if (!valid) {
            res.status(400).json({
                code: "invalidInputData",
                message: "Vstupní data nejsou v požadovaném formátu nebo chybí",
                validationError: ajv.errors,
            });
            return
        }
        // Calling DAO method to return recipie from the storage.
        recipie = recipieDao.get(recipieIdentifiers);
        res.json(recipie);
    } catch(e) {
        res.set(500).json({message: e.message});
    }
}

module.exports = get;