function findAuthorById(authors, id) {
  return authors.find(author => {
    return author.id === id;
  });
}

function findBookById(books, id) {
  return books.find(book => {
    return book.id === id;
  });
}

function partitionBooksByBorrowedStatus(books) {
  let returnedBooks = books.filter((book) => 
  book.borrows.every((borrow) => borrow.returned === true));
  let borrowedBooks = books.filter((book) =>
  book.borrows.some((borrow) => borrow.returned === false));
  let dividedBooks = [[...borrowedBooks], [...returnedBooks]];
  return dividedBooks;
}

function getBorrowersForBook(book, accounts) {
  const borrowTransactions = book.borrows.slice(0, 10).map((borrow) => {
    const account = accounts.find((acc) => acc.id === borrow.id);
    return { ...borrow, ...account };
  });
  return borrowTransactions;
}


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
