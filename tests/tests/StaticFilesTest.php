<?php

class StaticFilesTest extends TestCase
{
    public function testDjem()
    {
        $this->visit('/djem')->see('<title>djem</title>');
    }

    public function testJS()
    {
        $response = $this->call('GET', '/djem/index.js');
        $this->assertEquals(200, $response->status());
    }

    public function testCSS()
    {
        $response = $this->call('GET', '/djem/index.css');
        $this->assertEquals(200, $response->status());
    }

    public function testText()
    {
        $response = $this->call('GET', '/djem/index.html');
        $this->assertEquals(200, $response->status());
    }

    public function testError()
    {
        $response = $this->call('GET', '/djem/crap.js');
        $this->assertEquals(404, $response->status());
    }
}
