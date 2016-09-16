<?php

class StaticFilesTest extends TestCase
{
    public function testDjem()
    {
        $this->visit('/djem')->see('<title>djem</title>');
    }

    public function testJS()
    {
        $response = $this->call('GET', '/djem/app.js');
        $this->assertEquals(200, $response->status());
    }

    public function testCSS()
    {
        $response = $this->call('GET', '/djem/resources/djem-all.css');
        $this->assertEquals(200, $response->status());
    }

    public function testText()
    {
        $response = $this->call('GET', '/djem/app.json');
        $this->assertEquals(200, $response->status());
    }

    public function testError()
    {
        $response = $this->call('GET', '/djem/crap.js');
        $this->assertEquals(404, $response->status());
    }
}
