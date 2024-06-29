
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Create({auth,Departments,teacherusers}){

    const { facultys } = usePage().props;

    const { get } = useForm();
    const [selectedFacultyid,setSelectedFacultyid] = useState('');
    const [departments,setDepartments] = useState([]);

    const {data,setData,post,errors,reset}  =   useForm({

      department_id:"",
      name:"",
      last_name:"",
      father_name:"",
      phone:"",
      user_id:"",

  });

  const onSubmit = (e) =>{
    e.preventDefault();

    post(route("teacher.store"));

   }


    useEffect(() => {

      if(selectedFacultyid){
       let filteredDept = Departments.data.filter(dept=>{
          return dept.faculty_id == selectedFacultyid
        })
        setDepartments(filteredDept);

      }

    },[selectedFacultyid]);



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
                           onSubmit={onSubmit}
                           className='mb-5 mt-2 ms-4 me-4 w-50 p-3 sm:p-8 bg-white dark:bg-gray-800 '
                          >
                       <div className="row form-row">
                        <div className="form-group col-md-6">
                        <div className='mt-3'>
                          <InputLabel htmlFor="faculty">Faculty: <span className='text-red-300 text-lg'>*</span></InputLabel>
                           <SelectInput
                             id="faculty_id"
                             name="faculty_id"
                             value={selectedFacultyid}
                             className="form-control"
                             onChange={(e) => setSelectedFacultyid(e.target.value)}

                             >
                             <option value="">Select Faculty</option>
                              {facultys.data.map((faculty) => (

                              <option value={faculty.id} key={faculty.id}>{faculty.name}</option>

                               ))}

                           </SelectInput>
                           <InputError message={errors.faculty_id} className='mt-2'/>
                           <InputError/>
                          </div>
                          </div>

                          <div className="form-group col-md-6">
                           <div className='mt-3'>
                           <InputLabel htmlFor="department"> Department: <span className='text-red-300 text-lg'>*</span></InputLabel>
                           <SelectInput
                              id="department"
                              className="form-control mt-1"
                              name="department_id"
                              onChange={(e) => setData("department_id", e.target.value)}
                           >
                            <option vlaue="">Select department</option>

                             {departments.length > 0 ? (

                                  departments.map((department) => (
                                  <option value={department.id} key={department.id}>{department.name}</option>

                                ))

                              ) : (

                                <option value="">Select a faculty fisrt</option>
                               )}

                           </SelectInput>
                           <InputError message={errors.department_id} className='mt-2'/>
                           <InputError/>
                            </div>
                            </div>
                          </div>

                          <div className="row form-row">
                           <div className="form-group col-md-6">
                             <div className='mt-3'>
                             <InputLabel htmlFor="teacher_name"> Name: <span className='text-red-300 text-lg'>*</span></InputLabel>
                            <TextInput  className='form-control mt-1'
                               id="teacher_name"
                               type="text"
                               name="name"
                              isFocused={true}
                              onChange={(e) => setData("name", e.target.value)}

                              />
                              <InputError message={errors.name} className='mt-2'/>

                          </div>
                          </div>
                          <div className="form-group col-md-6">
                             <div className='mt-3'>

                           <InputLabel htmlFor="last_name">Last Name:</InputLabel>
                           <TextInput className='form-control mt-1'
                             id="last_name"
                             type="text"
                             name="last_name"
                             onChange={(e) => setData("last_name", e.target.value)}

                             />
                             <InputError message={errors.last_name}className='mt-2'/>
                              </div>
                              </div>
                          </div>

                          <div className="row form-row">
                           <div className="form-group col-md-6">
                             <div className='mt-3'>

                             <InputLabel htmlFor="father_name">Father Name: <span className='text-red-300 text-lg'>*</span></InputLabel>
                               <TextInput className='form-control mt-1'
                               id="father_name"
                               type="text"
                               name="father_name"
                               onChange={(e) => setData("father_name", e.target.value)}

                             />
                             <InputError message={errors.father_name} className='mt-2'/>
                           </div>
                           </div>
                           <div className="form-group col-md-6">
                             <div className='mt-3'>

                           <InputLabel htmlFor="phone_number">Phone: <span className='text-red-300 text-lg'>*</span></InputLabel>
                           <TextInput className='form-control mt-1'
                             id="phone_number"
                             type="text"
                             name="phone"
                             onChange={(e) => setData("phone", e.target.value)}

                           />
                             <InputError message={errors.phone} className='mt-2'/>
                              </div>
                              </div>
                           </div>

                        <div className='mt-3'>
                          <InputLabel htmlFor="faculty">Teacher Account: <span className='text-red-300 text-lg'>*</span></InputLabel>
                           <SelectInput
                             id="user_id"
                             name="user_id"
                             className="form-control"
                             onChange={(e) => setData("user_id", e.target.value)}

                             >
                             <option value="">Select User</option>

                             {teacherusers.map((teacheruser) =>(
                               <option value={teacheruser.id} key={teacheruser.id}>{teacheruser.email}</option>

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

