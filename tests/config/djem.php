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
            'id' => 3,
            'text' => 'News',
            'description' => 'Events and news',
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
        [
            'id' => 4,
            'text' => 'Submenu',
            'description' => 'Submenu example',
            'leaf' => false,
            '_doctype' => DJEM\Doctype::class,
            'color' => 'red',
            'icon' => '&#xf257;',

            'items' => [
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
