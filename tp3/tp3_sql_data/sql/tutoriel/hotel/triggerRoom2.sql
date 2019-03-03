SET search_path=HOTELDB;

		
---- Fonction checkRoom qui implante le comportement désiré
CREATE OR REPLACE FUNCTION checkRoomDouble() RETURNS TRIGGER AS
$checkroomtrigger2$
BEGIN
	if(new.typeroom = 'D') then
	DECLARE
	mostExpensiveSingleRoom numeric(6,3);
	BEGIN
		SELECT MAX(Price) INTO mostExpensiveSingleRoom From room
		Where typeroom = 'S';
		if(new.price < mostExpensiveSingleRoom) then 
			raise exception 'Price for double must be higher the most expensive single room';
		END IF;
	END;
	END IF;
	Return NEW;
END;
$checkroomtrigger2$ LANGUAGE plpgsql;


--- Trigger qui se déclenche avant d'insérer des données

DROP TRIGGER IF EXISTS checkroomtrigger2 on Room;
CREATE TRIGGER checkroomtrigger2 BEFORE INSERT ON Room
FOR EACH ROW execute procedure checkRoomDouble();




-- Test du trigger
-- Insertion OK
INSERT INTO HOTELDB.Room VALUES ('2162', 'H112', 'D', 150.00); 
-- Insertion non OK
INSERT INTO HOTELDB.Room VALUES ('2154', 'H112', 'D', 50.00); 


