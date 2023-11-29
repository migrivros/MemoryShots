SET FOREIGN_KEY_CHECKS=0;
TRUNCATE TABLE PhotoCategories;
TRUNCATE TABLE UsersFollow;
TRUNCATE TABLE Categories;
TRUNCATE TABLE Comments;
TRUNCATE TABLE Scores;
TRUNCATE TABLE Photos;
TRUNCATE TABLE Users;
TRUNCATE TABLE InappropiateWord;
SET FOREIGN_KEY_CHECKS=1;




INSERT INTO Users(firstName, lastName, phoneNumber, email, userName, password, profilePhoto) VALUES
('Miguel Ángel', 'Rivas', '687435921', 'migrivros@alum.us.es', 'migrivros', 'miguel12345', "https://i.ibb.co/q9ykCbc/profile.png"),
('Antonio', 'Pérez García', '607346113', 'antpergar@alum.us.es', 'antpergar', 'ant1999', "https://i.ibb.co/q9ykCbc/profile.png"),
('Anabel', 'Sánchez', '986367239', 'anasan@alum.us.es', 'anasan', '25061995', "https://i.ibb.co/q9ykCbc/profile.png"),
('Pedro José', 'Romero', '698231564', 'pedjosrom@alum.us.es', 'pedjosrom', 'pedrito123', "https://i.ibb.co/q9ykCbc/profile.png"),
('María', 'Isabel Rendón', '673548213', 'marisa@alum.us.es', 'marisa', 'isabelmar', "https://i.ibb.co/q9ykCbc/profile.png"),
('Jesús', 'Alvarez Gómez', '673541297', 'jesalvgom@alum.us.es', 'jesalvgom', 'jesus87531', "https://i.ibb.co/q9ykCbc/profile.png"),
('Laura', 'Sánchez Bernal', '679654985', 'lausanber@alum.us.es', 'lausanber', 'laura142', "https://i.ibb.co/q9ykCbc/profile.png"),
('Paula', 'Garrido', '653298641', 'paugar@alum.us.es', 'paugar', 'garrido02', "https://i.ibb.co/q9ykCbc/profile.png"),
('Rosa', 'López Martín', '673412875', 'roslopmar@alum.us.es', 'roslopmar', 'rosita76', "https://i.ibb.co/q9ykCbc/profile.png"),
('Ana', 'Redondo Cortés', '689541962', 'anaredcor@alum.us.es', 'anaredcor', 'ana132', "https://i.ibb.co/q9ykCbc/profile.png");



INSERT INTO Photos(photoURL, uploadDate, title, description, visibility, userId) VALUES
('https://i.ibb.co/t8xRLLB/foto-oficina-min.jpg', '2021-03-23', 'Oficina', 
'Lunes tarde en la oficina trabajando en la edicion de un nuevo proyecto', 'PÚBLICA', 1),
('https://i.ibb.co/FWt1Nk4/foto-ejemplo-6.jpg', '2021-03-12', 'Pájaro', 
'Pájaro volando en el bosque', 'PÚBLICA', 1),
('https://i.ibb.co/s9w25KF/foto-ejemplo-3.jpg', '2021-03-05', 'Pasaje natural',
 'Foto tomada durante un paseo por el bosque entre las montañas', 'PÚBLICA', 1),
