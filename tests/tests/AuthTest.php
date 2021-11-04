<?php

require_once __DIR__.'/TestCase.php';

class AuthTest extends TestCase
{
    public function testDjemApi()
    {
        $response = $this->call('GET', '/djem/api');
        $this->assertEquals(401, $response->status());
        $data = $response->getData();
        $this->assertObjectNotHasAttribute('username', $data);
        $this->assertEquals('unauthorized', $data->state);
    }

    public function testDjemApiAuthorized()
    {
        $user = new App\Models\User(['name' => 'deadem']);
        $this->be($user);
        $response = $this->call('GET', '/djem/api');
        $this->assertNotEmpty($response->headers->get('x-csrf-token'));

        $data = $response->getData();
        $this->assertObjectNotHasAttribute('state', $data);
        $this->assertEquals('deadem', $data->username);
    }
}
