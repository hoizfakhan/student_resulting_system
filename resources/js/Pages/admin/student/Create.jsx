import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import schema from "./StudentValidationSchema";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";

export default function Create({ auth }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleKeyPress = (event) => {
    const charCode = event.charCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  };
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Add Student
        </h2>
      }
    >
      <Head title="Add Student" />

      <div className="py-12">
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="mt-4 ms-5">
              <p className="lead text-gray-600"> Student Registration</p>
            </div>

            <form
              action=""
              onSubmit={handleSubmit(onSubmit)}
              className="container mb-5 mt-2 ms-4 me-4 w-75 p-3 sm:p-8 bg-white dark:bg-gray-800"
            >
              <div className="row form-row">
                <div className="form-group col-md-6">
                  <div className="mt-3">
                    <InputLabel htmlFor="name">
                      Name:<span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <TextInput
                      className="form-control mt-1"
                      id="name"
                      type="text"
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="text-danger">{errors.name.message}</p>
                    )}
                  </div>
                </div>
                <div className="form-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                      Last Name:<span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <TextInput
                      className="form-control mt-1"
                      {...register("last_name")}
                    />
                    {errors.last_name && (
                      <p className="text-danger">{errors.last_name.message}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="row form-row">
                <div className="form-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                      Father Name:{" "}
                      <span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <TextInput
                      className="form-control mt-1"
                      {...register("father_name")}
                    />
                    {errors.father_name && (
                      <p className="text-danger">
                        {errors.father_name.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="form-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                      Grandfather Name:{" "}
                      <span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <TextInput
                      className="form-control mt-1"
                      {...register("grandfather_name")}
                    />
                    {errors.grandfather_name && (
                      <p className="text-danger">
                        {errors.grandfather_name.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="row form-row">
                <div className="form-group col-md-6">
                  <div className="mt-3">
                    <InputLabel htmlFor="gender">Gender:</InputLabel>
                    <div className="d-flex">
                      <div className="form-check col-md-3">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="genderMale"
                          value="male"
                          {...register("gender")}
                          defaultChecked
                        />
                        <label
                          className="form-check-label"
                          htmlFor="genderMale"
                        >
                          Male
                        </label>
                      </div>
                      <div className="form-check col-md-3">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="genderFemale"
                          value="female"
                          {...register("gender")}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="genderFemale"
                        >
                          Female
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                      Original Province:{" "}
                      <span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <TextInput
                      className="form-control mt-1"
                      {...register("original_province")}
                    />
                    {errors.original_province && (
                      <span className="text-danger">
                        {errors.original_province.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="row form-row">
                <div className="form-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                      Original District:
                      <span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <TextInput
                      className="form-control mt-1"
                      {...register("original_district")}
                    />
                    {errors.original_district && (
                      <span className="text-danger">
                        {errors.original_district.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="form-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                      Original Village:
                      <span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <TextInput
                      className="form-control mt-1"
                      {...register("original_village")}
                    />
                    {errors.original_village && (
                      <span className="text-danger">
                        {errors.original_village.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="row form-row">
                <div className="form-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                      Current Province:
                      <span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <TextInput
                      className="form-control mt-1"
                      {...register("current_province")}
                    />
                    {errors.current_province && (
                      <span className="text-danger">
                        {errors.current_province.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="form-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                      Current District:
                      <span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <TextInput
                      className="form-control mt-1"
                      {...register("current_district")}
                    />
                    {errors.current_district && (
                      <span className="text-danger">
                        {errors.current_district.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="row form-row">
                <div className="from-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                      Current Village:
                      <span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <TextInput
                      className="form-control mt-1"
                      {...register("current_village")}
                    />
                    {errors.current_village && (
                      <span className="text-danger">
                        {errors.current_village.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="from-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                      Phone Number:
                      <span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <TextInput
                      type="text"
                      className="form-control mt-1"
                      {...register("phone_number")}
                      onKeyPress={handleKeyPress}
                      maxLength={10}
                      inputMode="numeric"
                      pattern="\d*" // Ensures only numeric input is allowed
                    />
                    {errors.phone_number && (
                      <span className="text-danger">
                        {errors.phone_number.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="row form-row">
                <div className="from-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                      NIC Number:<span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <input
                      type=""
                      className="form-control mt-1"
                      {...register("nic_number")}
                    />
                    {errors.nic_number && (
                      <span className="text-danger">
                        {errors.nic_number.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="from-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                      Birth Date:<span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <input
                      type="date"
                      className="form-control mt-1"
                      {...register("birth_year", {
                        required: true,
                        valueAsDate: true,
                      })}
                    />
                    {errors.birth_year && (
                      <span className="text-danger">
                        {errors.birth_year.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="row form-row">
                <div className="from-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                      School:<span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <TextInput
                      className="form-control mt-1"
                      {...register("school_name")}
                    />
                    {errors.school_name && (
                      <span className="text-danger">
                        {errors.school_name.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="from-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                      School Graduation Year:
                      <span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <input
                      type="text"
                      className="form-control mt-1"
                      {...register("school_graduation_year")}
                    />
                    {errors.school_graduation_year && (
                      <span className="text-danger">
                        {errors.school_graduation_year.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="row form-row">
                <div className="from-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                      Kankor ID:<span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <input
                      type="number"
                      className="form-control mt-1"
                      {...register("kankor_id")}
                    />
                    {errors.kankor_id && (
                      <span className="text-danger">
                        {errors.kankor_id.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="from-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                      Kankor Marks:
                      <span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <input
                      type="number"
                      className="form-control mt-1"
                      {...register("kankor_mark")}
                    />
                    {errors.kankor_mark && (
                      <span className="text-danger">
                        {errors.kankor_mark.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="row form-row">
                <div className="from-group col-md-4">
                  <div className="mt-3">
                    <InputLabel>
                      Admission Year:
                      <span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <input
                      type="date"
                      className="form-control mt-1"
                      {...register("admission_date")}
                    />
                    {errors.admission_date && (
                      <span className="text-danger">
                        {errors.admission_date.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="from-group col-md-4">
                  <div className="mt-3">
                    <InputLabel>
                      Department:<span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <input
                      type="text"
                      className="form-control mt-1"
                      {...register("department_id")}
                    />
                    {errors.department_id && (
                      <span className="text-danger">
                        {errors.department_id.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="from-group col-md-4">
                  <div className="mt-3">
                    <InputLabel>
                      Semester:<span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <select
                      className="form-control mt-1"
                      {...register("semester_id", {
                        required: "Semester is required",
                        valueAsNumber: true,
                      })}
                    >
                      <option value="">Select a semester</option>
                      {[...Array(10)].map((_, index) => (
                        <option key={index + 1} value={index + 1}>
                          {index + 1}
                        </option>
                      ))}
                    </select>
                    {errors.semester_id && (
                      <span className="text-danger">
                        {errors.semester_id.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="row form-row">
                <div className="from-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                      د امتحاناتو ادارې ته د لیږل شوي مکتوب شمیره:
                    </InputLabel>
                    <input
                      type="number"
                      className="form-control mt-1"
                      {...register("number_maktob_sent_exam_commettee")}
                    />
                    {errors.number_maktob_sent_exam_commettee && (
                      <span className="text-danger">
                        {errors.number_maktob_sent_exam_commettee.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="from-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>تاجیل مکتوب شمیره:</InputLabel>
                    <input
                      type="number"
                      className="form-control mt-1"
                      {...register("number_maktob_tajeel")}
                    />
                    {errors.number_maktob_tajeel && (
                      <span className="text-danger">
                        {errors.number_maktob_tajeel.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="row form-row">
                <div className="from-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>منفک مکتوب شمیره:</InputLabel>
                    <input
                      type="number"
                      className="form-control mt-1"
                      {...register("number_maktob_monfak")}
                    />
                    {errors.number_maktob_monfak && (
                      <span className="text-danger">
                        {errors.number_maktob_monfak.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="from-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>د لیلیې د مکتوب شمیره:</InputLabel>
                    <input
                      type="number"
                      className="form-control mt-1"
                      {...register("number_maktob_lailia")}
                    />
                    {errors.number_maktob_lailia && (
                      <span className="text-danger">
                        {errors.number_maktob_lailia.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="row form-row">
                <div className="from-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                      د کارت شمیره:
                      <span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <input
                      type="text"
                      className="form-control mt-1"
                      {...register("cart_number")}
                    />
                    {errors.cart_number && (
                      <span className="text-danger">
                        {errors.cart_number.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="from-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                      Photo:<span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <input
                      type="file"
                      className="form-control mt-1"
                      {...register("photo")}
                    />
                    {errors.photo && (
                      <span className="text-danger">
                        {errors.photo.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button className="btn btn-primary mt-1" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
