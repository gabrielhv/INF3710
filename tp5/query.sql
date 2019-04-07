set search_path = bd_schema;

-- requete 1)  Lister les le numéro et nom des cliniques, leur adresse et leur gestionnaire, ordonnés par le numéro de clinique
SELECT c.clinicID, c.street, c.city, c.province, e.employeeID
FROM Clinic c, Employee e
WHERE c.clinicID = e.clinicID AND e.jobfunction = 'Manager'
ORDER BY c.clinicID;

-- requete 2) Lister les noms des animaux sans doublons dans toutes les cliniques
SELECT animalName
FROM animal;

-- requete 3) Lister les numéros et noms des propriétaires d’animaux ainsi que les détails de leurs animaux dans une clinique donnée (à vous de la choisir)
-- NOTE: On choisi les informations des animaux et des propriétaires de la note ayant le clinicID C100
SELECT o.ownerName, an.*
FROM Owner o, Animal an
WHERE o.clinicID = 'C100' AND o.ownerID = an.ownerID;

-- requete 4) Lister l’ensemble des examens d’un animal donné
SELECT *
FROM examDetails ex
WHERE ex.animalID = 'A400';

-- requete 5) Lister le détail des traitements d’un animal suite à un examen donné
SELECT *
FROM treatmentDetails t
WHERE t.examID = 'EX500';


-- requete 6) Lister le salaire total des employés par clinique ordonné par numéro de clinique
SELECT e.clinicID, SUM(e.annualSalary) as TotalSalary
From Employee e
Group By e.clinicID
ORDER By e.clinicID;


-- requete 7) Lister le nombre total d’animaux d’un type donné (vous pouvez le choisir) dans chaque clinique
SELECT c.clinicID, Count(an)
FROM Animal an, Owner O, Clinic c
WHERE an.animalType = 'Dog' AND o.clinicID = c.clinicID AND an.ownerID = o.ownerID
GROUP BY c.clinicID;


-- requete 8) Lister le coût minimum, maximum et moyen des traitements
SELECT min(treatmentcost) as minimum_cost, max(treatmentcost) as maximum_cost, round(avg(treatmentcost),2) as average_cost
FROM treatment

-- requete 9) Quels sont les noms des employés de plus de 50 ans ordonnés par nom ?
SELECT firstName, lastName
FROM Employee e
WHERE e.employeeID IN 
(SELECT em.employeeID
FROM Employee em
WHERE (DATE_PART('year', current_date) - DATE_PART('year', em.DOB)) > 50);

-- requete 10) Quels sont les propriétaires dont le nom contient « blay » ?
SELECT *
FROM Owner o
WHERE LOWER(o.ownername) LIKE '%blay%'
			
-- requete 11) Supprimez le vétérinaire « Jean Tremblay »
DELETE FROM Employee
WHERE Employee.firstName = 'Jean' AND Employee.lastName = 'Tremblay';
			
-- requete 12) Lister les détails des propriétaires qui ont un chat et un chien
SELECT o.*
FROM Owner o, Animal an
WHERE LOWER(an.animalType) = 'cat' AND an.ownerID = o.ownerID AND an.ownerID IN
	   (SELECT ow.ownerID
	   FROM owner ow, animal a
	   WHERE LOWER(a.animalType) = 'dog' AND a.ownerID = ow.ownerID); 

	   
-- requete 13) Lister les détails des propriétaires qui ont un chat ou un chien
SELECT DISTINCT o.*
FROM owner o, animal an
WHERE an.ownerID = o.ownerID AND (an.animalType = 'Cat' OR an.animalType = 'Dog');
	   
-- requete 14) Lister les détails des propriétaires qui ont un chat mais pas de chien vacciné contre la grippe (la condition vacciné contre la grippe ne s’applique qu’aux chiens)
SELECT DISTINCT o.*
FROM owner o, animal an
WHERE an.animalType = 'Cat' AND an.ownerID = o.ownerID AND o.ownerID NOT IN 
	   (SELECT ow.ownerID
		FROM owner ow, animal a
		WHERE a.animalType = 'Dog' AND a.ownerID = ow.ownerID AND LOWER(a.description) LIKE '%vaccinated against the flu%'
	   );
	   
--requete 15) Lister tous les animaux d’une clinique donnée avec leurs traitements s’ils existent. Dans le cas contraire, affichez null
SELECT o.clinicID, T2.*
FROM owner o
	   INNER JOIN
(SELECT T1.*, tre.*
FROM (
	SELECT an.*, ex.*
	FROM animal an LEFT JOIN examDetails ex
	USING (animalID)) as T1
LEFT OUTER JOIN treatmentDetails tre
USING (examID)) as T2

ON (o.ownerID = T2.ownerID)
WHERE(o.clinicID = 'C100');
		   
		   