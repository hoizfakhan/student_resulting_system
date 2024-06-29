
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ auth,facultys,error}) {

     const {data,setData,post,errors,reset} =  useForm({

              name:'',
              email:'',
              password:'',
              password_confirmation:''

          });

   const onSubmit = (e) =>{
    e.preventDefault();

    post(route("manager.store"));

   }


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Add Faculty Manager</h2>}
        >
            <Head title="Add Manager" />

            <div className="py-12">
              {error && (
                  <div className='bg-amber-400 py-2 px-5 text-white rounded mb-4 ms-4 me-4  '>
                  {error}
                 </div>
                  )}
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100 ms-3 ">Add New Manager </div>
                        <form
                         onSubmit={onSubmit}
                         className='mb-5 mt-2 ms-4  me-4 w-50 p-3 sm:p-8 bg-white dark:bg-gray-800 '
                          >

                           <div className='mt-3'>
                           <InputLabel htmlFor="manager_name">Manager Name: <span className='text-red-300 text-lg'>*</span></InputLabel>
                            <TextInput  className='form-control mt-1'
                               id="manager_name"
                               type="text"
                               name="name"
                               isFocused={true}
                               onChange={(e) => setData("name",e.target.value)}

                              />
                              <InputError message={errors.name}  className='mt-2'/>
                          </div>

                          <div className='mt-3'>
                          <InputLabel htmlFor="manager_faculty_id">Faculty: <span className='text-red-300 text-lg'>*</span></InputLabel>
                           <SelectInput
                             id="manager_faculty_id"
                             name="faculty_id"
                             className="form-control"
                             onChange={(e) => setData("faculty_id",e.target.value)}

                             >
                             <option value="">Select Faculty</option>
                              {facultys.data.map((faculty) => (

                              <option value={faculty.id} key={faculty.id}>{faculty.name}</option>


                               ))}
                           </SelectInput>
                           <InputError message={errors.faculty_id}  className='mt-2'/>
                           <InputError/>

                          </div>

                          <div className='mt-3'>
                           <InputLabel htmlFor="manager_email">Email: <span className='text-red-300 text-lg'>*</span></InputLabel>
                           <TextInput className='form-control mt-1'
                             id="manager_email"
                             type="email"
                             name="email"
                             onChange={(e) => setData("email",e.target.value)}

                           />
                             <InputError message={errors.email} className='mt-2'/>
                          </div>

                          <div className='mt-3'>
                           <InputLabel htmlFor="manager_password">Password: <span className='text-red-300 text-lg'>*</span></InputLabel>
                           <TextInput className='form-control mt-1  '
                             id="manager_password"
                             type="password"
                             name="password"
                             onChange={(e) => setData("password",e.target.value)}

                           />
                             <InputError message={errors.password} className='mt-2'/>
                          </div>
                          <div className='mt-3'>
                           <InputLabel htmlFor="manager_password_confirmation">Password Confirmation: <span className='text-red-300 text-lg'>*</span></InputLabel>
                           <TextInput className='form-control mt-1 '
                             id="manager_password_confirmation"
                             type="password"
                             name="password_confirmation"
                             onChange={(e) => setData("password_confirmation",e.target.value)}
                           />
                             <InputError message={errors.password_confirmation} className='mt-2'/>
                          </div>

                          <div className='mt-4 text-right bg-gray-300 p-2'>
                             <Link
                               href={route("manager.index")}
                               className='bg-gray-300 py-1 px-3 mb-2 text-gray-700 rounded-sm bg-gray-400  transition-all hover:bg-gray-100 mr-2'
                              >
                               Cancel
                              </Link>
                              <button
                               className='bg-emerald-500 py-1 px-3 text-white rounded-sm  me-3 transition-all hover:bg-emerald-600'

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
