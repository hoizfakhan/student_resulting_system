<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateStudentRequest extends FormRequest
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
            'last_name' => ['required','string','max:255'],
            'father_name' => ['required','string','max:255'],
            'grandfather_name' => ['nullable','string','max:255'],
            'original_province' => ['required','string','max:255'],
            'original_district' => ['required','string','max:255'],
            'original_village' => ['required','string','max:255'],
            'current_province' => ['required','string','max:255'],
            'current_district' => ['required','string','max:255'],
            'current_village' => ['required','string','max:255'],
            'phone_number' => ['required','digits:10','numeric'],
            'nic_number' => ['required','string','max:255'],
            'birth_date' => ['nullable','date'],
            'school_name' => ['nullable','string','max:255'],
            'school_graduation_year' => ['nullable','string','max:255'],
            'kankor_id' => ['required','integer'],
            'kankor_marks' => ['required','integer'],
            'admission_date' => ['required','date'],
            'department_id' => ['required','integer'],
            'current_semester' => ['required','integer','between:1,10'],
            'identity_cart_number' => ['nullable','string','max:255'],
            'number_maktob_sent_exam_commettee' => ['nullable','integer'],
            'number_maktob_tajeel' => ['nullable','integer'],
            'number_maktob_monfak' => ['nullable','integer'],
            'number_maktob_lailia' => ['nullable','integer'],
            'image' => ['nullable','image'],
        ];
    }
}
