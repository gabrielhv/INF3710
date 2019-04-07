set search_path = bd_schema;

insert into bd_schema.Clinic(clinicID, street, city, province, zipCode, phoneNumber, faxNumber)
VALUES ('C100', 'Saint George street', 'Montreal', 'QC', 'A1A 1A1', '5148889999', '5149998888');
insert into bd_schema.Clinic(clinicID, street, city, province, zipCode, phoneNumber, faxNumber)
VALUES ('C101', 'Saint Claude street', 'Montreal', 'QC', 'B2B 2B2', '5146667777', '5147776666');
insert into bd_schema.Clinic(clinicID, street, city, province, zipCode, phoneNumber, faxNumber)
VALUES ('C102', 'Poly street', 'Toronto', 'ON', 'C3C 3C3', '1231112222', '1232221111');


insert into bd_schema.Employee(employeeID, firstName, lastName, street, zipCode, city, province, jobfunction, phoneNumber, DOB, sex, NAS, annualSalary, clinicID)
VALUES ('E0', 'Robert', 'Nicolas', 'Saint George street', 'A2A 2A2', 'Montreal', 'QC', 'Manager', '5141112222', DATE'1980-07-13', 'M', '111222333', 150000.00, 'C100');
insert into bd_schema.Employee(employeeID, firstName, lastName, street, zipCode, city, province, jobfunction, phoneNumber, DOB, sex, NAS, annualSalary, clinicID)
VALUES ('E1', 'Bob', 'Ross', 'Victoria street', 'A2B 2C2', 'Montreal', 'QC', 'Veterinarian', '5143332222', DATE'1985-07-13', 'M', '111222444', 70000.32, 'C100');

insert into bd_schema.Employee(employeeID, firstName, lastName, street, zipCode, city, province, jobfunction, phoneNumber, DOB, sex, NAS, annualSalary, clinicID)
VALUES ('E2', 'Simone', 'Guay', 'Saint Aladin street', 'C4D 2A2', 'Montreal', 'QC', 'Manager', '5149993333', DATE'1976-07-13', 'F', '111444333', 155000.00, 'C101');
insert into bd_schema.Employee(employeeID, firstName, lastName, street, zipCode, city, province, jobfunction, phoneNumber, DOB, sex, NAS, annualSalary, clinicID)
VALUES ('E3', 'Albert', 'Einsten', 'Poof street', 'A2V 2B2', 'Montreal', 'QC', 'Veterinarian', '5143338987', DATE'1985-07-13', 'M', '787222444', 75000.12, 'C101');
insert into bd_schema.Employee(employeeID, firstName, lastName, street, zipCode, city, province, jobfunction, phoneNumber, DOB, sex, NAS, annualSalary, clinicID)
VALUES ('E4', 'Bruce', 'Willis', 'Paff street', 'A2F 5B7', 'Montreal', 'QC', 'Veterinarian', '5144531289', DATE'1990-07-13', 'M', '787543494', 55000.00, 'C101');

insert into bd_schema.Employee(employeeID, firstName, lastName, street, zipCode, city, province, jobfunction, phoneNumber, DOB, sex, NAS, annualSalary, clinicID)
VALUES ('E5', 'Alain', 'Lebel', 'Alabama street', 'A8A 2K2', 'Toronto', 'ON', 'Manager', '1239752222', DATE'1960-07-13', 'M', '123456789', 185000.00, 'C102');
insert into bd_schema.Employee(employeeID, firstName, lastName, street, zipCode, city, province, jobfunction, phoneNumber, DOB, sex, NAS, annualSalary, clinicID)
VALUES ('E6', 'Bobette', 'Rosselle', 'King street', 'N0M 2C6', 'Toronto', 'ON', 'Veterinarian', '1233332244', DATE'1975-07-13', 'F', '111222555', 82000.00, 'C102');


