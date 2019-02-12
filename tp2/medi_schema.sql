SET search_path = medi_schema;

DROP SCHEMA IF EXISTS medi_schema CASCADE;
create SCHEMA medi_schema;

create table if not EXISTS Patient(
	PatientNo				varchar(10) NOT NULL,
	patientname				varchar(30) NOT NULL,
	addressnumber			varchar(10) NOT NULL,
	street					varchar(50) NOT NULL,
	postalCode				varchar(6) NOT NULL,
	phoneNumber				varchar(10) NOT NULL,
	DOB						varchar(8) NOT NULL,
	NAS						varchar(9),
	PRIMARY KEY (PatientNo),
	UNIQUE(NAS));

create table if not EXISTS Doctor(
	doctorID				varchar(10) NOT NULL,
	doctorName				varchar(20) NOT NULL,
	addressnumber			varchar(10) NOT NULL,
	street					varchar(50) NOT NULL,
	postalCode				varchar(6) NOT NULL,
	phoneNumber				varchar(10) NOT NULL,
	DOB						varchar(8) NOT NULL,
	salary					numeric(9,3) check (salary > 100000) NOT NULL,
	PRIMARY KEY (doctorID));
				 
create table if not EXISTS MedicalDoctor(
	doctorID				varchar(10) NOT NULL,
	overtimerate			numeric(5,3) NOT NULL,
	PRIMARY KEY (doctorID),
	FOREIGN KEY (doctorID) references doctor(doctorID));
	
create table if not EXISTS specialistDoctor(
	doctorID				varchar(10) NOT NULL,
	fieldArea				varchar(10) NOT NULL,
	PRIMARY KEY (doctorID),
	FOREIGN KEY (doctorID) references doctor(doctorID));

											 
create table if not EXISTS payment(
	paymentNo				varchar(10) NOT NULL,
	details					varchar(100) NOT NULL,
	paymentMethod			varchar(10) NOT NULL,
	patientNo				varchar(10) NOT NULL,
	PRIMARY KEY (paymentNo),
	FOREIGN KEY (patientNo) references patient(patientNo));
	
create table if not EXISTS bill(
	billNo					varchar(10) NOT NULL,
	total					numeric(9,3) NOT NULL,
	doctorID				varchar(10) NOT NULL,
	PRIMARY KEY (billNo),
	FOREIGN KEY (doctorID) references doctor(doctorID) on delete restrict);
	
create table if not EXISTS Appointment(
	ApptNo					varchar(10),
	ApptDate				date,
	ApptTime				time,
	PatientNo				varchar(10),
	DoctorID				varchar(10),
	PRIMARY KEY (ApptNo),
	FOREIGN KEY (PatientNo) references Patient(PatientNo),
	FOREIGN KEY (DoctorID) references Doctor(DoctorID));
											 