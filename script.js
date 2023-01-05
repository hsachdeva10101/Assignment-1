const loadFormData = () => {
    let loadTable = document.getElementById('loadTable');
    let loadData = document.getElementById('loadData');

    loadData.innerText = 'Refresh Data'

    // all data lies in it
    class dataSource {
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
            ]
        }
    }

    class TableClass {

        view() {
            loadTable.innerHTML = '';
            const tableData = data.getter();

            // now let create a table header
            let TableHeader = [];
            for (let i = 0; i < tableData.length; i++) {
                for (const key in tableData[i]) {
                    if (TableHeader.indexOf(key) === -1) {
                        TableHeader.push(key)
                    }
                }
            }

            // dynamic table
            let MakeTable = document.createElement('table')
            MakeTable.classList.add('table')
            loadTable.append(MakeTable)

            let TableHead = document.createElement('thead')
            TableHead.classList.add('thead')

            // insert a row in header
            let thead_tr = TableHead.insertRow(-1)
            for (let i = 0; i < TableHeader.length; i++) {
                let theadRow = document.createElement('th')
                theadRow.setAttribute('id', 'theadRow-' + i)
                theadRow.append(TableHeader[i])
                thead_tr.append(theadRow)
                thead_tr.setAttribute('id', 'thead_tr-' + i)
            }

            let actionBtn = thead_tr.insertCell(-1)
            actionBtn.classList.add('table-action')
            actionBtn.innerHTML = '<strong>Action</strong>';

            MakeTable.append(TableHead)

            let TableBody = document.createElement('tbody')
            TableBody.classList.add('tbody')
            MakeTable.append(TableBody)

            for (let i = 0; i < tableData.length; i++) {
                let tr = TableBody.insertRow(0)
                TableBody.append(tr)
                tr.setAttribute('id', 'tr-' + i)

                for (let j = 0; j < TableHeader.length; j++) {
                    let tCell = tr.insertCell(-1)
                    tCell.innerText = tableData[i][TableHeader[j]]
                    tCell.classList.add('tableCell')
                }

                // edit button
                let editButton = document.createElement('button')
                editButton.classList.add('edit-btn')
                editButton.innerHTML = 'Edit';

                let tr_id = 'tr-' + i
                editButton.addEventListener("click", table.edit(tr_id , TableHeader));

                let editCell = tr.insertCell(-1)
                editCell.setAttribute('id' , 'saveCancelTd')
                editCell.append(editButton)
                tr.append(editCell)

                // delete button
                let delBtn = document.createElement('button')
                delBtn.classList.add("delete-btn");
                delBtn.innerHTML = 'Delete';
                delBtn.addEventListener("click", table.delete(tr_id));
                delBtn.setAttribute('id', 'delBtn' + i)
                editCell.append(delBtn)

                // save button
                let saveButton = document.createElement('button');
                saveButton.setAttribute('id', 'save-button-' + i);
                saveButton.innerHTML = 'Save';
                saveButton.classList.add('save');
                saveButton.addEventListener("click", table.save(tr_id , TableHeader));
                saveButton.style.display = 'none';

                // cancel button
                let cancelButton = document.createElement('button');
                cancelButton.setAttribute('id', 'cancel-button-' + i);
                cancelButton.innerHTML = 'cancel';
                cancelButton.classList.add('btn-info');
                cancelButton.addEventListener("click", table.cancel(tr_id , TableHeader, tableData));
                cancelButton.style.display = 'none';

                editCell.append(saveButton)
                editCell.append(cancelButton);
            }
        }

        // edit
        edit(id , TableHeader) {
            return ()=>{
                // console.log(id)
                let editElement = document.getElementById(id)

                for (let i = 0; i < TableHeader.length; i++) {
                    let getCell = editElement.querySelectorAll('.tableCell')[i]
                    getCell.contentEditable = true;
                }

                // toggle buttons
                for (let j = 0; j < editElement.querySelector('#saveCancelTd').children.length; j++) {
                    if (editElement.querySelector('#saveCancelTd').children[j].style.display === 'none') {
                        editElement.querySelector('#saveCancelTd').children[j].style.display = 'block'
                    } else {
                        editElement.querySelector('#saveCancelTd').children[j].style.display = 'none'
                    }
                }
            }
        }

        // delete
        delete(id) {
            return ()=>{
                let delElement = document.getElementById(id)
                delElement.remove()
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
                for (let j = 0; j < cancelElement.querySelector('#saveCancelTd').children.length; j++) {

                    if (cancelElement.querySelector('#saveCancelTd').children[j].style.display === 'none') {
                        cancelElement.querySelector('#saveCancelTd').children[j].style.display = 'block'
                    } else {
                        cancelElement.querySelector('#saveCancelTd').children[j].style.display = 'none'
                    }
                }
            }
        }

        // save
        save(id , TableHeader) {

            return ()=>{

                let saveElement = document.getElementById(id)

                for (let i = 0; i < TableHeader.length; i++) {
                    let getCell = saveElement.querySelectorAll('.tableCell')[i]
                    getCell.setAttribute('contenteditable' , 'false')
                }

                for (let j = 0; j < saveElement.querySelector('#saveCancelTd').children.length; j++) {
                    console.log(saveElement.querySelector('#saveCancelTd').children[j])
                    if (saveElement.querySelector('#saveCancelTd').children[j].style.display === 'none') {
                        saveElement.querySelector('#saveCancelTd').children[j].style.display = 'block'
                    } else {
                        saveElement.querySelector('#saveCancelTd').children[j].style.display = 'none'
                    }
                }
            }
        }
    }

    let data = new dataSource();

    let table = new TableClass()
    table.view()
}