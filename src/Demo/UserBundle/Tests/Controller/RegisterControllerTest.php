<?php

namespace Demo\UserBundle\Tests\Controller;

use Demo\BackendBundle\Test\ApiTestCase;
use Demo\BackendBundle\Test\ResponseAsserter;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class RegisterControllerTest
 *
 * @package Demo\UserBundle\Tests\Controller
 * @coversDefaultClass Demo\UserBundle\Controller\RegisterController
 */
class RegisterControllerTest extends ApiTestCase
{
    /**
     * @covers ::createAction
     */
    public function testCreate()
    {
        $this->deleteUser('test_create');
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

        $this->assertStatusCode(Response::HTTP_CREATED,$client);
        $this->assertContains('/api/users/test_create',$response->getHeader('Location'));
        ResponseAsserter::assertResponsePropertiesExist($response,['username']);
    }

    /**
     * @covers ::createAction
     * @covers \Demo\BackendBundle\Controller\ApiBaseController::getErrorsFromForm
     */
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
        $this->assertStatusCode(Response::HTTP_BAD_REQUEST,$client);
        ResponseAsserter::assertResponsePropertiesExist($response,['errors.plainPassword']);
    }
}
