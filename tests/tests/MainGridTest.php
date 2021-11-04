<?php

class MainGridTest extends TestCase
{
    private static $api = '/djem/api/grid';

    public function testDjemApi()
    {
        $response = $this->call('GET', self::$api);
        $this->assertEquals(401, $response->status());
        $data = $response->getData();
        $this->assertObjectNotHasAttribute('username', $data);
        $this->assertEquals('unauthorized', $data->state);
    }

    public function testGridResponses()
    {
        $user = new App\User(['name' => 'deadem']);
        $this->be($user);

        $response = $this->call('GET', self::$api.'?tree=1');
        $data = $response->getData();
        $this->assertNotEmpty($data);
    }

    public function testSubGridResponses()
    {
        $user = new App\User(['name' => 'deadem']);
        $this->be($user);

        $response = $this->call('GET', self::$api.'?tree=5');
        $data = $response->getData();
        $this->assertNotEmpty($data);
    }
}
