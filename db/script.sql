create table Author (
	id_author INT not null auto_increment,
	name varchar(50) not null,
	surname varchar(50) not null,
	primary key(id_author)
);
INSERT INTO biblioteca_db.author(id_author, name, surname)
VALUES(2, 'Joanne', 'Rowling');
INSERT INTO biblioteca_db.author(id_author, name, surname)
VALUES(3, 'Alessandro', 'Manzoni');
INSERT INTO biblioteca_db.author(id_author, name, surname)
VALUES(4, 'Beatrice', 'Napolitano');
INSERT INTO biblioteca_db.author(id_author, name, surname)
VALUES(5, 'Maria', 'Rossi');
INSERT INTO biblioteca_db.author(id_author, name, surname)
VALUES(6, 'Marco', 'Bianchi');


create table Book (
	id_book INT not null auto_increment,
	title varchar(150) not null,
	release_date date,
	primary key(id_book)
);
INSERT INTO biblioteca_db.book(id_book, title, release_date) 
VALUES(1, 'Harry Potter', '2023-06-14');
INSERT INTO biblioteca_db.book(id_book, title, release_date)
VALUES(2, 'I promessi sposi', '1827-05-25');
INSERT INTO biblioteca_db.book(id_book, title, release_date)
VALUES(3, 'Il gioco del cardo', '2023-01-07');
INSERT INTO biblioteca_db.book(id_book, title, release_date)
VALUES(4, 'L''Alchimia della Collaborazione: Un viaggio congiunto verso la creatività', '2017-07-06');
INSERT INTO biblioteca_db.book(id_book, title, release_date)
VALUES(5, 'Pagine d''autunno', '2015-10-01');

create table Rel_Author_Book (
	id_rel int not null auto_increment,
	id_rel_author int not null,
	id_rel_book int not null,
	primary key(id_rel),
	foreign key(id_rel_author) references Author(id_author),
	foreign key(id_rel_book) references Book(id_book)
);
INSERT INTO biblioteca_db.rel_author_book(id_rel, id_rel_author, id_rel_book)
VALUES(1, 2, 1);
INSERT INTO biblioteca_db.rel_author_book(id_rel, id_rel_author, id_rel_book)
VALUES(2, 3, 2);
INSERT INTO biblioteca_db.rel_author_book(id_rel, id_rel_author, id_rel_book)
VALUES(3, 4, 3);
INSERT INTO biblioteca_db.rel_author_book(id_rel, id_rel_author, id_rel_book)
VALUES(4, 5, 4);
INSERT INTO biblioteca_db.rel_author_book(id_rel, id_rel_author, id_rel_book)
VALUES(5, 6, 4);
INSERT INTO biblioteca_db.rel_author_book(id_rel, id_rel_author, id_rel_book)
VALUES(6, 6, 5);
