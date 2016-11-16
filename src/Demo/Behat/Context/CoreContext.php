<?php

/*
 * This file is part of the Demo Project.
 *
 * (c) Anthonius Munthi <me@itstoni.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Demo\Behat\Context;


use Behat\Mink\Mink;
use Behat\MinkExtension\Context\MinkAwareContext;

class CoreContext implements MinkAwareContext
{
    /**
     * @var Mink
     */
    private $mink;

    private $minkParameters;

    public function setMink(Mink $mink)
    {
        $this->mink = $mink;
    }

    public function setMinkParameters(array $parameters)
    {
        $this->minkParameters = $parameters;
    }


    /**
     * @When I wait ajax to finish
     */
    public function iWaitAjaxCall()
    {
        $this->mink->getSession()->wait(5000, '(typeof(jQuery)=="undefined" || (0 === jQuery.active && 0 === jQuery(\':animated\').length))');
        sleep(1);
    }

}