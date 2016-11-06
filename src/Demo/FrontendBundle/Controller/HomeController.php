<?php

namespace Demo\FrontendBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\Finder\Finder;
use Symfony\Component\HttpFoundation\Response;

class HomeController extends Controller
{
    /**
     * @Route("/",name="homepage")
     * @Method("GET")
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function indexAction()
    {
        $distDir = realpath($this->getParameter('kernel.root_dir').'/../web/dist');

        $finder = Finder::create()
            ->in($distDir)
            ->name('main*.css')
            ->name('main*.js')
        ;

        $mainCss = $mainScript = '';
        foreach ($finder->files() as $file) {
            if ('css' == $file->getExtension()) {
                $mainCss = 'dist/'.$file->getRelativePathname();
            } else {
                $mainScript = 'dist/'.$file->getRelativePathname();
            }
        }
        return $this->render('@Frontend/main/index.html.twig', [
            'main_script' => $mainScript,
            'main_css' => $mainCss,
        ]);
    }
}
