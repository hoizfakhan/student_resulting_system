<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMarksRequest extends FormRequest
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

        'marks' => ['required', 'array'],
        'marks.*.student_id' => ['required', 'integer'],
        'marks.*.homework' => ['nullable', 'integer', 'min:0', 'max:100'],
        'marks.*.class_activity' => ['nullable','required', 'integer', 'min:0','max:100'],
        'marks.*.midterm' => ['nullable', 'integer', 'min:0','max:100'],
        'marks.*.final' => ['required', 'integer', 'min:0','max:100'],
        ];
    }
}
