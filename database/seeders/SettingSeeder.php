<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        $pairs = [
            'site_name' => 'ThePantamiTimes',
            'tagline' => 'News, Analysis, and Exclusive Stories',
            'accent_color' => '#D4A017',
            'theme_default' => 'light',
        ];

        foreach ($pairs as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }
    }
}
