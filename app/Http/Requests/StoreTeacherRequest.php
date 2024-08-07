<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTeacherRequest extends FormRequest
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

            'department_id' => ['required','integer'],
            'name' => ['required','string','max:255'],
            'last_name' => ['nullable','string','max:255'],
            'father_name' => ['required','string','max:255'],
            'phone' => ['required','digits:10','numeric'],
            'user_id' => ['nullable','integer'],


        ];
    }
}
