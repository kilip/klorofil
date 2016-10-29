<?php

/*
 * This file is part of the Demo Project.
 *
 * (c) Anthonius Munthi <me@itstoni.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Demo\BackendBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Demo\UserBundle\Entity\User;
use Faker\Factory as Faker;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

class LoadUserData implements FixtureInterface,ContainerAwareInterface
{
    /**
     * @var array
     */
    private $usernames = [];

    /**
     * @var ContainerInterface
     */
    private $container;

    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;

    }


    public function load(ObjectManager $manager)
    {
        $this->generateDefaultUser($manager);
        $this->generateFakeUser($manager);
    }

    private function generateDefaultUser(ObjectManager $om)
    {
        $manager = $this->container->get('fos_user.user_manager');
        $user = $manager->createUser();
        $user->setFullname('Anthonius Munthi');
        $user->setUsername('admin');
        $user->setPlainPassword('admin');
        $user->setEmail('me@itstoni.com');
        $user->addRole('ROLE_SUPER_ADMIN');
        $user->addRole('ROLE_ADMIN');
        $manager->updateUser($user);
    }

    private function generateFakeUser(ObjectManager $om)
    {
        $manager = $this->container->get('fos_user.user_manager');
        $om->getConnection()->beginTransaction();
        $faker = Faker::create();
        for($i=1;$i<=100;$i++){
            $user = $manager->createUser();
            $user->setUsername($this->generateUsername());
            $user->setFullname($faker->name);
            $user->setEmail($faker->email);
            $user->setPlainPassword('fakeruser');
            $user->addRole('ROLE_USER');
            $manager->updateUser($user);
        }
        $om->flush();
        $om->getConnection()->commit();
    }

    private function generateUsername()
    {
        $faker = Faker::create();
        $username = $faker->userName;
        if(in_array($username,$this->usernames)){
            return $this->generateUsername();
        }
        $this->usernames[] = $username;
        return $username;
    }
}