const Employee = require('../model/Employee');

const getAllEmployees = async (req, res) => {
    const employees = await Employee.find();
    if (!employees || !employees.length > 0) return res.status(204).json({ 'message': 'Employes not found.' });
    res.json(employees);
};

const createNewEmployee = async (req, res) => {

    if (!req?.body?.firstname || !req?.body?.lastname) {
        return res.status(400).json({ 'message': 'First and last names are require.' });
    }

    try {
        const employee = await Employee.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
        });
        res.status(201).json(employee);

    } catch (err) {
        console.error(err);
    }

};

const updateEmployee = async (req, res) => {

    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'Id is require.' });
    }
    const employee = await Employee.findOne({ _id: req.body.id }).exec();
    if (!employee) {
        return res.status(204).json({ 'message': `Employee Id ${req.body.id} Not FOund.` });
    }
    if (req.body?.firstname) employee.firstname = req.body.firstname;
    if (req.body?.lastname) employee.lastname = req.body.lastname;

    const updatedEmployee = await employee.save();
    res.json(updatedEmployee);
};

const deleteEmployee = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'Id is require.' });
    }
    const employee = await Employee.findOne({ _id: req.body.id }).exec();
    if (!employee) {
        return res.status(204).json({ 'message': `Employee Id ${req.body.id} Not FOund.` });
    }
    const deletedEmp = await Employee.deleteOne({ _id: req.body.id });
    res.json(deletedEmp);
};

const getEmployee = async (req, res) => {
    if (!req?.params?.id) {
        return res.status(400).json({ 'message': 'Id is require.' });
    }
    const employee = await Employee.findOne({ _id: req.params.id }).exec();
    if (!employee) {
        return res.status(204).json({ 'message': `Employee Id ${req.params.id} Not FOund.` });
    }
    res.json(employee);
};

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}