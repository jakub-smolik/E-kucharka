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
 * Function will manage process of getting tip for recipie.
 * @param {Object} req HTTP request
 * @param {Object} res HTTP response
 * @returns 
 */
async function getTip(req, res) {
    try {
        // Getting object with category id from HTTP request
        let identifier = req.query;
        // Validating of received object.
        const valid = ajv.validate(schema, identifier);
        if (!valid) {
            res.status(400).json({
                code: "invalidInputData",
                message: "Vstupní data nejsou v požadovaném formátu nebo chybí",
                validationError: ajv.errors,
            });
            return
        }
        // Calling DAO method to choose random recipie from the storage.
        const reipieTip = recipieDao.getTip(identifier.categoryId);
        
        res.json(reipieTip);
    } catch(e) {
        res.set(500).json({message: e.message});
    }
}

module.exports = getTip;