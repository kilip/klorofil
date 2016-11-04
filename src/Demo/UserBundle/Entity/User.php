<?php

namespace Demo\UserBundle\Entity;

use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;
use Hateoas\Configuration\Annotation as Hateoas;

/**
 * Class User
 *
 * @ORM\Entity
 * @ORM\Table(name="security_user")
 * @Hateoas\Relation(
 *     "self",
 *     href=@Hateoas\Route(
 *          "api_user_get",
 *          parameters={"username" = "expr(object.getUsername())"}
 *     )
 * )
 * @package Demo\UserBundle\Entity
 */
class User extends BaseUser
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(type="string", length=255,nullable=true)
     * @var string
     */
    protected $fullname;

    /**
     * @ORM\Column(type="string",length=255,nullable=true)
     * @var string
     */
    protected $avatar;

    public function __construct()
    {
        parent::__construct();
        $this->setEnabled(true);
        $this->setAvatar('http://lorempixel.com/150/150/people/');
    }

    /**
     * @return mixed
     */
    public function getFullname()
    {
        return $this->fullname;
    }

    /**
     * @param mixed $fullname
     */
    public function setFullname($fullname)
    {
        $this->fullname = $fullname;
    }

    /**
     * @return string
     */
    public function getAvatar()
    {
        return $this->avatar;
    }

    /**
     * @param string $avatar
     */
    public function setAvatar($avatar)
    {
        $this->avatar = $avatar;
    }
}