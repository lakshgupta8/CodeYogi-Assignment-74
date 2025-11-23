import { memo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaAmazon } from "react-icons/fa";
import { withFormik } from "formik";
import * as Yup from "yup";
import Input from "../components/Input";

function callForgotPasswordApi(values, { setSubmitting, props }) {
  const { navigate } = props;
  alert(`Password reset link sent to ${values.email}`);
  navigate("/login");
  setSubmitting(false);
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
});

const initialValues = {
  email: "",
};

export const ForgotPasswordPage = memo(
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
        <div className="flex flex-col gap-6 px-4 w-full max-w-md text-white">
          <FaAmazon className="mx-auto mb-6 text-9xl" />
          <h1 className="font-bold text-2xl text-center">
            Reset your password
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-sm text-center">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>

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

            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="bg-white disabled:opacity-60 py-3 rounded w-full font-semibold text-[#38A5FF] disabled:cursor-not-allowed"
            >
              Send Link
            </button>

            <div className="text-sm text-center">
              Remember your password?{" "}
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

const EnhancedForgotPasswordPage = withFormik({
  mapPropsToValues: () => initialValues,
  validationSchema: validationSchema,
  handleSubmit: callForgotPasswordApi,
  validateOnMount: true,
})(ForgotPasswordPage);

export default function ForgotPasswordPageWithNavigate() {
  const navigate = useNavigate();
  return <EnhancedForgotPasswordPage navigate={navigate} />;
}
