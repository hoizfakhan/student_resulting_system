import { z } from "zod";

const StudentValidationSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  last_name: z.string().min(3, "Lastname must be at least 3 characters"),
  father_name: z.string().min(3, "Father name must be at least 3 characters"),
  grandfather_name: z.string().min(3, "Grandfather name must be at least 3 characters"),
  gender: z.string().min(1, "Gender is required"),

  original_province: z.string().min(3, "Original province is required"),
  original_district: z.string().min(3, "Original district is required"),
  original_village: z.string().min(3, "Original village is required"),
  current_province: z.string().min(3, "Current province is required"),
  current_district: z.string().min(3, "Current district is required"),
  current_village: z.string().min(3, "Current village is required"),

  phone_number: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits") // Exactly 10 digits
    .refine((val) => !isNaN(Number(val)), "Phone number must be numeric") //Checks that the value is numeric.
    .refine((val) => Number(val) >= 0, "Phone number must be Non-negative"), //
  nic_number: z.number().min(4, "NIC number is required"),
  birth_year: z.date("Birth date is required"),
  // birth_month: z.string().min(1, "Birth month is required"),
  // birth_day: z.string().min(1, "Birth day is required"),

  school_name: z.string().min(3, "School name is required"),
  school_graduation_year: z
    .number()
    .min(4, "School graduation year is required"),
  kankor_mark: z.string().min(1, "Kankor mark is required"),
  kankor_id: z.string().min(4, "Kankor ID is required"),

  admission_date: z.string().min(1, "Admission date is required"),
  department_id: z.string().min(3, "this field is required"),
  semester_id: z.number({ invalid_type_error: "Please choose semester" }),
  number_maktob_sent_exam_commettee: z.number(),
  number_maktob_tajeel: z.string(),
  number_maktob_monfak: z.string(),
  number_maktob_lailia: z.string(),
  cart_number: z.string(),
  // photo: z
  //   .instanceof(File)
  //   .refine((file) => file.size > 0, {
  //     message: "Photo is required",
  //   })
  //   .refine((file) => ["image/jpeg", "image/png"].includes(file.type), {
  //     message: "Only JPEG and PNG files are allowed",
  //   })
  //   .refine((file) => file.size <= 5 * 1024 * 1024, {
  //     // 5MB limit
  //     message: "File size should not exceed 5MB",
  //   }),
});

export default StudentValidationSchema;
