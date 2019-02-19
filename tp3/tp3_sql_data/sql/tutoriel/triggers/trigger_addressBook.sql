DROP TABLE IF EXISTS addressbook CASCADE;
DROP TABLE IF EXISTS phonebook CASCADE;

CREATE TABLE addressbook (
id SERIAL Primary Key,
name VARCHAR(10),
address VARCHAR (20),
phoneNum VARCHAR);


CREATE TABLE phonebook (
id SERIAL Primary Key,
name VARCHAR(10),
phoneNum VARCHAR);



CREATE OR REPLACE FUNCTION add_to_phonebook() RETURNS TRIGGER AS $phonebook$
-- A COMPLETER
$phonebook$ LANGUAGE plpgsql;


--- Création du trigger
-- A COMPLETER


-- Test du trigger
insert into addressbook(name, address, phoneNum) VALUES ('AZ','rue des 100 soucis', '613-9696363');

select * from phonebook;



