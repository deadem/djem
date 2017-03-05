<?php

return [
    'tree' => [
        [
            'id' => 1,
            'text' => 'djem.example.com',
            'description' => 'Start Page',
            'leaf' => true,
            '_doctype' => App\Doctypes\StartPage::class,
            'color' => 'red',
            'icon' => '&#xf4cf;',
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
        [
            'id' => 4,
            'text' => 'Colors',
            'description' => 'Material colors',
            'leaf' => true,
            '_doctype' => App\Doctypes\Colors::class,
            'color' => 'green',
            'icon' => '&#xf3d8;',
        ],
        [
            'id' => 1000,
            'text' => 'Submenu',
            'description' => 'Submenu example',
            'leaf' => false,
            '_doctype' => DJEM\Doctype::class,
            'color' => 'deep-orange-200',
            'icon' => '&#xf257;',

            'items' => [
                [
                    'id' => 3,
                    'text' => 'News',
                    'description' => 'Events and news',
                    'leaf' => true,
                    '_doctype' => App\Doctypes\News::class,
                    'color' => 'orange',
                    'icon' => '&#xf17a;',
                ],
                [
                    'id' => 5,
                    'text' => 'Sub menu',
                    'description' => 'Submenu',
                    'leaf' => true,
                    '_doctype' => DJEM\Doctype::class,
                    'color' => 'red',
                    'icon' => '&#xf257;',
                ],
            ],
        ],
    ],
];
