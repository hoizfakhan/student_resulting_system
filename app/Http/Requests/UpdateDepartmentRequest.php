<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateDepartmentRequest extends FormRequest
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
         $department = $this->route("department");



        return [
            'name' => ['required','string','max:255',
              Rule::unique('departments')->ignore($department->id),
             ],
            'head' => ['nullable','string','max:255'],
            'faculty_id' => ['required'],
        ];
    }
}
