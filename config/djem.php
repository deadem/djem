<?php

return [
    'main' => '\DJEM\Http\Controllers\Api\Main',
    'tree' => function () {
        return [
            'items' => [
                ['id' => 1, 'text' => 'Главные страницы', 'leaf' => true, '_doctype' => App\Doctypes\Doctype::class],
            ],
        ];
    },
    'resources' => __DIR__.'/../resources/djem',
];
