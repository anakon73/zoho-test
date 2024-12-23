<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateAccountRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'account_name' => 'required|string|max:255',
            'account_website' => 'nullable|url',
            'account_phone' => 'nullable|string|max:20',
        ];
    }
}
