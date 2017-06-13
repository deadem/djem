<?php

class DJEMServiceTest extends \DJEM\ServiceProvider
{
}

class DJEMServiceProviderTest extends TestCase
{
    public function testDjemPresence()
    {
        $class = new ReflectionClass(DJEMServiceTest::class);
        $this->assertTrue($class->IsInstantiable());
    }
}
