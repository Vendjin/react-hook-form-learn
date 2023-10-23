import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import './App.css'
import { IFormFields } from './app.interface'


import TransferList, { IGroup } from './transferList/transferList'
import { useCallback, useEffect, useState } from 'react';


export const currentGroups: IGroup[] | null = [
  {
    name: "Organization Management",
    distinguishedName: "CN=Organization Management,OU=Microsoft Exchange Security Groups,DC=office,DC=lan",
    description: "Members of this management role group have permissions to manage Exchange objects and their properties in the Exchange organization. Members can also delegate role groups and management roles in the organization. This role group shouldn't be deleted."
  },
  {
    name: "Администраторы домена",
    distinguishedName: "CN=Администраторы домена,CN=Users,DC=office,DC=lan",
    description: "Назначенные администраторы домена"
  },
  {
    "name": "Администраторы",
    "distinguishedName": "CN=Администраторы,CN=Builtin,DC=office,DC=lan",
    "description": "Администраторы имеют полные, ничем не ограниченные права доступа к компьютеру или домену"
  },
  {
    "name": "Администраторы схемы",
    "distinguishedName": "CN=Администраторы схемы,CN=Users,DC=office,DC=lan",
    "description": "Назначенные администраторы схемы"
  },
];
// const currentGroups: IGroup[] | null = null

function App() {
  const { handleSubmit, control, setValue,getValues, register } = useForm<IFormFields>({
    mode: 'onChange',
    defaultValues: {
      groups: currentGroups
    }
  })

  const onSubmit: SubmitHandler<IFormFields> = (data) => {
    console.log(data);
  }

  const setValuesFromUserData = useCallback((data: IFormFields) => {
    if (data) {
      Object.keys(data).forEach((key) => {
        setValue(key, data[key]);
      });
    }
  }, [setValue]);

  useEffect(() => {

    setValuesFromUserData({ groups: currentGroups });

  }, [setValuesFromUserData]);

  return (
    <div style={{ textAlign: 'center' }}>
      <form style={{ width: '100%', margin: '0 auto' }} onSubmit={handleSubmit(onSubmit)}>
        <TransferList control={control} setValue={setValue} getValues={getValues} register={register}/>
        <button type='submit'>отправить</button>
      </form>
    </div>
  );
}

export default App
