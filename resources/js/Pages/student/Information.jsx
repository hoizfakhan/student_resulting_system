import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";


export default function Information({auth,student}) {

  console.log(student);
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Student Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="container-fluid">
                <div className="row">
                 
                </div>
              </div>
              <div className="mt-3 space-y-6">
                {/* Personal Information Section */}
                <div className="overflow-x-auto shadow-lg rounded-lg">
                  <h2 className="font-bold text-2xl text-indigo-700 mb-4 border-b-2 border-indigo-300 pb-2">
                    Personal Information
                  </h2>
                  <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                    <tbody>
                      <tr className="odd:bg-gray-50 even:bg-white border-b">
                        <th className="text-left px-4 py-3 font-semibold text-gray-800">
                          Student ID
                        </th>
                        <td className="px-4 py-3 text-gray-600">
                          {student.data.id}
                        </td>
                      </tr>
                      <tr className="odd:bg-gray-50 even:bg-white border-b">
                        <th className="text-left px-4 py-3 font-semibold text-gray-800">
                          Student Name
                        </th>
                        <td className="px-4 py-3 text-gray-600">
                          {student.data.name}
                        </td>
                      </tr>
                      <tr className="odd:bg-gray-50 even:bg-white border-b">
                        <th className="text-left px-4 py-3 font-semibold text-gray-800">
                          Last Name
                        </th>
                        <td className="px-4 py-3 text-gray-600">
                          {student.data.last_name}
                        </td>
                      </tr>
                      <tr className="odd:bg-gray-50 even:bg-white border-b">
                        <th className="text-left px-4 py-3 font-semibold text-gray-800">
                          Father Name
                        </th>
                        <td className="px-4 py-3 text-gray-600">
                          {student.data.father_name}
                        </td>
                      </tr>
                      <tr className="odd:bg-gray-50 even:bg-white border-b">
                        <th className="text-left px-4 py-3 font-semibold text-gray-800">
                          Grandfather Name
                        </th>
                        <td className="px-4 py-3 text-gray-600">
                          {student.data.grandfather_name}
                        </td>
                      </tr>
                      <tr className="odd:bg-gray-50 even:bg-white border-b">
                        <th className="text-left px-4 py-3 font-semibold text-gray-800">
                          Birth Date
                        </th>
                        <td className="px-4 py-3 text-gray-600">
                          {student.data.birth_date}
                        </td>
                      </tr>
                      <tr className="odd:bg-gray-50 even:bg-white border-b">
                        <th className="text-left px-4 py-3 font-semibold text-gray-800">
                          Kankor ID
                        </th>
                        <td className="px-4 py-3 text-gray-600">
                          {student.data.kankor_id}
                        </td>
                      </tr>
                      <tr className="odd:bg-gray-50 even:bg-white border-b">
                        <th className="text-left px-4 py-3 font-semibold text-gray-800">
                          Phone Number
                        </th>
                        <td className="px-4 py-3 text-gray-600">
                          {student.data.phone_number}
                        </td>
                      </tr>
                      <tr className="odd:bg-gray-50 even:bg-white border-b">
                        <th className="text-left px-4 py-3 font-semibold text-gray-800">
                          NIC Number
                        </th>
                        <td className="px-4 py-3 text-gray-600">
                          {student.data.nic_number}
                        </td>
                      </tr>
                      <tr className="odd:bg-gray-50 even:bg-white">
                        <th className="text-left px-4 py-3 font-semibold text-gray-800">
                          Identity Cart Number
                        </th>
                        <td className="px-4 py-3 text-gray-600">
                          {student.data.identity_cart_number}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Academic Information Section */}
                <div className="overflow-x-auto shadow-lg rounded-lg">
                  <h2 className="font-bold text-2xl text-indigo-700 mb-4 border-b-2 border-indigo-300 pb-2">
                    Academic Information
                  </h2>
                  <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                    <tbody>
                      <tr className="odd:bg-gray-50 even:bg-white border-b">
                        <th className="text-left px-4 py-3 font-semibold text-gray-800">
                          School Name
                        </th>
                        <td className="px-4 py-3 text-gray-600">
                          {student.data.school_name}
                        </td>
                      </tr>
                      <tr className="odd:bg-gray-50 even:bg-white border-b">
                        <th className="text-left px-4 py-3 font-semibold text-gray-800">
                          School Graduation Year
                        </th>
                        <td className="px-4 py-3 text-gray-600">
                          {student.data.school_graduation_year}
                        </td>
                      </tr>
                      <tr className="odd:bg-gray-50 even:bg-white border-b">
                        <th className="text-left px-4 py-3 font-semibold text-gray-800">
                          Kankor Marks
                        </th>
                        <td className="px-4 py-3 text-gray-600">
                          {student.data.kankor_marks}
                        </td>
                      </tr>
                      <tr className="odd:bg-gray-50 even:bg-white border-b">
                        <th className="text-left px-4 py-3 font-semibold text-gray-800">
                          Admission Date
                        </th>
                        <td className="px-4 py-3 text-gray-600">
                          {student.data.admission_date}
                        </td>
                      </tr>
                      <tr className="odd:bg-gray-50 even:bg-white border-b">
                        <th className="text-left px-4 py-3 font-semibold text-gray-800">
                          Department
                        </th>
                        <td className="px-4 py-3 text-gray-600">

                          {student.data.department.name}

                        </td>
                      </tr>

                    </tbody>
                  </table>
                </div>

                {/* Residence Information Section */}
                <div className="overflow-x-auto shadow-lg rounded-lg">
                  <h2 className="font-bold text-2xl text-indigo-700 mb-4 border-b-2 border-indigo-300 pb-2">
                    Residence Information
                  </h2>
                  <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                    <thead>
                      <tr className="bg-gray-100">
                        <th
                          className="text-left px-4 py-3 font-bold text-indigo-600"
                          colSpan="2"
                        >
                          (Original Residence)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="odd:bg-gray-50 even:bg-white border-b">
                        <th className="text-left px-4 py-3 font-semibold text-gray-800">
                          Province
                        </th>
                        <td className="px-4 py-3 text-gray-600">
                          {student.data.original_province}
                        </td>
                      </tr>
                      <tr className="odd:bg-gray-50 even:bg-white border-b">
                        <th className="text-left px-4 py-3 font-semibold text-gray-800">
                          District
                        </th>
                        <td className="px-4 py-3 text-gray-600">
                          {student.data.original_district}
                        </td>
                      </tr>
                      <tr className="odd:bg-gray-50 even:bg-white">
                        <th className="text-left px-4 py-3 font-semibold text-gray-800">
                          Village
                        </th>
                        <td className="px-4 py-3 text-gray-600">
                          {student.data.original_village}
                        </td>
                      </tr>
                    </tbody>
                    <thead>
                      <tr className="bg-gray-100">
                        <th
                          className="text-left px-4 py-3 font-bold text-indigo-600"
                          colSpan="2"
                        >
                          (Current Residence)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="odd:bg-gray-50 even:bg-white border-b">
                        <th className="text-left px-4 py-3 font-semibold text-gray-800">
                          Province
                        </th>
                        <td className="px-4 py-3 text-gray-600">
                          {student.data.current_province}
                        </td>
                      </tr>
                      <tr className="odd:bg-gray-50 even:bg-white border-b">
                        <th className="text-left px-4 py-3 font-semibold text-gray-800">
                          District
                        </th>
                        <td className="px-4 py-3 text-gray-600">
                          {student.data.current_district}
                        </td>
                      </tr>
                      <tr className="odd:bg-gray-50 even:bg-white">
                        <th className="text-left px-4 py-3 font-semibold text-gray-800">
                          Village
                        </th>
                        <td className="px-4 py-3 text-gray-600">
                          {student.data.current_village}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Maktob Section */}
                <div className="overflow-x-auto shadow-lg rounded-lg">
                  <h2 className="font-bold text-2xl text-indigo-700 mb-4 border-b-2 border-indigo-300 pb-2">
                    Maktob Section
                  </h2>
                  <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                    <tbody>
                      <tr className="odd:bg-gray-50 even:bg-white border-b">
                        <th className="text-left px-4 py-3 font-semibold text-gray-800">
                          د امتحاناتو ادارې ته د لیږل شوي مکتوب شمیره:
                        </th>
                        <td className="px-4 py-3 text-gray-600">
                          {student.data.number_maktob_sent_exam_commettee}
                        </td>
                      </tr>
                      <tr className="odd:bg-gray-50 even:bg-white border-b">
                        <th className="text-left px-4 py-3 font-semibold text-gray-800">
                          تاجیل مکتوب شمیره:
                        </th>
                        <td className="px-4 py-3 text-gray-600">
                          {student.data.number_maktob_tajeel}
                        </td>
                      </tr>
                      <tr className="odd:bg-gray-50 even:bg-white border-b">
                        <th className="text-left px-4 py-3 font-semibold text-gray-800">
                          منفک مکتوب شمیره:
                        </th>
                        <td className="px-4 py-3 text-gray-600">
                          {student.data.number_maktob_monfak}
                        </td>
                      </tr>
                      <tr className="odd:bg-gray-50 even:bg-white">
                        <th className="text-left px-4 py-3 font-semibold text-gray-800">
                          د لیلیې د مکتوب شمیره:
                        </th>
                        <td className="px-4 py-3 text-gray-600">
                          {student.data.number_maktob_lailia}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
