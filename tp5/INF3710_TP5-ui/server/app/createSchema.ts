// export const schema: string = `
// SET search_path = hotelDB;

// DROP SCHEMA IF EXISTS HOTELDB CASCADE;
// CREATE SCHEMA HOTELDB;

// CREATE TABLE IF NOT EXISTS  HOTELDB.Hotel (
// 		hotelNo		VARCHAR(10)		NOT NULL,
// 		hotelName 	VARCHAR(20)		NOT NULL,
// 		city		VARCHAR(50)		NOT NULL,
// 		PRIMARY KEY (hotelNo));

// CREATE TABLE IF NOT EXISTS HOTELDB.Room(
// roomNo VARCHAR(10) NOT NULL,
// hotelNo VARCHAR(10)	NOT NULL,
// typeroom VARCHAR(10)	NOT NULL,
// price NUMERIC(6,3) NOT NULL,
// PRIMARY KEY (roomNo, hotelNo),
// FOREIGN KEY(hotelNo) REFERENCES HOTELDB.Hotel(hotelNo) ON DELETE RESTRICT ON UPDATE CASCADE);


// CREATE DOMAIN HOTELDB.sexType AS CHAR
// 	CHECK (VALUE IN ('M', 'F'));

// CREATE TABLE IF NOT EXISTS HOTELDB.Guest(
// guestNo		VARCHAR(10)		NOT NULL,
// nas		VARCHAR(10)		UNIQUE NOT NULL,
// guestName 	VARCHAR(20)		NOT NULL,
// gender		sexType			DEFAULT 'M',
// guestCity	VARCHAR(50)		NOT NULL,
// PRIMARY KEY (guestNo));

// CREATE TABLE IF NOT EXISTS HOTELDB.Booking(
// 		hotelNo		VARCHAR(10)		NOT NULL,
// 		guestNo	  	VARCHAR(10)		NOT NULL,
// 		dateFrom 	DATE			NOT NULL,
// 		dateTo		DATE			NULL,
// 		roomNo		VARCHAR(10)		NOT NULL,
// 		PRIMARY KEY (hotelNo, guestNo, roomNO, dateFrom),
// 		FOREIGN KEY (guestNo) REFERENCES HOTELDB.Guest(guestNo)
// 		ON DELETE SET NULL ON UPDATE CASCADE,
// 		FOREIGN KEY (hotelNo, roomNo) REFERENCES HOTELDB.Room (hotelNo, roomNo)
// 		ON DELETE NO ACTION ON UPDATE CASCADE,
// 		CONSTRAINT date CHECK (dateTo >= dateFrom),
// 		CONSTRAINT dateFrom CHECK (dateFrom >= current_date));

// ALTER TABLE HOTELDB.Guest ALTER gender DROP DEFAULT;
// `;




export const schema: string = `
SET search_path = bd_schema;

DROP SCHEMA IF EXISTS bd_schema CASCADE;
create SCHEMA bd_schema;

create table if not exists Clinic(
	clinicID 			varchar(10) not null,
	street				varchar(30) not null,
	city 				  varchar(15) not null,
	province			varchar(15) not null,
	zipCode				varchar(15) not null,
	phoneNumber		varchar(10) not null,
	faxNumber			varchar(10) not null,
	primary key (clinicID)
);

create table if not exists Employee (
	employeeID	            varchar(20) not null,
	firstName             	varchar(20) not null,
	lastName              	varchar(20) not null,
	street	              	varchar(20) not null,
	zipCode	              	varchar(20) not null,
	city	                	varchar(20) not null,
	province                varchar(20) not null,
	jobfunction	            varchar(20) not null,
	phoneNumber	            varchar(20) not null,
	DOB			                DATE not null,
	sex			                char check(sex ='M'OR sex='F') not null,
	NAS			                varchar(20) not null,
	annualSalary	          numeric(8,2) not null,
	clinicID              	varchar(10) not null,
	primary key (employeeID),
	Foreign key(clinicID) references clinic(clinicID)
);

create table if not exists Owner(
	ownerID		          varchar(20) not null,
	ownername	          varchar(20) not null,
	street		          varchar(20) not null,
	zipCode		          varchar(20) not null,
	province	          varchar(20) not null,
	city		            varchar(20) not null,
	phoneNumber	        varchar(10)  not null,
	clinicID	          varchar(20) not null,
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
	examHour	      time not null,
	description	    varchar(200) not null,
	animalID	      varchar(10) not null,
	vetID		        varchar(10) not null,
	primary key(examID),
	Foreign key (animalID) references Animal(animalID),
	Foreign key (vetID) references Employee (EmployeeID)
);

create table if not exists treatment(
	treatmentNumber		varchar(10) not null,
	description			varchar(200) not null,
	treatmentcost		numeric(6,2) not null,
	primary key (treatmentNumber)
);

create table if not exists treatmentDetails (
	treatmentNumber	      varchar(10) not null, 
	examID				  varchar(10) not null,
  	quantity              int,
  	startDate             date not null,
  	endDate               date not null,
	primary key (treatmentNumber, examID),
	Foreign key(treatmentNumber) references treatment(treatmentNumber),
	Foreign key (examID) references ExamDetails(examID)
);

`;
