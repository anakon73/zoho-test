<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateDealRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'deal_name' => 'required|string|max:255',
            'deal_stage' => 'required|string|max:255',
            'account_id' => 'required|string|max:255',
        ];
    }
}
