<?php

namespace App\Http\Resources;

use App\Models\Department;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TeacherResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [

              'id'  => $this->id,
              'name' => $this->name,
              'last_name' => $this->last_name,
              'father_name' => $this->father_name,
              'phone' => $this->phone,
              'department_id' => $this->department_id,
              'department' => new DepartmentResource($this->department),
              'user_id' => $this->user_id,
              'user' => new UserResource($this->user),


        ];
    }
}