('https://i.ibb.co/p3ZZW49/foto-ejemplo-7.jpg', '2021-02-27', 'Fogata', 
'Una fogata que hicimos durante la acampada del fin de semana pasado', 'PÚBLICA', 1),
('https://i.ibb.co/8MqVnrk/foto-ejemplo-2.jpg', '2021-02-17', 'Puesta de Sol en la playa', 
'Puesta de sol que vimos durante un paseo por la playa', 'PÚBLICA', 1),
('https://i.ibb.co/LZYpgXZ/foto-ejemplo-4.jpg', '2021-02-09', 'París', 
'Paseo por París el fin de semana pasado', 'PÚBLICA', 1),
('https://i.ibb.co/GVhgBkC/foto-ejemplo-1.jpg', '2021-02-02', 'Maldivas', 
'Viaje a las Maldivas durante el verano de 2020', 'PÚBLICA', 1),
('https://i.ibb.co/DpMBMZF/foto-ejemplo-5.jpg', '2021-01-29', 'Acantilados', 
'Numerosas nubes en el acantilado durante el paseo', 'PÚBLICA', 1),
('https://i.ibb.co/1qCQ913/foto-ejemplo-8.jpg', '2021-01-21', 'Photoshop', 
'Realizando pruebas de edición con Potoshop', 'PÚBLICA', 1),
('https://i.ibb.co/YPSfXvX/foto-ejemplo-1-min.jpg', '2021-03-25', 'Puesta de Sol', 
'Foto realizada durante el paseo a última hora de la tarde', 'PÚBLICA', 2),
('https://i.ibb.co/XLFmS6V/foto-ejemplo-11.jpg', '2021-03-12', 'Ciervo', 
'Fotografía de un ciervo en mitad del prado', 'PÚBLICA', 2),
('https://i.ibb.co/1qCQ913/foto-ejemplo-8.jpg', '2021-03-08', 'Espacio', 
'Creo que esta foto no es muy realista, pero me ha gustado', 'PÚBLICA', 2),
('https://i.ibb.co/thmHjrJ/foto-ejemplo-12.jpg', '2021-02-27', 'El puente de la vida', 
'Foto realizada desde la parte baja del puente durante la puesta de sol', 'PÚBLICA', 2),
('https://i.ibb.co/18gFvwG/foto-ejemplo-13.jpg', '2021-02-21', 'Puesta de sol en LA', 
'Puesta de sol cogida desde el centro de la carretera en LA', 'PÚBLICA', 2),
('https://i.ibb.co/RyBDhrn/foto-ejemplo-9-min.jpg', '2021-02-11', 'Invierno', 
'foto realizada hace unos meses, cuando fui a la montaña y estaba todo nevado', 'PÚBLICA', 2),
('https://i.ibb.co/w7wcYJb/foto-ejemplo-10.jpg', '2021-02-03', 'Templo', 
'Foto del último viaje que realicé con la familia', 'PÚBLICA', 2),
('https://i.ibb.co/DpMBMZF/foto-ejemplo-5.jpg', '2021-01-29', 'Playa', 
'Playa con nubes, perfecta combinación', 'PÚBLICA', 2),
('https://i.ibb.co/8MqVnrk/foto-ejemplo-2.jpg', '2021-01-21', 'Playa al atarceder', 
'Una puesta de sol magnífica en la playa', 'PÚBLICA', 2),
('https://i.ibb.co/5xVCMgX/foto-ejemplo-2.jpg', '2021-03-22', 'Tigre', 
'Foto encontrada por internet de un tigre blanco, me encanta', 'PÚBLICA', 8),
('https://i.ibb.co/2MRpsLd/foto-ejemplo-3-min.jpg', '2021-03-21', 'Poblado', 
'Foto realizada en el último pueblo que estuve de vacaciones', 'PÚBLICA', 10),
('https://i.ibb.co/8zMtSWR/tendencia1.jpg', '2021-03-25', 'Árbol japonés', 
'Foto tomada durante el último viaje a Japón', 'PÚBLICA', 3),
('https://i.ibb.co/XZfVMHr/tendencia2.jpg', '2021-03-23', 'Sierra', 
'Montañas en el último paseo de otoño', 'PÚBLICA', 4),
('https://i.ibb.co/6vq4cQ5/tendencia3-min.jpg', '2021-03-22', 'NY', 
'Foto tomada desde lo alto de un edificio en NY', 'PÚBLICA', 5),
('https://i.ibb.co/mCYLRH1/tendencia4.jpg', '2021-03-21', 'Ciudad Moderna', 
'Edificios de NY, son una pasada', 'PÚBLICA', 6),
('https://i.ibb.co/R4rYGrv/tendencia5-min.jpg', '2021-03-27', 'Pequeño animal', 
'Durante la última visita al zoo encontramos este pequeño animal', 'PÚBLICA', 8),
('https://i.ibb.co/dDWQ3S2/tendencia6.jpg', '2021-03-26', 'Explosión de colores', 
'Mirad que chula la foto que me encontré el otro dia navegando por internet', 'PÚBLICA', 7),
('https://i.ibb.co/2FKnX9z/tendencia7.jpg', '2021-03-21', 'Torre Eiffel', 
'Me encanta dar paseos por París, una pena que esté tan lejos', 'PÚBLICA', 9),
('https://i.ibb.co/ydLPXXy/tendencia8-min.jpg', '2021-03-19', 'Mariposa', 
'Probando el nuevo zoom óptico para mi cámara de fotos', 'PÚBLICA', 10),
('https://i.ibb.co/HD34xsk/tendencia9-min.jpg', '2021-03-22', 'Último viaje', 
'Foto tomada durante mi último viaje a LA', 'PÚBLICA', 3),
('https://i.ibb.co/wLxJXK4/tendencia10.jpg', '2021-03-23', 'Luciérnagas', 
'Me encanto está foto a contraluz y con ese pequeño toque de luces', 'PÚBLICA', 5),
('https://i.ibb.co/JQJqBGL/perro1.png', '2021-03-17', 'Chispa', "", 'PÚBLICA', 8),
('https://i.ibb.co/51CLm9n/perro2.jpg', '2021-03-15', 'Visita a la perrera', 
'Mirad que mono este chachorrito', 'PÚBLICA', 2),
('https://i.ibb.co/RQZdgtz/perro3.jpg', '2021-03-07', 'Otoño con Bubú', 
'A mi perro le encantan como se caen las ojas en otoño', 'PÚBLICA', 7);


