<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GraduatedStudentsResource extends JsonResource
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
             'graduated_date' => $this->graduated_date,
             'education_degree' => $this->education_degree,
             'monograph_title' => $this->monograph_title,
             'monograph_defence_date' => $this->monograph_defence_date,

            'department' => new DepartmentResource($this->whenLoaded('student.department')),


        ];
    }
}
