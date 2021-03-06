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
use Demo\UserBundle\Test\UserTestHelper;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

/**
 * Class DemoTestCase
 *
 * @package \Demo\BackendBundle\Test
 * @method  \Demo\UserBundle\Entity\User helperUserCreate(string $username,string $password, string $email=null, string $fullname=null, string $role="ROLE_USER")
 */
class DemoTestCase extends WebTestCase
{
    protected static $authenticatedClients;

    protected static $staticClient;

    /**
     * @var UserTestHelper
     */
    protected $helper;

    /**
     * @param $id
     * @return mixed
     */
    public function getService($id)
    {
        if (is_null(static::$kernel)) {
            static::bootKernel();
        }
        $kernel = static::createClient()->getKernel();
        return $kernel->getContainer()->get($id);
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

    protected function createAuthenticatedClient($role = "ROLE_SUPER_ADMIN", $username = 'testuser', $password = 'testuser', $email = 'test@user.com', $fullname = 'Test User')
    {
        $id = md5($role.$username);
        if (!($client = static::$authenticatedClients[$id])) {
            $user = $this->helperUserCreate($username, $password, $email, $fullname, $role);
            $client = static::createClient();
            $client->request('POST', $this->generateUrl('api_auth_tokens'), [
                'username' => $user->getUsername(),
                'password' => $password,
            ]);
            $data = json_decode($client->getResponse()->getBody(), true);
            $client = static::createClient();
            $client->setServerParameter('HTTP_Authorization', sprintf('Bearer %s', $data['token']));
            static::$authenticatedClients[$id] = $client;
        }

        return $client;
    }

    public function __call($name, $arguments)
    {
        if (is_null($this->helper)) {
            $this->helper = $this->getService('demo.test.user_helper');
        }
        $helper = $this->helper;
        $methodName = str_replace('helperUser', '', $name);
        if (method_exists($helper, $methodName)) {
            return call_user_func_array(array($helper, $methodName), $arguments);
        }
        throw new \Exception('Method not found');
    }

}