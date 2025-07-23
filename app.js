let activeTab = 'personnel';
let editingId = null;

let personnelData = [
  { id: 1, firstName: 'Ali', lastName: 'Khan', email: 'ali.khan@example.com', department: 'HR', location: 'Karachi' },
  { id: 2, firstName: 'Sara', lastName: 'Ahmed', email: 'sara.ahmed@example.com', department: 'Finance', location: 'Lahore' },
  { id: 3, firstName: 'Danish', lastName: 'Iqbal', email: 'danish.iqbal@example.com', department: 'IT', location: 'Islamabad' }
];

let departmentsData = [
  { id: 1, name: 'HR', location: 'Karachi' },
  { id: 2, name: 'Finance', location: 'Lahore' },
  { id: 3, name: 'IT', location: 'Islamabad' }
];

let locationsData = [
  { id: 1, name: 'Karachi' },
  { id: 2, name: 'Lahore' },
  { id: 3, name: 'Islamabad' }
];


const modal = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const personnelForm = document.getElementById('personnelForm');
const departmentForm = document.getElementById('departmentForm');
const locationForm = document.getElementById('locationForm');


function renderPersonnelTable() {
  const tbody = document.querySelector('#personnel tbody');
  tbody.innerHTML = '';
  personnelData.forEach(person => {
    const row = `
      <tr>
        <td>${person.firstName} ${person.lastName}</td>
        <td>${person.location}</td>
        <td>${person.email}</td>
        <td>${person.department}</td>
        <td>
          <button class="editBtn" data-id="${person.id}">Edit</button>
          <button class="deleteBtn" data-id="${person.id}">Delete</button>
        </td>
      </tr>`;
    tbody.insertAdjacentHTML('beforeend', row);
  });
}

function renderDepartmentsTable() {
  const tbody = document.querySelector('#departments tbody');
  tbody.innerHTML = '';
  departmentsData.forEach(dept => {
    const row = `
      <tr>
        <td>${dept.name}</td>
        <td>${dept.location}</td>
        <td>
          <button class="editBtn" data-id="${dept.id}">Edit</button>
          <button class="deleteBtn" data-id="${dept.id}">Delete</button>
        </td>
      </tr>`;
    tbody.insertAdjacentHTML('beforeend', row);
  });
}

function renderLocationsTable() {
  const tbody = document.querySelector('#locations tbody');
  tbody.innerHTML = '';
  locationsData.forEach(loc => {
    const row = `
      <tr>
        <td>${loc.name}</td>
        <td>
          <button class="editBtn" data-id="${loc.id}">Edit</button>
          <button class="deleteBtn" data-id="${loc.id}">Delete</button>
        </td>
      </tr>`;
    tbody.insertAdjacentHTML('beforeend', row);
  });
}


document.querySelectorAll('.tab-button').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

    button.classList.add('active');
    const tabId = button.getAttribute('data-tab');
    document.getElementById(tabId).classList.add('active');
    activeTab = tabId;

    if (tabId === 'personnel') renderPersonnelTable();
    else if (tabId === 'departments') renderDepartmentsTable();
    else if (tabId === 'locations') renderLocationsTable();
  });
});

document.getElementById('addBtn').addEventListener('click', () => {
  editingId = null;
  openModal();
});


document.querySelectorAll('.closeModal').forEach(btn => {
  btn.addEventListener('click', () => modal.classList.add('hidden'));
});


document.getElementById('search').addEventListener('input', (e) => {
  const value = e.target.value.toLowerCase();
  document.querySelectorAll('.tab-content.active tbody tr').forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(value) ? '' : 'none';
  });
});


document.addEventListener('click', (e) => {
  if (e.target.classList.contains('editBtn')) {
    editingId = parseInt(e.target.getAttribute('data-id'));
    openModal(true);
  }
});


function openModal(isEdit = false) {
  modal.classList.remove('hidden');
  personnelForm.classList.add('hidden');
  departmentForm.classList.add('hidden');
  locationForm.classList.add('hidden');

  if (activeTab === 'personnel') {
    personnelForm.classList.remove('hidden');
    modalTitle.textContent = isEdit ? 'Edit Personnel' : 'Add New Personnel';
    if (isEdit) {
      const person = personnelData.find(p => p.id === editingId);
      document.getElementById('personnelId').value = person.id;
      document.getElementById('firstName').value = person.firstName;
      document.getElementById('lastName').value = person.lastName;
      document.getElementById('email').value = person.email;
      document.getElementById('department').value = person.department;
      document.getElementById('location').value = person.location;
    } else {
      personnelForm.reset();
    }
  } 
  else if (activeTab === 'departments') {
    departmentForm.classList.remove('hidden');
    modalTitle.textContent = isEdit ? 'Edit Department' : 'Add New Department';
    if (isEdit) {
      const dept = departmentsData.find(d => d.id === editingId);
      document.getElementById('deptId').value = dept.id;
      document.getElementById('deptName').value = dept.name;
      document.getElementById('deptLocation').value = dept.location;
    } else {
      departmentForm.reset();
    }
  } 
  else if (activeTab === 'locations') {
    locationForm.classList.remove('hidden');
    modalTitle.textContent = isEdit ? 'Edit Location' : 'Add New Location';
    if (isEdit) {
      const loc = locationsData.find(l => l.id === editingId);
      document.getElementById('locId').value = loc.id;
      document.getElementById('locName').value = loc.name;
    } else {
      locationForm.reset();
    }
  }
}


personnelForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = {
    id: editingId ?? (personnelData.length + 1),
    firstName: document.getElementById('firstName').value.trim(),
    lastName: document.getElementById('lastName').value.trim(),
    email: document.getElementById('email').value.trim(),
    department: document.getElementById('department').value.trim(),
    location: document.getElementById('location').value.trim()
  };

  if (editingId) {
    const index = personnelData.findIndex(p => p.id === editingId);
    personnelData[index] = data;
  } else {
    personnelData.push(data);
  }

  renderPersonnelTable();
  modal.classList.add('hidden');
});


departmentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = {
    id: editingId ?? (departmentsData.length + 1),
    name: document.getElementById('deptName').value.trim(),
    location: document.getElementById('deptLocation').value.trim()
  };

  if (editingId) {
    const index = departmentsData.findIndex(d => d.id === editingId);
    departmentsData[index] = data;
  } else {
    departmentsData.push(data);
  }

  renderDepartmentsTable();
  modal.classList.add('hidden');
});


locationForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = {
    id: editingId ?? (locationsData.length + 1),
    name: document.getElementById('locName').value.trim()
  };

  if (editingId) {
    const index = locationsData.findIndex(l => l.id === editingId);
    locationsData[index] = data;
  } else {
    locationsData.push(data);
  }

  renderLocationsTable();
  modal.classList.add('hidden');
});

renderPersonnelTable();
renderDepartmentsTable();
renderLocationsTable();



const confirmDeleteOverlay = document.createElement('div');
confirmDeleteOverlay.classList.add('modal-overlay', 'hidden');
confirmDeleteOverlay.innerHTML = `
  <div class="modal">
    <h2 id="confirmDeleteTitle">Remove employee entry?</h2>
    <p id="confirmDeleteMessage"></p>
    <div class="modal-actions">
      <button id="confirmDeleteYes">YES</button>
      <button id="confirmDeleteNo">NO</button>
    </div>
  </div>
`;
document.body.appendChild(confirmDeleteOverlay);


const errorModalOverlay = document.createElement('div');
errorModalOverlay.classList.add('modal-overlay', 'hidden');
errorModalOverlay.innerHTML = `
  <div class="modal">
    <h2 id="errorModalTitle">Cannot remove entry</h2>
    <p id="errorModalMessage"></p>
    <div class="modal-actions">
      <button id="errorModalOk">OK</button>
    </div>
  </div>
`;
document.body.appendChild(errorModalOverlay);


function showConfirmModal(message, onYes) {
  document.getElementById('confirmDeleteMessage').innerText = message;
  confirmDeleteOverlay.classList.remove('hidden');

  const yesBtn = document.getElementById('confirmDeleteYes');
  const noBtn = document.getElementById('confirmDeleteNo');

  const cleanup = () => {
    yesBtn.onclick = null;
    noBtn.onclick = null;
    confirmDeleteOverlay.classList.add('hidden');
  };

  yesBtn.onclick = () => {
    onYes();
    cleanup();
  };
  noBtn.onclick = cleanup;
}

function showErrorModal(title, message) {
  document.getElementById('errorModalTitle').innerText = title;
  document.getElementById('errorModalMessage').innerText = message;
  errorModalOverlay.classList.remove('hidden');

  document.getElementById('errorModalOk').onclick = () => {
    errorModalOverlay.classList.add('hidden');
  };
}


document.addEventListener('click', (e) => {
  if (e.target.matches('td button')) {
    const btn = e.target;
    const row = btn.closest('tr');
    const tab = document.querySelector('.tab-content.active').id;

    if (btn.textContent === 'Delete') {
      if (tab === 'personnel') {
        const name = row.cells[0].innerText;
        showConfirmModal(`Are you sure that you want to remove the entry for ${name}?`, () => {
          const fullName = name.split(' ');
          personnelData = personnelData.filter(p => p.firstName !== fullName[0] || p.lastName !== fullName[1]);
          renderPersonnelTable();
        });
      }
      else if (tab === 'departments') {
        const deptName = row.cells[0].innerText;
        const count = personnelData.filter(p => p.department === deptName).length;

        if (count > 0) {
          showErrorModal(
            'Cannot remove department ...',
            `You cannot remove the entry for ${deptName} because it has ${count} employees assigned to it.`
          );
        } else {
          const id = departmentsData.find(d => d.name === deptName)?.id;
          if (id) departmentsData = departmentsData.filter(d => d.id !== id);
          renderDepartmentsTable();
        }
      }
      else if (tab === 'locations') {
        const locName = row.cells[0].innerText;
        const count = personnelData.filter(p => p.location === locName).length;

        if (count > 0) {
          showErrorModal(
            'Cannot remove Location ...',
            `You cannot remove the entry for ${locName} because it has ${count} employees assigned to it.`
          );
        } else {
          const id = locationsData.find(l => l.name === locName)?.id;
          if (id) locationsData = locationsData.filter(l => l.id !== id);
          renderLocationsTable();
        }
      }
    }
  }
});
