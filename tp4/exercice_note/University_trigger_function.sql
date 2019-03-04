set search_path = University_schema;

create FUNCTION count_nbEtudiants() returns INTEGER as
$e_count$
DECLARE
e_count int;
BEGIN
	select count(*) into e_count
	FROM Etudiant;
	RETURN e_count;
END;
$e_count$ LANGUAGE plpgsql;

-- select count_nbEtudiants();


create FUNCTION createAudit() returns TRIGGER as
$auditGrade$
BEGIN
	insert into Audit(sid, cno, sectno, note, dateModif) values (old.sid, old.cno, old.sectno, new.note, now());
	return new;						  
END;
$auditGrade$ LANGUAGE plpgsql;

create TRIGGER auditGrade AFTER UPDATE ON Inscription
FOR EACH ROW EXECUTE PROCEDURE createAudit();

--  tests
-- update Inscription
-- set note = 23
-- where sid = 's6';
																 
-- update Inscription
-- set note = 19
-- where sid = 's5'
-- AND cno = '305';																 

-- select *
-- from Inscription;
							  
-- select *
-- from Audit;
