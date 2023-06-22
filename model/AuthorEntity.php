<?php
require_once(__DIR__ . "/../db/db.php");
class AuthorEntity {
    public $id;
    public $name;
    public $surname;
    public $books;
    private $db;
    private $conn;
    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->getConnection();
    }
}