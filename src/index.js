const API = 'http://localhost:3000/a_cappella_groups'
const acappellaTable = document.getElementById('table-body')

let groupArray = []

fetch(API)
.then((resp) => resp.json())
.then((data) => {
    groupArray = data
    render()
})

function render() {
    acappellaTable.innerHTML = ''
    groupArray.forEach(group => {
        // <tr><td>*Insert College*</td> <td>*Insert Group Name*</td> <td>*Insert Membership*</td> <td>*Insert Division*</td> <td><img src='./assets/trophy.png' data-id='*put an id here*' /></td> </tr>
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
        winButton.dataset.id = `acGroup-${group.id}`
        winButtonTable.append(winButton)
        // winButton.addEventHandler('click', ()=>{})
        
        const deleteButtonTable = document.createElement('td')
        const deleteButton = document.createElement('img')
        deleteButton.setAttribute('src','./assets/trashcan.png')
        deleteButton.dataset.id = `delete-group-${group.id}`
        deleteButtonTable.append(deleteButton)
        // deleteButton.addEventHandler('click', ()=>{})
        
        // const deleteButtonTable = document.createElement('td')
        // const deleteButton = document.createElement('button')
        // deleteButton.innerHTML = '🗑️'
        // deleteButtonTable.append(deleteButton)
        // // deleteButton.addEventHandler('click', ()=>{})
        
        groupRow.append(college, groupName, membership, division, winButtonTable, deleteButtonTable)

        acappellaTable.append(groupRow)
    })
}