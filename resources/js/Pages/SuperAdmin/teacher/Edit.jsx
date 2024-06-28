
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";

export default function Edit({auth,teacher,departments,teacherusers}){

  const {data,setData,post,errors,reset}=  useForm({

    department_id:teacher.data.department_id || "",
    name:teacher.data.name || "",
    last_name:teacher.data.last_name || "",
    father_name:teacher.data.father_name || "",
    phone:teacher.data.phone || "",
    user_id:teacher.data.user_id || "",
    _method:'PUT',

 });


 const onSubmit = (e) =>{

   e.preventDefault();
   post(route("teacher.update",teacher.data.id));
   
  }

 return (

  <AuthenticatedLayout
   user={auth.user}
   header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Edit{teacher.name} Teacher</h2>}
  >

    <Head title="Add Teacher" />

    <div className="py-12">
      <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
       <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
        <div className='mt-4 ms-5'><p className='lead text-gray-600'>Edit Teacher </p></div>
                         <form
                           onSubmit={onSubmit}
                           className='mb-5 mt-2 ms-4 me-4 w-50 p-3 sm:p-8 bg-white dark:bg-gray-800 '
                          >

                          <InputLabel htmlFor="department"> Department: <span className='text-red-300 text-lg'>*</span></InputLabel>
                           <SelectInput
                              id="department_id"
                              className="form-control mt-1"
                              name="department_id"
                              isFocused={true}
                              value={data.department_id}
                              onChange={(e) => setData("department_id",e.target.value)}

                           >
                            <option value="">Select department</option>
                            {departments.map((department) => (

                            <option value={department.id} key={department.id}>{department.name}</option>

                            ))}

                           </SelectInput>


                           <div className='mt-3'>
                          <InputLabel htmlFor="teacher_name"> Name: <span className='text-red-300 text-lg'>*</span></InputLabel>
                            <TextInput  className='form-control mt-1'
                               id="teacher_name"
                               type="text"
                               name="name"
                               value={data.name}
                               onChange={(e) => setData("name",e.target.value)}

                              />
                              <InputError message="" className='mt-2'/>
                          </div>

                          <div className='mt-3'>
                           <InputLabel htmlFor="last_name">Last Name:</InputLabel>
                           <TextInput className='form-control mt-1'
                             id="last_name"
                             type="text"
                             name="last_name"
                             value={data.last_name}
                             onChange={(e) => setData("last_name",e.target.value)}


                           />
                             <InputError message="" className='mt-2'/>
                          </div>

                          <div className='mt-3'>
                           <InputLabel htmlFor="father_name">Father Name: <span className='text-red-300 text-lg'>*</span></InputLabel>
                           <TextInput className='form-control mt-1'
                             id="father_name"
                             type="text"
                             name="father_name"
                             value={data.father_name}
                             onChange={(e) => setData("father_name",e.target.value)}

                           />
                             <InputError message="" className='mt-2'/>
                          </div>

                          <div className='mt-3'>
                           <InputLabel htmlFor="phone_number">Phone: <span className='text-red-300 text-lg'>*</span></InputLabel>
                           <TextInput className='form-control mt-1'
                             id="phone_number"
                             type="text"
                             name="phone"
                             value={data.phone}
                             onChange={(e) => setData("phone",e.target.value)}

                           />
                             <InputError message="" className='mt-2'/>
                          </div>

                          <div className='mt-3'>
                          <InputLabel htmlFor="faculty">Teacher Account: <span className='text-red-300 text-lg'>*</span></InputLabel>
                           <SelectInput
                             id="user_id"
                             name="user_id"
                             className="form-control"
                             value={data.user_id}
                             onChange={(e) => setData("user_id", e.target.value)}

                             >
                             <option value="">Select User</option>

                             {teacherusers.map((user) =>(
                               <option value={user.id} key={user.id}>{user.email}</option>

                             ))}

                           </SelectInput>
                           <InputError message={errors.user_id} className='mt-2'/>
                           <InputError/>
                          </div>
                          <div className='mt-4 text-right bg-gray-300 p-2'>
                             <Link
                               href={route("teacher.index")}
                               className='bg-gray-300 py-1 px-3 mb-2 text-gray-700 rounded-sm bg-gray-400  transition-all hover:bg-gray-100 mr-2'
                              >
                               Cancel
                              </Link>
                              <button
                               className='bg-emerald-500 py-1 px-3 text-white rounded-sm  me-3 transition-all hover:bg-emerald-600'

                              >
                                Update
                              </button>
                           </div>
                        </form>

      </div>
     </div>
     </div>

  </AuthenticatedLayout>

 );

}

