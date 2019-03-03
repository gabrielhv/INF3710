SET search_path=HOTELDB;

---- Fonction checkRoom qui implante le comportement désiré
CREATE OR REPLACE FUNCTION checkRoom() RETURNS TRIGGER AS 
$checkroomtrigger$
BEGIN
if(new.typeroom = 'D' AND new.price <100) then
BEGIN
raise exception 'Price for double room must be over 100';
END;
end if;
RETURN NEW;
END;
$checkroomtrigger$ LANGUAGE plpgsql;

-- Trigger qui se déclenche avant d'insérer des données
CREATE TRIGGER checkroomtrigger BEFORE INSERT ON Room
FOR EACH ROW execute procedure checkRoom();
DROP TRIGGER IF EXISTS checkroomtrigger on Room;
-- CREATE TRIGGER checkroomtrigger BEFORE INSERT ON Room




-- Test du trigger
INSERT INTO HOTELDB.Room VALUES ('6', 'H112', 'D', 150.00); 

