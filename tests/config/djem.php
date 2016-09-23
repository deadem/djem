<?php

return [
    'tree' => function () {
        return [
            'items' => [
                [
                    'id' => 1,
                    'text' => 'djem.example.com',
                    'description' => 'Стартовая страница',
                    'leaf' => true,
                    '_doctype' => DJEM\Doctype::class,
                    'color' => 'red',
                    'icon' => '&#xE838;',
                ],
                [
                    'id' => 3,
                    'text' => 'Новости',
                    'description' => 'Всё, что происходит',
                    'leaf' => true,
                    '_doctype' => App\Doctypes\News::class,
                    'color' => 'orange',
                    'icon' => '&#xE02F;',
                ],
                [
                    'id' => 4,
                    'text' => 'Концерты',
                    'description' => 'Музыкальные события',
                    'leaf' => true,
                    '_doctype' => DJEM\Doctype::class,
                    'color' => 'indigo',
                    'icon' => '&#xE878;',
                ],
                [
                    'id' => 5,
                    'text' => 'Фестивали',
                    'description' => 'Сборные концерты и опен-эйры',
                    'leaf' => true,
                    '_doctype' => DJEM\Doctype::class,
                    'color' => 'deep-orange',
                    'icon' => '&#xE32E;',
                ],
            ],
        ];
    },
];
