<?php

namespace App\Tests;

trait CheckModel
{
    private function checkData($editor)
    {
        $data = collect($editor->getData());
        $attr = collect($editor->model()->getAttributes());

        // проверяем, что все поля модели есть в выдаче
        $attr->each(function ($value, $key) use ($data) {
            $this->assertEquals($value, $data->get($key));
        });

        // проверяем, что в выдаче нет ничего, кроме полей модели
        $data->each(function ($value, $key) use ($attr) {
            $this->assertEquals($value, $attr->get($key));
        });
    }
}
