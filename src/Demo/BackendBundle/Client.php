<?php

/*
 * This file is part of the Demo Project.
 *
 * (c) Anthonius Munthi <me@itstoni.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Demo\BackendBundle;

use Symfony\Bundle\FrameworkBundle\Client as BaseClient;
use Symfony\Component\BrowserKit\CookieJar;
use Symfony\Component\BrowserKit\History;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Bridge\PsrHttpMessage\Factory\DiactorosFactory;

class Client extends BaseClient
{
    public function __construct(KernelInterface $kernel, array $server, History $history, CookieJar $cookieJar)
    {
        parent::__construct($kernel, $server, $history, $cookieJar);
    }

    /**
     * @return \Psr\Http\Message\ResponseInterface|\Zend\Diactoros\Response
     */
    public function getResponse()
    {
        $factory = new DiactorosFactory();
        $response = parent::getResponse();
        return $factory->createResponse($response);
    }
}