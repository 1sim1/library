<?php
require_once(__DIR__ . "/../db/db.php");
class BookEntity
{
    private $db;
    private $conn;

    public function __construct()
    {
        $this->db = new Database();
        $this->conn = $this->db->getConnection();
    }
    public function findAllBooksOrderedByDate()
    {
        // $qry = "SELECT A.name, A.surname, B.title, B.release_date
        //         FROM Author A
        //         JOIN Rel_Author_Book RAB ON A.id_author = RAB.id_rel_author
        //         JOIN Book B ON RAB.id_rel_book = B.id_book
        //         ORDER BY B.release_date DESC;
        //         ";
        $qry = "SELECT TITLE, RELEASE_DATE FROM BOOK ORDER BY RELEASE_DATE";
        $stmt = $this->conn->prepare($qry);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_OBJ); //con PDO::FETCH_OBJ ottengo un array di oggetti
        return $result;
    }
    public function findDetailBookByTitle($title)
    {
        // $qry = "SELECT Author.name, Author.surname, Book.title, Book.release_date 
        //         FROM Author 
        //         JOIN Rel_Author_Book ON Author.id_author = Rel_Author_Book.id_rel_author 
        //         JOIN Book ON Book.id_book = Rel_Author_Book.id_rel_book 
        //         WHERE Book.title = :title";
        $qry = "SELECT Book.title, Book.release_date, GROUP_CONCAT(CONCAT(Author.name, ' ', Author.surname) SEPARATOR ', ') AS authors
        FROM Author
        JOIN Rel_Author_Book ON Author.id_author = Rel_Author_Book.id_rel_author
        JOIN Book ON Book.id_book = Rel_Author_Book.id_rel_book
        WHERE Book.title = :title
        GROUP BY Book.title";

        $stmt = $this->conn->prepare($qry);
        $stmt->bindParam(":title", $title, PDO::PARAM_STR);
        $stmt->execute();

        $detailBook = $stmt->fetch(PDO::FETCH_OBJ);
        return $detailBook;
    }
    public function findBooksByAuthorSurname($author_surname) {
        $qry = "SELECT Book.title, Book.release_date
                FROM Book
                JOIN Rel_Author_Book ON Book.id_book = Rel_Author_Book.id_rel_book
                JOIN Author ON Author.id_author = Rel_Author_Book.id_rel_author
                WHERE Author.surname LIKE :author_surname";
        $stmt = $this->conn->prepare($qry);
        $stmt->bindValue(':author_surname', '%' . $author_surname . '%', PDO::PARAM_STR);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_OBJ); //con PDO::FETCH_OBJ ottengo un array di oggetti
        return $result;
    }
    public function findBooksByBookTitle($title) {
        $qry = "SELECT title, release_date 
                FROM BOOK 
                WHERE title LIKE :title";
        $stmt = $this->conn->prepare($qry);
        $stmt->bindValue(':title', '%' . $title . '%', PDO::PARAM_STR);
        $stmt->execute();

        $books = $stmt->fetchAll(PDO::FETCH_OBJ);
        return $books;
    }
}
