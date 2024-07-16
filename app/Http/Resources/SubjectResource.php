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
         //'faculty_id' => $this->faculty_id,
         //'faculty' => new FacultyResource($this->faculty),
         //'department_id' => $this->department_id,
         //'department' => new DepartmentResource($this->department),
         //'semester' => $this->semester,
         'subject_type' => $this->subject_type,
         'credit' => $this->credit,
         'practical_credit' => $this->practical_credit,
         'therical_credit' => $this->therical_credit,

        ];
    }
}
