<?php

namespace Demo\FrontendBundle\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class HomeControllerTest extends WebTestCase
{
    public function testShowPost()
    {
        $client = static::createClient();

        $crawler = $client->request('GET', '/');
        $this->assertEquals(200,$client->getResponse()->getStatusCode());
        $this->assertEquals(1,$crawler->filter('html:contains("Welcome to Demo Application")')->count());
    }
}
