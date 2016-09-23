<?php

namespace Tests\Seed;

use TestCase;

class AuthTest extends TestCase
{
    public function testLogin()
    {
        $this->get('/djem/api', ['login' => 'test', 'password' => 'test'])
            ->seeJson(['state' => 'unauthorized']);

        $this->post('/djem/api', ['login' => 'test', 'password' => 'test'])
            ->seeJson(['username' => 'tester']);
    }
}
