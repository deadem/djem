<?php

return [
    'tree' => [
        'items' => [
            [
                'id' => 1,
                'text' => 'djem.example.com',
                'description' => 'Стартовая страница',
                'leaf' => true,
                '_doctype' => App\Doctypes\StartPage::class,
                'color' => 'red',
                'icon' => '&#xf4cf;',
            ],
            [
                'id' => 3,
                'text' => 'Новости',
                'description' => 'Всё, что происходит',
                'leaf' => true,
                '_doctype' => App\Doctypes\News::class,
                'color' => 'orange',
                'icon' => '&#xf17a;',
            ],
            [
                'id' => 2,
                'text' => 'Font',
                'description' => 'Icons',
                'leaf' => true,
                '_doctype' => App\Doctypes\Font::class,
                'color' => 'red',
                'icon' => '&#xf0b5;',
            ],
        ],
    ],
];
