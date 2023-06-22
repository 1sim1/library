$(document).ready(function () {
    $('#showBooks').off('click').on('click', onClickShowTableBooks);
    $('.getBookDetail').off('click').on('click', onClickShowDetailBook);

    $('#showSearchByTitle').off('click').on('click', onClickShowSearchByTitle);
    $('#showSearchByAuthor').off('click').on('click', onClickShowSearchByAuthor);

    $('.btn-close').off('click').on('click', closeModal);
    $('.btn-secondary').off('click').on('click', closeModal);
});

/////////////////////////////////////////////////////////////////////////////////////////////
//PRIMA PARTE

//Contiene gli ultimi volumi in ordine cronologico di acquisizione

onClickShowTableBooks = function () {
    let tableBooksByAuthor = document.getElementById('tableBooksByAuthorSurname');
    _destroyTableOfElements(tableBooksByAuthor);
    let detailBookTable = document.getElementById('detailBook');
    _destroyTableOfElements(detailBookTable);
    let tableBooksByTitle = document.getElementById('tableBooksByBookTitle');
    _destroyTableOfElements(tableBooksByTitle);
    let searchArea = document.getElementById('searchBook');
    _destroyTableOfElements(searchArea);

    $.ajax({
        url: '../../index.php/BibliotecaController/AllBooksOrderedByDate',
        type: "GET",
        success: onGetShowTableBooks,
        async: true,
        context: this,
        crossBrowser: "true"
    });
}

onGetShowTableBooks = function (response) {
    response = $.parseJSON(response);
    let tableBooks = document.getElementById('tableBooks');
    _createTableOfElements(response, tableBooks);
}


//Premendo sul singolo volume verrà aperta la pagina di dettaglio del singolo volume.

onClickShowDetailBook = function (row) {
    let selectedRow = row.parentNode.parentNode;
    let bookTitle = selectedRow.childNodes[0].innerText;
    $.ajax({
        url: '../../index.php/BibliotecaController/DetailBookByTitle/' + bookTitle,
        type: "GET",
        success: onGetShowDetailBook,
        async: true,
        context: this,
        crossBrowser: "true",
        data: bookTitle
    });
}

onGetShowDetailBook = function (response) {
    response = $.parseJSON(response);
    let tableDetail = document.getElementById('detailBook');

    if (tableDetail.hasChildNodes()) {
        _destroyTableOfElements(tableDetail);
    }
    let headerDetail = document.createElement('thead');
    let bodyDetail = document.createElement('tbody');
    let headLength = 0;
    let rowHead = document.createElement('tr');
    if (typeof response.dat !== 'undefined' && response.dat !== null) {
        headLength = Object.keys(response.dat).length;

        let row = document.createElement('tr');
        for (element in response.dat) {
            let column = document.createElement("td");
            let field = document.createTextNode(response.dat[element]);
            column.appendChild(field);
            row.appendChild(column);

            let th = document.createElement('th');
            th.classList.add('bg-success');
            let thField = document.createTextNode(element);
            th.appendChild(thField);
            rowHead.appendChild(th);
        };
        bodyDetail.appendChild(row);
    }
    let closeButton = document.createElement('button');
    closeButton.className = 'btn-close';
    closeButton.setAttribute('aria-label', 'Close');
    closeButton.onclick = function () {
        _destroyTableOfElements(tableDetail);
    };
    rowHead.appendChild(closeButton);
    headerDetail.appendChild(rowHead);
    tableDetail.appendChild(headerDetail);
    tableDetail.appendChild(bodyDetail);
    document.body.appendChild(tableDetail);

}

/////////////////////////////////////////////////////////////////////////////////////////////
//SECONDA PARTE

onClickShowSearchByTitle = function () {
    let divSearch = document.getElementById('searchBook');

    let tableAllBooks = document.getElementById('tableBooks');
    _destroyTableOfElements(tableAllBooks);
    let tableDetailBook = document.getElementById('detailBook');
    _destroyTableOfElements(tableDetailBook);
    let tableBooksByAuthor = document.getElementById('tableBooksByAuthorSurname');
    _destroyTableOfElements(tableBooksByAuthor);
    // Rimuovo gli elementi esistenti se presenti
    if (divSearch.hasChildNodes()) {
        let childElements = divSearch.querySelectorAll('*');
        childElements.forEach(function (element) {
            divSearch.removeChild(element);
        });
    }

    // Creazione degli elementi di ricerca per titolo
    let labelSearchBook = document.createElement('label');
    let inputTextBook = document.createElement('input');
    inputTextBook.setAttribute('id', 'bookInput');
    labelSearchBook.innerText = 'Type here the title of the book you are looking for: ';
    let searchButtonBook = document.createElement('button');
    searchButtonBook.textContent = 'Search';
    searchButtonBook.setAttribute('id', 'getBooksByTitle');
    // searchButtonBook.setAttribute('onclick', 'onClickShowBooksByTitle()');
    searchButtonBook.addEventListener('click', onClickShowBooksByTitle);

    // Aggiunta degli elementi al div di ricerca
    divSearch.appendChild(labelSearchBook);
    divSearch.appendChild(inputTextBook);
    divSearch.appendChild(searchButtonBook);
}
onClickShowSearchByAuthor = function () {
    let divSearch = document.getElementById('searchBook');

    let tableAllBooks = document.getElementById('tableBooks');
    _destroyTableOfElements(tableAllBooks);
    let tableDetailBook = document.getElementById('detailBook');
    _destroyTableOfElements(tableDetailBook);
    let tableBooksByTitle = document.getElementById('tableBooksByBookTitle');
    _destroyTableOfElements(tableBooksByTitle);
    // Rimuovo gli elementi esistenti se presenti
    if (divSearch.hasChildNodes()) {
        let childElements = divSearch.querySelectorAll('*');
        childElements.forEach(function (element) {
            divSearch.removeChild(element);
        });
    }

    // Creazione degli elementi di ricerca per cognome autore
    let labelSearchBook = document.createElement('label');
    let inputTextBook = document.createElement('input');
    inputTextBook.setAttribute('id', 'authorInput');
    labelSearchBook.innerText = 'Type here the author surname: ';
    let searchButtonBook = document.createElement('button');
    searchButtonBook.textContent = 'Search';
    searchButtonBook.setAttribute('id', 'getBooksByAuthor');
    // searchButtonBook.setAttribute('onclick', 'onClickShowBooksByAuthor()');
    searchButtonBook.addEventListener('click', onClickShowBooksByAuthor);


    // Aggiunta degli elementi al div di ricerca
    divSearch.appendChild(labelSearchBook);
    divSearch.appendChild(inputTextBook);
    divSearch.appendChild(searchButtonBook);
}

