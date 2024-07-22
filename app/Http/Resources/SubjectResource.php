<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SubjectResource extends JsonResource
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
         'subject_type' => $this->subject_type,
         'credit' => $this->credit,
         'practical_credit' => $this->practical_credit,
         'therical_credit' => $this->therical_credit,


        // Load faculties, departments, and semesters through assignSubjects pivot
        'facultys' => $this->whenLoaded('assignSubjects', function () {
            return $this->assignSubjects->map(function ($assignSubject) {
                return new FacultyResource($assignSubject->faculty);
            });
        }),
        'departments' => $this->whenLoaded('assignSubjects', function () {
            return $this->assignSubjects->map(function ($assignSubject) {
                return new DepartmentResource($assignSubject->department);
            });
        }),
        'semesters' => $this->whenLoaded('assignSubjects', function () {
            return $this->assignSubjects->map(function ($assignSubject) {
                return new SemesterResource($assignSubject->semester);
            });
        }),

        // Alternatively, you can load teacherSubjects if needed
        'teacherSubjects' => $this->whenLoaded('teacherSubjects', function () {
            return $this->teacherSubjects->map(function ($teacherSubject) {
                return [
                    'teacher_id' => $teacherSubject->id,
                    'semester_id' => $teacherSubject->pivot->semester_id,
                    'department_id' => $teacherSubject->pivot->department_id,
                    'faculty_id' => $teacherSubject->pivot->faculty_id,
                ];
            });
        }),


        ];
    }
}
