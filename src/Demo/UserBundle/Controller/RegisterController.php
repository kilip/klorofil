<?php

namespace Demo\UserBundle\Controller;

use Demo\UserBundle\Entity\User;
use Demo\UserBundle\Form\RegistrationType;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;

class RegisterController extends FOSRestController
{
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
     * @Rest\Post("/register",name="api_user_create")
     */
    public function createAction(Request $request)
    {
        $user = new User();
        $data = json_decode($request->getContent(), true);
        $form = $this->createForm(RegistrationType::class, $user);
        $form->submit($data);
        if (!$form->isValid()) {
            $data = [
                'errors' => $this->getErrorsFromForm($form),
                'type' => 'validation_error',
                'title' => 'There was a validation error',
                'data' => $form->getData()
            ];
            return $this->view($data, Response::HTTP_BAD_REQUEST);
        }

        $manager = $this->get('fos_user.user_manager');
        $manager->updateUser($user);
        $view = $this->view($user, Response::HTTP_CREATED);
        $view->getResponse()->headers->set('Location', $this->generateUrl('api_user_get', ['username' => $user->getUsername()]));
        return $view;
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
                    if (!in_array($childForm->getName(), $errors)) {
                        $errors[$childForm->getName()] = $childErrors;
                    }
                }
            }
        }
        return $errors;
    }
}
