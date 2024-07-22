<?php

namespace App\Http\Resources;

use App\Models\Semester;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AttendenceResource extends JsonResource
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
            'subject_id' => $this->subject_id,
            'subject' => new SubjectResource($this->whenLoaded('subject')),
            'semester_id' => $this->semester,
            'semester' => new SemesterResource($this->whenLoaded('semester')),
            'attendence_year' => $this->attendence_year,
            'total_hours' => $this->total_hours,
            'absent_hours' => $this->absent_hours,

        ];
    }
}
