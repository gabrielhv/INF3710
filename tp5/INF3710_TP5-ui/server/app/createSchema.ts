export const schema: string = `
SET search_path = VetoSansFrontieresDB;

DROP SCHEMA IF EXISTS VetoSansFrontieresDB CASCADE;
create SCHEMA VetoSansFrontieresDB;

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
	ownerid		          varchar(20) not null,
	ownername	          varchar(20) not null,
	street		          varchar(20) not null,
	zipCode		          varchar(20) not null,
	province	          varchar(20) not null,
	city		            varchar(20) not null,
	phoneNumber	        varchar(10)  not null,
	clinicID	          varchar(20) not null,
	primary key (ownerid),
	Foreign key (clinicID) references Clinic(clinicID)
);

create table if not exists Animal(	
	animalid	        varchar(10) not null,
	animalname	      varchar(10) not null,
	animaltype	      varchar(10) not null,
	description	      varchar(200) not null,
	inscriptiondate	  date not null,
	animalstate	      varchar(10) not null,
	ownerid		        varchar(10) not null,
	primary key (animalid),
	Foreign key (ownerid) references Owner(ownerid)
);

create table if not exists examDetails (
	examID		      varchar(10) not null,
	examdate	      date not null,
	examHour	      time not null,
	description	    varchar(200) not null,
	animalid	      varchar(10) not null,
	vetID		        varchar(10) not null,
	primary key(examID),
	Foreign key (animalid) references Animal(animalid) ON DELETE CASCADE,
	Foreign key (vetID) references Employee (EmployeeID)
);

create table if not exists treatment(
	treatmentnumber		varchar(10) not null,
	description			varchar(200) not null,
	treatmentcost		numeric(6,2) not null,
	primary key (treatmentnumber)
);

create table if not exists treatmentDetails (
	treatmentnumber	      varchar(10) not null, 
	examID				  varchar(10) not null,
  	quantity              int,
  	startDate             date not null,
  	endDate               date not null,
	primary key (treatmentnumber, examID),
	Foreign key(treatmentnumber) references treatment(treatmentnumber),
	Foreign key (examID) references ExamDetails(examID) ON DELETE CASCADE
);

`;
