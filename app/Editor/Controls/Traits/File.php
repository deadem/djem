<?php

namespace DJEM\Editor\Controls\Traits;

use InvalidArgumentException;

trait File
{
    private function getFilePath($file)
    {
        $file = realpath(sys_get_temp_dir().'/'.$file);

        if (substr($file, 0, strlen(sys_get_temp_dir())) !== sys_get_temp_dir()) {
            // какой-то неправильный файл, игнорируем
            throw new InvalidArgumentException('Invalid filename ['.$file.'].');
        }

        return $file;
    }
}
