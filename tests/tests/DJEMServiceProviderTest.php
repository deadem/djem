<?php

class DJEMServiceTest extends \DJEM\DJEMServiceProvider
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
