import {Box, Button, Image, Input, InputGroup, InputRightElement, Link } from "@chakra-ui/react";
import { FormControl, FormErrorMessage } from '@chakra-ui/react';
import { useFormik } from "formik";
import * as Yup from "yup";
import {signUp} from "../actions/users.ts";
import {useAppDispatch, useAppSelector} from "../hooks/hooks.ts";

function SignupForm() {

    const dispatch = useAppDispatch();

    const user = useAppSelector(user=>user.user.currentUser);

    if(user){
        window.location.href = '/'
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: ''
        },
        onSubmit: async (values) => {
            console.log(values)
            void dispatch(signUp(values));
            // formik.handleReset({
            //     name: '',
            //     email: '',
            //     password: ''
            // })
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name cannot be empty'),
            email: Yup.string().required('Email Address cannot be empty').email('Looks like this is not an email'),
            password: Yup.string().required('Password cannot be empty')
        }),
        validateOnChange: true
    })
    return (
        <Box p={8} borderRadius='lg'>
            <form autoComplete="off" onSubmit={formik.handleSubmit}>
                <FormControl isInvalid={Boolean(formik.touched.name && formik.errors.name)} mb={5} color='black'>
                    <InputGroup>
                        <Input color='#fff' size='lg' type='text' name="name" placeholder="Name" value={formik.values.name} onChange={formik.handleChange} />
                        {formik.touched.name && formik.errors.name && <InputRightElement h='full' children={<Image src={'images/icon-error.svg'} />} />}
                    </InputGroup>
                    {formik.touched.name && formik.errors.name && <FormErrorMessage>{formik.errors.name}</FormErrorMessage>}
                </FormControl>

                <FormControl isInvalid={Boolean(formik.touched.email && formik.errors.email)} mb={5} color='black'>
                    <InputGroup>
                        <Input color='#fff' size='lg' type='text' name="email" placeholder="Email Address" value={formik.values.email} onChange={formik.handleChange} />
                        {formik.touched.email && formik.errors.email && <InputRightElement h='full' children={<Image src={'images/icon-error.svg'} />} />}
                    </InputGroup>
                    {formik.touched.email && formik.errors.email && <FormErrorMessage>{formik.errors.email}</FormErrorMessage>}
                </FormControl>

                <FormControl isInvalid={Boolean(formik.touched.password && formik.errors.password)} mb={5} color='black'>
                    <InputGroup>
                        <Input color='#fff' size='lg' type='password' name="password" placeholder="Password" value={formik.values.password} onChange={formik.handleChange} />
                        {formik.touched.password && formik.errors.password && <InputRightElement h='full' children={<Image src={'images/icon-error.svg'} />} />}
                    </InputGroup>
                    {formik.touched.password && formik.errors.password && <FormErrorMessage>{formik.errors.password}</FormErrorMessage>}
                </FormControl>

                <Button
                    type='submit'
                    w='full' size={'lg'}
                    textTransform='uppercase' fontWeight={'normal'}
                    letterSpacing='wide'
                    _hover={{ filter: 'brightness(0.9)' }}
                >
                    Sign-up
                </Button>
                <Link mt={20} href='/sign-in'>Already registered? Sign-in</Link>
            </form>
        </Box>
    )
}

export default SignupForm



//