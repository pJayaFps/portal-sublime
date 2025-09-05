document.addEventListener('DOMContentLoaded', function() {
  // Initialize Feather icons
  if (typeof feather !== 'undefined') {
    feather.replace();
  }
  
  // Tab Navigation
  const navItems = document.querySelectorAll('.nav-item');
  const tabContents = document.querySelectorAll('.tab-content');
  
  navItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      const tabId = this.dataset.tab;
      
      console.log('Tab clicked:', tabId);
      
      // Update active tab
      navItems.forEach(navItem => navItem.classList.remove('active'));
      this.classList.add('active');
      
      // Show selected tab content
      tabContents.forEach(content => {
        content.classList.add('hidden');
        if (content.id === tabId) {
          content.classList.remove('hidden');
          console.log('Showing tab:', tabId);
        }
      });
    });
  });
  
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuToggle');
  const navigationSidebar = document.getElementById('navigationSidebar');
  
  if (mobileMenuBtn && navigationSidebar) {
    mobileMenuBtn.addEventListener('click', function() {
      navigationSidebar.classList.toggle('active');
      console.log('Mobile menu toggled');
      
      // Update icon
      const icon = this.querySelector('i');
      if (navigationSidebar.classList.contains('active')) {
        if (typeof feather !== 'undefined') {
          icon.setAttribute('data-feather', 'x');
          feather.replace();
        }
      } else {
        if (typeof feather !== 'undefined') {
          icon.setAttribute('data-feather', 'menu');
          feather.replace();
        }
      }
    });
  }
  
  // Initialize Dashboard functionality
  initializeDashboard();
  
  // Initialize Grades functionality
  initializeGrades();
  
  // Initialize Communications functionality
  initializeCommunications();
  
  // Initialize Students functionality
  initializeStudents();
  
  // Initialize Settings functionality
  initializeSettings();
});

// Dashboard Functions
function initializeDashboard() {
  console.log('Initializing dashboard...');
  
  // Initialize "Ver Todos os Comunicados" button
  const viewAllCommsBtn = document.querySelector('#dashboard .btn-outline');
  if (viewAllCommsBtn && viewAllCommsBtn.textContent.includes('Ver Todos os Comunicados')) {
    viewAllCommsBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Switching to communications tab...');
      
      // Switch to communications tab
      const communicationsTab = document.querySelector('.nav-item[data-tab="communications"]');
      const communicationsContent = document.getElementById('communications');
      
      if (communicationsTab && communicationsContent) {
        // Update active tab
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        communicationsTab.classList.add('active');
        
        // Show communications content
        document.querySelectorAll('.tab-content').forEach(content => content.classList.add('hidden'));
        communicationsContent.classList.remove('hidden');
      }
    });
  }
  
  // Initialize "Ver Todas as Tarefas" button
  const viewAllTasksBtn = document.querySelector('#dashboard .btn-outline:last-of-type');
  if (viewAllTasksBtn && viewAllTasksBtn.textContent.includes('Ver Todas as Tarefas')) {
    viewAllTasksBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Showing all tasks modal...');
      
      // Create and show tasks modal
      showAllTasksModal();
    });
  }
}

