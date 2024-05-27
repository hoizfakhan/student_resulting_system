<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ManagerResource extends JsonResource
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
            'name' =>$this->name,
            'email'=>$this->email,
            'faculty_id'=>$this->faculty_id,
            'faculty' => new FacultyResource($this->faculty),



        ];
    }
}
