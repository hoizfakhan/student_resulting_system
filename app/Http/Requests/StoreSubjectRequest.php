<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreSubjectRequest extends FormRequest
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

            'name' => ['required','string','max:255'],
            'faculty_id' => ['nullable','integer'],
            'department_id' => ['nullable','integer'],
            'semester' => ['nullable','integer'],
            'subject_type' => ['required','string',Rule::in(['core','project','basic','general'])],
            'credit' => ['required','integer'],
            'practical_credit' => ['nullable','integer'],
            'therical_credit' => ['nullable','integer'],

        ];
    }
}
