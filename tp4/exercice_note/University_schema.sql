SET search_path = University_schema;

DROP SCHEMA IF EXISTS University_schema CASCADE;
create SCHEMA University_schema;

create table if not exists Etudiant(
	snom 			varchar(20) not null,
	sid				varchar(10) not null,
	sexe			char check(sexe ='M'OR sexe='F'),
	age				int not null,
	moyenne			varchar(3),
	primary key (sid)
);

create table if not exists Dept(
	dID				varchar(10) not null,
	nombrephds		int not null,	
	primary key (dID)
);

create table if not exists Prof(
	pID				varchar(10) not null,
	pnom 			varchar(20) not null,
	dep				varchar(10) not null,	
	primary key (pID),
	foreign key (dep) references Dept(dID)
);

create table if not exists Cours(
	cno				varchar(10) not null,
	cnom 			varchar(50) not null,
	dep				varchar(10) not null,	
	primary key (cno),
	foreign key (dep) references Dept(dID)
);

create table if not exists Section(
	cno				varchar(10) not null,
	sectno			varchar(10) not null,
	pID				varchar(10) not null,
	primary key (cno, sectno),
	foreign key (cno) references Cours(cno) on delete CASCADE,
	foreign key (pID) references Prof(pID) on delete set NULL
);

create table if not exists Inscription(
	sid				varchar(10) not null,
	cno				varchar(10) not null,
	sectno			varchar(10) not null,
	note			int check(note >= 0 AND note <= 100),
	primary key (sid, cno, sectno),
	foreign key (sid) references Etudiant(sid),
	foreign key (cno, sectno) references Section(cno, sectno)
);