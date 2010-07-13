/**
 * Database Class for testing...
 * User: kris
 * Date: Jul 13, 2010
 * Time: 12:27:12 PM
 */


function Database()
{
    var lastQuery;

    try
    {
        var db = openDatabase('Test', 1.0, 'Test', 50000);
    }
    catch (e)
    {
        log('Database not supported');
        return false;
    }

    db.transaction( function(transaction) {
        transaction.executeSql("DROP TABLE title;");
        transaction.executeSql("DROP TABLE employee;");
        transaction.executeSql("CREATE TABLE title " +
            "  (title_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
            "   title NVARCHAR(50) NOT NULL);", [],
            function(t, r) { log('Success creating title');},
            function(t, e) { log('Error creating title, error: ' + e.message + '(' + e.code + ')'); return false; });

        var titles = [ [1,'President'], [2,'CEO'], [3,'CTO'], [4,'Manager'], [5,'Grunt']];
        for (var i = 0; i < titles.length; i++)
        {
            transaction.executeSql("INSERT INTO title (title_id, title) VALUES (?, ?);", titles[i],
                function(t, r) {log('Success adding title');},
                function(t, e) { log('Error adding title, error: ' + e.message + '(' + e.code + ')')});
        }


        transaction.executeSql('CREATE TABLE employee ' +
            '  (employee_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ' +
            '   name NVARCHAR(50) NOT NULL, ' +
            '   hired_date DATE NOT NULL, ' +
            '   title_id INT NOT NULL DEFAULT (0), ' +
            '   FOREIGN KEY(title_id) REFERENCES title(title_id));', [],
            function(t, r) { log('Success employee'); },
            function(t, e) {log('Error creating employee, error: ' + e.message + '(' + e.code + ')'); return false });


        var employees = [['Chad Pinkerton', '2007/1/20', 1], ['Patty Stinson', '2007/1/21', 2],
            ['Johnny Pettiford', '2007/5/20', 3], ['Julia Sikes', '2007/3/19', 4], ['Norma Mcshane', '2009/5/11', 4],
            ['Manuel Staats', '2008/3/1', 5], ['Iris Maloy','2009/7/1', 5], ['Laurie Claycomb', '2007/2/11', 5]];

        for (i = 0; i < employees.length; i++)
        {
            transaction.executeSql("INSERT INTO employee (name, hired_date, title_id) VALUES (?, ?, ?);", employees[i],
                function(t, r) { log('Success adding employee'); },
                function(t, e) { log('Error adding employee, error: ' + e.message + '(' + e.code + ')') });
        }
    });

    var success = function(t, r)
    {
        var m, rows = r.rows;
        if (rows.length > 0)
        {
            m = '<table><tr>';
            for (var rowTitle in rows.item(0))
            {
               m += '<th>' + rowTitle + '</th>';
            }
            m += '</tr>';
            for (var i = 0; i < rows.length; i++)
            {
                m += '<tr>';
                for (rowTitle in rows.item(i))
                {
                    m += '<td>' + rows.item(i)[rowTitle] + '</td>';
                }
                m += '</tr>';
            }
            m += '</table>';
        }

        else
        {
            m = "No Results...";
        }
        log(m);
    }

    var failure = function(t, e)
    {
        log('Error running query: ' + lastQuery + '<br/>Error: ' + e.message + '(' + e.code + ')');
    }

    this.ExecuteQuery = function(query, options)
    {
        lastQuery = query;
        db.transaction( function(transaction) { transaction.executeSql(query, options, success, failure);} );
    }

}