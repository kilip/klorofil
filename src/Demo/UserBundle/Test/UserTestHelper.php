<?php

/*
 * This file is part of the Demo Project.
 *
 * (c) Anthonius Munthi <me@itstoni.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Demo\UserBundle\Test;


use FOS\UserBundle\Doctrine\UserManager;
use Faker\Factory as Faker;

class UserTestHelper
{
    /**
     * @var UserManager
     */
    private $manager;

    /**
     * UserTestHelper constructor.
     * @param UserManager $manager
     */
    public function __construct(UserManager $manager)
    {
        $this->manager = $manager;
    }

    /**
     * @return UserManager
     */
    public function getManager()
    {
        return $this->manager;
    }

    public function create($username,$password,$email=null,$fullname=null,$role='ROLE_USER')
    {
        $faker = Faker::create();
        $manager = $this->manager;

        if(is_null($fullname)){
            $fullname = $faker->name;
        }
        if(is_null($email)){
            $email = $faker->email;
        }

        /* @var \Demo\UserBundle\Entity\User $user */
        if(is_null($user = $manager->findUserByUsername($username))){
            $user = $this->getManager()->createUser();
        }
        $user->setFullname($fullname);
        $user
            ->setUsername($username)
            ->setPlainPassword($password)
            ->setEmail($email)
            ->setEnabled(true)
        ;
        if(!$user->hasRole($role)){
            $user->addRole($role);
        }
        $manager->updateUser($user);

        return $user;
    }

    public function delete($username)
    {
        $manager = $this->manager;
        if(!is_null($user = $manager->findUserByUsername($username))){
            $manager->deleteUser($user);
        }
    }
}