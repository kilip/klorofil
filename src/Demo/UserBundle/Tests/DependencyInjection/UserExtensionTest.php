<?php
/*
 * This file is part of the Demo Project.
 *
 * (c) Anthonius Munthi <me@itstoni.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */


namespace Demo\UserBundle\Tests\DependencyInjection;

use Demo\UserBundle\DependencyInjection\UserExtension;
use Matthias\SymfonyDependencyInjectionTest\PhpUnit\AbstractExtensionTestCase;
use Symfony\Component\DependencyInjection\Extension\ExtensionInterface;

/**
 * Class UserExtensionTest
 *
 * @package Demo\UserBundle\Tests\DependencyInjection
 */
class UserExtensionTest extends AbstractExtensionTestCase
{
    public function testLoad()
    {
        $this->setParameter('kernel.environment','dev');
        $this->load();
        $this->assertContainerBuilderHasService('demo.user.manager');
        $this->assertContainerBuilderNotHasService('demo.test.user_helper');
        $this->assertContainerBuilderHasServiceDefinitionWithArgument('demo.user.manager',0,'fos_user.util.password_updater');

        $this->setParameter('kernel.environment','test');
        $this->load();
        $this->assertContainerBuilderHasService('demo.test.user_helper');
    }

    /**
     * Return an array of container extensions you need to be registered for each test (usually just the container
     * extension you are testing.
     *
     * @return ExtensionInterface[]
     */
    protected function getContainerExtensions()
    {
        return [
            new UserExtension()
        ];
    }
}
