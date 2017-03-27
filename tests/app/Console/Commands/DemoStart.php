<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class DemoStart extends Command
{
    protected $signature = 'demo:serve';

    protected $description = 'Start web server for demo project DJEM 3';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->call('demo');
        $this->call('serve', [
            '--host' => env('DEMO_HOST', 'localhost'),
        ]);
    }
}
