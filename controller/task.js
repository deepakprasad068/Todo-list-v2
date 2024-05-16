const user = require("../models/users");
const users = require("../models/users");
const task = require("../models/task");

module.exports.add = async (req, res) => {
    try {
        const person = await user.findById(req.session.userId);
        const { title, description } = req.body;
        const work = new task({ title, description });
        await work.save();
        person.task.push(work);
        await person.save();

        res.redirect("/home");
    }
    catch (error) {
        res.send(error);
    }

}

module.exports.remove = async (req, res) => {

    const person = await user.findById(req.session.userId).populate('task');
    person.task = person.task.filter(task => task._id !== req.body._id);
    await person.save();
    await task.findByIdAndDelete(req.body._id);
    res.redirect("/home");

}

module.exports.update = async (req, res) => {

    const tasks = await task.findById(req.body.id);
    if (tasks.state == true) {
        tasks.state = false;
    }
    else {
        tasks.state = true;
    }
    await tasks.save();
    res.redirect('/home');
}