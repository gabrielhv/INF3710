SET SEARCH_PATH = HOTELDB;

CREATE OR REPLACE FUNCTION totalHotelRecords ()
-- A COMPLETER
$total$ LANGUAGE plpgsql;

select totalHotelRecords();

-- Pour vérifier que la fonction est correcte, comptez le nombre de tuples: 
select * from Hotel;
