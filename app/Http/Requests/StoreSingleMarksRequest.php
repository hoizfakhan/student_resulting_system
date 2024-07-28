<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSingleMarksRequest extends FormRequest
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

            'student_id' => ['required','integer'],
            'chance' => ['required','integer'],
            'homework' => ['required','numeric','min:0','max:100'],
            'class_activity' => ['required','numeric','min:0','max:100'],
            'midterm' => ['required','numeric','min:0','max:100'],
            'final' => ['required','numeric','min:0','max:100'],
        ];
    }
}
