import {
  Box,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button
} from '@chakra-ui/react'
import { useLogin } from '@refinedev/core'
import { FormikConfig, useFormik } from 'formik'
import { useCallback } from 'react'

type Credentials = { email: string; password: string }

const LoginPage: React.FC = () => {
  const { mutate: login } = useLogin()

  const handleLogin = useCallback<FormikConfig<Credentials>['onSubmit']>(
    (values) => {
      login(values)
    },
    [login]
  )

  const { handleChange, handleSubmit, values } = useFormik<Credentials>({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: handleLogin
  })

  return (
    <Box
      borderRadius={8}
      borderWidth={1}
      boxShadow='lg'
      maxWidth='md'
      mt={100}
      mx='auto'
      p={8}
    >
      <Stack spacing={4}>
        <FormControl id='email'>
          <FormLabel>Email address</FormLabel>
          <Input
            type='email'
            value={values.email}
            onChange={handleChange('email')}
          />
        </FormControl>
        <FormControl id='password'>
          <FormLabel>Password</FormLabel>
          <Input
            type='password'
            value={values.password}
            onChange={handleChange('password')}
          />
        </FormControl>
        <Button
          colorScheme='blue'
          onClick={() => handleSubmit()}
        >
          Sign In
        </Button>
      </Stack>
    </Box>
  )
}

export default LoginPage
