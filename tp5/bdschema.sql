SET search_path = bd_schema;

DROP SCHEMA IF EXISTS bd_schema CASCADE;
create SCHEMA bd_schema;

create table if not exists Clinic(
	clinicID varchar(10),
	street	varchar(15),
	city 	varchar(15),
	province	varchar(15),
	zipCode		varchar(15),
	phoneNumber	varchar(10),
	faxNumber	varchar(10),
	primary key (clinicID)
);

create table if not exists Employee (
	employeeID	varchar(10),
	firstName	varchar(10),
	lastName	varchar(10),
	street		varchar(10),
	zipCode		varchar(10),
	city		varchar(10),
	province	varchar(10),
	jobfunction	varchar(10),
	phoneNumber	varchar(10),
	DOB			varchar(10),
	sex			char check(sex ='M'OR sex='F'),
	NAS			varchar(9),
	annualSalary	numeric(8,2),
	clinicID	varchar(10),
	primary key (employeeID),
	Foreign key(clinicID) references clinic(clinicID)
);

create table if not exists Owner(
	ownerID		varchar(10),
	ownername	varchar(10),
	street		varchar(10),
	zipCode		varchar(10),
	province	varchar(10),
	city		varchar(10),
	phoneNumber	varchar(9),
	clinicID	varchar(10),
	primary key (ownerID),
	Foreign key (clinicID) references Clinic(clinicID)
);

create table if not exists Animal(	
	animalID	varchar(10),
	animalName	varchar(10),
	animalType	varchar(10),
	description	varchar(200),
	inscriptionDate	varchar(10),
	animalstate	varchar(10),
	ownerID		varchar(10),
	primary key (animalID),
	Foreign key (ownerID) references Owner(ownerID)
);

create table if not exists examDetails (
	examID		varchar(10),
	examdate	varchar(10),
	examHour	varchar(10),
	vetName		varchar(10),
	description	varchar(10),
	animalID	varchar(10),
	vetID		varchar(10),
	primary key(examID),
	Foreign key (animalID) references Animal(animalID),
	Foreign key (vetID) references Employee (EmployeeID)
);

create table if not exists treatementRegimen (
	examID		varchar(10),
	primary key(examID),
	Foreign key(examID) references examDetails (examID)
);

create table if not exists treatment(
	treatmentNumber		varchar(10),
	description			varchar(200),
	treatmentcost		varchar(10),
	primary key (treatmentNumber)
);

create table if not exists treatmentDetails (
	treatmentNumber		varchar(10), 
	examID				varchar(10),
	primary key (treatmentNumber, examID),
	Foreign key(treatmentNumber) references treatment(treatmentNumber),
	Foreign key (examID) references ExamDetails(examID)
);


-- create table if not exists Etudiant(
-- 	snom 			varchar(20) not null,
-- 	sid				varchar(10) not null,
-- 	sexe			char check(sexe ='M'OR sexe='F'),
-- 	age				int not null,
-- 	moyenne			varchar(3),
-- 	primary key (sid)
-- );













-- Database: VetoSansFrontieresDB

-- DROP DATABASE "VetoSansFrontieresDB";

-- CREATE DATABASE "VetoSansFrontieresDB"
--     WITH 
--     OWNER = postgres
--     ENCODING = 'UTF8'
--     LC_COLLATE = 'English_United States.1252'
--     LC_CTYPE = 'English_United States.1252'
--     TABLESPACE = pg_default
--     CONNECTION LIMIT = -1;