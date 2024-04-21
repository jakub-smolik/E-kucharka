const Ajv = require("ajv");
const ajv = new Ajv();

const categoryDao = require("../../dao/categoryDao.js");
// Validation schema
const schema = {
    type: "object",
    properties: {
        id: {type: "string", minLength: 2, maxLength: 2},
        title: {type: "string", maxLength: 60},
        description: {type: "string", maxLength: 300},
    },
    required: ["id", "title", "description"],
    additionalProperties: false
};
/**
 * This function will manage process of new category creation.
 * @param {Object} req HTTP request 
 * @param {Object} res HTTP response
 * @returns 
 */
async function create(req, res) {
    try {
        // Getting category object from HTTP request.
        let category = req.body;
        // Validation of received object.
        const valid = ajv.validate(schema, category);
        if (!valid) {
            res.status(400).json({
                code: "invalidInputData",
                message: "Vstupní data nejsou v požadovaném formátu",
                validationError: ajv.errors,
            });
        return
        }
        // Calling DAO method to create new category in the storage.
        category = categoryDao.create(category);
        res.json(category);
    } catch(e) {
        res.set(500).json({message: e.message});
    }
}

module.exports = create;