const Ajv = require("ajv");
const ajv = new Ajv();

const recipieDao = require("../../dao/recipieDao.js");

// Object schema for validation of input
const schema = {
    type: "object",
    properties: {
        title: {type: "string", maxLength: 50},
        categoryId: {type: "string", minLength: 2, maxLength: 2},
        ingredients: {type: "string", maxLength: 200},
        process: {type: "string", maxLength: 500},
    },
    required: ["title", "categoryId", "ingredients", "process"],
    additionalProperties: true
};

/**
 * Function will manage process of new recipie creation.
 * @param {Object} req HTTP request
 * @param {Object} res HTTP response
 * @returns 
 */
async function create(req, res) {
    try {
        // Getting recipie object from HTTP request
        let recipie = req.body;
        // Validating of received object.
        const valid = ajv.validate(schema, recipie);
        if (!valid) {
            res.status(400).json({
                code: "invalidInputData",
                message: "Vstupní data nejsou v požadovaném formátu nebo chybí",
                validationError: ajv.errors,
            });
            return
        }
        // Calling DAO method to create new entry into the storage.
        recipie = recipieDao.create(recipie);
        res.json(recipie);
    } catch(e) {
        res.set(500).json({message: e.message});
    }
}

module.exports = create;