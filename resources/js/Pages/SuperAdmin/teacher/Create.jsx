
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Create({auth}){

    const {facultys} = usePage().props;
    const { get } = useForm();
    const [facultyid,setFacultyid] = useState('');
    const [departments,setDepartments] = useState(2);

    console.log(departments);

    useEffect(() => {

      if(facultyid){

           Inertia.get('/alldepartments',{

             onSuccess:(response) => {
              console.log(response.data.departments);
              console.log("hi")
              setDepartments(3);
             }

           });

      } else{
        setDepartments([]);
        console.log("hey");
      }
    },[facultyid]);



 return (

  <AuthenticatedLayout
   user={auth.user}
   header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Add New Teacher</h2>}
  >

    <Head title="Add Teacher" />
    <div className="py-12">
      <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
       <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
        <div className='mt-4 ms-5'><p className='lead text-gray-600'>Add Teacher </p></div>
                         <form

                           className='mb-5 mt-2 ms-4 me-4 w-50 p-3 sm:p-8 bg-white dark:bg-gray-800 '
                          >
                        <div className='mt-3'>
                          <InputLabel htmlFor="faculty">Faculty: <span className='text-red-300 text-lg'>*</span></InputLabel>
                           <SelectInput
                             id="faculty"
                             name="faculty"
                             value={facultyid}
                             className="form-control"
                             onChange={(e) => setFacultyid(e.target.value)}

                             >
                             <option value="">Select Faculty</option>
                              {facultys.data.map((faculty) => (

                              <option value={faculty.id} key={faculty.id}>{faculty.name}</option>

                               ))}

                           </SelectInput>
                           <InputError message="" className='mt-2'/>
                           <InputError/>
                          </div>

                          <InputLabel htmlFor="department"> Department: <span className='text-red-300 text-lg'>*</span></InputLabel>
                           <SelectInput
                              id="department"
                              className="form-control mt-1"

                           >
                            <option vlaue="">Select department</option>

                             {departments.length > 0 ? (

                                  departments.data.map((department) => (
                                  <option value={department.id} key={department.id}>{department.name}</option>

                                ))

                              ) : (

                                <option value="">Select a faculty fisrt</option>
                               )}

                           </SelectInput>


                           <div className='mt-3'>
                          <InputLabel htmlFor="teacher_name"> Name: <span className='text-red-300 text-lg'>*</span></InputLabel>
                            <TextInput  className='form-control mt-1'
                               id="teacher_name"
                               type="text"
                               name="name"

                              isFocused={true}

                              />
                              <InputError message="" className='mt-2'/>
                          </div>

                          <div className='mt-3'>
                           <InputLabel htmlFor="last_name">Last Name:</InputLabel>
                           <TextInput className='form-control mt-1'
                             id="last_name"
                             type="text"
                             name="last_name"



                           />
                             <InputError message="" className='mt-2'/>
                          </div>

                          <div className='mt-3'>
                           <InputLabel htmlFor="father_name">Father Name: <span className='text-red-300 text-lg'>*</span></InputLabel>
                           <TextInput className='form-control mt-1'
                             id="father_name"
                             type="text"
                             name="father_name"



                           />
                             <InputError message="" className='mt-2'/>
                          </div>

                          <div className='mt-3'>
                           <InputLabel htmlFor="phone_number">Phone: <span className='text-red-300 text-lg'>*</span></InputLabel>
                           <TextInput className='form-control mt-1'
                             id="phone_number"
                             type="text"
                             name="phone"



                           />
                             <InputError message="" className='mt-2'/>
                          </div>
                           <div className='mt-4 text-right'>
                             <Link
                               href={route("teacher.index")}
                               className='bg-gray-300 py-1 px-3 text-gray-800 rounded  transition-all hover:bg-gray-200 mr-2'
                              >
                               Cancel
                              </Link>
                              <button
                               className='bg-emerald-500 py-1 px-3 text-white rounded transition-all hover:bg-emerald-600'

                              >
                                Submit
                              </button>
                           </div>
                        </form>
      </div>
     </div>
     </div>


  </AuthenticatedLayout>

 );

}

