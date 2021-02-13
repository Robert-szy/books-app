{
  'use strict';

  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      books: '.books-list',
    },
  };

  const templates = {
    book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };

  const renderBooks = function(data){
    for(let book in data.books){
      /*generate HTML based on template*/
      const generatedHTML = templates.book(data.books[book]);
      //console.log('generatedHTML: ', generatedHTML);

      /*create element using utils.createEmentsFromHTML*/
      const element = utils.createDOMFromHTML(generatedHTML);

      /*find menu container*/
      const booksContainer = document.querySelector(select.containerOf.books);

      /*add element to menu*/
      booksContainer.appendChild(element);
    }
  };

  renderBooks(dataSource);
}
