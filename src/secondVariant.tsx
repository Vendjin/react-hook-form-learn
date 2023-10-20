import { SubmitHandler, useForm } from 'react-hook-form'
import './App.css'
import { IShippingFields } from './app.interface'
import { useEffect } from 'react'

function App() {
  const { register, handleSubmit, formState: { errors }, reset, resetField, getValues, getFieldState, watch, setValue } = useForm<IShippingFields>({
    defaultValues: {
      email: 'test@email.com'
    },
    mode: 'onChange' // all при всех | onBlur - при фокусе на инпуте | onChange - при изменении|  onSubmit - по кнопке
  })

  const onSubmit: SubmitHandler<IShippingFields> = (data) => {
    alert(`Your name ${data.name}`)
    console.log(data)
    resetField('email') // сбросить конкретное поле
    reset()

  }

  // эти функции подходят для 1 раза те загрузился и посмотрел
  // console.log('values name', getValues('name'))
  // console.log('state name',getFieldState('name'))

  // если хотим видеть текущее состояние то нужно использовать watch
  const watchName = watch('name', 'Tom')
  // console.log(watchName)

  // useEffect(() => {
  //   const subscription = watch((value, {name, type}) => console.log(value, name, type))

  //   return () => subscription.unsubscribe()
  // }, [watch])

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type='text'
          placeholder='name'
          {...register('name', {
            // required: true
            required: 'name - обязательное поле',
          }
          )} />
        {errors.name && <div style={{ color: 'red' }}>Текст ошибки {errors.name.message}</div>}

        <input type='email'
          placeholder='email'
          {...register('email', {
            required: 'email - обязательное поле',
            pattern: {
              value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
              message: 'Пожалуйста введите валидный Email'
            }
          }
          )} />
        {errors.email && <div style={{ color: 'red' }}>Текст ошибки {errors.email.message}</div>}

        <div>
          <button>Send</button>
        </div>
      </form>

      <div>
        <button onClick={() => {
          // заполнить поля данными из запроса!
          setValue('name', 'Max')
          setValue('email', 'test@tex.ru')
        }}>Fill data</button>
      </div>
    </>
  )
}

export default App
