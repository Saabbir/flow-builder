const id = document.getElementById("drawflow-canvas");
const editor = new Drawflow(id);
editor.reroute = true;
editor.start();

const startingStepHTML = `
  <div class="card" id="cardStartingStep">
    <div class="card__header">
      <span class="card__header-icon">+</span>
      <span class="card__header-title">Starting Step</span>
    </div>
    <div class="card__body">
      Flow starts with the following step. <br>
      Click to add one of the optional triggers.
      <div class="mt-16">
        <button class="button button--outline button--outline-dashed" onclick="toggleEditAside(event, 'cardStartingStep')">Add Trigger</button>
      </div>
    </div>
  </div>
`;

const sendMessageHTML = `
  <div class="card" id="cardSendMessage">
    <div class="card__header">
      <span class="card__header-icon">+</span>
      <span class="card__header-title">Send Message</span>
    </div>
    <div class="card__body">
      <div class="mt-16">
        <button class="button button--outline button--outline-big button--outline-dashed" onclick="toggleEditAside(event, 'cardSendMessage')">Add a text</button>
      </div>
    </div>
  </div>
`;

const sendSMSHTML = `
  <div class="card" id="cardSendSMS">
    <div class="card__header">
      <span class="card__header-icon">+</span>
      <span class="card__header-title">Send SMS</span>
    </div>
    <div class="card__body">
      <div class="mt-16">
        <button class="button button--outline button--outline-big button--outline-dashed" onclick="toggleEditAside(event, 'cardSendSMS')">Add a text</button>
      </div>
    </div>
  </div>
`;

const sendEmailHTML = `
  <div class="card" id="cardSendEmail">
    <div class="card__header">
      <span class="card__header-icon">+</span>
      <span class="card__header-title">Send Email</span>
    </div>
    <div class="card__body">
      Create your email by adding texts, images and buttons. Continue automation from all the clickable elements. Add tags to segment your contacts.
      <div class="mt-16">
        <button class="button button--outline button--outline-big button--outline-dashed" onclick="toggleEditAside(event, 'cardSendEmail')">Button</button>
      </div>
    </div>
  </div>
`;

const startFlowHTML = `
  <div class="card" id="cardStartFlow">
    <div class="card__header">
      <span class="card__header-icon">+</span>
      <span class="card__header-title">Start Flow</span>
    </div>
    <div class="card__body">
      <div class="mt-16">
        <button class="button button--outline button--outline-big button--outline-dashed" onclick="toggleEditAside(event, 'cardStartFlow')">Click to Select Flow</button>
      </div>
    </div>
  </div>
`;

// Insert Starting Step Node
editor.addNode('startingStep', 0, 1, 50, 50, 'startingStep', {}, startingStepHTML);

function addNode(e) {
  if (e.target.id === 'sendMessage') {
    editor.addNode('sendMessage', 1, 1, 100, 100, 'sendMessage', {}, sendMessageHTML);
  }

  if (e.target.id === 'sendSMS') {
    editor.addNode('sendSMS', 1, 1, 150, 150, 'sendSMS', {}, sendSMSHTML);
  }

  if (e.target.id === 'sendEmail') {
    editor.addNode('sendEmail', 1, 1, 200, 200, 'sendEmail', {}, sendEmailHTML);
  }

  if (e.target.id === 'startFlow') {
    editor.addNode('startFlow', 1, 1, 250, 250, 'startFlow', {}, startFlowHTML);
  }
}

function toggleNodeMenu() {
  nodeMenu.classList.toggle('is-visible');
  plusIconSpan.classList.toggle('is-clicked');
}

function hideNodeMenu() {
  nodeMenu.classList.remove('is-visible');
  plusIconSpan.classList.remove('is-clicked');
}

function toggleEditAside(e, id) {
  editAside.classList.toggle('is-visible');
  editAside.innerHTML = '';
  if (id === 'cardSendMessage' || id === 'cardSendSMS') {
    const placeholderText = id === 'cardSendMessage' ? 'Type message' : 'Type SMS';
    const input = document.createElement('input')
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', placeholderText);
    input.addEventListener('input', (e) => {
      const cardBody = document.querySelector(`#${id} .card__body`);
      cardBody.textContent = e.target.value;
    })
    editAside.appendChild(input);
  }

  if (id === 'cardStartingStep') {
    editAside.innerHTML = '<p>Edit steps in here!</p>';
  }

  if (id === 'cardStartFlow') {
    const input = document.createElement('input')
    input.setAttribute('type', 'file');
    input.addEventListener('change', (e) => {
      const files = e.target.files;
      const image = document.createElement('img');
      image.src = window.URL.createObjectURL(files[0]);

      const cardBody = document.querySelector(`#${id} .card__body`);
      cardBody.innerHTML = '';
      cardBody.appendChild(image);
    });
    editAside.appendChild(input);
  }
}

function hideEditAside() {
  editAside.classList.remove('is-visible');
}

const plusIcon = document.querySelector('#plus-icon');
const plusIconSpan = document.querySelector('#plus-icon span');
const nodeMenu = document.querySelector('.node-menu');
const editAside = document.querySelector('.edit-aside');
const buttons = document.querySelectorAll('.button');

plusIcon.addEventListener('click', toggleNodeMenu);
nodeMenu.addEventListener('click', addNode);
document.addEventListener('click', (e) => {
  if (e.target !== nodeMenu && e.target !== plusIcon) {
    hideNodeMenu();
  }

  if (!editAside.contains(e.target) && !(e.target.nodeName === 'BUTTON')) {
    hideEditAside();
  }
});