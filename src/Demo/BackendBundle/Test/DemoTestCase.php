<?php

/*
 * This file is part of the Demo Project.
 *
 * (c) Anthonius Munthi <me@itstoni.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Demo\BackendBundle\Test;


use Demo\BackendBundle\Client;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class DemoTestCase extends WebTestCase
{
    /**
     * @param $id
     * @return mixed
     */
    public function getService($id)
    {
        if(is_null(static::$kernel->getContainer())){
            static::bootKernel();
        }
        return static::$kernel->getContainer()->get($id);
    }

    /**
     * Creates a Client.
     *
     * @param array $options An array of options to pass to the createKernel class
     * @param array $server  An array of server parameters
     *
     * @return Client A Client instance
     */
    protected static function createClient(array $options = array(), array $server = array())
    {
        static::bootKernel($options);

        $client = static::$kernel->getContainer()->get('test.client');
        $client->setServerParameters($server);

        return $client;
    }
}