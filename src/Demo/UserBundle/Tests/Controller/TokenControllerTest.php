<?php

namespace Demo\UserBundle\Tests\Controller;

use Demo\BackendBundle\Test\ApiTestCase;
use Demo\BackendBundle\Test\ResponseAsserter;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class TokenControllerTest
 * @package Demo\UserBundle\Tests\Controller
 */
class TokenControllerTest extends ApiTestCase
{
    public function testPostCreateToken()
    {
        $this->createUser('toni','toni','some@mail.com','Anthonius Munthi');

        $client = static::makeClient();
        $client->request('POST',$this->generateUrl('api_auth_tokens'),[
            'username' => 'toni',
            'password' => 'toni',
        ]);
        $response = $client->getResponse();
        $this->assertEquals(Response::HTTP_OK,$response->getStatusCode());
        ResponseAsserter::assertResponsePropertyExists($response,'token');
    }

    public function testPostTokenInvalidCredential()
    {
        $this->createUser('toni','toni','some@mail.com','Anthonius Munthi');

        $client = static::makeClient();

        $client->request('POST',$this->generateUrl('api_auth_tokens'),[
            'username' => 'bar',
            'password' => 'toni',
        ]);

        // test when user not exists
        $response = $client->getResponse();
        $this->assertEquals(Response::HTTP_UNAUTHORIZED,$response->getStatusCode());


        // test with invalid password
        $client->request('POST',$this->generateUrl('api_auth_tokens'),[
            'username' => 'toni',
            'password' => 'bar',
        ]);
        $response = $client->getResponse();
        $this->assertEquals(Response::HTTP_UNAUTHORIZED,$response->getStatusCode());
    }
}
