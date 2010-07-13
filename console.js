/**
 * User: kris
 * Date: Jul 13, 2010
 * Time: 12:26:02 PM
 */

var db, commandLine, consoleBody, commandHistory = [""], commandPointer = 0, commandInsertPointer = -1, commandHistoryMax = 1000;

window.clearConsole = function() {
    consoleBody.html("");
};

function onCommandLineKeyDown(event) {
    if (event.keyCode == 13) {
        evalCommandLine();
    } else if (event.keyCode == 27) {
        commandLine.val('');
    } else if (event.keyCode == 38) {
        cycleCommandHistory(-1);
    } else if (event.keyCode == 40) {
        cycleCommandHistory(1);
    }
}

function evalCommandLine() {
    var text = commandLine.val();
    commandLine.val("");

    appendToHistory(text, false);
    var res = text.split(';', 2);
    var query = res[0];
    var args = res[1].replace(/^\s+|\s+$/g,'');
    var argsArray = [];
    if (args.length > 0)
    {
        try
        {
            argsArray = $.parseJSON(args);
        }
        catch (e)
        {
            log('Error parsing arguments: ' + args + ', Error: ' + e);
            return;
        }
    }
    db.ExecuteQuery(query, argsArray);
}

function appendToHistory(command, unique) {
    if (unique && commandHistory[commandInsertPointer] == command) {
        return;
    }

    ++commandInsertPointer;
    if (commandInsertPointer >= commandHistoryMax) {
        commandInsertPointer = 0;
    }

    commandPointer = commandInsertPointer + 1;
    commandHistory[commandInsertPointer] = command;
}

function cycleCommandHistory(dir) {
    commandHistory[commandPointer] = commandLine.val();

    if (dir < 0) {
        --commandPointer;
        if (commandPointer < 0) {
            commandPointer = 0;
        }
    }
    else {
        ++commandPointer;
        if (commandPointer > commandInsertPointer+1) {
            commandPointer = commandInsertPointer+1;
        }
    }

    var command = commandHistory[commandPointer];

    commandLine.val(command);
    commandLine[0].setSelectionRange(command.length, command.length);
}



function init()
{
    commandLine = $("#commandLine");
    consoleBody = $("#log");
    $('#clearConsoleButton').click(clearConsole);
    commandLine.keydown(onCommandLineKeyDown);
    commandLine.focus();
    commandLine.trigger('select');
    log('Ready...');
    db = new Database();
}

function log(m)
{
    consoleBody.append(m + "<br/>");
}

$(document).ready(init);
