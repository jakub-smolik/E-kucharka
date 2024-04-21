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
 * Function will manage process of recipie removing.
 * @param {Object} req HTTP request
 * @param {Object} res HTTP response
 * @returns 
 */
async function remove(req, res) {
    try {
        // Getting object with recipie identifiers from HTTP request.
        let identifiers = req.body;
        // Validating of received object.
        const valid = ajv.validate(schema, identifiers);
        if (!valid) {
            res.status(400).json({
                code: "invalidInputData",
                message: "Vstupní data nejsou v požadovaném formátu nebo chybí",
                validationError: ajv.errors,
            });
            return
        }
        // Calling DAO method to remove particular entry from the storage.
        result = recipieDao.remove(identifiers);
        res.json(result);
    } catch(e) {
        res.set(500).json({message: e.message});
    }
}

module.exports = remove;