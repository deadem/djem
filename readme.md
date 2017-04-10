# DJEM

[![Build Status](https://travis-ci.org/deadem/djem.svg)](https://travis-ci.org/deadem/djem)
[![StyleCI](https://styleci.io/repos/46667003/shield)](https://styleci.io/repos/46667003)
[![SensioLabsInsight](https://insight.sensiolabs.com/projects/4c89d3a5-4837-4433-a4af-2e93e8135698/mini.png)](https://insight.sensiolabs.com/projects/4c89d3a5-4837-4433-a4af-2e93e8135698)
[![Coverage Status](https://coveralls.io/repos/github/deadem/djem/badge.svg)](https://coveralls.io/github/deadem/djem?branch=master)

## Installation
```
composer require deadem/djem:*@dev
```

Add service provider into providers section of ```config/app.php```
```
/*
 * Application Service Providers...
 */

DJEM\DJEMServiceProvider::class,
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
