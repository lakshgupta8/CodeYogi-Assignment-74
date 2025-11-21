import { memo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaAmazon } from "react-icons/fa";
import { withFormik } from "formik";
import * as Yup from "yup";
import Input from "../components/Input";

function callLoginApi(values, { setSubmitting, props }) {
  const navigate = props.navigate;
  console.log("Logging in with:", values.username, values.password);
  navigate("/");
  setSubmitting(false);
}

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
});

const initialValues = {
  username: "",
  password: "",
};

export const LoginPage = memo(
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
            Login to Your Account
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
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              value={values.password}
              error={errors.password}
              touched={touched.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <div className="text-sm text-center">
              <Link to="/forgot-password" className="hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="bg-white disabled:opacity-60 py-3 rounded w-full font-semibold text-[#38A5FF] disabled:cursor-not-allowed"
            >
              LOGIN
            </button>

            <div className="text-sm text-center">
              Don't have an account?
              <Link
                to="/signup"
                className="ml-1 underline hover:underline-offset-2"
              >
                SignUp
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
);

const EnhancedLoginPage = withFormik({
  mapPropsToValues: () => initialValues,
  validationSchema: validationSchema,
  handleSubmit: callLoginApi,
  validateOnMount: true,
})(LoginPage);

export default function LoginPageWithNavigate() {
  const navigate = useNavigate();
  return <EnhancedLoginPage navigate={navigate} />;
}
