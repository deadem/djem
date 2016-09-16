#!/bin/sh

php artisan migrate:refresh && php artisan db:seed
exit $?
