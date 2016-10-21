<?php

/*
 * This file is part of the Demo Project.
 *
 * (c) Anthonius Munthi <me@itstoni.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Demo\UserBundle\Service;

use Demo\UserBundle\Entity\User;
use FOS\UserBundle\Doctrine\UserManager as BaseUserManager;
use Hateoas\Configuration\Route;
use Hateoas\Representation\Factory\PagerfantaFactory;
use Pagerfanta\Adapter\DoctrineORMAdapter;
use Pagerfanta\Pagerfanta;

class UserManager extends BaseUserManager
{
    /**
     * @param   array       $sorting
     * @return  Pagerfanta
     */
    public function getListPager($sorting=array('fullname'=>'asc'))
    {
        /* @var \Doctrine\ORM\QueryBuilder $qb */
        $qb = $this->objectManager->createQueryBuilder();
        $qb
            ->select('U')
            ->from('UserBundle:User','U')
        ;
        $fields = $this->objectManager->getClassMetadata(User::class)->getFieldNames();
        foreach($fields as $field){
            if(isset($sorting[$field])){
                $direction = ($sorting[$field] == 'asc') ? 'asc':'desc';
                $qb->addOrderBy('U.'.$field,$direction);
            }
        }
        $adapter = new DoctrineORMAdapter($qb,'U.id');
        $pager = new Pagerfanta($adapter);
        return $pager;
    }
}