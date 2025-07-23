<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Company Directory</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>

  <header>
    <h1>Company Directory</h1>
  </header>

  <div class="top-bar">
    <input type="text" id="search" placeholder="search" />
    <div class="action-buttons">
      <button id="refreshBtn">🔄</button>
      <button id="filterBtn">⚙️</button>
      <button id="addBtn">➕</button>
    </div>
  </div>

  <div class="tabs">
    <button class="tab-button active" data-tab="personnel">👤 Personnel</button>
    <button class="tab-button" data-tab="departments">🏢 Departments</button>
    <button class="tab-button" data-tab="locations">🗺️ Locations</button>
  </div>

  <div class="tab-content active" id="personnel">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Location</th>
          <th>Email</th>
          <th>Department</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    </table>
  </div>

  <div class="tab-content" id="departments">
    <table>
      <thead>
        <tr>
          <th>Department</th>
          <th>Location</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    </table>
  </div>

  <div class="tab-content" id="locations">
    <table>
      <thead>
        <tr>
          <th>Location</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    </table>
  </div>

  <footer>
    Company Directory version 1.0
  </footer>

  
  <div id="modalOverlay" class="modal-overlay hidden">
    <div class="modal">
      <h2 id="modalTitle">Add Employee</h2>

      
      <form id="personnelForm" class="modal-form hidden">
        <input type="hidden" id="personnelId" />
        <label>First Name:</label>
        <input type="text" id="firstName" required>
        <label>Last Name:</label>
        <input type="text" id="lastName" required>
        <label>Email:</label>
        <input type="email" id="email" required>
        <label>Department:</label>
        <input type="text" id="department" required>
        <label>Location:</label>
        <input type="text" id="location" required>
        <div class="modal-actions">
          <button type="submit">Save</button>
          <button type="button" class="closeModal">Cancel</button>
        </div>
      </form>

      
      <form id="departmentForm" class="modal-form hidden">
        <input type="hidden" id="deptId" />
        <label>Department Name:</label>
        <input type="text" id="deptName" required>
        <label>Location:</label>
        <input type="text" id="deptLocation" required>
        <div class="modal-actions">
          <button type="submit">Save</button>
          <button type="button" class="closeModal">Cancel</button>
        </div>
      </form>

    
      <form id="locationForm" class="modal-form hidden">
        <input type="hidden" id="locId" />
        <label>Location Name:</label>
        <input type="text" id="locName" required>
        <div class="modal-actions">
          <button type="submit">Save</button>
          <button type="button" class="closeModal">Cancel</button>
        </div>
      </form>
    </div>
  </div>

  <script src="app.js"></script>
</body>
</html>
