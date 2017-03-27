<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class DemoServe extends Command
{
    protected $signature = 'demo:serve';
    protected $description = 'Shortcut for demo, then serve. Use DEMO_HOST env for host address (localhost by default)';

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
