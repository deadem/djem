<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputOption;

class DemoData extends Command
{
    protected $signature = 'demo';

    protected $description = 'Migrates for demo project DJEM 3';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        if (!env('APP_KEY', false)) {
            $this->call('key:generate');
        }
        $this->call('migrate:refresh');
        $this->call('db:seed');
    }
}
