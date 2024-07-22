<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DepartmentSemesterResource extends JsonResource
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
            'department_id' => $this->department_id,
            'department' =>  $this->department ? new DepartmentResource($this->department) : null,
            'semester_id' => $this->semester_id,
            'semester' => $this->semester ? new SemesterResource($this->semester) : null,

        ];
    }
}
