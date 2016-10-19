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


use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class DemoTestCase extends WebTestCase
{
    /**
     * @param $id
     * @return mixed
     */
    public function getService($id)
    {
        if(is_null(static::$kernel->getContainer())){
            static::bootKernel();
        }
        return static::$kernel->getContainer()->get($id);
    }
}