const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('@koa/cors');
const app = new Koa();

const Tickets = require('./Tickets');
const tickets = new Tickets();

const PORT = 8080; // порт сервера

// Парсинг формы
app.use(
    koaBody({
        multipart: true,
    })
);

// CORS
app.use(cors());

// Обработка GET
app.use((ctx, next) => {
    const { method } = ctx.request.query;
    switch (method) {
      case 'allTickets':
        ctx.response.status = 200;
        ctx.body = tickets.getTickets();
        return;
      case 'ticketById':
        const { id } = ctx.request.query;
        ctx.response.status = 200;
        ctx.body = tickets.getTicketsFull(id);   
        return;        
      default:
        next();
    }    
});

// Обработка POST
app.use((ctx) => {
  const { method } = ctx.request.body;
  switch (method) {
    case 'createTicket': {
      const {name, description} = ctx.request.body;
      ctx.body = tickets.createTicket(name, description);
      break;
    }
    case 'removeTicket': {
      const { id } = ctx.request.body;
      ctx.response.status = 200;
      ctx.body = tickets.removeTicket(id);
      break;
    }
    case 'editTicket': {
      const { id, name, description } = ctx.request.body;
      ctx.response.status = 200;
      ctx.body = tickets.editTicket(id, name, description);
      break;
    }
    case 'changeCheckbox': {
      const { id, status } = ctx.request.body;
      ctx.response.status = 200;
      ctx.body = tickets.changeCheckbox(id, status);
      break;
    }
    default:
      ctx.status = 404;
      ctx.body = 'Не верный запрос'
  }
})

app.listen(PORT, () => {
  console.log(`Server running on https://localhost:${PORT}`);
});
