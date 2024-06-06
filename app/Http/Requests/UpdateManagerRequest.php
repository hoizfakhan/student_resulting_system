<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Routing\Route;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password as RulesPassword;

class UpdateManagerRequest extends FormRequest
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
              $manager = $this->route("manager");

        return [

                'name'=> ["required","string","max:255"],
                'email'=> ["required","string","email",
                  Rule::unique('users')->ignore($manager->id),

                    ],
                'password' => [
                  'nullable',
                  'confirmed',
                  RulesPassword::min(8)->letters()->symbols(),
                ],
                'faculty_id'=> ['nullable'],
        ];
    }
}
