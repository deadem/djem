<?php

class BasicTest extends TestCase
{
    public function testBasic()
    {
        $this->visit('/')->see('Laravel 5');
    }

    public function testDjem()
    {
        $this->visit('/djem')->see('<title>djem</title>');
    }
}
