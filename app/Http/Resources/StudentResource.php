<?php

namespace App\Http\Resources;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class StudentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [

        'id' => $this->id,
        'name' => $this->name,
        'last_name' => $this->last_name,
        'father_name' => $this->father_name,
        'grandfather_name' => $this->grandfather_name,
        'original_province' => $this->original_province,
        'original_district' => $this-> original_district,
        'original_village' => $this->original_village,
        'current_province' => $this->current_province,
        'current_district' => $this->current_district,
        'current_village' => $this->current_village,
        'phone_number' => $this->phone_number,
        'nic_number' => $this->nic_number,
        'birth_date' => $this->birth_date,
        'school_name'=>$this->school_name,
        'school_graduation_year'=>$this->school_graduation_year,
        'kankor_id'=>$this->kankor_id,
        'kankor_marks'=>$this->kankor_marks,
        'admission_date'=>$this->admission_date,
        'department_id'=>$this->department_id,
        'department' => new DepartmentResource($this->department),
        'user_id' => $this->user_id,
        'user' => new UserResource($this->user),
       // 'attendence' => AttendenceResource::collection($this->whenLoaded('attendence')),
        'current_semester' => $this->current_semester,
        'identity_cart_number' => $this->identity_cart_number,
        'number_maktob_sent_exam_commettee'=>$this->number_maktob_sent_exam_commettee,
        'number_maktob_tajeel'=>$this->number_maktob_tajeel,
        'number_maktob_monfak'=>$this->number_maktob_monfak,
        'number_maktob_lailia'=>$this->number_maktob_lailia,
        'image_path'=>$this->image_path ? Storage::url($this->image_path) : '',



        ];

    }
}
