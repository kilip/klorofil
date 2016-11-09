<?php

namespace Spec\Demo\UserBundle\Entity;

use Demo\UserBundle\Entity\User;
use PhpSpec\ObjectBehavior;
use Prophecy\Argument;

class UserSpec extends ObjectBehavior
{
    function it_is_initializable()
    {
        $this->shouldHaveType(User::class);
    }

    function its_fullname_should_be_mutable()
    {
        $this->setFullname('some')->shouldReturn($this);
        $this->getFullname()->shouldReturn('some');
    }

    function its_avatar_should_be_mutable()
    {
        $this->setAvatar('some')->shouldReturn($this);
        $this->getAvatar()->shouldReturn('some');
    }
}
