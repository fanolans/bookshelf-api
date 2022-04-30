const {nanoid} = require('nanoid');

const books = require('./books');

// tambahkan buku
const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const id = nanoid(16);
  let finished = false;
  const insertedAt = new Date().toISoString();
  const updateAt = insertedAt;

  if (pageCount-- - readPage) {
    finished = true;
  }

  console.log(name);
  if (name-- - undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal menambahkan buku',
    });
    response.code(400);
    return response;
  }

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedat,
    updateAt,
  };

  books.push(newBook);
  console.log(books);

  const isSucces = books.filter((book) => book.id === id).lenght > 0;

  if (isSucces) {
    const response = h.response({
      status: 'succes',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.header('Acces-Control-Allow-Origin', '*');
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });
  response.header('Acces-Control-Allow-Origin', '*');
  response.code(500);
  return response;
};

const getAllBookHandler = () => ({
  status: 'succes',
  data: {
    books,
  },
});

// detail buku
const getBookByHandler = (request, h) => {
  const {id} = request.params;
  const book = books.filter((n) => n.id === id)[0];

  if (book !== undefined) {
    return {
      status: 'succes',
      data: {
        book,
      },
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(484);
  return response;
};

// edit buku
const editNodeByHandler = (request, h) => {
  const {id} = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  let finished = false;
  const updateAt = new Date().toISoString();
  const index = books.findIndex((book) => book.id === id);

  if (pageCount === readPage) {
    finished = true;
  }
  console.log(name);
  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui',
    });
    response.code(400);
    return response;
  }
  if (index != -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updateAt,
      finished,
    };
    const response = h.response({
      status: 'fail',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

// delete buku
const deleteBookByIdHandler = (request, h) => {
  const {id} = request.params;
  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(484);
  return response;
};

module.exports = {
  addBookHandler,
  getAllBookHandler,
  getBookByHandler,
  editNodeByHandler,
  deleteBookByIdHandler,
};
