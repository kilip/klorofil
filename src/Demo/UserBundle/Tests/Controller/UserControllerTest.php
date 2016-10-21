<?php

namespace Demo\UserBundle\Tests\Controller;

use Demo\BackendBundle\Test\DemoTestCase;

use Symfony\Component\HttpFoundation\Response;
use Demo\BackendBundle\Test\ResponseAsserter;

class UserControllerTest extends DemoTestCase
{
    public function setUp()
    {
        parent::setUp();
    }

    public function testList()
    {
        $helper = $this->getService('demo.test.user_helper');
        $helper->create('toni','foo');

        $client = $this->createAuthenticatedClient();
        $client->request('GET','/api/users?sorting[id]=ASC');
        $response = $client->getResponse();
        $this->assertEquals(Response::HTTP_OK,$response->getStatusCode());
        //ResponseAsserter::assertResponsePropertyEquals($response,'_embedded.items[0].username','test_create');
    }

    public function testCreate()
    {
        $helper = $this->getService('demo.test.user_helper');
        $helper->delete('test_create');
        $data = [
            'fullname' => 'Hello World',
            'username' => 'test_create',
            'email' => 'foo@bar.com',
            'plainPassword' => [
                'first' => 'foo',
                'second' => 'foo'
            ]
        ];
        $data = json_encode($data);
        $client = $this->createAuthenticatedClient();
        $client->request('POST','/api/users',[],[],[
            'Accept'=>'application/json',
            'HTTP_X-Requested-With' => 'XMLHttpRequest',
        ],$data);
        $response = $client->getResponse();

        $this->assertEquals(Response::HTTP_CREATED,$response->getStatusCode());
        $this->assertTrue($response->hasHeader('Location'));
        $this->assertContains('/api/users/test_create',$response->getHeader('Location'));
        ResponseAsserter::assertResponsePropertiesExist($response,['username']);
    }

    public function testCreateError()
    {
        $data = [
            'fullname' => 'Hello World',
            'username' => 'test_create',
            'email' => 'foo@bar.com',
            'plainPassword' => [
                'first' => 'foo',
                'second' => 'bar'
            ]
        ];
        $data = json_encode($data);
        $client = $this->createAuthenticatedClient();
        $client->request('POST','/api/users',[],[],[
            'Accept'=>'application/json',
            'HTTP_X-Requested-With' => 'XMLHttpRequest',
        ],$data);
        $response = $client->getResponse();

        $this->assertEquals(Response::HTTP_BAD_REQUEST,$response->getStatusCode());
        ResponseAsserter::assertResponsePropertiesExist($response,['data.username']);
    }

    public function testGet()
    {
        $helper = $this->getService('demo.test.user_helper');
        $helper->create('toni','foo');

        $client = $this->createAuthenticatedClient();
        $client->request('GET', '/api/users/toni',[],[],[
            'Accept'=>'application/json',
            'HTTP_X-Requested-With' => 'XMLHttpRequest',
        ]);
        $response = $client->getResponse();


        $this->assertEquals(200,$response->getStatusCode());
        ResponseAsserter::assertResponsePropertyEquals($response,'username','toni');
    }
}
