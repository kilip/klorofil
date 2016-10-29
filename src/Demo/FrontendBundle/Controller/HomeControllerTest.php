<?php

/*
 * This file is part of the Demo Project.
 *
 * (c) Anthonius Munthi <me@itstoni.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */


namespace Demo\FrontendBundle\Controller;


use Demo\BackendBundle\Test\DemoTestCase;
use Symfony\Component\HttpFoundation\Response;

class HomeControllerTest extends DemoTestCase
{
    public function testHome()
    {
        $client = static::createClient();
        $client->request('GET','/');
        $response = $client->getResponse();
        $this->assertEquals(Response::HTTP_PERMANENTLY_REDIRECT,$response->getStatusCode());
    }
}
