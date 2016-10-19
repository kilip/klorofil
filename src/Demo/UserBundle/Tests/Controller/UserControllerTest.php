<?php

namespace Demo\UserBundle\Tests\Controller;

use Demo\UserBundle\Entity\User;
use Demo\UserBundle\Test\UserTestTrait;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class UserControllerTest extends WebTestCase
{
    use UserTestTrait;

    public function setUp()
    {
        parent::setUp();
        static::bootKernel();
        $this->initUserTestTrait(static::$kernel->getContainer()->get('fos_user.user_manager'));
    }

    public function testGet()
    {
        $user = $this->newUser();
        $user->setEmail('foo@bar.com')->setUsername('toni')->setPassword('foo');
        $this->createUser($user);

        $client = static::createClient();
        $crawler = $client->request('GET', '/api/user/toni');
        $response = $client->getResponse();

        $this->assertEquals(200,$response->getStatusCode());
        $this->assertContains('toni',$response->getContent());
    }
}
