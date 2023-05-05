function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let borrowedBooks = books.filter((book) =>
  book.borrows.filter((note) => note.returned === false).length > 0);
  return borrowedBooks.length;
}

function getMostCommonGenres(books) {
 const genreCounts = books.reduce((acc, { genre }) => {
  if (acc[genre]) {
    acc[genre] += 1;
  } else {
    acc[genre] = 1;
  }
  return acc;
 }, {});

 const genres = Object.keys(genreCounts).map((name) => ({
  name,
  count: genreCounts[name],
 }));

 genres.sort((a,b) => b.count - a.count);
 return genres.slice(0,5);
}



function getBookCounts(books) {
  return books.map((book) => {
    return { name: book.title, count: book.borrows.length };
  });
}

function getMostPopularBooks(books) {
  const bookCounts = getBookCounts(books);
  bookCounts.sort((a,b) => b.count - a.count);
  return bookCounts.slice(0,5);
}


function getMostPopularAuthors(books, authors) {
  const authorBookMap = books.reduce((acc, book) => {
    if (!acc[book.authorId]) {
      acc[book.authorId] = [];
    }
    acc[book.authorId].push(book);
    return acc;
  }, {});

  const authorBorrowCounts = authors.map((author) => {
    const authorBooks = authorBookMap[author.id];
    const borrowCount = authorBooks.reduce((acc, book) => {
      return acc + book.borrows.length;
    }, 0);
    return {
      name: `${author.name.first} ${author.name.last}`,
      count: borrowCount,
    };
  });

  return authorBorrowCounts.sort((a, b) => b.count - a.count).slice(0, 5);
}



module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
