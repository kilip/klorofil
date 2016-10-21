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
     * @Rest\Post("/login_check",name="api_login_check")
     */
    public function tokenAuthentication(Request $request)
    {
        $username = $request->get('username');
        $password = $request->get('password');

        $user = $this->get('fos_user.user_manager')
            ->findUserByUsername($username)
        ;

        if(!$user){
            throw new NotFoundHttpException('User '.$username. ' not found');
        }

        $isValid = $this->get('security.password_encoder')
            ->isPasswordValid($user,$password)
        ;
        if(!$isValid){
            throw new BadCredentialsException('Invalid password',Response::HTTP_UNAUTHORIZED);
        }
        $token = $this->get('lexik_jwt_authentication.encoder')
            ->encode([
                'username' => $user->getUsername(),
                'exp' => time() + 3600,
            ])
        ;

        return new JsonResponse(['token' => $token],Response::HTTP_OK);
    }
}

