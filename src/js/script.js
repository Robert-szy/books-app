{
  'use strict';

  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      books: '.books-list',
      filters: '.filters',
      book_img: '.books-list .book__image',
    },
  };

  const templates = {
    book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };

  class BooksList {
    constructor() {
      const thisBooks = this;

      const favoriteBooks = [];
      const filters = [];

      thisBooks.initData(dataSource);
      thisBooks.getElements();
      thisBooks.initActions(favoriteBooks, filters);
      //thisBooks.markFiltered();
      //thisBooks.determineRatingBgc();

    }

    initData(dataSource) {
      const thisBooks = this;
      thisBooks.data = dataSource.books;

      for(let book in thisBooks.data){
        /*generate HTML based on template*/
        const generatedHTML = templates.book(thisBooks.data[book]);
        //console.log('generatedHTML: ', generatedHTML);

        /*create element using utils.createEmentsFromHTML*/
        const element = utils.createDOMFromHTML(generatedHTML);

        /*find menu container*/
        const booksContainer = document.querySelector(select.containerOf.books);

        //const ratingBgc = determineRatingBgc(document.querySelector('.book__rating__fill').innerHTML);
        //const ratingWidth = document.querySelector('.book__rating__fill').innerHTML*10;

        /*add element to menu*/
        booksContainer.appendChild(element);
      }

    }

    getElements() {
      const thisBooks = this;
      thisBooks.books = document.querySelector(select.containerOf.books);
      thisBooks.filterForm = document.querySelector(select.containerOf.filters);
    }

    initActions(favoriteBooks, filters) {
      const thisBooks = this;

      thisBooks.books.addEventListener('dblclick', function(event){
        event.preventDefault();
        if(event.target.offsetParent.classList.contains('book__image')){
          const isFavoriteBook = favoriteBooks.indexOf(thisBooks.books.dataset.id);
          if(isFavoriteBook){

            thisBooks.books.classList.add('favorite');
            favoriteBooks.push(thisBooks.books.dataset.id);

          } else {
            thisBooks.books.classList.remove('favorite');
            favoriteBooks.splice(favoriteBooks.indexOf(thisBooks.books.dataset.id), 1);
          }
        }
      });


      thisBooks.filterForm.addEventListener('click', function(event){
        event.preventDefault();
        if(event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter'){
          console.log(event.target.value);
          if (event.target.checked && filters.indexOf(event.target.value)<0){
            filters.push(event.target.value);
          } else {
            filters.splice(filters.indexOf(event.target.value), 1);
          }
        }
        thisBooks.markFiltered(filters);

      });

    }

    markFiltered(filters) {
      for(const book of dataSource.books){
        let shouldBeHidden = false;

        for(const filter in filters){

          if(filters.indexOf(filters[filter])>=0 && book.details[filters[filter]]){
            shouldBeHidden = true;
            break;
          }

        }
        const bookID = document.querySelectorAll(select.containerOf.book_img);

        if(shouldBeHidden){
          bookID[book.id-1].classList.add('hidden');
        } else {
          bookID[book.id-1].classList.remove('hidden');
        }
      }
    }

    //determineRatingBgc() {
    /*const determineRatingBgc = function(rating){
    let background = '';

    if(rating<6){
      background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if(rating>6 && rating<=8){
      background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    } else if(rating>8 && rating<= 9){
      background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else if(rating>9){
      background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }

    return background;

  };*/
  //  }
  }

  const app = {
    init: function(){
      const thisApp = this;
      thisApp.books =  new BooksList();
      console.log(thisApp);
    }
  };
  app.init();

}
