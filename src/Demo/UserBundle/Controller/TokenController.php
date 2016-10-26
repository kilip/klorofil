<?php

/*
 * This file is part of the Demo Project.
 *
 * (c) Anthonius Munthi <me@itstoni.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Demo\UserBundle\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Security\Core\Exception\BadCredentialsException;
use FOS\RestBundle\Controller\Annotations as Rest;

class TokenController extends Controller
{
    /**
     * @Rest\Post("/token",name="api_auth_tokens")
     */
    public function tokenAuthentication(Request $request)
    {
        $username = $request->get('username');
        $password = $request->get('password');

        $user = $this->get('fos_user.user_manager')
            ->findUserByUsernameOrEmail($username)
        ;

        $invalidUser = [
            'errors' => [
                '_error' => 'Either your username or password is invalid.',
            ]
        ];
        if(!$user){
            return new JsonResponse($invalidUser,Response::HTTP_UNAUTHORIZED);
        }

        $isValid = $this->get('security.password_encoder')
            ->isPasswordValid($user,$password)
        ;
        if(!$isValid){
            return new JsonResponse($invalidUser,Response::HTTP_UNAUTHORIZED);
        }
        $token = $this->get('lexik_jwt_authentication.encoder')
            ->encode([
                'username' => $user->getUsername(),
                'exp' => time() + 3600,
                'roles' => $user->getRoles(),
                'email' => $user->getEmail()
            ])
        ;

        return new JsonResponse(['token' => $token],Response::HTTP_OK);
    }
}

