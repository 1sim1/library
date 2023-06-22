<?php
require(__DIR__ . "/../db/db.php");
require(__DIR__ . "/../model/BookEntity.php");
class BibliotecaController
{
    public function actionGetAllBooksOrderedByDate()
    {
        try {
            $bookModel = new BookEntity();
            $orderedTableBookList = $bookModel->findAllBooksOrderedByDate();
            $ret['cod'] = 0;
            $ret['dat'] = $orderedTableBookList;
            $ret['msg'] = '';
            if ($orderedTableBookList === []) {
                $ret['msg'] = 'Tabella vuota';
            }
        } catch (Exception $e) {
            $ret['cod'] = 1;
            $ret['dat'] = null;
            $ret['msg'] = 'Problemi nel caricamento tabella dei libri. ERRORE ' . $e->getMessage();
        }
        echo json_encode($ret);
    }
    public function actionGetDetailBookByTitle($title)
    {
        try {
            $bookModel = new BookEntity();
            $detailBook = $bookModel->findDetailBookByTitle($title);
            $ret['cod'] = 0;
            $ret['dat'] = $detailBook;
            $ret['msg'] = '';
        } catch (Exception $e) {
            $ret['cod'] = 1;
            $ret['dat'] = null;
            $ret['msg'] = 'Problemi nel caricamento tabella dei libri. ERRORE ' . $e->getMessage();
        }
        echo json_encode($ret);
    }
    public function actionGetBooksByAuthorSurname($author_surname)
    {
        if ($author_surname !== '') {
            try {
                $bookModel = new BookEntity();
                $bookListByAuthorSurname = $bookModel->findBooksByAuthorSurname($author_surname);
                $ret['cod'] = 0;
                $ret['dat'] = $bookListByAuthorSurname;
                $ret['msg'] = '';
                if ($bookListByAuthorSurname === []) {
                    $ret['msg'] = 'Tabella vuota';
                }
            } catch (Exception $e) {
                $ret['cod'] = 1;
                $ret['dat'] = null;
                $ret['msg'] = 'Problemi nel caricamento tabella dei libri. ERRORE ' . $e->getMessage();
            }
        } else {
            $ret['cod'] = 1;
            $ret['dat'] = null;
            $ret['msg'] = 'Campo cognome autore vuoto';
        }

        echo json_encode($ret);
    }
    public function actionGetBooksByBookTitle($title)
    {
        if ($title !== '') {
            try {
                $bookModel = new BookEntity();
                $book = $bookModel->findBooksByBookTitle($title);
                $ret['cod'] = 0;
                $ret['dat'] = $book;
                $ret['msg'] = '';
            } catch (Exception $e) {
                $ret['cod'] = 1;
                $ret['dat'] = null;
                $ret['msg'] = 'Problemi nel caricamento del libro. ERRORE ' . $e->getMessage();
            }
        } else {
            $ret['cod'] = 1;
            $ret['dat'] = null;
            $ret['msg'] = 'Campo titolo del libro vuoto';
        }
        echo json_encode($ret);
    }
}