onClickShowBooksByAuthor = function () {
    let detailTable = document.getElementById('detailBook');
    _destroyTableOfElements(detailTable);
    let authorSurname = $('#authorInput').val();
    if(authorSurname !== '') {
        $.ajax({
            url: '../../index.php/BibliotecaController/BooksByAuthorSurname/' + authorSurname,
            type: "GET",
            success: onGetShowBooksByAuthor,
            async: true,
            context: this,
            crossBrowser: "true",
        });
    } else {
        // alert('You have to fill the input area');
        let modal = document.getElementById('emptyInput');
        modal.style.display = 'block';
    }
    
}
onGetShowBooksByAuthor = function (response) {
    response = $.parseJSON(response);
    let tableBooksByAuthorSurname = document.getElementById('tableBooksByAuthorSurname');
    _createTableOfElements(response, tableBooksByAuthorSurname);
}


onClickShowBooksByTitle = function () {
    let bookTitle = $('#bookInput').val();
    let detailTable = document.getElementById('detailBook');
    _destroyTableOfElements(detailTable);
    if(bookTitle !== '') {
        $.ajax({
            url: '../../index.php/BibliotecaController/BooksByBookTitle/' + bookTitle,
            type: "GET",
            success: onGetShowBooksByTitle,
            async: true,
            context: this,
            crossBrowser: "true",
        });
    } else {
        let modal = document.getElementById('emptyInput');
        modal.style.display = 'block';
    }
}
onGetShowBooksByTitle = function (response) {
    response = $.parseJSON(response);
    let tableBooks = document.getElementById('tableBooksByBookTitle');
    _createTableOfElements(response, tableBooks);
}

//Funzione chiudi modale
closeModal = function() {
    let modal = document.getElementById('emptyInput');
    modal.style.display = 'none';
}
//Funzione privata atta alla creazione delle tabelle risultanti dalle query
_createTableOfElements = function (response, tableBooks) {
    _destroyTableOfElements(tableBooks);
    if (!tableBooks.hasChildNodes()) {
        let headerBooks = document.createElement('thead');
        let bodyBooks = document.createElement('tbody');
        let headLength = 0;
        if (typeof response.dat[0] !== 'undefined' && response.dat[0] !== null) {
            headLength = Object.keys(response.dat[0]).length;
        } else {
            let paragraph = document.createElement('p');
            paragraph.innerHTML = response.msg;
            document.body.appendChild(paragraph);
        }
        let rowHead = document.createElement('tr');
        let counter = 0;
        for (let i = 0; i < (response.dat).length; i++) {
            let row = document.createElement('tr');

            Object.keys(response.dat[i]).forEach(element => {
                let column = document.createElement("td");
                let field = document.createTextNode(response.dat[i][element]);
                column.appendChild(field);
                row.appendChild(column);

                if (counter < headLength) {
                    let th = document.createElement('th');
                    th.classList.add('bg-success');
                    let thField = document.createTextNode(element);
                    th.appendChild(thField);
                    rowHead.appendChild(th);
                    counter++;
                }
            });
            let detailColumn = document.createElement("td");
            let detailButton = document.createElement('button');
            detailButton.textContent = 'Click';
            detailButton.setAttribute('class', 'getBookDetail');
            detailButton.setAttribute('onclick', 'onClickShowDetailBook(this)');
            detailColumn.appendChild(detailButton);
            row.appendChild(detailColumn);
            bodyBooks.appendChild(row);
        }
        let thDetail = document.createElement('th');
        thDetail.classList.add('bg-success');
        thDetail.innerText = 'Detail';
        rowHead.appendChild(thDetail);
        let closeButton = document.createElement('button');
        closeButton.className = 'btn-close';
        closeButton.setAttribute('aria-label', 'Close');
        closeButton.onclick = function () {
            _destroyTableOfElements(tableBooks);
        };
        rowHead.appendChild(closeButton);
        headerBooks.appendChild(rowHead);
        tableBooks.appendChild(headerBooks);
        tableBooks.appendChild(bodyBooks);
        document.body.appendChild(tableBooks);
    }
}
//Funzione privata atta alla distruzione di un elemento HTML contenente altri elementi
_destroyTableOfElements = function(table) {
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
}
