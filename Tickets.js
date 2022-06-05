const uuid = require('uuid');

class Tickets {
  constructor() {
    this.tickets = [];
  }

  /**
   * Возвращает ticket без description
   * @returns массив объектов ticket
   */
  getTickets() {
    const tickets = [];
    this.tickets.forEach((item) => {
      const { id, name, status, created } = item;
      tickets.push({ id, name, status, created });
    });        
    return {
      length: tickets.length,
      tickets: tickets,
      message: (tickets.length) ? 'Запрос выполнен' : 'Список пуст',
    }
  }

  /**
   * Возвращает полный объект ticket по id
   * @param {*} id - id ticket
   * @returns ticket
   */
  getTicketsFull(id) {
    return this.tickets.find((ticket) => ticket.id === id);
  }
  
  /**
   * Создает новый тикет и возвращает его
   * @param {*} name - имя тикета
   * @param {*} description - полное описание
   * @returns - объект тикета
   */
  createTicket(name, description) {
    const newTicket = {      
      id: uuid.v4(),
      name,
      description,   
      status : false,
      created : new Date(Date.now()).toLocaleString(),   
    }
    this.tickets.push(newTicket);
    return {
      length: this.tickets.length,
      ticket: newTicket,
      message: 'Тикет успешно добавлен',
    };
  }

  /**
   * Редактирует тикет
   * @param {*} id - Id
   * @param {*} name - название
   * @param {*} description - Полное описание
   * @returns - Измененный тикет
   */
  editTicket(id, name, description) {
    const editTicket = this.getTicketsFull(id);
    editTicket.name = name;
    editTicket.description = description;
    editTicket.created = new Date(Date.now()).toLocaleString();
    return {
      ticket: editTicket,
      message: 'Тикет успешно изменен',
    };
  }

  /**
   * Изменение статуса чекбокса
   * @param {*} id - id тикета
   * @param {*} status - новый статус
   * @returns -
   */
  changeCheckbox(id, status) {
    const ticket = this.getTicketsFull(id);
    ticket.status = status;
    return {
      status: status,
      message: 'Статус успешно изменен'
    }
  }
  
  /**
   * Удаляет тикет
   * @param {*} id - id тикета
   */
  removeTicket(id) {
    this.tickets = this.tickets.filter((ticket) => ticket.id !== id);
    return {
      length: this.tickets.length,
      message: 'Тикет успешно удален'
    };
  }

}

module.exports = Tickets;