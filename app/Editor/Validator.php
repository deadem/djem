<?php

namespace DJEM\Editor;

use Request;
use Illuminate\Foundation\Validation\ValidatesRequests;

class Validator
{
    use ValidatesRequests {
        validate as validateRequest;
    }

    public function validate($input, $rules)
    {
        $validator = $this->getValidationFactory()->make($input, $rules);
        if ($validator->fails()) {
            $this->throwValidationException(Request::instance(), $validator);
        }
    }
}
