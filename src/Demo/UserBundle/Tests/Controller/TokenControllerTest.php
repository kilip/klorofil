<?php

namespace Demo\UserBundle\Tests\Controller;

use Demo\BackendBundle\Test\DemoTestCase;
use Demo\BackendBundle\Test\ResponseAsserter;
use Symfony\Component\HttpFoundation\Response;

class TokenControllerTest extends DemoTestCase
{
    public function testPostCreateToken()
    {
        $helper = $this->getService('demo.test.user_helper');
        $helper->create('toni','toni','some@mail.com','Anthonius Munthi');

        $client = static::createClient();
        $client->request('POST',$this->generateUrl('api_login_check'),[
            'username' => 'toni',
            'password' => 'toni',
        ]);
        $response = $client->getResponse();
        $this->assertEquals(Response::HTTP_OK,$response->getStatusCode());
        ResponseAsserter::assertResponsePropertyExists($response,'token');
    }

    public function testPostTokenInvalidCredential()
    {
        $helper = $this->getService('demo.test.user_helper');
        $helper->create('toni','toni','some@mail.com','Anthonius Munthi');

        $client = static::createClient();
        $client->request('POST',$this->generateUrl('api_login_check'),[
            'username' => 'toni',
            'password' => 'bar',
        ]);
        $response = $client->getResponse();
        $this->assertEquals(Response::HTTP_UNAUTHORIZED,$response->getStatusCode());
    }
}