// Function to show all tasks modal
function showAllTasksModal() {
  // Remove existing modal if any
  const existingModal = document.getElementById('tasksModal');
  if (existingModal) {
    existingModal.remove();
  }
  
  const allTasks = [
    { task: 'Lançar notas do 9º A - Matemática', deadline: '2024-05-28', status: 'pendente', priority: 'alta' },
    { task: 'Entregar planejamento mensal', deadline: '2024-05-30', status: 'pendente', priority: 'media' },
    { task: 'Confirmar presença na reunião', deadline: '2024-05-26', status: 'urgente', priority: 'alta' },
    { task: 'Revisar avaliações do 8º B', deadline: '2024-05-29', status: 'pendente', priority: 'media' },
    { task: 'Preparar material para aula prática', deadline: '2024-06-01', status: 'pendente', priority: 'baixa' },
    { task: 'Atualizar diário de classe', deadline: '2024-05-27', status: 'pendente', priority: 'alta' },
    { task: 'Corrigir provas do 9º C', deadline: '2024-05-31', status: 'pendente', priority: 'media' }
  ];
  
  const modal = document.createElement('div');
  modal.id = 'tasksModal';
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="text-xl font-bold text-gray-900">Todas as Tarefas</h3>
        <button class="modal-close-btn" onclick="closeTasksModal()">
          <i data-feather="x"></i>
        </button>
      </div>
      <div class="modal-body">
        <div class="space-y-4">
          ${allTasks.map(task => `
            <div class="task-item ${task.status === 'urgente' ? 'urgent' : ''}">
              <div class="flex items-center space-x-3">
                <input type="checkbox" class="task-checkbox">
                <div class="flex-1">
                  <p class="font-medium text-gray-900">${task.task}</p>
                  <div class="flex items-center space-x-2 mt-1">
                    <span class="badge ${task.status === 'urgente' ? 'red' : task.priority === 'alta' ? 'red' : task.priority === 'media' ? 'blue' : 'green'}">${task.deadline}</span>
                    <span class="badge ${task.status === 'urgente' ? 'red' : 'gray'}">${task.status}</span>
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline" onclick="closeTasksModal()">Fechar</button>
        <button class="btn btn-primary">Marcar Selecionadas como Concluídas</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Re-initialize feather icons
  if (typeof feather !== 'undefined') {
    feather.replace();
  }
  
  console.log('Tasks modal created with', allTasks.length, 'tasks');
}

// Function to close tasks modal
function closeTasksModal() {
  const modal = document.getElementById('tasksModal');
  if (modal) {
    modal.remove();
  }
}

// Grades Tab Functions
function initializeGrades() {
  const classSelect = document.getElementById('classSelect');
  const subjectSelect = document.getElementById('subjectSelect');
  const periodSelect = document.getElementById('periodSelect');
  const gradesTable = document.getElementById('gradesTable');
  const gradesTableTitle = document.getElementById('gradesTableTitle');
  const gradesTableSubtitle = document.getElementById('gradesTableSubtitle');
  
  console.log('Initializing grades...', { classSelect, subjectSelect, periodSelect });
  
  // Function to check if all selects have values
  function checkGradesSelections() {
    console.log('Checking grades selections...');
    console.log('Class value:', classSelect?.value);
    console.log('Subject value:', subjectSelect?.value);
    console.log('Period value:', periodSelect?.value);
    
    if (classSelect && subjectSelect && periodSelect && 
        classSelect.value && subjectSelect.value && periodSelect.value) {
      
      // Get selected text values
      const className = classSelect.options[classSelect.selectedIndex].text;
      const subjectName = subjectSelect.options[subjectSelect.selectedIndex].text;
      const periodName = periodSelect.options[periodSelect.selectedIndex].text;
      
      console.log('All selections made:', { className, subjectName, periodName });
      
      // Update table title and show it
      if (gradesTableTitle) gradesTableTitle.textContent = `Notas - ${className} - ${subjectName}`;
      if (gradesTableSubtitle) gradesTableSubtitle.textContent = periodName;
      if (gradesTable) {
        gradesTable.classList.remove('hidden');
        console.log('Grades table shown');
      }
      
      // Populate student data
      populateGradesTable();
    } else {
      console.log('Not all selections made yet');
      if (gradesTable) {
        gradesTable.classList.add('hidden');
      }
    }
  }
  
  // Add event listeners to selects
  if (classSelect && subjectSelect && periodSelect) {
    classSelect.addEventListener('change', function() {
      console.log('Class selection changed to:', this.value);
      checkGradesSelections();
    });
    subjectSelect.addEventListener('change', function() {
      console.log('Subject selection changed to:', this.value);
      checkGradesSelections();
    });
    periodSelect.addEventListener('change', function() {
      console.log('Period selection changed to:', this.value);
      checkGradesSelections();
    });
    
    console.log('Event listeners added to grade selects');
  } else {
    console.error('Missing grade select elements:', { classSelect, subjectSelect, periodSelect });
  }
  
  // Function to populate grades table with student data
  function populateGradesTable() {
    console.log('Populating grades table...');
    const students = [
      { id: 1, name: 'Ana Carolina Silva', currentGrade: 8.5 },
      { id: 2, name: 'Bruno Santos Oliveira', currentGrade: 7.2 },
      { id: 3, name: 'Carla Rodrigues', currentGrade: 9.1 },
      { id: 4, name: 'Daniel Costa', currentGrade: 6.8 },
      { id: 5, name: 'Elena Ferreira', currentGrade: 8.9 },
      { id: 6, name: 'Fernando Alves', currentGrade: 7.8 },
      { id: 7, name: 'Gabriela Mendes', currentGrade: 9.3 },
      { id: 8, name: 'Henrique Lima', currentGrade: 6.5 }
    ];
    
    const gradesTableBody = document.getElementById('gradesTableBody');
    if (!gradesTableBody) {
      console.error('Grades table body not found');
      return;
    }
    
    gradesTableBody.innerHTML = '';
    
    students.forEach(student => {
      const gradeColor = getGradeColor(student.currentGrade);
      
      const studentRow = document.createElement('div');
      studentRow.className = 'student-row';
      
      studentRow.innerHTML = `
        <div class="student-col">
          <p class="student-name">${student.name}</p>
          <p class="student-id">ID: ${String(student.id).padStart(3, '0')}</p>
        </div>
        <div class="current-grade-col">
          <span class="badge ${gradeColor}">${student.currentGrade.toFixed(1)}</span>
        </div>
        <div class="new-grade-col">
          <input type="number" min="0" max="10" step="0.1" placeholder="0.0" class="grade-input" 
                 data-student-id="${student.id}" onchange="handleGradeChange(this)">
        </div>
        <div class="status-col">
          <div class="status-dot" data-student-id="${student.id}"></div>
        </div>
      `;
      
      gradesTableBody.appendChild(studentRow);
    });
    
    // Add save button functionality
    const saveButton = document.querySelector('#gradesTable .btn-primary');
    if (saveButton) {
      saveButton.onclick = function() {
        saveGrades();
      };
    }
    
    console.log('Grades table populated with', students.length, 'students');
  }
  
  // Helper function to get grade color
  function getGradeColor(grade) {
    if (grade >= 9) return 'green';
    if (grade >= 7) return 'blue';
    if (grade >= 6) return 'gray';
    return 'red';
  }
}

// Function to handle grade input changes
function handleGradeChange(input) {
  const studentId = input.dataset.studentId;
  const newGrade = parseFloat(input.value);
  const statusDot = document.querySelector(`.status-dot[data-student-id="${studentId}"]`);
  
  console.log('Grade changed for student', studentId, 'to', newGrade);
  
  if (statusDot) {
    if (input.value && !isNaN(newGrade) && newGrade >= 0 && newGrade <= 10) {
      statusDot.classList.add('modified');
      statusDot.style.backgroundColor = '#f59e0b'; // Yellow for modified
    } else {
      statusDot.classList.remove('modified');
      statusDot.style.backgroundColor = ''; // Reset to default
    }
  }
}

// Function to save grades
function saveGrades() {
  const gradeInputs = document.querySelectorAll('.grade-input');
  const modifiedGrades = [];
  
  gradeInputs.forEach(input => {
    if (input.value && !isNaN(parseFloat(input.value))) {
      modifiedGrades.push({
        studentId: input.dataset.studentId,
        newGrade: parseFloat(input.value)
      });
    }
  });
  
  console.log('Saving grades:', modifiedGrades);
  
  if (modifiedGrades.length > 0) {
    // Simulate saving process
    const statusDots = document.querySelectorAll('.status-dot.modified');
    statusDots.forEach(dot => {
      dot.style.backgroundColor = '#10b981'; // Green for saved
      dot.classList.remove('modified');
      dot.classList.add('saved');
    });
    
    // Show success message
    alert(`${modifiedGrades.length} nota(s) salva(s) com sucesso!`);
    
    // Clear inputs
    gradeInputs.forEach(input => {
      if (input.value) {
        input.value = '';
      }
    });
    
    console.log('Grades saved successfully');
  } else {
    alert('Nenhuma nota foi modificada.');
  }
}

// Communications Functions
function initializeCommunications() {
  const commSearch = document.getElementById('commSearch');
  const categoryFilter = document.getElementById('categoryFilter');
  const statusFilter = document.getElementById('statusFilter');
  const commsList = document.getElementById('commsList');
  
  console.log('Initializing communications...', { commSearch, categoryFilter, statusFilter, commsList });
  
  // Communications data
  const communications = [
    {
      id: 1,
      title: 'Reunião Pedagógica - Setembro 2024',
      category: 'reuniao',
      content: 'Prezados professores, convocamos reunião pedagógica para discussão do planejamento do próximo bimestre.',
      sender: 'Coordenação Pedagógica',
      date: '2024-05-25',
      time: '14:30',
      priority: 'alta',
      read: false,
      hasAttachment: true,
      deadline: '2024-05-26'
    },
    {
      id: 2,
      title: 'Nova Metodologia de Avaliação',
      category: 'informativo',
      content: 'Implementação de novas diretrizes para avaliação formativa e somativa nas disciplinas.',
      sender: 'Direção Escolar',
      date: '2024-05-24',
      time: '09:15',
      priority: 'media',
      read: false,
      hasAttachment: false,
      deadline: null
    },
    {
      id: 3,
      title: 'Calendário de Provas - 2º Bimestre',
      category: 'calendario',
      content: 'Cronograma atualizado das avaliações do segundo bimestre letivo.',
      sender: 'Secretaria Acadêmica',
      date: '2024-05-23',
      time: '16:45',
      priority: 'alta',
      read: true,
      hasAttachment: true,
      deadline: null
    },
    {
      id: 4,
      title: 'Atualização do Sistema de Notas',
      category: 'sistema',
      content: 'O sistema passará por manutenção programada no próximo sábado.',
      sender: 'TI Educacional',
      date: '2024-05-22',
      time: '11:20',
      priority: 'baixa',
      read: true,
      hasAttachment: false,
      deadline: null
    }
  ];
  
  // Render communications
  function renderCommunications() {
    console.log('Rendering communications...');
    // Filter communications
    const searchTerm = commSearch ? commSearch.value.toLowerCase() : '';
    const categoryValue = categoryFilter ? categoryFilter.value : 'all';
    const statusValue = statusFilter ? statusFilter.value : 'all';
    
    const filteredComms = communications.filter(comm => {
      const matchesSearch = comm.title.toLowerCase().includes(searchTerm) || 
                           comm.content.toLowerCase().includes(searchTerm);
      const matchesCategory = categoryValue === 'all' || comm.category === categoryValue;
      const matchesStatus = statusValue === 'all' || 
                           (statusValue === 'read' && comm.read) ||
                           (statusValue === 'unread' && !comm.read);
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
    
    // Clear and render communications
    if (commsList) {
      commsList.innerHTML = '';
      
      if (filteredComms.length === 0) {
        commsList.innerHTML = `
          <div class="card">
            <div class="card-content" style="text-align: center; padding: 3rem 1.5rem;">
              <i data-feather="message-square" style="width: 3rem; height: 3rem; margin: 0 auto 1rem; color: #94a3b8;"></i>
              <h3 class="text-lg font-medium text-gray-900 mb-2">Nenhum comunicado encontrado</h3>
              <p class="text-gray-600">Tente ajustar os filtros de busca.</p>
            </div>
          </div>
        `;
        if (typeof feather !== 'undefined') {
          feather.replace();
        }
      } else {
        filteredComms.forEach(comm => {
          const commCard = document.createElement('div');
          commCard.className = `comm-card ${comm.read ? '' : 'unread'}`;
          
          // Get category icon
          const categoryIcon = getCategoryIcon(comm.category);
          
          // Get priority class
          const priorityClass = getPriorityClass(comm.priority);
          
          commCard.innerHTML = `
            <div class="comm-card-content">
              <div class="comm-card-inner">
                <div class="comm-card-icon">
                  <i data-feather="${categoryIcon}"></i>
                </div>
                <div class="comm-card-main">
                  <div class="comm-card-header">
                    <h3 class="comm-card-title">${comm.title}</h3>
                    <span class="badge ${priorityClass}">${comm.priority}</span>
                  </div>
                  <p>${comm.content}</p>
                  
                  <div class="comm-card-meta">
                    <span class="comm-meta-item">Por: ${comm.sender}</span>
                    <span class="comm-meta-item">${comm.date} às ${comm.time}</span>
                    ${comm.hasAttachment ? '<span class="comm-meta-item badge outline"><i data-feather="file-text" style="width: 12px; height: 12px; margin-right: 4px;"></i> Anexo</span>' : ''}
                    ${comm.deadline ? '<span class="comm-meta-item badge outline"><i data-feather="clock" style="width: 12px; height: 12px; margin-right: 4px;"></i> Prazo: ' + comm.deadline + '</span>' : ''}
                  </div>
                  
                  <div class="comm-card-footer">
                    <div class="comm-footer-actions">
                      ${!comm.read ? '<button class="btn btn-outline mark-as-read-btn"><i data-feather="check-square"></i> Marcar como Lido</button>' : ''}
                      <button class="btn btn-outline">Ver Detalhes</button>
                    </div>
                    
                    ${comm.hasAttachment ? '<button class="btn btn-outline comm-attachment"><i data-feather="file-text"></i> Baixar Anexo</button>' : ''}
                  </div>
                </div>
              </div>
            </div>
          `;
          
          commsList.appendChild(commCard);
        });
        
        // Re-initialize feather icons
        if (typeof feather !== 'undefined') {
          feather.replace();
        }
      }
      
      console.log('Communications rendered:', filteredComms.length, 'items');
    }
  }
  
  // Helper function to get category icon
  function getCategoryIcon(category) {
    switch (category) {
      case 'reuniao': return 'calendar';
      case 'informativo': return 'message-square';
      case 'calendario': return 'calendar';
      case 'sistema': return 'file-text';
      default: return 'message-square';
    }
  }
  
  // Helper function to get priority class
  function getPriorityClass(priority) {
    switch (priority) {
      case 'alta': return 'red';
      case 'media': return 'blue';
      case 'baixa': return 'green';
      default: return 'gray';
    }
  }
  
  // Add event listeners to communications filters
  if (commSearch && categoryFilter && statusFilter) {
    commSearch.addEventListener('input', renderCommunications);
    categoryFilter.addEventListener('change', renderCommunications);
    statusFilter.addEventListener('change', renderCommunications);
    
    // Initial render
    renderCommunications();
  }
  
  // Mark as read functionality
  document.addEventListener('click', function(e) {
    if (e.target.closest('.mark-as-read-btn')) {
      e.preventDefault();
      console.log('Mark as read clicked');
      
      const commCard = e.target.closest('.comm-card');
      if (commCard) {
        commCard.classList.remove('unread');
        const markAsReadBtn = e.target.closest('.mark-as-read-btn');
        if (markAsReadBtn) {
          markAsReadBtn.remove();
        }
        
        // Update the counter in the header
        const unreadCount = document.querySelectorAll('.comm-card.unread').length;
        const badge = document.querySelector('.header-actions .badge');
        if (badge) {
          badge.textContent = unreadCount;
        }
        
        console.log('Communication marked as read. Remaining unread:', unreadCount);
      }
    }
  });
}

// Students Functions
function initializeStudents() {
  console.log('Initializing students...');
  
  // Create students interface if not exists
  const studentsContent = document.getElementById('students');
  if (studentsContent) {
    studentsContent.innerHTML = `
      <div class="page-header">
        <div>
          <h2>Gestão de Alunos</h2>
          <p>Visualize e gerencie informações dos seus alunos</p>
        </div>
        <div class="header-actions">
          <button class="btn btn-outline" onclick="addNewStudent()">
            <i data-feather="user-plus"></i>
            Novo Aluno
          </button>
          <button class="btn btn-outline">
            <i data-feather="download"></i>
            Exportar Lista
          </button>
        </div>
      </div>

      <!-- Filters -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Filtros</h3>
          <p class="card-description">Filtre os alunos por turma e status</p>
        </div>
        <div class="card-content">
          <div class="filters-grid">
            <div class="filter-item">
              <label>Buscar Aluno</label>
              <div class="search-container">
                <i data-feather="search" class="search-icon"></i>
                <input type="text" placeholder="Nome do aluno..." id="studentSearch" class="search-input" />
              </div>
            </div>
            
            <div class="filter-item">
              <label>Turma</label>
              <select id="studentClassFilter" class="select-input">
                <option value="all">Todas as turmas</option>
                <option value="9a">9º Ano A</option>
                <option value="9b">9º Ano B</option>
                <option value="8a">8º Ano A</option>
              </select>
            </div>
            
            <div class="filter-item">
              <label>Status</label>
              <select id="studentStatusFilter" class="select-input">
                <option value="all">Todos</option>
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
                <option value="pending">Pendente</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Students List -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">
            <i data-feather="users"></i>
            <span>Lista de Alunos</span>
          </h3>
          <p class="card-description">Total de <span id="studentsCount">0</span> alunos</p>
        </div>
        <div class="card-content">
          <div class="students-grid" id="studentsGrid">
            <!-- Students will be populated here -->
          </div>
        </div>
      </div>
    `;
    
    // Initialize students data and rendering
    renderStudents();
    
    // Add event listeners for filters
    const studentSearch = document.getElementById('studentSearch');
    const classFilter = document.getElementById('studentClassFilter');
    const statusFilter = document.getElementById('studentStatusFilter');
    
    if (studentSearch && classFilter && statusFilter) {
      studentSearch.addEventListener('input', renderStudents);
      classFilter.addEventListener('change', renderStudents);
      statusFilter.addEventListener('change', renderStudents);
    }
    
    // Re-initialize feather icons
    if (typeof feather !== 'undefined') {
      feather.replace();
    }
  }
}

// Function to render students
function renderStudents() {
  const studentsData = [
    { id: 1, name: 'Ana Carolina Silva', class: '9a', email: 'ana.silva@escola.com', phone: '(11) 99999-1111', status: 'active', grade: 8.5 },
    { id: 2, name: 'Bruno Santos Oliveira', class: '9a', email: 'bruno.santos@escola.com', phone: '(11) 99999-2222', status: 'active', grade: 7.2 },
    { id: 3, name: 'Carla Rodrigues', class: '9b', email: 'carla.rodrigues@escola.com', phone: '(11) 99999-3333', status: 'active', grade: 9.1 },
    { id: 4, name: 'Daniel Costa', class: '9b', email: 'daniel.costa@escola.com', phone: '(11) 99999-4444', status: 'inactive', grade: 6.8 },
    { id: 5, name: 'Elena Ferreira', class: '8a', email: 'elena.ferreira@escola.com', phone: '(11) 99999-5555', status: 'active', grade: 8.9 },
    { id: 6, name: 'Fernando Alves', class: '8a', email: 'fernando.alves@escola.com', phone: '(11) 99999-6666', status: 'pending', grade: 7.8 }
  ];
  
  // Get filter values
  const searchTerm = document.getElementById('studentSearch')?.value.toLowerCase() || '';
  const classValue = document.getElementById('studentClassFilter')?.value || 'all';
  const statusValue = document.getElementById('studentStatusFilter')?.value || 'all';
  
  // Filter students
  const filteredStudents = studentsData.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm) || 
                         student.email.toLowerCase().includes(searchTerm);
    const matchesClass = classValue === 'all' || student.class === classValue;
    const matchesStatus = statusValue === 'all' || student.status === statusValue;
    
    return matchesSearch && matchesClass && matchesStatus;
  });
  
  const studentsGrid = document.getElementById('studentsGrid');
  const studentsCount = document.getElementById('studentsCount');
  
  if (studentsGrid) {
    studentsGrid.innerHTML = '';
    
    if (filteredStudents.length === 0) {
      studentsGrid.innerHTML = `
        <div class="col-span-full text-center py-12">
          <i data-feather="users" class="mx-auto h-12 w-12 text-gray-400 mb-4"></i>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Nenhum aluno encontrado</h3>
          <p class="text-gray-600">Tente ajustar os filtros de busca.</p>
        </div>
      `;
    } else {
      filteredStudents.forEach(student => {
        const studentCard = document.createElement('div');
        studentCard.className = 'student-card';
        
        const statusColor = getStatusColor(student.status);
        const gradeColor = getGradeColor(student.grade);
        
        studentCard.innerHTML = `
          <div class="student-card-header">
            <div class="student-avatar">
              <i data-feather="user"></i>
            </div>
            <div class="student-info">
              <h4 class="student-name">${student.name}</h4>
              <p class="student-email">${student.email}</p>
            </div>
            <span class="badge ${statusColor}">${getStatusText(student.status)}</span>
          </div>
          
          <div class="student-card-content">
            <div class="student-detail">
              <i data-feather="users" class="detail-icon"></i>
              <span>Turma: ${getClassName(student.class)}</span>
            </div>
            <div class="student-detail">
              <i data-feather="phone" class="detail-icon"></i>
              <span>${student.phone}</span>
            </div>
            <div class="student-detail">
              <i data-feather="file-text" class="detail-icon"></i>
              <span>Média: <span class="badge ${gradeColor}">${student.grade.toFixed(1)}</span></span>
            </div>
          </div>
          
          <div class="student-card-footer">
            <button class="btn btn-outline" onclick="viewStudentProfile(${student.id})">
              <i data-feather="eye"></i>
              Ver Perfil
            </button>
            <button class="btn btn-outline" onclick="editStudent(${student.id})">
              <i data-feather="edit"></i>
              Editar
            </button>
          </div>
        `;
        
        studentsGrid.appendChild(studentCard);
      });
    }
    
    // Update students count
    if (studentsCount) {
      studentsCount.textContent = filteredStudents.length;
    }
    
    // Re-initialize feather icons
    if (typeof feather !== 'undefined') {
      feather.replace();
    }
  }
}

// Helper functions for students
function getStatusColor(status) {
  switch (status) {
    case 'active': return 'green';
    case 'inactive': return 'red';
    case 'pending': return 'yellow';
    default: return 'gray';
  }
}

function getStatusText(status) {
  switch (status) {
    case 'active': return 'Ativo';
    case 'inactive': return 'Inativo';
    case 'pending': return 'Pendente';
    default: return 'Desconhecido';
  }
}

function getClassName(classCode) {
  switch (classCode) {
    case '9a': return '9º Ano A';
    case '9b': return '9º Ano B';
    case '8a': return '8º Ano A';
    default: return classCode;
  }
}

// Student action functions
function addNewStudent() {
  alert('Funcionalidade de adicionar novo aluno em desenvolvimento');
}

function viewStudentProfile(studentId) {
  alert(`Ver perfil do aluno ID: ${studentId}`);
}

function editStudent(studentId) {
  alert(`Editar aluno ID: ${studentId}`);
}

// Settings Functions
function initializeSettings() {
  console.log('Initializing settings...');
  
  // Create settings interface if not exists
  const settingsContent = document.getElementById('settings');
  if (settingsContent) {
    settingsContent.innerHTML = `
      <div class="page-header">
        <div>
          <h2>Configurações</h2>
          <p>Gerencie suas preferências e configurações do sistema</p>
        </div>
      </div>

      <!-- Profile Settings -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">
            <i data-feather="user"></i>
            <span>Perfil do Professor</span>
          </h3>
          <p class="card-description">Atualize suas informações pessoais</p>
        </div>
        <div class="card-content">
          <div class="settings-form">
            <div class="form-group">
              <label>Nome Completo</label>
              <input type="text" value="Prof. Maria Silva" class="form-input">
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="email" value="maria.silva@escola.com" class="form-input">
            </div>
            <div class="form-group">
              <label>Telefone</label>
              <input type="tel" value="(11) 99999-8888" class="form-input">
            </div>
            <div class="form-group">
              <label>Disciplina Principal</label>
              <select class="select-input">
                <option value="math" selected>Matemática</option>
                <option value="science">Ciências</option>
                <option value="history">História</option>
                <option value="geography">Geografia</option>
              </select>
            </div>
          </div>
          <div class="form-actions">
            <button class="btn btn-primary">
              <i data-feather="save"></i>
              Salvar Alterações
            </button>
          </div>
        </div>
      </div>

      <!-- Notification Settings -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">
            <i data-feather="bell"></i>
            <span>Notificações</span>
          </h3>
          <p class="card-description">Configure suas preferências de notificação</p>
        </div>
        <div class="card-content">
          <div class="settings-list">
            <div class="setting-item">
              <div class="setting-info">
                <h4>Comunicados da Gestão</h4>
                <p>Receba notificações sobre novos comunicados</p>
              </div>
              <label class="switch">
                <input type="checkbox" checked>
                <span class="slider"></span>
              </label>
            </div>
            
            <div class="setting-item">
              <div class="setting-info">
                <h4>Prazos de Notas</h4>
                <p>Lembrete sobre prazos para lançamento de notas</p>
              </div>
              <label class="switch">
                <input type="checkbox" checked>
                <span class="slider"></span>
              </label>
            </div>
            
            <div class="setting-item">
              <div class="setting-info">
                <h4>Reuniões Agendadas</h4>
                <p>Notificações sobre reuniões pedagógicas</p>
              </div>
              <label class="switch">
                <input type="checkbox">
                <span class="slider"></span>
              </label>
            </div>
            
            <div class="setting-item">
              <div class="setting-info">
                <h4>Email Diário</h4>
                <p>Resumo diário das atividades</p>
              </div>
              <label class="switch">
                <input type="checkbox">
                <span class="slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- System Settings -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">
            <i data-feather="settings"></i>
            <span>Preferências do Sistema</span>
          </h3>
          <p class="card-description">Configure a aparência e comportamento do sistema</p>
        </div>
        <div class="card-content">
          <div class="settings-form">
            <div class="form-group">
              <label>Tema</label>
              <select class="select-input">
                <option value="light" selected>Claro</option>
                <option value="dark">Escuro</option>
                <option value="auto">Automático</option>
              </select>
            </div>
            <div class="form-group">
              <label>Idioma</label>
              <select class="select-input">
                <option value="pt-br" selected>Português (Brasil)</option>
                <option value="en">English</option>
                <option value="es">Español</option>
              </select>
            </div>
            <div class="form-group">
              <label>Fuso Horário</label>
              <select class="select-input">
                <option value="america/sao_paulo" selected>América/São Paulo (UTC-3)</option>
                <option value="america/new_york">América/Nova York (UTC-5)</option>
                <option value="europe/london">Europa/Londres (UTC+0)</option>
              </select>
            </div>
          </div>
          <div class="form-actions">
            <button class="btn btn-primary">
              <i data-feather="save"></i>
              Salvar Preferências
            </button>
          </div>
        </div>
      </div>

      <!-- Security Settings -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">
            <i data-feather="shield"></i>
            <span>Segurança</span>
          </h3>
          <p class="card-description">Gerencie sua senha e configurações de segurança</p>
        </div>
        <div class="card-content">
          <div class="settings-form">
            <div class="form-group">
              <label>Senha Atual</label>
              <input type="password" placeholder="Digite sua senha atual" class="form-input">
            </div>
            <div class="form-group">
              <label>Nova Senha</label>
              <input type="password" placeholder="Digite uma nova senha" class="form-input">
            </div>
            <div class="form-group">
              <label>Confirmar Nova Senha</label>
              <input type="password" placeholder="Confirme a nova senha" class="form-input">
            </div>
          </div>
          <div class="form-actions">
            <button class="btn btn-primary">
              <i data-feather="lock"></i>
              Alterar Senha
            </button>
          </div>
        </div>
      </div>
    `;
    
    // Re-initialize feather icons
    if (typeof feather !== 'undefined') {
      feather.replace();
    }
  }
}
