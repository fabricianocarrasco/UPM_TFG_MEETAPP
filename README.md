# UPM_TFG_MEETAPP
Proyecto de Trabajo de Fin de Grado en la Universidad Politécnica de Madrid

INSTALACIÓN

Para poder usar la aplicación lo primero que se debe hacer es instalar Licode, ya que la aplicación se ha construido sobre ello, cabe destacar que Licode funciona sobre Ubuntu 16.04, por lo que estos pasos se deben realizar en una maquina con ese sistema instalado.
Para instalar Licode hay que seguir los siguientes pasos:
1.	Clonar el repositorio
git clone https://github.com/lynckia/licode.git
cd licode
2.	Instalar las dependencias

UBUNTU

./scripts/installUbuntuDeps.sh

MAC OS X

./scripts/installMacDeps.sh

3.	Instalar Licode

./scripts/installNuve.sh
./scripts/installErizo.sh

4.	Instalar el BasicExample

./scripts/installBasicExample.sh

Ahora que ya está toda la parte de la instalación de Licode realizada continuamos con la parte que corresponde a la aplicación.

5.	Descargarse la aplicación del repositorio

git clone https://github.com/fabricianocarrasco/UPM_TFG_MEETAPP.git

6.	Reemplazar la carpeta basic_example que se encuentra el la ruta licode/extras

Con esto ya tendríamos preparado la aplicación en sí pero faltaría la parte de la base de datos. 
Para la instalación de MySQL, que es la base de datos que se ha utilizado en este proyecto se pueden seguir los pasos descritos a continuación.

7.	Instalación de MySQL

sudo apt-get install mysql-server 

Tras esto pedirá que escribas una contraseña para el usuario root.
Con estos pasos ya estaría todo lo necesario instalado en el sistema para su funcionamiento.

CONFIGURACIÓN

En este apartado hablaremos de la configuración del sistema para su correcto funcionamiento.
Lo primero será configurar la base de datos.

1.	Permitimos el acceso remote 

sudo ufw allow mysql

2.	Iniciamos el servicio

systemctl start mysql

3.	Iniciamos el servicio

/usr/bin/mysql -u root -p

4.	Creamos una base de datos (si no quieres tener que configurar nada después llámalo ‘mydb’)

CREATE DATABASE mydb;

5.	Añadimos un usuario a la base de datos

INSERT INTO mysql.user (User,Host,authentication_string,ssl_cipher,x509_issuer,x509_subject)

VALUES(‘root’,'localhost',PASSWORD(‘licodemeetapp’),'','','');

6.	Ejecutamos flush privileges para que hagan efecto los cambios

FLUSH PRIVILEGES;

7.	Garantizamos todos los privilegios al usuario root

GRANT ALL PRIVILEGES ON mydb.* to root@localhost;

8.	Volvemos a realizer flush privileges

FLUSH PRIVILEGES;

9.	Creamos las tablas users y rooms

10.	Rellenamos la table users con distintos valores

Con esto ya quedaria configurada la base de datos y la conexión con ella si se han puesto los valores ejemplo.

DESPLIEGUE

Para realizar el despliegue solo nos falta iniciar Licode y arrancar el BasicExample.
1.	Iniciar Licode

./scripts/initLicode.sh

2.	Inicial el BasicExample

./scripts/initBasicExample.sh

Con esto ya quedaría la aplicación instalada, configurada y desplegada para su uso.
El servidor se localiza en localhost:3001.

