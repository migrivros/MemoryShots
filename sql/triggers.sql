-- RN-C01
DELIMITER //
CREATE OR REPLACE TRIGGER tPhotoLimit
BEFORE INSERT ON Photos FOR EACH ROW
BEGIN
	DECLARE totalPhotosUser INT;
	SET totalPhotosUser = (SELECT COUNT(*) FROM users NATURAL JOIN photos WHERE userId = NEW.userId GROUP BY userId);
	if(totalPhotosUser >= 50) then
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Un usuario no puede tener más de 50 fotos publicadas';
	END if;
END //
DELIMITER ;



-- RN-C05
DELIMITER //
CREATE OR REPLACE TRIGGER tDeletePhoto
BEFORE DELETE ON Photos FOR EACH ROW
BEGIN
	DECLARE nComments INT;
	SET nComments = (SELECT COUNT(*) FROM Photos P JOIN Comments C WHERE C.photoId = old.photoId);
	if(nComments > 0) then
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No se puede eliminar una foto con comentarios';
	END if;
END //
DELIMITER ;

DELIMITER //
CREATE OR REPLACE TRIGGER tUpdatePhoto
BEFORE UPDATE ON Photos FOR EACH ROW
BEGIN
	DECLARE visibility VARCHAR(60);
	DECLARE nComments INT;
	SET nComments = (SELECT COUNT(*) FROM Photos P JOIN Comments C WHERE C.photoId = old.photoId);
	SET visibility = NEW.visibility;
	if(nComments > 0 AND visibility = 'PRIVADA') then
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No se puede establecer como privada una foto con comentarios';
	END if;
END //
DELIMITER ;
	
	

-- RN-C03
DELIMITER //
CREATE OR REPLACE TRIGGER tAutoFollow
BEFORE INSERT ON UsersFollow FOR EACH ROW
BEGIN
	if(NEW.user1 = NEW.user2) then
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No te puedes seguir a ti mismo';
	END if;
END //
DELIMITER ;