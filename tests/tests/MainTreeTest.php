<?php


class MainTreeTest extends TestCase
{
    private static $api = '/djem/api/tree';

    public function testDjemApi()
    {
        $response = $this->call('GET', self::$api);
        $this->assertEquals(401, $response->status());
        $data = $response->getData();
        $this->assertObjectNotHasAttribute('username', $data);
        $this->assertEquals('unauthorized', $data->state);
    }

    public function testRootTree()
    {
        $user = new App\User(['name' => 'deadem']);
        $this->be($user);

        $response = $this->call('GET', self::$api);
        $this->assertNotEmpty($response->headers->get('x-csrf-token'));

        $config = config('djem.tree'); // конфигурация дерева в config/djem/tree
        $items = $config()['items'];

        $this->assertGreaterThanOrEqual(4, count($items));

        $data = $response->getData();
        foreach ($data->items as $key => $value) {
            $this->assertEquals((object) $items[$key], $value);
        }
        foreach ($items as $key => $value) {
            $this->assertEquals((object) $value, $data->items[$key]);
        }
    }
}
