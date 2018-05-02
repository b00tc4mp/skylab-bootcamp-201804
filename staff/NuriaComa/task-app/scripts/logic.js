'use strict';

var logic = (function () {
    var tasks = [];

    function Task(text) {
        this.text = text;
        this.id = Date.now();
        this.done = false;
    }

    return {
        addTask: function (text) {
            var task = new Task(text);

            tasks.push(task);

            return task.id;
        },

        listTodos: function () {
            return tasks.filter(function (task) { return !task.done; });
        },

        listDones: function () {
            return tasks.filter(function (task) { return task.done; });
        },

        markTaskDone: function (id) {
            if (typeof id !== 'number') throw Error('id is not a number');

            var task = tasks.find(function (task) {
                if (task.id === id) return task;
            });

            if (typeof task === 'undefined') throw Error('task with id ' + id + ' does not exist');

            if (task.done) throw Error('task with id ' + id + ' is already done');

            task.done = true;
        },

        removeTask: function (id) {
            if (typeof id !== 'number') throw Error('id is not a number');

            var taskIndex;
            var task = tasks.find(function (task, index) {
                if (task.id === id){ 
                    taskIndex = index;

                    return task
                };
            });

            if (typeof task === 'undefined') throw Error('task with id ' + id + ' does not exist');

            if (!task.done) throw Error('task with id ' + id + ' is not done yet');

            tasks.splice(taskIndex, 1);
        },

        clear: function () {
            //tasks = [];
            //tasks.splice(0);
            tasks.length = 0;
        }
    }
})();