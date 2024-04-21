const categoryDao = require("../../dao/categoryDao.js");
/**
 * Function will manage process that return category list.
 * @param {Object} req HTTP request 
 * @param {Object} res HTTP response
 */
async function getAll(req, res) {
    try {
        const categoryList = categoryDao.getAll();
        res.json(categoryList);
    } catch(e) {
        res.status(500).json({message: e.message});
    }
}

module.exports = getAll;