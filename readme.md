# DJEM

[![StyleCI](https://styleci.io/repos/46667003/shield)](https://styleci.io/repos/46667003)

## Installation
```
composer require deadem/djem:*@dev
```

Add service provider into providers section of ```config/app.php```
```
/*
 * Application Service Providers...
 */

DJEM\ServiceProvider::class,
```

```
php artisan vendor:publish
```
Edit ```config/djem.php```

Navigate to http://yoursite.example/djem/

## Development

```
# cd tests
# composer install
```
Edit .env, add APP_KEY (php artisan key:generate)
```
# php artisan demo
# php artisan serve
```
Open in browser http://localhost:8000/djem/
