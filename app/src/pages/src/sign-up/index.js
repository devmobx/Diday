import { View, Text } from 'react-native';
import { useState } from 'react';
import { Form, Input, validators } from '@/components/form';
import { Button } from '@/components/pressables';
import { requestsInstance as req } from '@/requests';

export default function SignUp({ navigation }) {
  const [serverError, setServerError] = useState(false);
  const [existsError, setExistsError] = useState(false);

  return (
    <View className='flex-1 p-[20px]'>
      {existsError ? (
        <View className='flex-1 items-center w-full justify-center'>
          <View className='flex w-full'>
            <Text className='text-center text-[30px] mb-[100px] text-first'>
              You already have an account!
            </Text>
            <Button
              onPress={() => navigation.push('login')}
              label='Login'
            />
          </View>
        </View>
      ) : serverError ? (
        <Text className='text-error'>Failed to submit form, please try again</Text>
      ) : (
        <></>
      )}
      {existsError ? (
        <></>
      ) : (
        <Form
          onSubmit={async ({ values }) => {
            try {
              const res = await req.post('/user', values);
              const data = await res.json();
              if (!data.result) {
                if (data.exists) {
                  setExistsError(true);
                  return;
                }
                setServerError(true);
                return;
              }
              setExistsError(false);
              setServerError(false);
              navigation.push('login');
            } catch (err) {
              console.log(err);
              setServerError(true);
            }
          }}
          defaultValues={{
            firstname: '',
            lastname: '',
            email: '',
            password: '',
          }}>
          <Input
            name='firstname'
            type='text'
            label='First name'
            rules={validators.name}
          />
          <Input
            name='lastname'
            type='text'
            label='Last name'
            rules={validators.name}
          />
          <Input
            name='email'
            type='email'
            label='Email'
            rules={validators.email}
          />
          <Input
            name='password'
            type='password'
            label='Password'
            rules={validators.password}
          />
          <Button
            submitter
            label='Submit'
          />
        </Form>
      )}
    </View>
  );
}
