let readlineSync = require('readline-sync');
let fs = require('fs');
let students = [];
let fileJson = '';

function loadData() {
    fileJson = fs.readFileSync('./data.json');
    students = JSON.parse(fileJson);
}

function showList() {
    for (let vals of students) {
        console.log(vals.id + '. ' + vals.name + ' - ' + vals.age);
    }
}

function showCreate() {
    let name = readlineSync.question('Name: ');
    let age = readlineSync.question('Age: ');
    let id = students[students.length - 1].id + 1;

    let student = {
        id: id,
        name: name,
        age: Number.parseInt(age)
    }

    students.push(student);
}

function showDelete(){
    let keyWord = readlineSync.question('Delette: ');
    for(let vals of students){
        if(Number.parseInt(keyWord) === vals.id){
            return students.splice(students.indexOf(vals), 1);
        }
    }
}

function showSearch(){
    let keyWord = readlineSync.question('Search: ');
    for(let vals of students){
        if(keyWord === vals.name){
            console.log('Your result: ');
            console.log(vals.id + '. ' + vals.name + ' - ' + vals.age);
            break;
        }
    }
}

function showSave() {
    let data = JSON.stringify(students);
    fs.writeFileSync('./data.json', data, { endcoding: 'utf8' });
}

function showMenu() {
    console.log('*-----------Menu-----------*');
    console.log('1. List Students');
    console.log('2. Create a new Student');
    console.log('3. Delete a Student');
    console.log('4. Search Student');
    console.log('5. Save and exit');
    console.log(students);
    let option = readlineSync.question('Enter your option: > ');
    switch (option) {
        case '1':
            showList();
            showMenu();
            break;
        case '2':
            showCreate();
            showMenu();
            break;
        case '3':
            showDelete();
            showMenu();
            break;
        case '4':
            showSearch();
            showMenu();
            break;
        case '5':
            showSave();
            break;
        default:
            console.log('Wrong option! Enter again.');
            showMenu();
            break;

    }
}

function showMain() {
    loadData();
    showMenu();
}

showMain();