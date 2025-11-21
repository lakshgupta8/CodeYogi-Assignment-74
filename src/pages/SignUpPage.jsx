import { memo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaAmazon } from "react-icons/fa";
import { withFormik } from "formik";
import * as Yup from "yup";
import Input from "../components/Input";

function callSignupApi(values, { setSubmitting, props }) {
  const { navigate } = props;
  console.log(
    "Signing up with:",
    values.username,
    values.email,
    values.password
  );
  alert(
    `Account created for ${values.username}.\nVerification link sent to ${values.email}`
  );
  navigate("/");
  setSubmitting(false);
}

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const initialValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const SignUpPage = memo(
  ({
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    isValid,
  }) => {
    return (
      <div
        className="flex justify-center items-center bg-cover bg-no-repeat bg-center w-full h-screen"
        style={{
          backgroundImage: 'url("/images/loginbg.svg")',
        }}
      >
        <div className="top-4 right-4 absolute">
          <Link
            to="/"
            className="text-white focus:text-gray-800 text-sm hover:underline"
          >
            Continue without login
          </Link>
        </div>

        <div className="flex flex-col gap-6 px-4 w-full max-w-md text-white">
          <FaAmazon className="mx-auto mb-6 text-9xl" />
          <h1 className="font-bold text-2xl text-center">
            Create Your Account
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              autoComplete="username"
              value={values.username}
              error={errors.username}
              touched={touched.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              autoComplete="email"
              value={values.email}
              error={errors.email}
              touched={touched.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              autoComplete="new-password"
              value={values.password}
              error={errors.password}
              touched={touched.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <Input
              id="confirm-password"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              autoComplete="new-password"
              value={values.confirmPassword}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="bg-white disabled:opacity-60 py-3 rounded w-full font-semibold text-[#38A5FF] disabled:cursor-not-allowed"
            >
              CREATE
            </button>

            <div className="text-sm text-center">
              Already have an account?
              <Link
                to="/login"
                className="ml-1 underline hover:underline-offset-2"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
);

const EnhancedSignUpPage = withFormik({
  mapPropsToValues: () => initialValues,
  validationSchema: validationSchema,
  handleSubmit: callSignupApi,
  validateOnMount: true,
})(SignUpPage);

export default function SignUpPageWithNavigate() {
  const navigate = useNavigate();
  return <EnhancedSignUpPage navigate={navigate} />;
}
