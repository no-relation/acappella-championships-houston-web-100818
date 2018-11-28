const API = 'http://localhost:3000/a_cappella_groups'
const acappellaTable = document.getElementById('table-body')
const winnerBar = document.getElementById('winner')
const sortButtons = document.querySelectorAll('[data-button-type]')

let groupArray;
let currentWinner;
let weHaveAWinner = false;

fetch(API)
.then((resp) => resp.json())
.then((data) => {
    groupArray = data
    render()
})

sortButtons.forEach((button) => {
    button.addEventListener('click', () => {
        sortArray(button.dataset.buttonType)
    })
})

function sortArray(colName){
    let sortCol = '';
    let collegeParam = '';
    switch (colName) {
        case 'college':
          sortCol = 'college';
          collegeParam = 'name'
          break;
        case 'name':
            sortCol = 'name';
            break;
        case 'membership':
            sortCol = 'membership';
            break;
        case 'division':
            sortCol = 'college';
            collegeParam = 'division'
            break;
        }
    groupArray.sort((a,b) => {
        if (collegeParam) {
            return a[sortCol][collegeParam].localeCompare(b[sortCol][collegeParam])
        }else {
            return a[sortCol].localeCompare(b[sortCol])
        }
    })
    render()
}

function render() {
    acappellaTable.innerHTML = ''
    groupArray.forEach((group, index) => {
        const groupRow = document.createElement('tr')
        
        const college = document.createElement('td')
        college.innerHTML = group.college.name

        const groupName = document.createElement('td')
        groupName.innerHTML = group.name

        const membership = document.createElement('td')
        membership.innerHTML = group.membership

        const division = document.createElement('td')
        division.innerHTML = group.college.division

        const winButtonTable = document.createElement('td')
        const winButton = document.createElement('img')
        winButton.setAttribute('src','./assets/trophy.png')
        winButton.dataset.id = `acGroup-${index}`
        winButtonTable.append(winButton)
        winButton.addEventListener('click', () => renderWinnerBar(group))
        
        const deleteButtonTable = document.createElement('td')
        const deleteButton = document.createElement('img')
        deleteButton.setAttribute('src','./assets/trashcan.png')
        deleteButton.dataset.id = `delete-group-${group.id}`
        deleteButtonTable.append(deleteButton)
        deleteButton.addEventListener('click', ()=> deleteGroup(group) )
        
        groupRow.append(college, groupName, membership, division, winButtonTable, deleteButtonTable)
        
        acappellaTable.append(groupRow)
    })
}

function renderWinnerBar(winner) {
    // winner is taken out of array
    winnerIndex = groupArray.findIndex((group) => group.id === winner.id)
    groupArray.splice(winnerIndex,1)
    
    if (weHaveAWinner) {
        // old winner goes back in array
        groupArray.splice(0, 0, currentWinner)
    }
    
    winnerBar.innerHTML = ''
    winnerBar.innerHTML = `Winner: ${winner.name}, ${winner.college.name}`
    weHaveAWinner = true
    currentWinner = winner
    
    render()
}

function deleteGroup(loser) {
    // loser is taken out of array
    loserIndex = groupArray.findIndex((group) => group.id === loser.id)
    groupArray.splice(loserIndex,1)
    render()
}