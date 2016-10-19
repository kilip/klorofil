<?php

namespace Demo\UserBundle\Tests\Controller;

use Demo\BackendBundle\Test\DemoTestCase;
use Demo\UserBundle\Entity\User;


class UserControllerTest extends DemoTestCase
{
    public function setUp()
    {
        parent::setUp();
    }

    public function testCreate()
    {

    }

    public function testGet()
    {
        $helper = $this->getService('demo.test.user_helper');
        $user = $helper->create('toni','foo');

        $client = static::createClient();
        $crawler = $client->request('GET', '/api/user/toni');
        $response = $client->getResponse();

        $this->assertEquals(200,$response->getStatusCode());
        $this->assertContains('toni',$response->getContent());
        $this->assertContains($user->getFullname(),$response->getContent());
    }
}
