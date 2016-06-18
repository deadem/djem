<?php

namespace DJEM\Editor;

use Illuminate\Foundation\Validation\ValidatesRequests;

class Validator
{
    use ValidatesRequests {
        validate as validateRequest;
    }

    public function validate($rules)
    {
        $this->validateRequest(\Request::instance(), $rules);
    }
}
