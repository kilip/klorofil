<?php

namespace Demo\FrontendBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Process\Process;

/**
 * Class FrontendInstallCommand
 * @package Demo\FrontendBundle\Command
 *
 * @codeCoverageIgnore
 */
class FrontendInstallCommand extends ContainerAwareCommand
{
    /**
     * {@inheritdoc}
     */
    protected function configure()
    {
        $this
            ->setName('frontend:install')
            ->setDescription('Hello PhpStorm');
    }

    /**
     * {@inheritdoc}
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $cwd = getcwd();
        chdir($cwd.'/frontend');

        $scripts = [
            'npm install',
            'npm install --only=dev',
            'npm run build'
        ];

        foreach ($scripts as $script) {
            try {
                $this->doProcess($script, $output);
            } catch (\Exception $e) {
                chdir($cwd);
                throw $e;
            }
        }
    }

    private function doProcess($script, OutputInterface $output)
    {
        $output->writeln('Processing frontend script: <info>'.$script.'</info>');
        $process = new Process($script);
        $process->setTimeout(180);
        $process->setIdleTimeout(180);
        $process->run(function($type, $buffer) use ($output){
            if (Process::OUT === $type) {
                $output->write('<info>'.$buffer.'</info>');
            } else { // $process::ERR === $type
                $output->write('<error>'.$buffer.'</error>');
            }
        });
    }
}
