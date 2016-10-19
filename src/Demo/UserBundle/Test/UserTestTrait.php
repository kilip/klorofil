<?php

namespace Demo\UserBundle\Test;

use Demo\UserBundle\Entity\User;
use FOS\UserBundle\Doctrine\UserManager;

trait UserTestTrait
{
    /**
     * @var UserManager
     */
    protected $manager;

    protected function initUserTestTrait(UserManager $manager)
    {
        $this->manager = $manager;
    }

    protected function newUser()
    {
        return $this->manager->createUser();
    }

    protected function createUser(User $user)
    {
        $manager = $this->manager;
        $test = $manager->findUserByUsername($user->getUsername());
        if(!$test){
            $manager->updateUser($user);
        }
        return $user;
    }
}