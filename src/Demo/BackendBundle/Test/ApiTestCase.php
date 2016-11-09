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

use Liip\FunctionalTestBundle\Test\WebTestCase;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

/**
 * Class ApiTestCase
 *
 * @package Demo\BackendBundle\Test
 * @method  \Demo\UserBundle\Entity\User createUser(string $username, string $password,string $email=null,string $fullname=null, string $role='ROLE_USER')
 * @method  void deleteUser(string $username)
 */
abstract class ApiTestCase extends WebTestCase
{
    private static $isSchemaCreated;

    private static $authenticatedClients;

    public function setUp()
    {
        parent::setUp();
        if(!self::$isSchemaCreated){
            $this->runCommand('doctrine:schema:update',array(
                '--env'=>'test','--force'=>true
            ));
            self::$isSchemaCreated = true;
        }
    }

    protected function createAuthenticatedClient($role = "ROLE_SUPER_ADMIN", $username = 'testuser', $password = 'testuser', $email = 'test@user.com', $fullname = 'Test User')
    {
        $id = md5($role.$username);
        if (!($client = self::$authenticatedClients[$id])) {
            $user = $this->createUser($username, $password, $email, $fullname, $role);
            $client = static::makeClient();
            $client->request('POST', $this->generateUrl('api_auth_tokens'), [
                'username' => $user->getUsername(),
                'password' => $password,
            ]);
            $data = json_decode($client->getResponse()->getBody(), true);
            $client = static::makeClient();
            $client->setServerParameter('HTTP_Authorization', sprintf('Bearer %s', $data['token']));
            self::$authenticatedClients[$id] = $client;
        }

        return $client;
    }

    protected function generateUrl($route, $parameters = array(), $referenceType = UrlGeneratorInterface::ABSOLUTE_PATH)
    {
        return $this->getContainer()->get('router')->generate($route, $parameters, $referenceType);
    }

    public function __call($name, $arguments)
    {
        $helpers = [
            $this->getContainer()->get('demo.test.user_helper'),
        ];

        foreach($helpers as $helper){
            if(method_exists($helper,$name)){
                return call_user_func_array(array($helper,$name),$arguments);
            }
        }

        throw new \Exception('Method not found');
    }
}