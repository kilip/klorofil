<?php

namespace Demo\UserBundle\Controller;

use Demo\UserBundle\Entity\User;
use Demo\UserBundle\Form\RegistrationType;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class UserController extends FOSRestController
{
    /**
     * @Rest\Post("/user",name="user_create")
     */
    public function newAction(Request $request)
    {
        $user = new User();
        $data = json_decode($request->getContent(),true);
        $form = $this->createForm(RegistrationType::class,$user);
        $form->submit($data);
        if($form->isValid()){
            $manager = $this->get('fos_user.user_manager');
            $manager->updateUser($user);
            $view = $this->view($user,Response::HTTP_CREATED);
        }else{
            $data = [
                'errors' => $this->getErrorsFromForm($form),
                'type' => 'validation_error',
                'title' => 'There was a validation error',
                'data' => $form->getData()
            ];
            $view = $this->view($data,Response::HTTP_BAD_REQUEST);
        }

        return $view;
    }

    /**
     * @Rest\Get("/user/{name}",name="user_get")
     */
    public function showAction($name)
    {
        $user = $this->get('fos_user.user_manager')->findUserByUsername($name);
        $view = $this->view($user,Response::HTTP_OK);
        return $this->handleView($view);
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
