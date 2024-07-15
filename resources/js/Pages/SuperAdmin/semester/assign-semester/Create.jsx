import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head,Link,useForm } from "@inertiajs/react";
import ErrorModal from "@/Pages/ErrorModal";
import SuccessModal from "@/Pages/SuccessModal";
import React, { useEffect, useState } from "react";
export default function Create({ auth,facultys,semesters,Departments,error,success }) {

  const { get } = useForm();
  const [successMessage, setSuccessMessage] = useState(success || null);
  const [errorMessage, setErrorMessage] = useState(error || null);

  const [selectedFacultyid,setSelectedFacultyid] = useState('');
  const [departments,setDepartments] = useState([]);

  const [selectedSemesters,setSelectedSemesters] = useState([]);

  const handleCheckboxChange = (event) => {
    const selectedId = parseInt(event.target.value);
    if (selectedSemesters.includes(selectedId)) {
      setSelectedSemesters(selectedSemesters.filter(id => id !== selectedId))
    } else {
      setSelectedSemesters([...selectedSemesters, selectedId]);
    }
  };

  const {data,setData,post,errors,reset}  =   useForm({

          department_id:"",
          semester_id:"",

      });

      useEffect(() => {
        if (success) {
          setSuccessMessage(success);
        }
      }, [success]);

      useEffect(() => {
        if (error) {
          setErrorMessage(error);
        }
      }, [error]);


      useEffect(() => {
        setData({ ...data, semester_id: selectedSemesters });
      }, [selectedSemesters]);

      useEffect(() => {

        if(selectedFacultyid){
         let filteredDept = Departments.filter(dept => {
            return dept.faculty_id == selectedFacultyid
          })

          setDepartments(filteredDept);

        }

      },[selectedFacultyid]);


      const onSubmit = (e) =>{

        e.preventDefault();

        post(route("assignsemester.store"),{

          ...data,
          semester_id:selectedSemesters,

        });
       }


  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
         Assgin New Semester
        </h2>
      }
    >
      <Head title="Assgin New Semester" />

      <div className="py-12">
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
        {successMessage && (
            <SuccessModal
              message={successMessage}
              onClose={() => setSuccessMessage(null)}
            />
          )}

          {errorMessage && (
            <ErrorModal
              message={errorMessage}
              onClose={() => setErrorMessage(null)}
            />
          )}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="mt-4 ms-5">
              <p className="lead text-gray-600 ">Assgin Semester Form</p>
            </div>

            <form
              onSubmit={onSubmit}
              className="container mb-5 mt-2 ms-4 me-4 w-75 p-3 sm:p-8 bg-white dark:bg-gray-800"
            >
              <div className="row form-row">
                <div className="form-group col-md-6">
                  <div className="mt-3">
                    <InputLabel htmlFor="name">
                      Faculty:<span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <SelectInput
                      className="form-control mt-1"
                      id="faculty_id"
                      type="text"
                      name="faculty_id"
                      value={selectedFacultyid}
                      isFocused={true}
                      onChange={(e) => setSelectedFacultyid(e.target.value)}
                    >
                    <option value="">Select Faculty</option>
                     {facultys.map((faculty) => (

                       <option value={faculty.id} key={faculty.id}>{faculty.faculty_name}</option>

                    ))}

                    </SelectInput>
                    <InputError message={errors.faculty_id} className='mt-2'/>
                  </div>
                </div>
                <div className="form-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                     Department:<span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <SelectInput
                      className="form-control mt-1"
                      id="department_id"
                      name="department_id"
                      onChange={(e) => setData('department_id',e.target.value)}
                    >
                    <option>Select department</option>

                    {departments.length > 0 ? (

                    departments.map((department) => (
                   <option value={department.id} key={department.id}>{department.name}</option>

                     ))

                     ) : (

                    <option value="">Select a faculty fisrt</option>
                    )}
                    </SelectInput>
                      <InputError message={errors.department_id} className='mt-2'/>
                  </div>
                </div>
              </div>
              <div className="row form-row">
                <div className="form-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                      Semester{" "}
                      <span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <ul>
                  {semesters.length > 0 ? (

                      semesters.map((semester) => (
                        <li key={semester.id} className="mr-2">
                          <input
                            type="checkbox"
                            value={semester.id}
                            onChange={handleCheckboxChange}

                          />
                          <span className="ms-2">{semester.name}</span>

                        </li>

                      ))
                  ) : (
                    <span className="text-gray-300 text-sm">No Semester</span>
                  )

                      }

                     </ul>
                   <InputError message={errors.semester} className='mt-2'/>
                  </div>
                </div>

              </div>

              <div className="text-center mt-4 bg-gray-200">
              <Link
               href={route("assignsemester.index")}
               className='bg-gray-300 py-1  px-3  text-gray-800  rounded transition-all hover:bg-gray-400 mr-2'
              >
                Cancel
              </Link>
              <button className="btn btn-success mb-1 mt-1 mt-1" type="submit">
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
