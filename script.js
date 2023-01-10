// import { DataLoader } from './DataLoader.js'
class TableClass {

    view() {

        let loadTable = document.getElementById('loadTable');
        loadTable.innerHTML = '';

        let data = new DataLoader();
        let tableData = data.getter();

        let TableHeader = [];
        for (let i = 0; i < tableData.length; i++) {
            for (const key in tableData[i]) {
                if (TableHeader.indexOf(key) === -1) {
                    TableHeader.push(key);
                }
            }
        }

        /*

        var data = JSON.parse(jsonString);

        var table = document.getElementById("myTable");

        for (var i = 0; i < data.length; i++) {
          var row = table.insertRow(-1);
          var cell1 = row.insertCell(0);
          cell1.innerHTML = data[i].name;
          var cell2 = row.insertCell(1);
          cell2.innerHTML = data[i].age;
        }
         */

        /*
        1. create table -> append to it
        2. create Table Head -> append to table
        3. create table row -> append to table
        4. create action cell -> append to table row
         */

        // table
        let MakeTable = document.createElement('table');
        MakeTable.classList.add('table');
        loadTable.append(MakeTable);

        // table head
        let TableHead = document.createElement('thead');
        TableHead.classList.add('thead');

        // insert a row in header
        let thead_tr = TableHead.insertRow(-1);
        for (let i = 0; i < TableHeader.length; i++) {
            let theadRow = document.createElement('th');
            theadRow.setAttribute('id', 'theadRow-' + i);
            theadRow.append(TableHeader[i]);
            thead_tr.append(theadRow);
            thead_tr.setAttribute('id', 'thead_tr-' + i);
        }

        let actionBtn = thead_tr.insertCell(-1);
        actionBtn.classList.add('table-action');
        actionBtn.innerHTML = '<strong>Action</strong>';

        MakeTable.append(TableHead);

        // Table Body
        let TableBody = document.createElement('tbody')
        TableBody.classList.add('tbody');
        MakeTable.append(TableBody);

        for (let i = 0; i < tableData.length; i++) {
            let tableRowID = 'tr-' + i;

            let tr = TableBody.insertRow(0);
            TableBody.append(tr);
            tr.setAttribute('id', 'tr-' + i);

            for (let j = 0; j < TableHeader.length; j++) {
                let tCell = tr.insertCell(-1);
                tCell.innerText = tableData[i][TableHeader[j]];
                tCell.classList.add('tableCell');
            }

            let table = new TableClass()
            let edit_delCell = tr.insertCell(-1);

            // edit button
            let editButton = document.createElement('button');
            editButton.classList.add('edit-btn');
            editButton.innerHTML = 'Edit';
            editButton.addEventListener("click", table.edit(tableRowID , TableHeader));
            edit_delCell.append(editButton);

            // delete button
            let delBtn = document.createElement('button')
            delBtn.classList.add("delete-btn");
            delBtn.innerHTML = 'Delete';
            delBtn.addEventListener("click", table.delete(tableRowID));
            edit_delCell.append(delBtn)

            edit_delCell.setAttribute('id' , 'saveCnclEdtClr')

            // append edit and delete both
            tr.append(edit_delCell);

            // save button
            let saveButton = document.createElement('button');
            saveButton.setAttribute('id', 'save-button-' + i);
            saveButton.innerHTML = 'Save';
            saveButton.classList.add('save');
            saveButton.addEventListener("click", table.save(tableRowID , TableHeader));
            saveButton.style.display = 'none';

            // cancel button
            let cancelButton = document.createElement('button');
            cancelButton.setAttribute('id', 'cancel-button-' + i);
            cancelButton.innerHTML = 'cancel';
            cancelButton.classList.add('btn-info');
            cancelButton.addEventListener("click", table.cancel(tableRowID , TableHeader, tableData));
            cancelButton.style.display = 'none';

            // append save and cancel
            edit_delCell.append(saveButton);
            edit_delCell.append(cancelButton);
        }
    }

    // edit
    edit(id , TableHeader) {
        // row = btn.parentNode.parentNode
        // row.contentEditable = true
        // btn.parentNode.contentEditable = false

        // select all cells and make editable true
        return ()=>{
            let editElement = document.getElementById(id);
            for (let i = 0; i < TableHeader.length; i++) {
                let getCell = editElement.querySelectorAll('.tableCell')[i];
                getCell.contentEditable = true;
            }

            // toggle buttons
            for (let j = 0; j < editElement.querySelector('#saveCnclEdtClr').children.length; j++) {
                if (editElement.querySelector('#saveCnclEdtClr').children[j].style.display === 'none') {
                    editElement.querySelector('#saveCnclEdtClr').children[j].style.display = 'block';
                } else {
                    editElement.querySelector('#saveCnclEdtClr').children[j].style.display = 'none';
                }
            }
        }
    }

    // delete
    delete(id) {
        // row = btn.parentNode.parentNode;
        // document.removeChild(row)
        // take id and remove
        return ()=>{
            let delElement = document.getElementById(id);
            delElement.remove();
        }
    }

    // cancel
    cancel(id , TableHeader, tableData) {
        return function () {
            let cancelElement = document.getElementById(id);
            let cancelElementIndex = document.getElementById(id).rowIndex;

            for (let i = 0; i < tableData.length; i++) {
                for (let j = 0; j < TableHeader.length; j++) {
                    cancelElement.querySelectorAll('.tableCell')[j].innerText = tableData[cancelElementIndex - 1][TableHeader[j]];
                }
            }

            // toggle buttons
            for (let j = 0; j < cancelElement.querySelector('#saveCnclEdtClr').children.length; j++) {
                if (cancelElement.querySelector('#saveCnclEdtClr').children[j].style.display === 'none') {
                    cancelElement.querySelector('#saveCnclEdtClr').children[j].style.display = 'block';
                } else {
                    cancelElement.querySelector('#saveCnclEdtClr').children[j].style.display = 'none';
                }
            }
        }
    }

    // save
    save(id , TableHeader) {

        return ()=>{
            let saveElement = document.getElementById(id);

            // select all cells and make editable false
            for (let i = 0; i < TableHeader.length; i++) {
                let getCell = saveElement.querySelectorAll('.tableCell')[i];
                getCell.contentEditable = false;
            }

            for (let j = 0; j < saveElement.querySelector('#saveCnclEdtClr').children.length; j++) {
                if (saveElement.querySelector('#saveCnclEdtClr').children[j].style.display === 'none') {
                    saveElement.querySelector('#saveCnclEdtClr').children[j].style.display = 'block';
                } else {
                    saveElement.querySelector('#saveCnclEdtClr').children[j].style.display = 'none';
                }
            }
        }
    }
}

class DataLoader {
    getter() {
        return [
            {
                "id": 1,
                "First Name": "foo",
                "Middle Name": "bar",
                "Last Name": "baz",
                "email": "foo@gmail.com",
                "Phone Number": "123",
                "Role": "trainee",
                "Address": "Chd"
            },
            {
                "id": 2,
                "First Name": "foo",
                "Middle Name": "bar",
                "Last Name": "baz",
                "email": "bar@mail.com",
                "Phone Number": "456",
                "Role": "trainee",
                "Address": "Chd"
            },
            {
                "id": 3,
                "First Name": "foo",
                "Middle Name": "bar",
                "Last Name": "baz",
                "email": "baz@gmail.com",
                "Phone Number": "789",
                "Role": "trainee",
                "Address": "Chd"
            }
        ];
    }
}

let loadFormData = () => {

    let loadData = document.getElementById('loadData');
    loadData.innerHTML = 'Refresh Data';

    let table = new TableClass();
    table.view()
}