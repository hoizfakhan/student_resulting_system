<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateAssignSubjectRequest extends FormRequest
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

            'teacher_id' => ['required','integer'],
            'department_id' => ['required','integer'],
            'semester_id' => ['required','integer'],
            'subject_id' => ['required','integer'],
            'status' =>['required',Rule::in(['active','inactive'])],



        ];
    }
}
