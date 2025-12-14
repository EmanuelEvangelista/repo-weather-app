import * as Yup from "yup";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import useSubmit from "../../hooks/useSubmit.jsx";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {  WeatherContext } from "../../context/WeatherContext.jsx";
import { useAlertContext } from '../../context/alertContext.jsx';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Button,
  Heading,
  Input,
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  space,
} from "@chakra-ui/react";
import FullScreenSection from "../../components/FullScreenSection/FullScreenSection";

const Login = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, isAuthenticated, user, setUser } = useContext(WeatherContext);
  const { onOpen } = useAlertContext();

  const { isLoading, response, submit } = useSubmit();
  const [currentForm, setCurrentForm] = useState(null);

  // LOGIN
  const formikLogin = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: (values) => {
      setCurrentForm("login");
      submit("https://jsonplaceholder.typicode.com/posts", values);
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("A password is required"),
    }),
  });

  // REGISTER
  const formikRegister = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    onSubmit: (values) => {
      setCurrentForm("register");
      submit("https://jsonplaceholder.typicode.com/posts", values);
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("A password is required"),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Please confirm your password"),
    }),
  });

  useEffect(() => {
  if (!response || !currentForm) return;

  if (response.type === "success") {
    if (currentForm === "login") {
  const loginData = { email: formikLogin.values.email };
  setUser(loginData);
  formikLogin.resetForm();
   onOpen("success", "Login successful");
}

if (currentForm === "register") {
  const registerData = {
    firstName: formikRegister.values.firstName,
    lastName: formikRegister.values.lastName,
    email: formikRegister.values.email,
  };
  setUser(registerData);
  formikRegister.resetForm();
  onOpen("success", "Registration successful");
}

    setIsAuthenticated(true);
  } else {
    onOpen("error", response.message || "Something went wrong");
  }
}, [response, currentForm]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/user-info");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!user || !user.email) {
    setIsAuthenticated(false);
    }
  }, []);

  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#ffffff"
      py={16}
      spacing={8}
      textAlign="left"
    >
      <Box
        bg="#495e57"
        p={20}
        rounded="md"
        boxShadow="2xl"
        w="500px"
        mx="auto"
        color="white"
      >
        <Heading as="h1" size="lg" textAlign="center" mb={6} color="teal.300">
          Welcome
        </Heading>
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="2em" mt="2em" justifyContent={"space-around"}>
            <Tab backgroundColor="#f4ce14" _selected={{ bg: "#e0ba10", color: "black" }}>Login</Tab>
            <Tab backgroundColor="#f4ce14" _selected={{ bg: "#e0ba10", color: "black" }}>Register</Tab>
          </TabList>
          <TabPanels>
            {/* Login Panel */}
            <TabPanel>
              <form onSubmit={formikLogin.handleSubmit}>
                <VStack spacing={8}>
                  <FormControl isInvalid={!!formikLogin.errors.email && formikLogin.touched.email}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      variant="filled"
                      bg="#white"
                      color="#e0ba10"
                      {...formikLogin.getFieldProps("email")}
                    />
                    <FormErrorMessage>{formikLogin.errors.email}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!formikLogin.errors.password && formikLogin.touched.password}>
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      variant="filled"
                      bg="#white"
                      color="#e0ba10"
                      {...formikLogin.getFieldProps("password")}
                    />
                    <FormErrorMessage>{formikLogin.errors.password}</FormErrorMessage>
                  </FormControl>
                  <Button 
                    type="submit" 
                    width="full" 
                    isLoading={isLoading} 
                    mt="2em"
                    bg="#f4ce14"
                    color="black"
                    _hover={{ bg: "#e0ba10" }}
                    _selected={{ bg: "#e0ba10", color: "black" }}
                  >
                    Sign In
                  </Button>
                </VStack>
              </form>
            </TabPanel>

            {/* Register Panel */}
            <TabPanel>
              <form onSubmit={formikRegister.handleSubmit}>
                <VStack spacing={8}>
                  <FormControl isInvalid={!!formikRegister.errors.firstName && formikRegister.touched.firstName}>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      variant="filled"
                      bg="#white"
                      color="#e0ba10"
                      {...formikRegister.getFieldProps("firstName")}
                    />
                    <FormErrorMessage>{formikRegister.errors.firstName}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!formikRegister.errors.lastName && formikRegister.touched.lastName}>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      variant="filled"
                      bg="#white"
                      color="#e0ba10"
                      {...formikRegister.getFieldProps("lastName")}
                    />
                    <FormErrorMessage>{formikRegister.errors.lastName}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!formikRegister.errors.email && formikRegister.touched.email}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      variant="filled"
                      bg="#white"
                      color="#e0ba10"
                      {...formikRegister.getFieldProps("email")}
                    />
                    <FormErrorMessage>{formikRegister.errors.email}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!formikRegister.errors.password && formikRegister.touched.password}>
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      variant="filled"
                      bg="#white"
                      color="#e0ba10"
                      {...formikRegister.getFieldProps("password")}
                    />
                    <FormErrorMessage>{formikRegister.errors.password}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!formikRegister.errors.passwordConfirm && formikRegister.touched.passwordConfirm}>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input
                      type="password"
                      variant="filled"
                      bg="#white"
                      color="#e0ba10"
                      {...formikRegister.getFieldProps("passwordConfirm")}
                    />
                    <FormErrorMessage>{formikRegister.errors.passwordConfirm}</FormErrorMessage>
                  </FormControl>
                  <Button
                    type="submit"
                    width="full"
                    isLoading={isLoading}
                    mt="2em"
                    bg="#f4ce14"
                    color="black"
                    _hover={{ bg: "#e0ba10" }}
                    _selected={{ bg: "#e0ba10", color: "black" }}
                  >
                    Sign Up
                  </Button>
                  {response && currentForm === "register" && (
                    <Alert status={response.type === "success" ? "success" : "error"} variant="subtle" mt={4} rounded="md">
                      <AlertIcon />
                      <AlertTitle>{response.type === "success" ? "Registration Successful" : "Registration Failed"}</AlertTitle>
                      <AlertDescription>{response.message}</AlertDescription>
                    </Alert>
                  )}
                </VStack>
              </form>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </FullScreenSection>
  );
};

export default Login;
