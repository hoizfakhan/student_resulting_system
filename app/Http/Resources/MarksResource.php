<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MarksResource extends JsonResource
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
            'chance' => $this->chance,
            'marks_year' => $this->marks_year,
            'home_work' => $this->home_work_marks,
            'class_activity' => $this->attendence_and_class_activity_marks,
            'midterm' => $this->midterm_marks,
            'final' => $this->final_marks,

        ];
    }
}
