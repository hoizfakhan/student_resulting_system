<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password as RulesPassword;

class StoreTeacherAccountRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [

            'name'=> ["required","string","max:255"],
            'email'=> ["required","string","email","unique:users,email"],
            'password' => [
                "required",
                "confirmed",
                RulesPassword::min(8)->letters()->symbols(),
            ],
            'faculty_id' => ['nullable'],
            'status'=>['required',Rule::in(['active','inactive'])],
        ];
    }
}
