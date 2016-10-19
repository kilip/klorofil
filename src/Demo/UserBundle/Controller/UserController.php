<?php

namespace Demo\UserBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\JsonResponse;

class UserController extends Controller
{
    /**
     * @Route("/user/{name}",name="user_get")
     * @Method("GET")
     */
    public function getAction($name)
    {
        $user = $this->get('fos_user.user_manager')->findUserByUsername($name);
        $data = [
            'username' => $user->getUsername()
        ];
        $response = new JsonResponse($data);
        return $response;
    }
}
