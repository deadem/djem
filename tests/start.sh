#!/bin/sh
SERVE_HOST=$(hostname -I | awk '{print $1}')

./init.sh && php artisan serve --host=$SERVE_HOST
