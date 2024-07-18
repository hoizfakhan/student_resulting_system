<?php

namespace App\Http\Resources;

use App\Models\Semester;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AssignSubjectResource extends JsonResource
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
         'subject_id' => $this->subject_id,
         'subject' => $this->subject ? new SubjectResource($this->subject) : null,
         'faculty_id' => $this->faculty_id,
         'faculty' =>  $this->faculty ? new FacultyResource($this->faculty) : null,
         'department_id' => $this->department_id,
         'department' =>  $this->department ? new DepartmentResource($this->department) : null,
         'semester_id' => $this->semester_id,
         'semester' =>  $this->semester ? new SemesterReource($this->semester) : null,


        ];
    }
}
