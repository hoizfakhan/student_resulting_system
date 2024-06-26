<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DepartmentResource extends JsonResource
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
            'head' => $this->head,
            'faculty_id' => $this->faculty_id,
            'faculty' => new FacultyResource($this->faculty),
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),


        ];
    }
}
