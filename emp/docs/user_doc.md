# emp felhasználói dokumentáció

## Feltételek

A következő parancsokra van szükség a beüzemeléshez:

* composer
* npm
* php

A composer önálló alkalmazás. Az npm a NodeJS része. A PHP benne van az XAMPP csomagban.

## Beüzemelés

### Kezdés

Letöltjük a projektet:

```cmd
git clone https://github.com/oktat/emp.git
```

Belépünk a projekt gyökérkönyvtárába és indítunk egy VSCode-t:

```cmd
cd
code .
```

### Függőségek telepítése

PHP függőségek:

```cmd
composer install
```

NodeJS függőségek:

```cmd
npm install
```

### Kulcs generálás

Beállítás fájlt kell létrehozni .env néven. Van egy minta állomány .env.example néven.

Készítsünk másolatot a .env.example állomnyról .env néven.

Generáljuk le az alkalmazás kulcsát:

```cmd
php artisan key:generate
```

A kulcs a .env állományba íródik.

### Adatbázis SQLite-tal

Hozzunk létre egy állományt database.sqlite néven a database könyvtárban:

* database/database.sqlite

Szerkesszük a .env állományt. Ehhez hasonlóan javítsuk az adatbázis részt:

```ini
DB_CONNECTION=sqlite
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=laravel
# DB_USERNAME=root
# DB_PASSWORD=
```

Kezdjük el a migrációt, ami létrehozza az adatbázis tábláit:

```cmd
php artisan migrate
```

### A szerver indítása

```cmd
php artisan serve
```

## Végpontok

|  Végpont  |  Metódus  |  Auth  |  CRUD  |  Leírás  |
|-|-|-|-|-|
| /employees  | GET | nem  | read | összes dolgozó |
| /employees  | POST | igen  | create | új dolgozó |
| /employees/{id}  | GET | nem  | read | egy dolgozó |
| /employees/{id}  | PUT | igen  | update  | dolgozó frissítése |
| /employees/{id}  | DELETE  | igen  | delete  | dolgozó törlése  |
| /register  | POST | nem | n/a | regisztráció  |
| /login  | POST | nem | n/a | belépés  |
| /logout  | POST  | nem | n/a  | kilépés  |

### Felhasználó regisztrálása

Felhasználó felvételéhez így kell összeállítani a küldendő JSON adatot:

```json
{
    "name": "mari",
    "email": "mari@zold.lan",
    "password": "titok",
    "password_confirmation": "titok"
}
```

### Bejelentkezés

Bejelentkezéshez név és jelszó szükséges:

```json
{
    "name": "janos",
    "password": "titok"
}
```

Visszakapunk egy tokent és egy nevet. Például:

```json
{
    "token": "1|34ZqaQhOT3t5fjEgxYsKC1SwrfJHw63REalXD921",
    "name": "janos"
}
```

A token elején szerepl a sorszáma és egy "|" karakter. Token alapú azonosításhoz ezt is vissza küldhetjük, vagy el hagyhatjuk.

### Dolgozók kezelés

#### Lekérdezés

Lekérdezéshez nem szükséges azonosítás, csak simán használjuk a GET metódust.

#### Új dolgozó felvétele

Végpont:

| Végpont | Metódus | Azonosítása |
|-|-|-|
| api/employees | POST | igen |

POST metódust használunk a következő módon:

```json
{
    "name":"Erős István",
    "city":"Szeged",
    "salary":"349"
}
```

Azonosításhoz, a fejlécben el kell küldeni a Bearer tokent a következő formában:

```json
Authorization: Bearer 34ZqaQhOT3t5fjEgxYsKC1SwrfJHw63REalXD921
```

Az Authorization értéke a "Bearer" szó, majd utána egy szóköz, ezt követi a token (sorszámmal vagy nélküle).

#### Dolgozó adatainak frissítése

Végpont:

| Végpont | Metódus | Azonosítása |
|-|-|-|
| api/employees/1 | PUT | igen |

A végpontnak paraméterként kell megadni, melyik dolgozó adatait szeretnénk változtatni. Az 1 csak egy példa. Át kell írni a megfelelő dolgozó azonosítójára.

Az új adatok:

```json
{
    "name": "Nyers Imre",
    "city": "Szolnok",
    "salary": 400
}
```

#### Dolgozó törlése

Végpont:

| Végpont | Metódus | Azonosítása |
|-|-|-|
| api/employees/1 | DELETE | igen |

A példában a 1-s azonosítójú dolgozót töröljük. Javítsuk a megfelelőre.
