<?php

namespace Demo\UserBundle\Tests\Controller;

use Demo\BackendBundle\Test\ApiTestCase;
use Demo\BackendBundle\Test\ResponseAsserter;
use Symfony\Component\HttpFoundation\Response;
use Demo\UserBundle\Controller\UserController;

/**
 * Class UserControllerTest
 * @package Demo\UserBundle\Tests\Controller
 *
 * @coversDefaultClass Demo\UserBundle\Controller\UserController
 */
class UserControllerTest extends ApiTestCase
{
    /**
     * @covers ::listAction
     */
    public function testList()
    {
        $client = $this->createAuthenticatedClient();
        $client->request('GET','/api/users?sorting[id]=ASC');
        $response = $client->getResponse();
        $this->assertStatusCode(200,$client);
        ResponseAsserter::assertResponsePropertiesExist($response,['page']);
    }

    /**
     * @covers ::getAction
     */
    public function testGet()
    {
        $this->createUser('toni','foo');

        $client = $this->createAuthenticatedClient();
        $client->request('GET', '/api/users/toni',[],[],[
            'Accept'=>'application/json',
            'HTTP_X-Requested-With' => 'XMLHttpRequest',
        ]);
        $response = $client->getResponse();

        $this->assertStatusCode(Response::HTTP_OK,$client);
        ResponseAsserter::assertResponsePropertyEquals($response,'username','toni');
    }

    /**
     * @covers ::updateAction
     */
    public function testUpdate()
    {
        $this->createUser('test_update','foo');
        $data = [
            'fullname' => 'Test Update User',
        ];
        $json = json_encode($data);
        $client = $this->createAuthenticatedClient();
        $client->request('PATCH', '/api/users/test_update',[],[],[
            'Accept'=>'application/json',
            'HTTP_X-Requested-With' => 'XMLHttpRequest',
        ],$json);
        $response = $client->getResponse();

        $this->assertStatusCode(202,$client);
        ResponseAsserter::assertResponsePropertyEquals($response,'username','test_update');
        ResponseAsserter::assertResponsePropertyEquals($response,'fullname','Test Update User');
    }

    /**
     * @covers ::deleteAction
     */
    public function testDeleteAction()
    {

    }
}
