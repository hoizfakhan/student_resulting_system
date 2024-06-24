<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TeacherSubjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [

         'teacher_id' => $this->teacher_id,
         'teacher' =>  $this->teacher ? new TeacherResource($this->teacher) : null,
         'faculty_id' => $this->faculty_id,
         'faculty' =>  $this->faculty ? new FacultyResource($this->faculty) : null,
         'department_id' => $this->department_id,
         'department' =>  $this->department ? new DepartmentResource($this->department) : null,
         'semester' => $this->semester,
         'subject_id' => $this->subject_id,
         'subject' => $this->subject ? new SubjectResource($this->subject) : null,
         'status' => $this->status,

        ];
    }
}