insert into bd_schema.Owner(ownerID, ownername, street, zipCode, province, city, phoneNumber, clinicID)
VALUES ('O300', 'John Lajoie', 'Queen street', 'J1J 1J1', 'QC', 'Montreal', '5142223334', 'C100');
insert into bd_schema.Owner(ownerID, ownername, street, zipCode, province, city, phoneNumber, clinicID)
VALUES ('O301', 'Bob Jonhson', 'Apple street', 'K3K 3K3', 'QC', 'Longueuil', '5145556667', 'C101');
insert into bd_schema.Owner(ownerID, ownername, street, zipCode, province, city, phoneNumber, clinicID)
VALUES ('O302', 'Henri Sanson', 'GottaGoFast street', 'A2B 3C4', 'ON', 'Toronto', '8272223333', 'C102');

insert into bd_schema.Animal(animalID, animalName, animalType, description, inscriptionDate, animalstate, ownerID)
VALUES ('A400', 'Snowflake', 'Dog', 'fat and very hairy', DATE'2015-07-13', 'alive', 'O300');
insert into bd_schema.Animal(animalID, animalName, animalType, description, inscriptionDate, animalstate, ownerID)
VALUES ('A410', 'Firefox', 'Dog', 'orange and soft', DATE'2016-08-23', 'alive', 'O300');
insert into bd_schema.Animal(animalID, animalName, animalType, description, inscriptionDate, animalstate, ownerID)
VALUES ('A420', 'Doggo', 'Dog', 'fluffy and cuddlely', DATE'2014-10-09', 'alive', 'O301');
insert into bd_schema.Animal(animalID, animalName, animalType, description, inscriptionDate, animalstate, ownerID)
VALUES ('A430', 'Big Pupper', 'Dog', 'very large', DATE'2012-04-26', 'alive', 'O302');
insert into bd_schema.Animal(animalID, animalName, animalType, description, inscriptionDate, animalstate, ownerID)
VALUES ('A401', 'Gluant', 'Snake', 'fat and missing a tooth', DATE'2014-07-13', 'sick', 'O300');
insert into bd_schema.Animal(animalID, animalName, animalType, description, inscriptionDate, animalstate, ownerID)
VALUES ('A402', 'Rejean', 'cat', 'a little boney', DATE'2001-07-13', 'dead', 'O301');
insert into bd_schema.Animal(animalID, animalName, animalType, description, inscriptionDate, animalstate, ownerID)
VALUES ('A403', 'Neigh', 'horse', 'stubborn and eats a lot', DATE'2012-07-13', 'alive', 'O302');

insert into bd_schema.examDetails(examID, examDate, examHour, description, animalID, vetID)
VALUES ('EX500', DATE'2019-04-01', '13:25:00', 'complete exam', 'A400', 'E1');
insert into bd_schema.examDetails(examID, examDate, examHour, description, animalID, vetID)
VALUES ('EX501', DATE'2019-04-01', '14:25:00', 'dental exam', 'A401', 'E1');
insert into bd_schema.examDetails(examID, examDate, examHour, description, animalID, vetID)
VALUES ('EX502', DATE'2019-04-02', '15:25:00', 'Health exam', 'A402', 'E6');

insert into bd_schema.treatment(treatmentNumber, description, treatmentcost)
VALUES ('T100', 'Peniciline treatment', 50.00);
insert into bd_schema.treatment(treatmentNumber, description, treatmentcost)
VALUES ('T112', 'Cold Vaccination', 70.00);

insert into bd_schema.treatmentDetails(treatmentNumber, examID, quantity, startDate, endDate)
VALUES ('T100', 'EX500', 5, DATE'2019-04-01', DATE'2019-04-6');


-- create table if not exists treatmentDetails (
-- 	treatmentNumber	      varchar(10) not null, 
-- 	examID				  varchar(10) not null,
--   	quantity              varchar(10) not null,
--   	startDate             date not null,
--   	endDate               date not null,
-- 	primary key (treatmentNumber, examID),
-- 	Foreign key(treatmentNumber) references treatment(treatmentNumber),
-- 	Foreign key (examID) references ExamDetails(examID)
-- );

