<?php

class BasicTest extends TestCase
{
    public function testBasicReponse()
    {
        $this->visit('/')->see('Laravel 5');
    }

    public function testDjemResponse()
    {
        $this->visit('/djem')->see('<title>djem</title>');
    }
}
