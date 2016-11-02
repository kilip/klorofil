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
        $manager->getConnection()->beginTransaction();
        $this->generateDefaultUser($manager);
        $this->generateFakeUser($manager);
        $manager->getConnection()->commit();
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
        $faker = Faker::create();

        $baseImageUrl = $this->container->getParameter('demo.backend_url').'/bundles/user/images';
        $avatars = [
            'male' => [
                $baseImageUrl.'/male-1.png',
                $baseImageUrl.'/male-2.png',
                $baseImageUrl.'/male-3.png',
            ],
            'female' => [
                $baseImageUrl.'/female-1.png',
                $baseImageUrl.'/female-2.png',
                $baseImageUrl.'/female-3.png',
            ]
        ];
        $genders = ['male','female'];
        for($i=1;$i<=500;$i++){
            $gender = $genders[array_rand(['male','female'])];
            $avatar = $avatars[$gender][array_rand($avatars[$gender])];
            $user = $manager->createUser();
            $user->setUsername($this->generateUsername());
            $user->setFullname($faker->name($gender));
            $user->setEmail($faker->email($gender));
            $user->setPlainPassword('fakeruser');
            $user->addRole('ROLE_USER');
            $user->setAvatar($avatar);
            $manager->updateUser($user,false);
            if(($i%25)===0){
                $om->flush();
            }
        }
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