const {
  addBookHandler,
  getAllBookHandler,
  getBookByHandler,
  editNodeByHandler,
  deleteBookByIdHandler,
} = require('./handler');


const routes = [
// tambah buku
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },
  // daftar buku
  {
    method: 'GET',
    path: '/books',
    handler: getAllBookHandler,
  },
  // detail buku
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookByHandler,
  },
  // update buku
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: editNodeByHandler,
  },
  // hapus buku
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBookByIdHandler,
  },
];
module.exports = routes;
