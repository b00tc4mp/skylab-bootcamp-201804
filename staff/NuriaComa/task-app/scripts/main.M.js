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

var rows = $('.row');

var $todosTitle, $todosList;

function listTodos() {
    if (!$todosTitle) {
        $todosTitle = $('<h3 class="text-info">To Do\'s</h3>');

        $(rows[3]).append($todosTitle);
    }

    if (!$todosList) {
        $todosList = $('<ul class="list-group"></ul>');

        $(rows[4]).append($todosList);
    }

    $todosList.empty();

    var todos = logic.listTodos();

    if (todos.length) {
        $todosTitle.show();
        $todosList.show();

        todos.forEach(function(task) {
            var $taskItem = $('<li class="list-group-item"></li>');
    
            $taskItem.append('<span>' + task.text + '</span>&nbsp;');
    
            var $taskButton = $('<button class="btn btn-outline-info">✓</button>');
    
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
        $donesTitle = $('<h3 class="text-info">Done\'s</h3>');

        $(rows[5]).append($donesTitle);
    }

    if (!$donesList) {
        $donesList = $('<ul class="list-group"></ul>');

        $(rows[6]).append($donesList);
    }

    $donesList.empty();

    var dones = logic.listDones();

    if (dones.length) {
        $donesTitle.show();
        $donesList.show();

        dones.forEach(function(task) {
            
            var $taskItem = $('<li class="list-group-item"></li>');
    
            $taskItem.append('<span>' + task.text + '</span>&nbsp;');
    
            var $taskButton = $('<button class=" btn btn-info">✗</button>');
    
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