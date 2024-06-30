const Task = require("../models/taskSchema.js");

module.exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        const pieData = [0, 0, 0, 0, 0];
        tasks.map((task) => {
            pieData[task.priority - 1]++;
        });
        return res.status(200).send({ tasks, pieData });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
};

module.exports.addTask = async (req, res) => {
    try {
        if (!req.body.newTodo) {
            return res.status(400).send({ message: "Please send task" });
        }

        const newTask = {
            task: req.body.newTodo,
            priority: req.body.star,
            isDone: false,
        };
        await Task.insertMany(newTask);
        res.status(201).send({ message: "Task Added successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
};

module.exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Task.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: "Task not found" });
        }
        return res.status(200).send({ message: "Task deleted successfully." });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
};

module.exports.updateTask = async (req, res) => {
    try {
        const { key } = req.params;
        const ToDoTask = req.body.Todo;
        const priority = req.body.rate;
        const result = await Task.findById(key);

        if (!result) {
            return res.status(404).json({ message: "Task not found" });
        }

        result.task = ToDoTask;
        result.priority = priority;
        await result.save();

        return res.status(200).send({ message: "Task updated successfully." });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
};

module.exports.updateState = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Task.findById(id);

        if (!result) {
            return res.status(404).json({ message: "Task not found" });
        }
        result.isDone = !result.isDone;
        await result.save();
        return res.status(200).send({ message: "Task Updated successfully." });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}

module.exports.markAllAsIncompleted = async (req, res) => {
    try {
        await Task.updateMany({}, { $set: { isDone: false } });
        res
            .status(200)
            .send({ message: "All tasks set to incompleted successfully." });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
};

module.exports.maerkAllAsCompleted = async (req, res) => {
    try {
        await Task.updateMany({}, { $set: { isDone: true } });
        res
            .status(200)
            .send({ message: "All tasks set to completed successfully." });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
};

module.exports.searchTask = async (req, res) => {
    try {
        const search1 = req.body.key1;
        const search2 = req.body.key2;
        const tasks = await Task.find({});
        const result = [];
        tasks.map((task) => {
            if (
                (search1 != "" && task.task.includes(search1)) ||
                (search2 != 0 && task.priority == search2)
            ) {
                result.push(task);
            }
        });
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
};