INSERT INTO Categories(categoryName) VALUES ('Perro'),('Sol'),('Luna'),('Paisaje'),('Montaña'),
('Naturaleza'),('Oficina'),('Ordenador'),('Portátil'),('Teclado'),('Lunes'),('Trabajo'),('Diseño');


INSERT INTO Photocategories(photoId, categoryId) VALUES (1,7),(1,8),(1,9),(1,10),(1,11),(1,12),(1,13),
(31,1),(32,1),(33,1),(10,2),(10,3),(10,4),(10,5),(10,6);


INSERT INTO Scores(scoreDate, value, userId, photoId) VALUES ('2021-03-25', 5, 1, 10),('2021-03-25', 5, 4, 10),
('2021-03-26', 4, 8, 10),('2021-03-25', 3, 10, 10),('2021-03-26', 4, 3, 10), ('2021-03-25', 3, 1, 1),('2021-03-25', 4, 4, 1),
('2021-03-26', 4, 8, 1),('2021-03-25', 1, 10, 1),('2021-03-26', 1, 3, 1), ('2021-03-25', 5, 1, 4),('2021-03-25', 5, 4, 4),
('2021-03-26', 2, 8, 4),('2021-03-25', 4, 10, 4),('2021-03-26', 3, 3, 4), ('2021-03-25', 1, 1, 7),('2021-03-25', 1, 4, 7),
('2021-03-26', 5, 8, 7),('2021-03-25', 1, 10, 7),('2021-03-26', 2, 3, 7), ('2021-03-25', 1, 1, 2),('2021-03-25', 3, 4, 2),
('2021-03-26', 5, 8, 2),('2021-03-25', 1, 10, 2),('2021-03-26', 2, 3, 2);

INSERT INTO Usersfollow(user1, user2) VALUES (1,2),(1,8),(1,10),(2,3),(2,1),(2,7),(1,3),(2,10),(3,10),(8,5),(8,2),(7,5);

INSERT INTO Comments(text, commentDate, userId, photoId) VALUES
('Que foto más chula!!!', '2021-03-26', 3, 10),
('Me encanta el color del cielo', '2021-03-28', 4, 10),
('Dónde es exactamente?', '2021-03-25', 5, 10);

INSERT INTO inappropiateword (word) VALUES ("tonto"), ("retrasado"), ("retrasados"), ("gilipollas"), ("puta"), ("putas"), ("fuck"), 
("inútil"), ("carajote"), ("carajo"), ("coño"), ("coños"), ("stupid"), ("estupido"), ("estupidos"), ("subnormal"), ("subnormales"), ("cojones"), 
("joder"), ("guarro"), ("tonta"), ("retrasada"), ("retrasadas"), ("puto"), ("putos"), ("carajota"), ("estupida"), ("estupidas"), ("guarra"), ("guarras");
