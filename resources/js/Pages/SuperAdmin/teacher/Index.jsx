import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";

export default function Index({auth}){
     const {facultys} = usePage().props;

 return (

  <AuthenticatedLayout
  user={auth.user}
  header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Teacher</h2>}

  >

    <Head title="Teacher" />

    <div className="py-12">
      <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
       <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
       <div className='row'>
            <div className='col-md-6'>
              <div className="p-6 text-gray-900 dark:text-gray-100 flex text-xl">Teacher List</div>
            </div>

             <div className='col-md-6 text-end '>
              <div className='me-3 mt-4'>
              <Link
                 href={route("teacher.create")}
                 className="bg-emerald-500 py-1  px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                >
                Add New Teacher
            </Link>
            </div>
            </div>
            </div>
             <div>

                <form
                  className='mb-5 mt-2 ms-4 me-4 w-50 p-3 sm:p-8 bg-white dark:bg-gray-800 '
                 >
                       <div class="row">
                        <div class='col-md-6 col-12'>
                          <InputLabel htmlFor="faculty" className="mb-2 fw-bold">Faculty</InputLabel>
                           <SelectInput
                             id="faculty"
                             name="faculty"
                             className="form-control"

                             >

                             <option value="">Select Faculty</option>
                             {facultys.data.map((faculty) => (


                             <option value={faculty.id} key={faculty.id}>{faculty.name}</option>

                             ))}

                           </SelectInput>
                           <InputError message="" className='mt-2'/>
                           <InputError/>
                          </div>
                          <div class="col-md-6 col-12">
                          <InputLabel htmlFor="department" className="mb-2 fw-bold"> Department</InputLabel>
                           <SelectInput
                              id="department"
                              className="form-control"

                           >
                            <option vlaue="">Select department</option>
                           </SelectInput>
                           </div>

                          </div>

                     </form>
           </div>
      </div>
     </div>
     </div>


  </AuthenticatedLayout>





 );

}

