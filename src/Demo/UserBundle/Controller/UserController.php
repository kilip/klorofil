<?php

namespace Demo\UserBundle\Controller;

use Demo\UserBundle\Entity\User;
use Demo\UserBundle\Form\RegistrationType;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use Hateoas\Configuration\Route;
use Hateoas\Representation\Factory\PagerfantaFactory;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;

/**
 * Class UserController
 * @package Demo\UserBundle\Controller
 */
class UserController extends FOSRestController
{
    /**
     * Get all existing user
     *
     * @ApiDoc(
     *     section = "User",
     *     description = "Get all users",
     *     resource = true,
     *     filters={
     *         {"name"="sorting","dataType"="string","pattern"="(username|fullname) ASC|DESC)"}
     *     }
     * )
     * @Rest\Get("/users",name="api_user_list")
     * @Rest\View()
     * @param Request $request
     * @return mixed
     */
    public function listAction(Request $request)
    {
        $page = $request->get('page',1);
        $pager = $this->get('demo.user.manager')->getListPager($request->get('sorting',['fullname'=>'asc']));
        $factory = new PagerfantaFactory();
        $route = new Route('api_user_list',['limit' => 10,'page' => $page]);
        return $factory->createRepresentation($pager,$route);
    }

    /**
     * Get a single user
     *
     * @ApiDoc(
     *     section = "User",
     *     output = "Demo\UserBundle\Entity\User",
     *     description="Get a single user by username",
     *     requirements = {
     *         {
     *             "name" = "username",
     *             "dataType" = "string",
     *             "description" = "Username to get",
     *             "requirement" = "\w+"
     *         }
     *     },
     *     statusCode = {
     *         200 = "Returned when user exists",
     *         404 = "Returned when user not found"
     *
     *     }
     * )
     * @Rest\Get("/users/{username}",name="api_user_get")
     * @Rest\View()
     */
    public function getAction($username)
    {
        $user = $this->get('fos_user.user_manager')->findUserByUsername($username);
        $view = $this->view($user,Response::HTTP_OK);

        return $view;
    }

    /**
     * Create a new user
     *
     * @ApiDoc(
     *     section = "User",
     *     description = "Create a new user",
     *     input = "Demo\UserBundle\Form\RegistrationType",
     *     output = "Demo\UserBundle\Entity\User",
     *     statusCodes = {
     *         200 = "Returned when successfull",
     *         400 = "Returned when validation failed"
     *     }
     * )
     * @Rest\Post("/users",name="api_user_create")
     */
    public function createAction(Request $request)
    {
        $user = new User();
        $data = json_decode($request->getContent(),true);
        $form = $this->createForm(RegistrationType::class,$user);
        $form->submit($data);
        if(!$form->isValid()){
            $data = [
                'errors' => $this->getErrorsFromForm($form),
                'type' => 'validation_error',
                'title' => 'There was a validation error',
                'data' => $form->getData()
            ];
            return $this->view($data,Response::HTTP_BAD_REQUEST);
        }

        $manager = $this->get('fos_user.user_manager');
        $manager->updateUser($user);
        $view = $this->view($user,Response::HTTP_CREATED);
        $view->getResponse()->headers->set('Location',$this->generateUrl('api_user_get',['username' => $user->getUsername()]));
        return $view;
    }

    /**
     * Update existing user
     *
     * @ApiDoc(
     *     section = "User",
     *     description = "Update user information",
     *     input = "Demo\UserBundle\Form\RegistrationType",
     *     output = "Demo\UserBundle\Entity\User",
     *     statusCodes = {
     *         200 = "Returned when successfull",
     *         400 = "Returned when validation failed"
     *     }
     * )
     * @Rest\Patch("/users",name="api_user_update")
     */
    public function updateAction()
    {

    }

    /**
     * Removes user from database
     *
     * @ApiDoc(
     *     section = "User",
     *     description = "Delete user",
     *     output = "Demo\UserBundle\Entity\User",
     *     statusCodes = {
     *         200 = "Returned when delete successfull",
     *         400 = "Returned when delete failed"
     *     }
     * )
     * @Rest\Delete("/users",name="api_user_delete")
     */
    public function deleteAction()
    {

    }

    private function getErrorsFromForm(FormInterface $form)
    {
        $errors = array();
        foreach ($form->getErrors() as $error) {
            $errors[] = $error->getMessage();
        }
        foreach ($form->all() as $childForm) {
            if ($childForm instanceof FormInterface) {
                if ($childErrors = $this->getErrorsFromForm($childForm)) {
                    $errors[$childForm->getName()] = $childErrors;
                }
            }
        }
        return $errors;
    }
}
