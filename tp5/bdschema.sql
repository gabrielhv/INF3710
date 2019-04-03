SET search_path = bd_schema;

DROP SCHEMA IF EXISTS bd_schema CASCADE;
create SCHEMA bd_schema;

create table if not exists Clinic(
	clinicID,
	street,
	city,
	province,
	zipCode,
	phoneNumber,
	faxNumber,
	primary key (clinicID)
);

create table if not exists Employe (
	employeID,
	firstName,
	lastName,
	street,
	zipCode,
	city,
	province,
	jobfunction,
	phoneNumber,
	DOB,
	sex,
	NAS,
	annualSalary,
	clinicID,
	primary key (employeID),
	
);

create table if not exists Owner(
	ownerID,
	ownername,
	street,
	zipCode,
	province,
	city,
	phoneNumber,
	clinicID,
	primary key (ownerID)
);

create table if not exists Animal(
	animalID,
	animalName,
	animalType,
	description,
	inscriptionDate,
	animalstate,
	ownerID,
	primary key (animalID)
	Foreign key (owniderID) references Owner(ownerID)
);

create table if not exists examDetails (
	examID,
	examdate,
	examHour,
	vetName,
	description,
	animalID,
	vetID,
	primary key(examID)
	Foreign key (animalID) references Animal(animalID)
);

create table if not exists treatementRegimen (
	examID,
	primary key(examID),
	Foreign key(examID) references examDetails (examID)
);

create table if not exists treatment(
	treatmentNumber,
	description,
	treatmentcost,
);

create table if not exists treatmentDetails (
	treatmentNumber, 
	examID,
	primary key (treatmentNumber, examID),
	Foreign key(treatmentNumber) references Treatment(treatNumber),
	Foreign key (exammID) references ExamDetails(examID)
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