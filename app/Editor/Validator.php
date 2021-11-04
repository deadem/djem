<?php

namespace DJEM\Editor;

use Illuminate\Foundation\Validation\ValidatesRequests;

class Validator
{
    use ValidatesRequests {
        validate as validateRequest;
    }

    public function validate($input, $rules)
    {
        $validator = $this->getValidationFactory()->make($input, $rules);
        $validator->validate();
    }
}
