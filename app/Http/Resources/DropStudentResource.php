<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DropStudentResource extends JsonResource
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
            'student_id' => $this->student_id,
            'student' => new StudentResource($this->whenLoaded('student')),
            'semester_id' => $this->semester,
            'semester' => new SemesterResource($this->whenLoaded('semester')),
            'droped_year' => $this->droped_year,
            'drop_reason' => $this->drop_reason,
            'maktob_number' => $this->maktob_number,
            'department' => new DepartmentResource($this->whenLoaded('student.department')),


        ];
    }
}
