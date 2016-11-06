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
    }

    public function testCreate()
    {
        $helper = $this->getService('demo.test.user_helper');
        $helper->delete('test_create');
        $data = [
            'fullname' => 'Test Create User',
            'username' => 'test_create',
            'email' => 'test@create.com',
            'plainPassword' => [
                'first' => 'foo',
                'second' => 'foo'
            ]
        ];
        $data = json_encode($data);
        $client = $this->createAuthenticatedClient();
        $client->request('POST','/api/register',[],[],[
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
            'fullname' => 'Test Create Error',
            'username' => 'test_create_error',
            'email' => 'test_create@error.com',
            'plainPassword' => [
                'first' => 'foo',
                'second' => 'bar'
            ]
        ];
        $data = json_encode($data);
        $client = $this->createAuthenticatedClient();
        $client->request('POST','/api/register',[],[],[
            'Accept'=>'application/json',
            'HTTP_X-Requested-With' => 'XMLHttpRequest',
        ],$data);
        $response = $client->getResponse();

        $this->assertEquals(Response::HTTP_BAD_REQUEST,$response->getStatusCode());
        ResponseAsserter::assertResponsePropertiesExist($response,['errors.plainPassword']);
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

    public function testUpdateUser()
    {
        $this->markTestIncomplete();
        $helper = $this->getService('demo.test.user_helper');
        $helper->create('test_update','foo');
        $data = [
            'fullname' => 'Test Create User',
            'email' => 'test@create.com'
        ];
        $client = $this->createAuthenticatedClient();
        $client->request('PATCH', '/api/users/test_update',[],[],[
            'Accept'=>'application/json',
            'HTTP_X-Requested-With' => 'XMLHttpRequest',
        ],$data);
        $response = $client->getResponse();

        $this->assertEquals(202,$response->getStatusCode());
        ResponseAsserter::assertResponsePropertyEquals($response,'username','test_update');
    }
}