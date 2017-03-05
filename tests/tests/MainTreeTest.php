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

    private function checkItems($items, $data)
    {
        if (! is_array($items) && ! is_object($items)) {
            return $this->assertEquals($items, $data);
        }
        foreach ($items as $key => $value) {
            if (is_array($data)) {
                $this->checkItems($value, $data[$key]);
            } elseif (is_object($data)) {
                $this->checkItems($value, $data->$key);
            } else {
                $this->assertEquals($value, $data->$key);
            }
        }
    }

    public function testRootTree()
    {
        $user = new App\User(['name' => 'deadem']);
        $this->be($user);

        $response = $this->call('GET', self::$api);
        $this->assertNotEmpty($response->headers->get('x-csrf-token'));

        $config = config('djem.tree'); // конфигурация дерева в config/djem/tree
        $items = $config;

        $this->assertGreaterThanOrEqual(3, count($items));

        $data = $response->getData();

        $this->checkItems($items, $data);
        $this->checkItems($data, $items);
    }
}
