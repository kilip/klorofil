<?php

/*
 * This file is part of the Demo Project.
 *
 * (c) Anthonius Munthi <me@itstoni.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Demo\UserBundle\Tests\Form;

use Demo\UserBundle\Entity\User;
use Demo\UserBundle\Form\RegistrationType;
use Symfony\Component\Form\Test\TypeTestCase;

/**
 * Class RegistrationTypeTest
 *
 * @package Demo\UserBundle\Tests\Form
 *
 * @coversDefaultClass Demo\UserBundle\Form\RegistrationType
 */
class RegistrationTypeTest extends TypeTestCase
{
    public function testPasswordAndUsernameNotExistsInProfileMode()
    {
        $entity = new User();
        $form = $this->factory->create(RegistrationType::class,$entity,[
            'validation_groups' => ['Profile']
        ]);

        $this->assertFalse($form->has('plainPassword'));
        $this->assertFalse($form->has('username'));
        $this->assertFalse($form->has('email'));
    }

    public function testSubmitValidData()
    {
        $formData = [
            'fullname' => 'Test Username',
            'email' => 'test@email.com',
            'username' => 'test_user',
            'plainPassword' => [
                'first' => 'test',
                'second' => 'test'
            ]
        ];

        $entity = new User();
        $form = $this->factory->create(RegistrationType::class,$entity);
        $form->submit($formData);

        /* @var User $data */
        $data = $form->getData();
        $this->assertTrue($form->isSynchronized());
        $this->assertEquals($formData['username'], $data->getUsername());
        $this->assertEquals($formData['fullname'],$data->getFullname());
        $this->assertEquals($formData['email'],$data->getEmail());
    }
}
