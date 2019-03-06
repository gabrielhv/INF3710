set search_path = University_schema;

-- 1
select * 
from Etudiant
order by snom;

-- 2
select pnom as Professeur, dep as Dep
from Prof;

-- 3
select pnom
from Prof pr, Dept d
where pr.dep = d.dID
AND d.nombrephds > 10;

-- 4
select max(note)
from Inscription i
where i.cno = '105';

-- 5
select max(note)
from Inscription i
where i.cno = '105'
GROUP BY sectno;

-- 6
select cno, sectno, count(sid)
from Inscription i
group by (cno, sectno)
having count(sid) > 1;

-- 7
select e.*, i.*
from Etudiant e left join Inscription i
on e.sid = i.sid;

-- 8
select e.*
from Etudiant e
where e.snom not in (
	select etudiant.snom
	from Etudiant etudiant right join Inscription i
	on etudiant.sid = i.sid
);

-- 9
select *
from Cours
where LOWER(Cours.cnom) like '%geometrie%';

-- 10
select e.snom
from Etudiant e
where e.snom in (
	select snom
	from Etudiant, Inscription i, Cours
	where Etudiant.sid = i.sid
	AND i.cno = Cours.cno
	AND LOWER(Cours.cnom) like '%geometrie%'
);

-- 11
(select e.snom
from Etudiant e, inscription i, Cours c
where e.sid = i.sid
AND i.cno = c.cno
AND c.dep = 'gigl')
INTERSECT
(select e.snom
from Etudiant e, inscription i, Cours c
where e.sid = i.sid
AND i.cno = c.cno
AND c.dep = 'Maths');

-- 12 (on a déterminé que le OU de la question est exclusif)
-- UNION - INTERSECTION
((select e.snom
from Etudiant e, inscription i, Cours c
where e.sid = i.sid
AND i.cno = c.cno
AND c.dep = 'gigl')
UNION
(select e.snom
from Etudiant e, inscription i, Cours c
where e.sid = i.sid
AND i.cno = c.cno
AND c.dep = 'Maths'))
 EXCEPT
 (select e.snom
from Etudiant e, inscription i, Cours c
where e.sid = i.sid
AND i.cno = c.cno
AND c.dep = 'gigl')
INTERSECT
(select e.snom
from Etudiant e, inscription i, Cours c
where e.sid = i.sid
AND i.cno = c.cno
AND c.dep = 'Maths');;

-- 13
select max(e.age)-min(e.age) as Difference
from Etudiant e;

-- 14
select count(*)
from Etudiant e
where cast(e.moyenne as numeric(2,1)) > (
	select AVG(cast(moyenne as numeric(2,1)))
	from Etudiant
);
					
-- 15
select snom, moyenne
from Etudiant
where cast(moyenne as numeric(2,1)) = (
	select max(cast(moyenne as numeric(2,1)))
	from Etudiant									 
);
					

