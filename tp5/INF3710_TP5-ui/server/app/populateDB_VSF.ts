// tslint:disable
export const data: string = `SET search_path =  VetoSansFrontieresDB;

insert into VetoSansFrontieresDB.Clinic(clinicID, street, city, province, zipCode, phoneNumber, faxNumber)
VALUES ('C100', 'Saint George street', 'Montreal', 'QC', 'A1A 1A1', '5148889999', '5149998888');
insert into VetoSansFrontieresDB.Clinic(clinicID, street, city, province, zipCode, phoneNumber, faxNumber)
VALUES ('C101', 'Saint Claude street', 'Montreal', 'QC', 'B2B 2B2', '5146667777', '5147776666');
insert into VetoSansFrontieresDB.Clinic(clinicID, street, city, province, zipCode, phoneNumber, faxNumber)
VALUES ('C102', 'Poly street', 'Toronto', 'ON', 'C3C 3C3', '1231112222', '1232221111');



insert into VetoSansFrontieresDB.Employee(employeeID, firstName, lastName, street, zipCode, city, province, jobfunction, phoneNumber, DOB, sex, NAS, annualSalary, clinicID)
VALUES ('E0', 'Robert', 'Nicolas', 'Saint George street', 'A2A 2A2', 'Montreal', 'QC', 'Manager', '5141112222', DATE'1980-07-13', 'M', '111222333', 150000.00, 'C100');
insert into VetoSansFrontieresDB.Employee(employeeID, firstName, lastName, street, zipCode, city, province, jobfunction, phoneNumber, DOB, sex, NAS, annualSalary, clinicID)
VALUES ('E1', 'Bob', 'Ross', 'Victoria street', 'A2B 2C2', 'Montreal', 'QC', 'Veterinarian', '5143332222', DATE'1985-07-13', 'M', '111222444', 70000.32, 'C100');

insert into VetoSansFrontieresDB.Employee(employeeID, firstName, lastName, street, zipCode, city, province, jobfunction, phoneNumber, DOB, sex, NAS, annualSalary, clinicID)
VALUES ('E2', 'Simone', 'Guay', 'Saint Aladin street', 'C4D 2A2', 'Montreal', 'QC', 'Manager', '5149993333', DATE'1976-07-13', 'F', '111444333', 155000.00, 'C101');
insert into VetoSansFrontieresDB.Employee(employeeID, firstName, lastName, street, zipCode, city, province, jobfunction, phoneNumber, DOB, sex, NAS, annualSalary, clinicID)
VALUES ('E3', 'Jean', 'Tremblay', 'Poof street', 'A2V 2B2', 'Montreal', 'QC', 'Veterinarian', '5143338987', DATE'1985-07-13', 'M', '787222444', 75000.12, 'C101');
insert into VetoSansFrontieresDB.Employee(employeeID, firstName, lastName, street, zipCode, city, province, jobfunction, phoneNumber, DOB, sex, NAS, annualSalary, clinicID)
VALUES ('E4', 'Bruce', 'Willis', 'Paff street', 'A2F 5B7', 'Montreal', 'QC', 'Veterinarian', '5144531289', DATE'1990-07-13', 'M', '787543494', 55000.00, 'C101');

insert into VetoSansFrontieresDB.Employee(employeeID, firstName, lastName, street, zipCode, city, province, jobfunction, phoneNumber, DOB, sex, NAS, annualSalary, clinicID)
VALUES ('E5', 'Alain', 'Lebel', 'Alabama street', 'A8A 2K2', 'Toronto', 'ON', 'Manager', '1239752222', DATE'1960-07-13', 'M', '123456789', 185000.00, 'C102');
insert into VetoSansFrontieresDB.Employee(employeeID, firstName, lastName, street, zipCode, city, province, jobfunction, phoneNumber, DOB, sex, NAS, annualSalary, clinicID)
VALUES ('E6', 'Bobette', 'Rosselle', 'King street', 'N0M 2C6', 'Toronto', 'ON', 'Veterinarian', '1233332244', DATE'1975-07-13', 'F', '111222555', 82000.00, 'C102');


insert into VetoSansFrontieresDB.Owner(ownerid, ownername, street, zipCode, province, city, phoneNumber, clinicID)
VALUES ('O300', 'John Lajoie', 'Queen street', 'J1J 1J1', 'QC', 'Montreal', '5142223334', 'C100');
insert into VetoSansFrontieresDB.Owner(ownerid, ownername, street, zipCode, province, city, phoneNumber, clinicID)
VALUES ('O301', 'Bob Jonhblayson', 'Apple street', 'K3K 3K3', 'QC', 'Longueuil', '5145556667', 'C101');
insert into VetoSansFrontieresDB.Owner(ownerid, ownername, street, zipCode, province, city, phoneNumber, clinicID)
VALUES ('O302', 'Henri Sanson', 'GottaGoFast street', 'A2B 3C4', 'ON', 'Toronto', '8272223333', 'C102');
insert into VetoSansFrontieresDB.Owner(ownerid, ownername, street, zipCode, province, city, phoneNumber, clinicID)
VALUES ('O303', 'Bill Cosby', 'SleepWell street', 'K6E 9D2', 'ON', 'Toronto', '8278529874', 'C102');

insert into VetoSansFrontieresDB.Animal(animalid, animalname, animaltype, description, inscriptiondate, animalstate, ownerid)
VALUES ('A400', 'Snowflake', 'Dog', 'fat and very hairy', DATE'2015-07-13', 'alive', 'O300');
insert into VetoSansFrontieresDB.Animal(animalid, animalname, animaltype, description, inscriptiondate, animalstate, ownerid)
VALUES ('A410', 'Firefox', 'Dog', 'orange and soft', DATE'2016-08-23', 'alive', 'O300');
insert into VetoSansFrontieresDB.Animal(animalid, animalname, animaltype, description, inscriptiondate, animalstate, ownerid)
VALUES ('A420', 'Doggo', 'Dog', 'fluffy and cuddlely', DATE'2014-10-09', 'alive', 'O301');
insert into VetoSansFrontieresDB.Animal(animalid, animalname, animaltype, description, inscriptiondate, animalstate, ownerid)
VALUES ('A430', 'Big Pupper', 'Dog', 'very large', DATE'2012-04-26', 'alive', 'O301');
insert into VetoSansFrontieresDB.Animal(animalid, animalname, animaltype, description, inscriptiondate, animalstate, ownerid)
VALUES ('A401', 'Gluant', 'Snake', 'fat and missing a tooth', DATE'2014-07-13', 'sick', 'O300');
insert into VetoSansFrontieresDB.Animal(animalid, animalname, animaltype, description, inscriptiondate, animalstate, ownerid)
VALUES ('A402', 'Rejean', 'Cat', 'a little boney', DATE'2001-07-13', 'dead', 'O301');
insert into VetoSansFrontieresDB.Animal(animalid, animalname, animaltype, description, inscriptiondate, animalstate, ownerid)
VALUES ('A442', 'PussyCat', 'Cat', 'smooth criminal', DATE'2009-11-17', 'alive', 'O302');
insert into VetoSansFrontieresDB.Animal(animalid, animalname, animaltype, description, inscriptiondate, animalstate, ownerid)
VALUES ('A403', 'Neigh', 'Horse', 'stubborn and eats a lot', DATE'2012-07-13', 'alive', 'O302');
insert into VetoSansFrontieresDB.Animal(animalid, animalname, animaltype, description, inscriptiondate, animalstate, ownerid)
VALUES ('A461', 'Valium', 'Cat', 'Sleeps a lot', DATE'2016-07-13', 'alive', 'O303');
insert into VetoSansFrontieresDB.Animal(animalid, animalname, animaltype, description, inscriptiondate, animalstate, ownerid)
VALUES ('A409', 'Chloroform', 'Dog', 'eats a lot, vaccinated against the flu, sleeps a lot', DATE'2014-07-13', 'alive', 'O303');


insert into VetoSansFrontieresDB.examDetails(examID, examDate, examHour, description, animalid, vetID)
VALUES ('EX500', DATE'2019-04-01', '13:25:00', 'complete exam', 'A400', 'E1');
insert into VetoSansFrontieresDB.examDetails(examID, examDate, examHour, description, animalid, vetID)
VALUES ('EX501', DATE'2019-04-01', '14:25:00', 'dental exam', 'A401', 'E1');
insert into VetoSansFrontieresDB.examDetails(examID, examDate, examHour, description, animalid, vetID)
VALUES ('EX502', DATE'2019-04-02', '15:25:00', 'Health exam', 'A402', 'E6');

insert into VetoSansFrontieresDB.treatment(treatmentnumber, description, treatmentcost)
VALUES ('T100', 'Peniciline treatment', 50.00);
insert into VetoSansFrontieresDB.treatment(treatmentnumber, description, treatmentcost)
VALUES ('T112', 'Cold Vaccination', 70.00);

insert into VetoSansFrontieresDB.treatmentDetails(treatmentnumber, examID, quantity, startDate, endDate)
VALUES ('T100', 'EX500', 5, DATE'2019-04-01', DATE'2019-04-6');`;
