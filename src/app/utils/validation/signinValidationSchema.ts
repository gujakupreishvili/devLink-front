import * as Yup from 'yup'

export const SigninValidationSchema = Yup.object({
  email: Yup.string().required("email can't be empty").email("Invalid Email Format!"),
  password: Yup.string().required("password can't be empty").min(8),
})