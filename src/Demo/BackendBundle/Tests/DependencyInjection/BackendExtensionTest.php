<?php

/*
 * This file is part of the Demo Project.
 *
 * (c) Anthonius Munthi <me@itstoni.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Demo\BackendBundle\Tests\DependencyInjection;

use Demo\BackendBundle\DependencyInjection\BackendExtension;
use Matthias\SymfonyDependencyInjectionTest\PhpUnit\AbstractExtensionTestCase;
use Symfony\Component\DependencyInjection\Extension\ExtensionInterface;

/**
 * Class BackendExtensionTest
 * @package Demo\BackendBundle\Tests\DependencyInjection
 */
class BackendExtensionTest extends AbstractExtensionTestCase
{
    public function testLoad()
    {
        $this->load();

        $this->assertContainerBuilderHasParameter('test.client.parameters');
        $this->assertContainerBuilderHasService('test.client.history');
        $this->assertContainerBuilderHasService('test.client');
    }

    protected function getContainerExtensions()
    {
        return [new BackendExtension()];
    }
}
