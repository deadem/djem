<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class DemoInit extends Command
{
    protected $signature = 'demo';
    protected $description = 'Demo project initialization';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->call('migrate:refresh');
        $this->call('db:seed');
    }
}
