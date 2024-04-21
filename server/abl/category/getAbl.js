const Ajv = require("ajv");
const ajv = new Ajv();

const categoryDao = require("../../dao/categoryDao.js");

// Validation schema of receieved object.
const schema = {
    type: "object",
    properties: {
        id: {type: "string", minLength: 2, maxLength: 2},
    },
    required: ["id"],
    additionalProperties: false
};

/**
 * ¨Function will manage the process that return one particular recipie category.
 * @param {Object} req HTTP reguest 
 * @param {Onject} res HTTP response
 * @returns 
 */
async function get(req, res) {
    try {
        // Getting parameters from HTTP request body.
        const reqParams = req.body;
        // Validation of parameters in received object.
        const valid = ajv.validate(schema, reqParams);
        if (!valid) {
            res.status(400).json({
                code: "invalidInputData",
                message: "Neplatná vstupní data.",
                validationError: ajv.errors, 
            });
            return
        }
        // Calling of DAO method for getting selected category.
        const category = categoryDao.get(reqParams.id)
        if(!category) {
            res.status(404).json({
                code: "categoryNotFound",
                message: "Požadovaná kategorie nebyla nalezena.",
            })
            return
        }

        res.json(category);
    } catch(e) {
        res.status(500).json({message: e.message});
    }
}

module.exports = get;