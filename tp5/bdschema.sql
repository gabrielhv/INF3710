SET search_path = bd_schema;

DROP SCHEMA IF EXISTS bd_schema CASCADE;
create SCHEMA bd_schema;

create table if not exists Clinic(
	clinicID 			varchar(10) not null,
	street				varchar(15) not null,
	city 				  varchar(15) not null,
	province			varchar(15) not null,
	zipCode				varchar(15) not null,
	phoneNumber		varchar(10) not null,
	faxNumber			varchar(10) not null,
	primary key (clinicID)
);

create table if not exists Employee (
	employeeID	            varchar(10) not null,
	firstName             	varchar(10) not null,
	lastName              	varchar(10) not null,
	street	              	varchar(10) not null,
	zipCode	              	varchar(10) not null,
	city	                	varchar(10) not null,
	province                varchar(10) not null,
	jobfunction	            varchar(10) not null,
	phoneNumber	            varchar(10) not null,
	DOB			                varchar(10) not null,
	sex			                char check(sex ='M'OR sex='F') not null,
	NAS			                varchar(9) not null,
	annualSalary	          numeric(8,2) not null,
	clinicID              	varchar(10) not null,
	primary key (employeeID),
	Foreign key(clinicID) references clinic(clinicID)
);

create table if not exists Owner(
	ownerID		          varchar(10) not null,
	ownername	          varchar(10) not null,
	street		          varchar(10) not null,
	zipCode		          varchar(10) not null,
	province	          varchar(10) not null,
	city		            varchar(10) not null,
	phoneNumber	        varchar(9)  not null,
	clinicID	          varchar(10) not null,
	primary key (ownerID),
	Foreign key (clinicID) references Clinic(clinicID)
);

create table if not exists Animal(	
	animalID	        varchar(10) not null,
	animalName	      varchar(10) not null,
	animalType	      varchar(10) not null,
	description	      varchar(200) not null,
	inscriptionDate	  varchar(10) not null,
	animalstate	      varchar(10) not null,
	ownerID		        varchar(10) not null,
	primary key (animalID),
	Foreign key (ownerID) references Owner(ownerID)
);

create table if not exists examDetails (
	examID		      varchar(10) not null,
	examdate	      date not null,
	examHour	      hour not null,
	vetName		      varchar(10) not null,
	description	    varchar(10) not null,
	animalID	      varchar(10) not null,
	vetID		        varchar(10) not null,
	primary key(examID),
	Foreign key (animalID) references Animal(animalID),
	Foreign key (vetID) references Employee (EmployeeID)
);

create table if not exists treatment(
	treatmentNumber		varchar(10) not null,
	description			varchar(200) not null,
	treatmentcost		varchar(10) not null,
	primary key (treatmentNumber)
);

create table if not exists treatmentDetails (
	treatmentNumber	      varchar(10) not null, 
	examID				        varchar(10) not null,
  quantity              varchar(10) not null,
  startDate             date not null,
  endDate               date not null,
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