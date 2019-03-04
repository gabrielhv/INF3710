set search_path = University_schema;

insert into University_schema.Etudiant(snom, sid, sexe, age, moyenne) VALUES ('Simon Nissan', 's1', 'M', 20, '4.2');
insert into University_schema.Etudiant(snom, sid, sexe, age, moyenne) VALUES ('Laurent Passepartout', 's2', 'M', 30, '3.2');
insert into University_schema.Etudiant(snom, sid, sexe, age, moyenne) VALUES ('Alexandra Laplace', 's3', 'F', 40, '2.8');
insert into University_schema.Etudiant(snom, sid, sexe, age, moyenne) VALUES ('Alex Laplace', 's4', 'F', 30, '3.5');
insert into University_schema.Etudiant(snom, sid, sexe, age, moyenne) VALUES ('Simon Belanger', 's5', 'M', 20, '3.2');
insert into University_schema.Etudiant(snom, sid, sexe, age, moyenne) VALUES ('Mark Zuck', 's6', 'M', 30, '1.2');
insert into University_schema.Etudiant(snom, sid, sexe, age, moyenne) VALUES ('Sophie Yenamarre', 's7', 'M', 30, '4.2');

insert into University_schema.Dept VALUES ('genChem', 9);
insert into University_schema.Dept VALUES ('gigl', 40);
insert into University_schema.Dept VALUES ('Maths', 5);

insert into University_schema.Prof VALUES ('p1', 'AZ', 'gigl');
insert into University_schema.Prof VALUES ('p2', 'MG', 'gigl');
insert into University_schema.Prof VALUES ('p3', 'NZ', 'Maths');
insert into University_schema.Prof VALUES ('p4', 'LH', 'Maths');



insert into University_schema.Cours VALUES ('105', 'programmation','gigl');
insert into University_schema.Cours VALUES ('200', 'NLP','gigl');
insert into University_schema.Cours VALUES ('304',	'Geometrie 101', 'Maths');
insert into University_schema.Cours VALUES ('305',	'Theoremes en geometrie', 'Maths');
insert into University_schema.Cours VALUES ('306',	'Geometrie intermediaire', 'Maths');
insert into University_schema.Cours VALUES ('307',	'Geometrie','Maths');

insert into University_schema.Section VALUES ('105', '1', 'p1');
insert into University_schema.Section VALUES ('105', '2', 'p1');
insert into University_schema.Section VALUES ('305', '1', 'p3');
insert into University_schema.Section VALUES ('305', '2', 'p4');

insert into University_schema.Inscription VALUES ('s3', '105', '1', 90);
insert into University_schema.Inscription VALUES ('s2', '105', '1', 60);
insert into University_schema.Inscription VALUES ('s1', '105', '2', 70);
insert into University_schema.Inscription VALUES ('s5', '105', '2', 70);
insert into University_schema.Inscription VALUES ('s5', '305', '2', 100);
insert into University_schema.Inscription VALUES ('s6', '305', '2', 65);
