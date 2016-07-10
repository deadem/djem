<?php

return [
    'main' => '\DJEM\Http\Controllers\Api\Main',
    'tree' => function () {
        return [
            'items' => [
                ['id' => 1, 'text' => 'djem.example.com', 'description' => 'Главные страницы', 'leaf' => true, '_doctype' => DJEM\Doctype::class, 'color' => 'red', 'icon' => '&#xE838;'],
            ],
        ];
    },
    'resources' => __DIR__.'/../resources/djem',
];
