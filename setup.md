# Как поднять рабочую площадку

## Виртуальная машина

### VMware

#### Установка OS (на примере OpenSUSE)
1. Установить VMware Player (http://www.vmware.com/, в меню выбрать "downloads", "free product downloads", "player")
1. скачать c http://software.opensuse.org/ дистрибутив OpenSUSE.
1. запустить VMware, выбрать Create New VM
1. указать Installer disc image (iso) путь к скачанному дистрибутиву
1. выбрать Guest Operating System = Linux, SUSE Linux (64-bit, в зависимости от того, какой образ скачан)
1. в настройках указать "Network adapter": Bridged (или другой, позволяющий подключение к гостевой системе хостом)
1. остальные настройки можно не менять, <Finish>
1. <Play Virtual Machine>
1. в меню загрузчика выбрать <Installation>
1. ... "Lanaguage, Keyboard..." <Next>
1. ... "Installation options" <Next>
1. ... "Suggested partitioning" <Next>
1. ... "Clock and Time Zone" <Next>
1. ... "Desktop Selection", выбрать <Other>, <Minimal Server Selection (Text mode)>, <Next>
1. ... "Create New User". Указать "Username": "user", "Password": "123", "Confirm password": "123". Убедиться,
что галочка "Use this password for system administrator" установлена <Next>
1. ... в ответ на предупреждение "Password is too simple" нажать <Yes>
1. ... "Installation settings". Суммарная форма со всеми опциями установки. В списке "Firewall and SSH" кликнуть по
пункту "disable" в строке "Firewall will be enabled (disable)", строчка изменится на "Firewall will be disabled (enable)".
В строчке "SSH service will be disabled (enable)", кликнуть на ссылку "enable", строчка изменится на
"SSH service will be enabled (disable)".
1. в меню "installation settins" кликнуть в строчку "Software", откроется диалог выбора,
слева внизу нажать кнопку <Details>, в открывшемся интерфейсе выбрать наверху вкладку "Search"
1. набрать в поиске gcc, отметить "gcc" и "gcc-c++"
1. набрать в поиске make, отметить "make"
1. набрать в поиске kernel-source, отметить "kernel-source"
1. нажать на кнопку <Accept>
1. согласиться с установкой зависимых пакетов, <Continue>
1. нажать <Install>
1. ... "Confirm installation" <Install>
В дальнейшем устанавливать и удалять компоненты можно через графический yast или консольный zypper

#### Установка OS (на примере Debian)
1. Установить VMware Player (http://www.vmware.com/, в меню выбрать "downloads", "free product downloads", "player")
1. скачать c https://www.debian.org/distrib/ дистрибутив Debian.
1. запустить VMware, выбрать Create New VM
1. указать Installer disc image (iso) путь к скачанному дистрибутиву
1. выбрать Guest Operating System = Linux, Debian (64-bit, в зависимости от того, какой образ скачан)
1. в настройках указать "Network adapter": Bridged (или другой, позволяющий подключение к гостевой системе хостом)
1. остальные настройки можно не менять, <Finish>
1. <Play Virtual Machine>
1. В меню загрузчика выбрать <Install>
1. <English>
1. "Select your location" - <Other>, <Europe>, <Russian Federation>
1. "Base default locale" - <United States - en_US.UTF-8>
1. "Keymap to use" - <American English>
1. Укажите "host name" и "domain name"
1. Укажите "root password", повторно введите "root password"
1. Укажите "Full name" пользователя
1. "Username for new account" -> введите "user"
1. "Choose a password" -> введите "123", повторно введите пароль "123"
1. "Select your time zone" - укажите временной пояс
1. "Partitioning method" - <Guided - use entire disk>
1. "Select disk to partition" - <Enter>
1. "Partitioning scheme" - <All files in one partition>
1. <Finish partitioning and write changes to disk>
1. "Write changes to disk" - <Yes>
1. "Debian archive mirror country" - <Russian Federation>
1. "Debian archive mirror" - <Enter>
1. "Http proxy information" - <Enter>
1. "Participate in the packege usage survey" - <No>
1. "Choose software to install" - снять галочки "desktop environment", "print server", оставить "standard system utilities", добавить "SSH server". <Continue>
1. "Install the GRUB boot loader to the master boot record" - <Yes>
1. "Device for boot loader installation" - </dev/sda>
1. "Installation complete" - <Continue>

В дальнейшем устанавливать пакеты можно утилитой apt-get
1. Установить sudo: выполнить от пользователя root
```
apt-get install sudo
```
1. добавить пользователя user в группу sudo, отректировав файл /etc/group
1. перелогиниться

#### Установить VMware Tools
1. после успешной установки выключить виртуальную машину
1. у выключенной виртуальной машины убрать в её настройках CD-привода галочку "Connect at power on"
1. в VMPlayer открыть настройки этой виртуальной машины - "Edit virtual machine settings", переключиться на вкладку "Options"
1. в пункте "Shared Folders" выбрать пункт "Always enabled", нажать кнопку "Add..." под списком
1. в поле "Host path" выбрать путь до папки с репозиторием, установленной локально
1. в поле "Name" ввести "DJEM"
1. нажать на кнопку <Next>
1. проверить, что галочка "Enable this share" - установлена, "Read only" - сброшена
1. <Finish>
1. <OK>
1. запустить виртуальную машину
1. загрузиться, зайти пользователем root
Установить open-vm-tools:
```
$ apt-get install open-vm-tools
$ apt-get install open-vm-tools-dkms
$ mkdir /mnt/hgfs
$ echo ".host:/ /mnt/hgfs vmhgfs auto,rw,exec,utf8 0 0" >> /etc/fstab
```
Перезагрузить машину. В /mnt/hgfs должны добавиться директории с файлами хоста

Или собрать vmware tools самостоятельно:
1. в меню VMware выбрать "Player" -> "Manage" -> "Install VMware Tools..."
```
$ mkdir /mnt/cdrom
$ mount /dev/cdrom /mnt/cdrom
$ cd /mnt/cdrom
$ cp VMwareTools<TAB>.tgz /tmp
$ cd /tmp
$ tar -zxvf VMwareTools<TAB>
$ cd vmware-tools-distrib
$ ./vmware-install.pl
```
на все вопросы нажать <ENTER>
1. после окончания установки в директории /mnt/hgfs появится директория DJEM, оттранслированная с основной системы.
kernel-source больше не нужен, этот компонент теперь можно удалить.
 - в SUSE: запустив yast, выбрав "Software", найти в поиске "kernel-source", выбрать "-", нажать <Accept>

1. Перезагрузить систему

## Установка приложений

### Установка MongoDB
1. Для Debian: следуем инструкции http://docs.mongodb.org/master/tutorial/install-mongodb-on-debian/

1. Для OpenSUSE:
1. используем инструкцию с сайта http://docs.mongodb.org/
```
$ sudo zypper addrepo --no-gpgcheck https://repo.mongodb.org/zypper/suse/11/mongodb-org/3.0/x86_64/ mongodb
$ sudo zypper install mongodb-org
```

#### Включить MongoDB
1. внести правки в /etc/mongod.conf или запустить с настройками по умолчанию:
```
$ sudo systemctl start mongod
```
1. добавить в автозагрузку:
```
$ sudo chkconfig mongod on
```
1. порт mongodb по умолчанию 27017

### Установка PHP
1. установить компоненты php5, php5-devel (php5-dev), php5-fpm, php5-zip, php5-zlib, php5-mbstring, php5-phar, php5-json, php5-mcrypt, php5-opcache, php5-openssl, php5-gd, php5-pdo
1. установить расширение mongodb для php5-mongo
1. или, если такого нет, собрать вручную: http://php.net/manual/en/mongo.installation.php
1. установить компоненты "gcc", "gcc-c++", "make" (если ещё не установлены)
1. скачать с сайта http://github.com/mongodb/mongo-php-driver - кнопка "download"
```
$ tar zxvf mongodb-mongodb-php-driver-<commit_id>.tar.gz
$ cd mongodb-mongodb-php-driver-<commit_id>
$ phpize
$ ./configure
$ make all
$ sudo make install
```
1. добавить в php.ini строчку extension=mongo.so или добавить файл mongo.ini со строчкой extension=mongo.so в директорию /etc/php5/conf.d
1. создать файл настроек /etc/php5/fpm/php-fpm.conf
1. скорректировать настройки php-fpm.conf, запустить php-fpm, добавить его в автозагрузку:
```
$ sudo chkconfig php-fpm on
$ sudo systemctl start php-fpm
```
или
```
$ sudo chkconfig php5-fpm on
$ sudo systemctl start php5-fpm
```

1. по умолчанию php-fpm поднимается на TCP-порту 9000

### nginx
1. установить компонент nginx. или, если его нет (в OpenSUSE 13.2 нет собранного стабильного nginx), добавляем его так:
```
$ sudo zypper ar  -r http://download.opensuse.org/repositories/server:/http/openSUSE_13.2/server:http.repo nginx
$ sudo zypper ref
```
1. на вопросы разрешаем доверять новому репозиторию
```
$ sudo zypper install nginx
```
1. исправить строчки в конфиге (/etc/nginx/nginx.conf): добавить в секцию location / { ... файл index.php
1. раскомментировать (или добавить) строки:
```
location ~ \.php$ {
  fastcgi_pass    127.0.0.1:9000;
  fastcgi_index   index.php;
  fastcgi_param   SCRIPT_FILENAME $document_root$fastcgi_script_name;
  include         fastcgi_params;
}
```
1. добавить внутрь настройки "server {" параметр
```
root /srv/www/htdocs;
```
или другой, указывающий на папку с html
1. запустить nginx, включить его в автозагрузку:
```
$ sudo systemctl start nginx
$ sudo systemctl enable nginx
```
### Установить Git
- SUSE:
```
$ sudo zypper install git
```
- Debian:
```
$ apt-get install git
```

### Установка Laravel
1. инструкция по установке (http://laravel.com/docs)
1. установить composer (https://getcomposer.org/download/):
```
$ curl -sS https://getcomposer.org/installer | php
$ mv composer.phar ~/bin/composer
$ composer global require "laravel/installer=~1.1"
$ echo "export PATH=~/.composer/vendor/bin:$PATH" >> ~/.bashrc
```
1. если теперь заново залогиниться или выполнить команду
```
$ export PATH=~/.composer/vendor/bin:$PATH
```
то будет доступна команда laravel

#### Подключаем проект
```
$ git init
$ git remote add origin git@bitbucket.org:путь_к_репозиторию
$ git fetch
$ git checkout -t -f origin/master
$ composer install
```

#### Или создаём новый проект
1. выполнить
```
$ laravel new ИМЯ_ПРОЕКТА
```
1. добавляем Laravel MongoDB (https://github.com/jenssegers/laravel-mongodb):
```
$ composer require jenssegers/mongodb
```

--------

#### Подключение пакета
1. создать директорию vendor/djem/djem
1. склонировать в неё djem: 
```
$ git clone git@bitbucket.org:djem/djem.git
```
1. в корне laravel-проекта в composer.json в секции "autoload": { в конец перечислений "psr-4": добавить строку
```
"DJEM\\": "vendor/djem/djem/app"
```
1. выполнить 
```
$ composer dump-autoload
```
1. в папке проекта в config/app.php в секцию 'providers' => [ добавить:
```
DJEM\DJEMServiceProvider::class,
Jenssegers\Mongodb\MongodbServiceProvider::class,

```
1. в config/database.php добавить в секцию 'connections':
```
'mongodb' => [
    'driver'    => 'mongodb',
    'host'      => env('DB_HOST', 'localhost'),
    'port'      => env('DB_PORT', 27017),
    'database'  => env('DB_DATABASE', 'forge'),
    'username'  => env('DB_USERNAME', 'forge'),
    'password'  => env('DB_PASSWORD', ''),
],
```
1. после этого, в директории проекта отредактировать файл .env, изменив перечисленные строки, или добавив те. которых нет:
```
DB_CONNECTION=mongodb
DB_HOST=localhost
DB_DATABASE=test
DB_USERNAME=test
DB_PASSWORD=test
```
1. разрешить модели пользователя храниться в Mongo - изменить app/User.php, заменить в нём
```
class User extends Model ...
```
на
```
class User extends \Jenssegers\Mongodb\Model ...
```
1. разрешить запись в директории:
```
$ chmod a+w -R storage
$ chmod a+w -R bootstrap/cache
```
1. добавить в директорию public линк на паблик плагина:
```
$ cd public
$ ln -s ../vendor/djem/djem/public/ djem
```
1. собрать extjs-часть пакета или подложить готовую: распаковать в директорию public/ext библиотеку extjs5.1
1. установить senchacmd 5.1 (возможно, потребуется установить java, если её ещё нет)
1. в директории public выполнить:
```
$ sencha app refresh
$ sencha app build development
```