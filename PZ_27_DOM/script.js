'use strict';

const list = document.querySelector('#task-list');
const title = document.getElementById('page-title');
const form = document.getElementById('task-form');   
const inputField = document.getElementById('task-input'); 
const statsArea = document.getElementById('stats');      
const errorMsg = document.getElementById('error');       

if (!list || !form || !inputField || !statsArea) {
  console.error('Ошибка: Не найден один из ключевых элементов. Проверьте ID в HTML.');
} else {
  console.log('ПЗ 27: Скрипт загружен. Элементы найдены.');
}


title.textContent = 'Список задач (ПЗ 27)';

const initialCards = document.querySelectorAll('.task');
initialCards.forEach((card, index) => {
  card.dataset.id = index + 1;
});


function updateStats() {
  const allTasks = list.querySelectorAll('.task');
 
  const doneTasks = Array.from(allTasks).filter(task => task.classList.contains('done'));
  
  const total = allTasks.length;
  const completed = doneTasks.length;
  const remaining = total - completed;


  if (statsArea) {
    statsArea.textContent = `Всего: ${total} · Выполнено: ${completed} · Осталось: ${remaining}`;
  }
}

updateStats();



function createTask(text) {
 
  const taskLi = document.createElement('li');
  taskLi.className = 'task';
  
 
  const newId = list.querySelectorAll('.task').length + 1;
  taskLi.dataset.id = newId;

  
  const taskSpan = document.createElement('span');
  taskSpan.className = 'task-text';
  taskSpan.textContent = text;
  
  
  const buttonsDiv = document.createElement('div');
  buttonsDiv.className = 'actions';

 
  function createButton(label, action) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = label;
    btn.dataset.action = action; 
    return btn;
  }

  const btnDone = createButton('Готово', 'toggle'); 
  const btnUp = createButton('Наверх', 'up');
  const btnDelete = createButton('Удалить', 'remove');

  
  buttonsDiv.appendChild(btnDone);
  buttonsDiv.appendChild(btnUp);
  buttonsDiv.appendChild(btnDelete);
  

  taskLi.appendChild(taskSpan);
  taskLi.appendChild(buttonsDiv);

  list.appendChild(taskLi);
  
  return taskLi;
}



form.addEventListener('submit', (event) => {
  event.preventDefault(); 

  const text = inputField.value.trim(); 
  if (!text) {
  
    if (errorMsg) {
      errorMsg.textContent = 'Пожалуйста, введите текст задачи!';
      errorMsg.style.color = 'red';
    }
    inputField.focus();
    return;
  }

 
  if (errorMsg) {
    errorMsg.textContent = '';
  }

  createTask(text);      
  inputField.value = '';  
  inputField.focus();    
  updateStats();        

});


list.addEventListener('click', (event) => {

  const card = event.target.closest('.task');
  
  if (!card) return; 

  
  const button = event.target.closest('button');
  if (!button) return;

  const action = button.dataset.action;

  switch (action) {
    case 'toggle':
     
      card.classList.toggle('done');
      updateStats();
      break;

    case 'up':
   
      list.prepend(card);
      updateStats();
      break;

    case 'remove':
      
      card.remove();
      updateStats();
      console.log(`Задача с ID ${card.dataset.id} удалена`);
      break;
      
    default:
      console.warn('Неизвестное действие:', action);
  }
});
