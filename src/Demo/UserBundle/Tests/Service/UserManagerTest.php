<?php

/*
 * This file is part of the Demo Project.
 *
 * (c) Anthonius Munthi <me@itstoni.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Demo\UserBundle\Tests\Service;


use Demo\BackendBundle\Test\ApiTestCase;

class UserManagerTest extends ApiTestCase
{
    public function testGetListPager()
    {
        $service = $this->getContainer()->get('demo.user.manager');
        $pager = $service->getListPager();
        $this->assertTrue($pager->getNbResults() > 0);
    }
}
