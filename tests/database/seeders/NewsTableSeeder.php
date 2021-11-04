<?php

namespace Database\Seeders;

use App\Models;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;

class NewsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        foreach (range(1, 310) as $index) {
            Models\News::create([
                'name' => $faker->name,
                'text' => $faker->text,
                'created_at' => $faker->date,
            ]);
        }
    }
}
