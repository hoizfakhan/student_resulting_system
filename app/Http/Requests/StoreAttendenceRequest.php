<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAttendenceRequest extends FormRequest
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
        'attendances' => ['required', 'array'],
        'attendances.*.student_id' => ['required', 'integer'],
        'attendances.*.total_hours' => ['required', 'integer', 'min:0', 'max:100'],
        'attendances.*.absent_hours' => ['required', 'integer', 'min:0','max:100'],

        ];
    }
}
