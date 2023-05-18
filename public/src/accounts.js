function findAccountById(accounts, id) {
  return accounts.find(account => {
    return account.id === id;
  });
}
//new function
function sortAccountsByLastName(accounts) {
accounts.sort((accountA, accountB) => 
accountA.name.last > accountB.name.last ? 1 : -1);
return accounts;
}

function getTotalNumberOfBorrows(account, books) {
  let total = 0;
  books.forEach((book) => {
    const borrows = book.borrows;
    borrows.forEach((borrow) => {
      if (borrow.id === account.id) {
        total += 1;
      }
    });
  });
  return total;
}

function getBooksPossessedByAccount(account, books, authors) {
  const accountId = account.id;
  const checkedOutBooks = [];
  books.forEach((book) => {
    const borrow = book.borrows[0];
    if (borrow.id === accountId && !borrow.returned) {
      const author = authors.find((author) => author.id === book.authorId);
      checkedOutBooks.push({ ...book, author });
    }
  });
  return checkedOutBooks;
}


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
