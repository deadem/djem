#!/bin/sh
export DEMO_HOST=$(hostname -I | awk '{print $1}')
php artisan demo:serve
