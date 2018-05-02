'use strict';

// TODO implement the presentation logic

var $form = $('form');

$form.submit(function(e) {
    e.preventDefault();

    // var $input = $(this).find('input');
    var $input = $(this).find('input[type=text]');

    var text = $input.val();

    logic.addTask(text);

    $input.val('');

    refresh();
});

function refresh() {
    listTodos();

    listDones();
}

var $todosTitle, $todosList;

function listTodos() {
    if (!$todosTitle) {
        $todosTitle = $('<h3>TO DO</h3>');

        $form.after($todosTitle);
    }

    if (!$todosList) {
        $todosList = $('<ul class="list-group"></ul>');

        $todosTitle.after($todosList);
    }

    $todosList.empty();

    var todos = logic.listTodos();

    if (todos.length) {
        $todosTitle.show();
        $todosList.show();

        todos.forEach(function(task) {
            var $taskItem = $('<li class="list-group-item"></li>');
    
            $taskItem.append(task.text);
    
            var $taskButton = $('<button type="button" class="btn btn-outline-info float-right">✓</button>');
    
            $taskButton.click(function() {
                logic.markTaskDone(task.id);
    
                refresh();
            });
    
            $taskItem.append($taskButton);
    
            $todosList.append($taskItem);
        });
    } else {
        $todosTitle.hide();
        $todosList.hide();
    }
}

var $donesTitle, $donesList;

function listDones() {
    if (!$donesTitle) {
        $donesTitle = $('<h3>DONE</h3>');

        $todosList.after($donesTitle);
    }

    if (!$donesList) {
        $donesList = $('<ul class="list-group"></ul>');

        $donesTitle.after($donesList);
    }

    $donesList.empty();

    var dones = logic.listDones();

    if (dones.length) {
        $donesTitle.show();
        $donesList.show();

        dones.forEach(function(task) {
            var $taskItem = $('<li class="list-group-item"></li>');
    
            $taskItem.append('<span>' + task.text + '</span>&nbsp;');
    
            var $taskButton = $('<button type="button" class="btn btn-outline-info float-right">✗</button>');
    
            $taskButton.click(function() {
                logic.removeTask(task.id);
    
                listDones();
            });
    
            $taskItem.append($taskButton);
    
            $donesList.append($taskItem);
        });
    } else {
        $donesTitle.hide();
        $donesList.hide();
    }
}